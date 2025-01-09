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
  rating: number;
  shippingFee?: number;
  reviews?: Review[];
  relatedProducts?: Product[];
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
  selectedColor?: string;
  selectedSize?: string;
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
  password?: string;
  confirmPassword?: string;
  phoneNumber: string;
  profileImage?: string;
  role: UserRole;
  coverPhoto?: string;
}

export enum UserRole {
  customer,
  vendor,
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

export interface Address {
  id?: string;
  userId?: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  addressType: AddressType;
}
export enum AddressType {
  BILLING = "billing",
  SHIPPING = "shipping",
}

export interface Wishlist {
  id: string; // Unique identifier for the wishlist
  userId: string; // User ID associated with the wishlist
  createdAt: Date; // Timestamp when the wishlist was created

  // Relations
  user: User; // The user associated with the wishlist
  wishlistItems: WishlistItem[]; // Array of items in the wishlist
}

export interface WishlistItem {
  id: string; // Unique identifier for the wishlist item
  productId: string; // Product ID associated with the item
  product: Product; // The product details

  // Relations
  wishlistId: string; // ID of the wishlist this item belongs to
  wishlist: Wishlist; // The wishlist containing this item
}

export enum OrderStatus {
  pending = "pending",
  processing = "processing",
  outForDelivery = "outForDelivery",
  shipped = "shipped",
  delivered = "delivered",
  cancelled = "cancelled",
}

export interface Order {
  id?: string;
  userId?: string;
  status?: OrderStatus;
  totalAmount: number;
  createdAt?: Date;
  updatedAt?: Date;
  selectedAddress?: Address;
  selectedAddressId: string;
  selectedPaymentMethod: PaymentMethod;
  orderComment?: string | null;
  // Relations
  user?: User; // Assuming a User type exists
  orderItems?: OrderItem[];
  expectedDeliveryDays?: number;
  expectedDeliveryDate?: Date;
}

export interface OrderItem {
  id?: string;
  orderId?: string;
  productId: string;
  quantity: number;
  price: number;

  // Relations
  order?: Order;
  product?: Product; // Assuming a Product type exists
}

export enum PaymentMethod {
  COD = "COD",
  RAZORPAY = "RAZORPAY",
}

export interface Review {
  id: string;
  rating: number;
  comment?: string;
  createdAt?: string;
  productId: string;
  userId?: string;
  user?: User;
}
