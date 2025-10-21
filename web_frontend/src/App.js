import React, { useMemo, useState, useEffect } from 'react';
import './App.css';
import './styles/theme.css';
import Layout from './components/Layout';
import { categories as allCategories, recipes as allRecipes, filterRecipes } from './data/recipes';
import { AppRoutes } from './routes';

// PUBLIC_INTERFACE
function App() {
  /**
   * Root application: manages search and category filter state,
   * applies Ocean Professional theme, and renders routes within layout.
   */
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  // Apply base theme on mount
  useEffect(() => {
    document.documentElement.style.background = 'var(--color-bg)';
  }, []);

  const filtered = useMemo(() => filterRecipes(allRecipes, query, category), [query, category]);

  const handleOpenDetail = (recipe) => {
    window.location.hash = `#/recipe/${recipe.id}`;
  };

  return (
    <Layout
      categories={allCategories}
      activeCategory={category}
      onCategoryChange={setCategory}
      query={query}
      onSearch={setQuery}
    >
      <AppRoutes filtered={filtered} onOpenDetail={handleOpenDetail} />
    </Layout>
  );
}

export default App;
