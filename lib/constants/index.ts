export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "E-commerce";
export const APP_DESCRIPTON = process.env.NEXT_PUBLIC_DESCRIPTION || "A modern E-commerce build with Next.js";

export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

export const LATEST_PRODUCTS_LIMIT = Number(process.env.LATEST_PRODUCTS_LIMIT) || 4;

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 12;

export const signInDefaultValues = {
    email: "",
    password: "",
    };
    
export const signUpDefaultValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    };

    export const shippingAddressDefaultValues = {
  fullName: '',
  streetAddress: '',
  city: '',
  postalCode: '',
  country: '',
};

export const reviewFormDefaultValues = {
  title: '',
  comment: '',
  rating: 0,
};

export const PAYMENT_METHODS = process.env.PAYMENT_METHODS
  ? process.env.PAYMENT_METHODS.split(', ')
  : ['PayPal', 'Credit Card', 'Cash on Delivery'];
  
export const DEFAULT_PAYMENT_METHOD =
  process.env.DEFAULT_PAYMENT_METHOD || 'Credit Card';

  export const SENDER_EMAIL = process.env.SENDER_EMAIL || 'onboarding@resend.dev';