export const categories = [
  "All",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Vegan",
  "Vegetarian",
  "Gluten-Free",
  "Seafood",
  "Quick & Easy"
];

export const recipes = [
  {
    id: "1",
    title: "Lemon Herb Grilled Salmon",
    category: "Seafood",
    description: "Fresh salmon grilled with lemon, garlic, and herbs.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
    ingredients: [
      "2 salmon fillets",
      "2 tbsp olive oil",
      "1 lemon (juice and zest)",
      "2 garlic cloves, minced",
      "Fresh dill, salt & pepper"
    ],
    instructions: [
      "Preheat grill to medium-high.",
      "Mix olive oil, lemon juice/zest, garlic, and dill.",
      "Brush salmon with mixture and season with salt & pepper.",
      "Grill 4-5 minutes per side until flaky.",
      "Serve with lemon wedges."
    ],
    time: "20 min"
  },
  {
    id: "2",
    title: "Classic Pancakes",
    category: "Breakfast",
    description: "Fluffy pancakes perfect with maple syrup.",
    image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=1200&auto=format&fit=crop",
    ingredients: [
      "1 1/2 cups flour",
      "3 1/2 tsp baking powder",
      "1 tbsp sugar",
      "1 1/4 cups milk",
      "1 egg",
      "3 tbsp butter, melted",
      "Pinch of salt"
    ],
    instructions: [
      "Whisk dry ingredients in a bowl.",
      "Add milk, egg, and melted butter. Mix until just combined.",
      "Heat a lightly oiled griddle over medium heat.",
      "Pour 1/4 cup batter for each pancake; cook until bubbles form and flip.",
      "Serve warm with maple syrup."
    ],
    time: "25 min"
  },
  {
    id: "3",
    title: "Veggie Buddha Bowl",
    category: "Vegan",
    description: "A nourishing bowl with quinoa, roasted veggies, and tahini dressing.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop",
    ingredients: [
      "1 cup cooked quinoa",
      "Roasted sweet potatoes",
      "Chickpeas",
      "Spinach",
      "Cherry tomatoes",
      "Tahini, lemon, garlic"
    ],
    instructions: [
      "Roast sweet potatoes and chickpeas until crisp.",
      "Whisk tahini, lemon juice, garlic, and water to thin.",
      "Assemble bowl with quinoa, veggies, and dressing.",
      "Season with salt and pepper, serve."
    ],
    time: "30 min"
  },
  {
    id: "4",
    title: "Spaghetti Carbonara",
    category: "Dinner",
    description: "Creamy Italian pasta with pancetta and parmesan.",
    image: "https://images.unsplash.com/photo-1521389508051-d7ffb5dc8bbf?q=80&w=1200&auto=format&fit=crop",
    ingredients: [
      "200g spaghetti",
      "100g pancetta",
      "2 eggs",
      "1/2 cup grated parmesan",
      "Black pepper, salt"
    ],
    instructions: [
      "Cook spaghetti al dente.",
      "Fry pancetta until crisp.",
      "Whisk eggs with parmesan and pepper.",
      "Combine hot pasta with pancetta and egg mixture off heat.",
      "Serve immediately."
    ],
    time: "20 min"
  },
  {
    id: "5",
    title: "Chocolate Lava Cake",
    category: "Dessert",
    description: "Rich molten chocolate cakes with gooey centers.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1200&auto=format&fit=crop",
    ingredients: [
      "170g dark chocolate",
      "1/2 cup butter",
      "2 eggs + 2 yolks",
      "1/4 cup sugar",
      "2 tbsp flour",
      "Pinch of salt"
    ],
    instructions: [
      "Melt chocolate and butter together.",
      "Whisk eggs, yolks, and sugar until light.",
      "Fold in chocolate mixture and flour.",
      "Divide into greased ramekins.",
      "Bake at 220°C/425°F for 10-12 minutes; centers should be soft."
    ],
    time: "30 min"
  },
  {
    id: "6",
    title: "Grilled Chicken Salad",
    category: "Lunch",
    description: "Crisp greens, juicy grilled chicken, and a zesty dressing.",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1200&auto=format&fit=crop",
    ingredients: [
      "Mixed greens",
      "Grilled chicken breast",
      "Cucumber, cherry tomatoes",
      "Feta cheese",
      "Olive oil, lemon, oregano"
    ],
    instructions: [
      "Grill seasoned chicken and slice.",
      "Toss greens with veggies and dressing.",
      "Top with chicken and feta. Serve."
    ],
    time: "20 min"
  }
];

export function filterRecipes(list, search, category) {
  const term = (search || "").toLowerCase().trim();
  return list.filter(r => {
    const matchesTerm =
      !term ||
      r.title.toLowerCase().includes(term) ||
      r.description.toLowerCase().includes(term) ||
      r.ingredients.join(" ").toLowerCase().includes(term);
    const matchesCat = !category || category === "All" || r.category === category;
    return matchesTerm && matchesCat;
  });
}
