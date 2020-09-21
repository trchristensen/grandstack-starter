export interface Recipe {
  recipeId: string;
  name: string;
  description: string;
  published: string;
  // lastEdited?: DateTime;
  creator: User;
  parent?: Recipe;
  ingredients?: _RecipeIngredients[];
  tags?: ITag[];
}

export interface _RecipeIngredients {
  amount?: number;
  measurement?: string;
  Flavor: {
    flavorId?: string;
    name?: string;
    company?: string;
  }
}

export interface ITag {
  tagId?: string;
  name?: string
}

export interface User {
  userId: string;
  name?: string;
  reviews?: Review;
  avgStars?: number;
  numReviews?: number;
  recommendations?: Company;
}

export interface Flavor {
  flavorId: string;
  name: string;
  company: Company;
}

export interface Company {
  companyId: string;
  name: string;
  address?: string;
  city?: string;
  state?: string;
  location?: Point;
  website?: string;
  facebook?: string;
  phone?: string;
  avgStars?: number;
  reviews: Review;
}

interface Point {
  latitude: number;
  longitude: number;
}

interface Review {
  reviewId: string;
  text: string;
}

export interface DateTime {
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  second?: number;
  millisecond?: number;
  microsecond?: number;
  nanosecond?: number;
  timezone?: string;
  formatted?: string;
}
