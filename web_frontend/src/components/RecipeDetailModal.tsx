import React from 'react';
import { Recipe } from '../data/mockRecipes';

type Props = {
  recipe: Recipe | null;
  onClose: () => void;
};

// PUBLIC_INTERFACE
export default function RecipeDetailModal({ recipe, onClose }: Props): JSX.Element | null {
  /** Simple modal placeholder showing selected recipe info. */
  if (!recipe) return null;
  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h2>{recipe.title}</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close">✕</button>
        </header>
        <div className="modal-body">
          <img className="modal-image" src={recipe.image} alt={recipe.title} />
          <p className="muted">{recipe.description}</p>
          <div className="chips">
            <span className="chip">{recipe.category}</span>
            <span className="chip">⏱ {recipe.time} mins</span>
          </div>
          <p className="muted">Detail view placeholder. Ingredients and steps will appear here.</p>
        </div>
        <footer className="modal-footer">
          <button className="btn" onClick={onClose}>Close</button>
          <button className="btn primary">Start Cooking</button>
        </footer>
      </div>
    </div>
  );
}
