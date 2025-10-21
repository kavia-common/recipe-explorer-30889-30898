import React, { useState, useEffect, useRef } from "react";

// PUBLIC_INTERFACE
export default function Navbar({ initialQuery = "", onSearch }) {
  /**
   * Navbar with brand and search field.
   * - Search input is fully controlled via local state synchronized with initialQuery prop (route-synced).
   * - Form submission calls onSearch with current query and prevents page reload.
   * - Accessible label associations for input and form.
   */
  const [query, setQuery] = useState(initialQuery ?? "");
  const inputRef = useRef(null);
  const inputId = "navbar-search-input";

  // Keep local state in sync with route/state provided by parent
  useEffect(() => {
    setQuery(initialQuery ?? "");
  }, [initialQuery]);

  const handleSubmit = (e) => {
    // Prevent full page reload; allow Enter key to submit search
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Top Navigation">
      <div className="nav-inner">
        <a href="#/" className="brand" aria-label="Recipe Explorer Home">
          <span className="brand-badge" aria-hidden="true" />
          <span>
            Recipe Explorer
            <span style={{ color: "var(--color-secondary)", marginLeft: 6 }}>• Ocean</span>
          </span>
        </a>

        <form
          className="search-wrap"
          onSubmit={handleSubmit}
          role="search"
          aria-label="Recipe search"
        >
          <div className="search-input" aria-live="polite">
            <label htmlFor={inputId} className="visually-hidden" aria-hidden="true">
              Search recipes
            </label>
            <span className="search-icon" aria-hidden="true">🔍</span>
            <input
              id={inputId}
              ref={inputRef}
              className="input"
              type="search"
              placeholder="Search recipes, ingredients…"
              aria-label="Search recipes"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              // Ensure IME/virtual keyboards can confirm without submitting prematurely
              enterKeyHint="search"
            />
          </div>
          <button className="btn" type="submit" aria-label="Submit search">
            Search
          </button>
        </form>

        <div aria-hidden="true" />
      </div>
    </nav>
  );
}
