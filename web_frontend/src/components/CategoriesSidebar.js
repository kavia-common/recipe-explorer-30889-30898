import React from "react";

// PUBLIC_INTERFACE
export default function CategoriesSidebar({ categories, active, onSelect }) {
  /** Sidebar with clickable category filters */
  return (
    <aside className="sidebar" aria-label="Categories">
      <h3 className="kicker">Categories</h3>
      <div className="category-list" role="list">
        {categories.map((c) => {
          const isActive = c === active || (!active && c === "All");
          return (
            <button
              key={c}
              role="listitem"
              className={`category-btn ${isActive ? "active" : ""}`}
              aria-pressed={isActive}
              onClick={() => onSelect?.(c)}
            >
              {c}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
