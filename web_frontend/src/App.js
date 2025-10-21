import React, { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import './App.css';
import './styles/theme.css';
import Layout from './components/Layout';
import { categories as allCategories, recipes as allRecipes, filterRecipes } from './data/recipes';
import { AppRoutes, getRoute, subscribe } from './routes';

// PUBLIC_INTERFACE
function App() {
  /**
   * Root application: manages search and category filter state,
   * applies Ocean Professional theme, and renders routes within layout.
   *
   * Requirements implemented:
   * - Initialize state from current hash route via getRoute()
   * - Subscribe to hash changes via subscribe() and sync category
   * - When category/search changes, update location.hash accordingly
   * - Detail route behavior remains unchanged (AppRoutes handles it)
   */
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  // Track last category source to avoid loops (route vs UI)
  const lastRouteCategoryRef = useRef(null);

  // Apply base theme on mount
  useEffect(() => {
    document.documentElement.style.background = 'var(--color-bg)';
  }, []);

  // Initialize from current route on first mount and subscribe to future changes
  useEffect(() => {
    // Apply initial state from route
    const initial = getRoute();
    if (initial?.name === 'category' && initial.params?.name) {
      const decoded = String(initial.params.name);
      lastRouteCategoryRef.current = decoded;
      setCategory(decoded);
    } else if (initial?.name === 'home') {
      lastRouteCategoryRef.current = 'All';
      setCategory('All');
    }
    // Subscribe to hash changes
    const unsubscribe = subscribe((route) => {
      if (!route) return;
      if (route.name === 'category') {
        const name = String(route.params?.name ?? 'All');
        // Only update if different to prevent redundant sets/loops
        lastRouteCategoryRef.current = name;
        setCategory((prev) => (prev !== name ? name : prev));
      } else if (route.name === 'home') {
        lastRouteCategoryRef.current = 'All';
        setCategory((prev) => (prev !== 'All' ? 'All' : prev));
      }
      // For detail route, we do not alter search/category
    });
    return () => {
      unsubscribe?.();
    };
  }, []);

  // Filtered list based on state
  const filtered = useMemo(() => filterRecipes(allRecipes, query, category), [query, category]);

  const handleOpenDetail = useCallback((recipe) => {
    window.location.hash = `#/recipe/${recipe.id}`;
  }, []);

  // When the user changes category through UI, push the hash route
  const onCategoryChange = useCallback((nextCat) => {
    // If the category came from route previously and matches, do nothing
    // Otherwise, push new hash
    const safe = String(nextCat || 'All');
    // Avoid pushing duplicate hash if already at that route
    const route = getRoute();
    if (safe === 'All') {
      if (!(route.name === 'home')) {
        window.location.hash = '#/';
      }
    } else {
      if (!(route.name === 'category' && String(route.params?.name) === safe)) {
        window.location.hash = `#/category/${encodeURIComponent(safe)}`;
      }
    }
    setCategory(safe);
  }, []);

  // Optionally, reflect search in hash home route as query string is not specified in routes.
  // Per acceptance criteria, home shows unfiltered list or current search; we won't mutate hash for search.

  // When user submits search in Navbar, just update local state
  const onSearch = useCallback((q) => {
    setQuery(q || '');
    // No hash update required for search per requirements
  }, []);

  return (
    <Layout
      categories={allCategories}
      activeCategory={category}
      onCategoryChange={onCategoryChange}
      query={query}
      onSearch={onSearch}
    >
      <AppRoutes filtered={filtered} onOpenDetail={handleOpenDetail} />
    </Layout>
  );
}

export default App;
