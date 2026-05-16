export type ItemCondition = "new" | "good" | "fair";

export interface Category {
  id?: number;
  name: string;
  description?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  university: string;
  verified: boolean;
  active: boolean;
  createdAt: string;
}

export interface ListingImage {
  id?: number;
  url: string;
  sortOrder: number;
}

export interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
  itemCondition: ItemCondition;
  imageUrl?: string;
  active: boolean;
  publishedAt: string;
  seller: User;
  category: Category;
  images?: ListingImage[];
}

export interface Message {
  id: number;
  content: string;
  sentAt: string;
  read: boolean;
  sender: User;
  recipient: User;
  listing: Listing;
}

export interface Review {
  id: number;
  rating: number;
  comment?: string;
  createdAt: string;
  author: User;
  seller: User;
  listing: Listing;
}

export interface Notification {
  id: string;
  type: "message" | "favorite" | "review" | "listing" | "verification";
  title: string;
  description: string;
  read: boolean;
  createdAt: string;
  link?: string;
  avatar?: string;
}

export interface FeedFilters {
  category?: string;
  universityId?: string;
  priceMin?: number;
  priceMax?: number;
  condition?: ItemCondition;
  search?: string;
  order?: "recent" | "price_asc" | "price_desc" | "popular";
}
