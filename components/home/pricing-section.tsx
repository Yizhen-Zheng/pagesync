const plans = [
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
    paymentLink: "",
    priceId: "",
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
    paymentLink: "",
    priceId: "",
  },
];
type Plan = {
  id: string;
  name: string;
  price: number;
  items: string[];
  paymentLink: string;
  priceId: string;
};
export default function PricingSection() {
  return (
    <section className="relative overflow-hidden bg-gray-50">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12 ">
        <div>
          <h2>Pricing</h2>
        </div>
        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          {plans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({ id, name, price }: Plan) {
  return (
    <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold">{name}</h3>
    </div>
  );
}
