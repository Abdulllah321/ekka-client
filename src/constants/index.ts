import { Product } from "../utils/types";

export const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // Remove invalid characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Remove duplicate hyphens
};

export const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASEURL;

export const ITEMS_PER_PAGE = 12;
export const MAX_RATING = 5;

export const CURRENCY = "$";

export const getImageUrl = (url: string) => {
  if (url?.startsWith("uploads")) {
    return `${IMAGE_BASE_URL}${url}`;
  } else {
    return url;
  }
};

export const getPrice = (product: Product) => {
  if (product.discountPercentage !== 0) {
    return product.discountPrice;
  } else {
    return product.price;
  }
};

export const AddressFormFields = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "First Name",
    isHalf: true,
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Last Name",
    isHalf: true,
  },
  {
    name: "city",
    label: "City",
    type: "text",
    placeholder: "City",
    isHalf: true,
  },
  {
    name: "state",
    label: "State",
    type: "text",
    placeholder: "State",
    isHalf: true,
  },
  {
    name: "street",
    label: "Street Address",
    type: "text",
    placeholder: "Address Line 1",
    isHalf: false,
  },
  {
    name: "addressType",
    label: "Address Type",
    type: "select",
    options: [
      { value: "billing", label: "Billing" },
      { value: "shipping", label: "Shipping" },
    ],
    isHalf: false,
  },
  {
    name: "postalCode",
    label: "Postal Code",
    type: "text",
    placeholder: "Postal Code",
    isHalf: true,
  },
  {
    name: "country",
    label: "Country",
    type: "text",
    placeholder: "Country",
    isHalf: true,
  },
];
