import { isDev } from "./env-manage";

export type Plan = {
  id: string;
  name: string;
  price: number;
  items: string[];
  description: string;
  paymentLink: string;
  priceId: string;
  uploadLimit: number;
};

export const planMap: Record<string, Plan> = {
  free: {
    id: "free",
    name: "Free",
    price: 0,
    items: [
      "5 PDF summaries per month",
      "Standard processing speed",
      "Email support",
    ],
    description: "Good for beginners",
    paymentLink: "",
    priceId: "",
    uploadLimit: 5,
  },
  basic: {
    id: "basic",
    name: "Basic",
    price: 9,
    items: [
      "100 PDF summaries per month",
      "Standard processing speed",
      "Email support",
    ],
    description: "Perfect for occasional use",
    paymentLink: isDev
      ? "https://buy.stripe.com/test_bJe5kx3ut6mM7x4fMW8ww01"
      : "",
    priceId: isDev ? "price_1RwMbS8FGxPPqW5ykNqupkD4" : "",
    uploadLimit: 100,
  },
  pro: {
    id: "pro",
    name: "Pro",
    price: 19,
    items: [
      "Unlimited PDF summaries",
      "Priority processing",
      "24/7 priority support",
      "Markdown export",
    ],
    description: "For professionals and teams",
    paymentLink: isDev
      ? "https://buy.stripe.com/test_7sYfZb0ih8uUeZwfMW8ww00"
      : "",
    priceId: isDev ? "price_1RwMfY8FGxPPqW5y7rQ6aF0v" : "",
    uploadLimit: 1000,
  },
};
export const priceIdToPlan = (priceId: string) => {
  switch (priceId) {
    case "price_1RwMbS8FGxPPqW5ykNqupkD4":
      return "basic";
    case "price_1RwMfY8FGxPPqW5y7rQ6aF0v":
      return "pro";
    default:
      return "free";
  }
};

// an array for rendering UI
export const plans: Array<Plan> = Object.values(planMap);
