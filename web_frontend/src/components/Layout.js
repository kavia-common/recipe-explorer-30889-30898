import React from "react";
import Navbar from "./Navbar";
import CategoriesSidebar from "./CategoriesSidebar";

// PUBLIC_INTERFACE
export default function Layout({ children, categories, activeCategory, onCategoryChange, query, onSearch }) {
  /** Shared page layout with navbar and sidebar */
  return (
    <div className="layout">
      <Navbar initialQuery={query} onSearch={onSearch} />
      <main className="main-area">
        <CategoriesSidebar
          categories={categories}
          active={activeCategory}
          onSelect={onCategoryChange}
        />
        <div aria-live="polite">{children}</div>
      </main>
    </div>
  );
}
