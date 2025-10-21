import React from "react";

// PUBLIC_INTERFACE
export default function CategoriesSidebar({ categories, active, onSelect }) {
  /**
   * Sidebar with clickable category filters.
   * - Keeps button semantics and aria-pressed for the active item.
   * - Navigates by updating location.hash to "#/category/:name" (URL-encoded),
   *   or "#/" for "All".
   * - Preserves keyboard accessibility (Enter/Space).
   * - Does not maintain internal state; highlighting is driven by `active`
   *   which is synced from the route by the App via subscribe().
   */
  const navigateToCategory = (name) => {
    const safe = String(name || "All");
    const nextHash = safe === "All" ? "#/" : `#/category/${encodeURIComponent(safe)}`;
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
    }
    // Also notify parent callback for any local side-effects
    onSelect?.(safe);
  };

  const handleKeyDown = (e, name) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigateToCategory(name);
    }
  };

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
              type="button"
              onClick={() => navigateToCategory(c)}
              onKeyDown={(e) => handleKeyDown(e, c)}
            >
              {c}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
