import React, { useState, useEffect, useRef } from "react";

// PUBLIC_INTERFACE
export default function Navbar({ initialQuery = "", onSearch }) {
  /** Navbar with brand and search field. Applies Ocean Professional theme. */
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef(null);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const submit = (e) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Top Navigation">
      <div className="nav-inner">
        <a href="/" className="brand" aria-label="Recipe Explorer Home">
          <span className="brand-badge" aria-hidden="true" />
          <span>
            Recipe Explorer
            <span style={{ color: "var(--color-secondary)", marginLeft: 6 }}>• Ocean</span>
          </span>
        </a>
        <form className="search-wrap" onSubmit={submit} role="search" aria-label="Recipe search">
          <div className="search-input" aria-live="polite">
            <span className="search-icon" aria-hidden="true">🔍</span>
            <input
              ref={inputRef}
              className="input"
              type="search"
              placeholder="Search recipes, ingredients…"
              aria-label="Search recipes"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
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
