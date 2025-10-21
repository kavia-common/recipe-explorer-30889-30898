import React from 'react';

type Props = {
  value: string;
  onChange: (v: string) => void;
};

// PUBLIC_INTERFACE
export default function NavBar({ value, onChange }: Props): JSX.Element {
  /** Top navigation bar with app title and search input. */
  return (
    <header className="nav">
      <div className="nav-inner">
        <div className="brand">
          <span className="brand-mark" />
          <span className="brand-name">Recipe Explorer</span>
        </div>
        <div className="search">
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="search-input"
            type="search"
            placeholder="Search recipes, ingredients..."
            aria-label="Search recipes"
          />
        </div>
      </div>
    </header>
  );
}
