export type Recipe = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  time: number;
};

const placeholder = (seed: number) =>
  `https://picsum.photos/seed/recipe-${seed}/600/400`;

export const recipes: Recipe[] = [
  {
    id: '1',
    title: 'Lemon Herb Grilled Chicken',
    description: 'Juicy grilled chicken with a zesty lemon herb marinade.',
    image: placeholder(1),
    category: 'Grill',
    time: 30
  },
  {
    id: '2',
    title: 'Creamy Mushroom Pasta',
    description: 'Silky cream sauce with sautéed mushrooms and garlic.',
    image: placeholder(2),
    category: 'Pasta',
    time: 25
  },
  {
    id: '3',
    title: 'Avocado Quinoa Salad',
    description: 'Fresh and healthy quinoa tossed with avocado and veggies.',
    image: placeholder(3),
    category: 'Salad',
    time: 15
  },
  {
    id: '4',
    title: 'Spicy Tofu Stir-Fry',
    description: 'Crispy tofu with colorful veggies in a spicy sauce.',
    image: placeholder(4),
    category: 'Vegan',
    time: 20
  },
  {
    id: '5',
    title: 'Classic Margherita Pizza',
    description: 'Tomato, mozzarella, and basil on a crispy crust.',
    image: placeholder(5),
    category: 'Pizza',
    time: 18
  },
  {
    id: '6',
    title: 'Blueberry Pancakes',
    description: 'Fluffy pancakes bursting with fresh blueberries.',
    image: placeholder(6),
    category: 'Breakfast',
    time: 20
  }
];
