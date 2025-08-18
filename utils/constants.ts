import { isDev } from "./env-manage";

export const plans = [
  {
    id: "basic",
    name: "Basic",
    price: 9,
    items: [
      "5 PDF summaries per month",
      "Standard processing speed",
      "Email support",
    ],
    description: "Perfect for occasional use",
    paymentLink: isDev
      ? "https://buy.stripe.com/test_bJe5kx3ut6mM7x4fMW8ww01"
      : "",
    priceId: isDev ? "price_1RwMbS8FGxPPqW5ykNqupkD4" : "",
  },
  {
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
  },
];
export type Plan = {
  id: string;
  name: string;
  price: number;
  items: string[];
  description: string;
  paymentLink: string;
  priceId: string;
};
