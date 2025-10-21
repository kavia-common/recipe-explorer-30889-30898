import React from 'react';

type Props = {
  categories: string[];
  selected: string;
  onSelect: (cat: string) => void;
};

// PUBLIC_INTERFACE
export default function Sidebar({ categories, selected, onSelect }: Props): JSX.Element {
  /** Sidebar with category filters. */
  return (
    <nav className="category-list" aria-label="Recipe categories">
      <ul>
        {categories.map((cat) => (
          <li key={cat}>
            <button
              className={`category-btn ${selected === cat ? 'active' : ''}`}
              onClick={() => onSelect(cat)}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
