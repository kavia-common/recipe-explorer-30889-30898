import React, { useMemo, useState } from 'react';
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import RecipeGrid from './components/RecipeGrid';
import RecipeDetailModal from './components/RecipeDetailModal';
import { recipes as allRecipes, Recipe } from './data/mockRecipes';
import './styles/theme.css';

// PUBLIC_INTERFACE
export default function App(): JSX.Element {
  /** Root layout: top nav (search), sidebar categories, main recipe grid, modal on selection. */
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('All');
  const [selected, setSelected] = useState<Recipe | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>(['All']);
    allRecipes.forEach(r => set.add(r.category));
    return Array.from(set);
  }, []);

  const filtered = useMemo(() => {
    return allRecipes.filter(r => {
      const matchesQuery =
        !query ||
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.description.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === 'All' || r.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  return (
    <div className="app">
      <NavBar value={query} onChange={setQuery} />
      <div className="layout">
        <aside className="sidebar">
          <Sidebar
            categories={categories}
            selected={category}
            onSelect={setCategory}
          />
        </aside>
        <main className="content">
          <h1 className="page-title">Discover Recipes</h1>
          <RecipeGrid recipes={filtered} onSelect={setSelected} />
        </main>
      </div>
      <RecipeDetailModal recipe={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
