//
// Recipes API abstraction with mock switching
//
import { get } from './client';
import { recipes as mockRecipes, filterRecipes as filterLocal } from '../data/recipes';

// Determine if we should use mock data. Default to true unless explicitly set to 'false'
const useMock = (process.env.REACT_APP_USE_MOCK ?? 'true') !== 'false';

/**
 * Normalize a recipe object to the expected shape used by RecipeGrid and RecipeDetail.
 * Current mock data already follows this shape, but keep here for future backend parity.
 * @param {any} r
 * @returns {object}
 */
function normalizeRecipe(r) {
  if (!r) return null;
  return {
    id: String(r.id),
    title: r.title,
    category: r.category,
    description: r.description,
    image: r.image,
    ingredients: Array.isArray(r.ingredients) ? r.ingredients : [],
    instructions: Array.isArray(r.instructions) ? r.instructions : [],
    time: r.time,
  };
}

/**
 * Apply filtering and pagination on a list
 * @param {Array} list
 * @param {object} params
 * @returns {{items: any[], total: number, page: number, pageSize: number}}
 */
function paginate(list, { page = 1, pageSize = 12 } = {}) {
  const p = Number(page) > 0 ? Number(page) : 1;
  const ps = Number(pageSize) > 0 ? Number(pageSize) : 12;
  const start = (p - 1) * ps;
  const end = start + ps;
  return {
    items: list.slice(start, end),
    total: list.length,
    page: p,
    pageSize: ps,
  };
}

// PUBLIC_INTERFACE
export async function listRecipes({ q = '', category = 'All', page = 1, pageSize = 12 } = {}) {
  /**
   * List recipes with optional search (q), category, and pagination.
   * - Mock mode: filters locally using src/data/recipes.js utilities.
   * - API mode: GET /recipes with query params: q, category, page, pageSize
   *
   * Returns:
   * {
   *   items: Recipe[],
   *   total: number,
   *   page: number,
   *   pageSize: number
   * }
   */
  if (useMock) {
    try {
      const filtered = filterLocal(mockRecipes, q, category);
      const result = paginate(filtered.map(normalizeRecipe), { page, pageSize });
      return result;
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn('[api/recipes] mock list error', err);
      }
      // Graceful fallback: return empty set
      return { items: [], total: 0, page: 1, pageSize: Number(pageSize) || 12 };
    }
  }

  // API mode
  try {
    const data = await get('/recipes', {
      params: { q, category, page, pageSize },
    });

    // Accept either array or object shape from backend.
    if (Array.isArray(data)) {
      const normalized = data.map(normalizeRecipe);
      return paginate(normalized, { page, pageSize });
    }

    const items = Array.isArray(data?.items) ? data.items.map(normalizeRecipe) : [];
    const total = typeof data?.total === 'number' ? data.total : items.length;
    return {
      items,
      total,
      page: Number(data?.page ?? page) || 1,
      pageSize: Number(data?.pageSize ?? pageSize) || 12,
    };
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn('[api/recipes] list error', err);
    }
    return { items: [], total: 0, page: 1, pageSize: Number(pageSize) || 12 };
  }
}

// PUBLIC_INTERFACE
export async function getRecipe(id) {
  /**
   * Retrieve a single recipe by id.
   * - Mock mode: find in local dataset
   * - API mode: GET /recipes/:id
   *
   * Returns: Recipe | null
   */
  if (!id && id !== 0) return null;

  if (useMock) {
    try {
      const found = mockRecipes.find(r => String(r.id) === String(id));
      return normalizeRecipe(found) || null;
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn('[api/recipes] mock get error', err);
      }
      return null;
    }
  }

  // API mode
  try {
    const data = await get(`/recipes/${encodeURIComponent(id)}`);
    return normalizeRecipe(data) || null;
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn('[api/recipes] get error', err);
    }
    return null;
  }
}
