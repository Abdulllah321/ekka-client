export interface Product {
  id?: string;
  name: string;
  description: string;
  shortDesc?: string;
  price: number;
  discountPrice?: number;
  stockQuantity: number;
  sizes: string[];
  colors: string[];
  imageUrls: string[];
  status: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  stockStatus?: "inStock" | "outOfStock" | "limitedStock";
  mainCategoryId: string;
  subCategoryId: string;
  thumbnail: string;
  slug: string;
  weight?: string;
  dimensions?: string;
  productTags?: string[];
  soldQuantity?: number | 0;
  mainCategory?: Category;
  discountPercentage?: number;
  rating?: number;
  shippingFee?: number;
}

export interface Category {
  id?: string;
  name: string;
  slug: string;
  shortDesc?: string;
  fullDesc?: string;
  imageUrl?: string;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

export interface Banner {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  discount?: string; // Optional field
  buttonText: string;
  animation: "slideFromLeft" | "slideFromRight"; // Restrict to specific values
}

export interface Cart {
  id?: string;
  userId: string;
  createdAt: string; // ISO 8601 format for DateTime
  cartItems: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  totalAmount: number;
}

// CartItem Interface
export interface CartItem {
  id: string;
  quantity: number;
  productId: string;
  product: Product;
  cartId: string;
}

export interface User {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword?: string;
  phoneNumber: string;
}

export interface Coupon {
  id: string;
  code: string;
  description?: string;
  discountAmount: number;
  discountType: DiscountType;
  startDate: Date;
  endDate: Date;
  status: "active" | "inactive" | "expired";
  createdAt: Date;
  updatedAt: Date;
}
export enum DiscountType {
  Percentage = "percentage",
  FixedAmount = "fixedAmount",
}
