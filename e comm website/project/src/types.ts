export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  password: string;
  otp?: string;
}

export interface ThemeStore {
  darkMode: boolean;
  toggleDarkMode: () => void;
}