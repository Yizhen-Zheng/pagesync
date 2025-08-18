import Link from "next/link";
import { cn } from "@/utils/tailwind-utils";
import { Check } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Plan } from "@/utils/constants";
import { plans } from "@/utils/constants";

export default function PricingSection() {
  return (
    <section className="relative overflow-hidden" id="pricing">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12 ">
        <div className="flex justify-center items-center w-full pb-12">
          <h2 className="text-xl font-bold mb-8 text-rose-500 uppercase">
            Pricing
          </h2>
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

function PricingCard({
  id,
  name,
  price,
  items,
  description,
  paymentLink,
  priceId,
}: Plan) {
  return (
    <div className="relative w-full max-w-lg hover:scale-105 hover:transition-all duration-300">
      {/* hover:duration vs duration: make sure its transition back also has animation */}
      <div
        className={cn(
          "relative flex flex-col gap-4 h-full lg:gap-8 z-10 p-8 border-[1px] border-gray-500/20 rounded-2xl",
          id === "pro" && "border-rose-500 gap-5 border-2"
        )}
      >
        <div className="flex justify-between items-center gap-4">
          <div>
            <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
            <p className="text-base-content/80 mt-2">{description}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <p className="text-5xl tracking-tight font-extrabold">${price}</p>
          <div className="flex flex-col justify-end mb-[4px]">
            <p className="text-xs uppercase font-semibold">USD</p>
            <p className="text-xs">/month</p>
          </div>
        </div>
        <div className="space-y-2.5 leading-relaxed text-base flex-1">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <Check size={18} className="stroke-1" />
              <span>{item}</span>
            </li>
          ))}
        </div>
        <div className="space-y-2 flex  justify-center w-full">
          <Link
            href={paymentLink}
            className={cn(
              "w-full rounded-full flex items-center justify-center gap-2 bg-linear-to-r from-rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800 text-white border-2 py-2",
              id === "pro"
                ? "border-rose-900"
                : "border-rose-100 from-rose-400 to-rose-500"
            )}
          >
            {/* above conditional is overriding the deeper color and display lighter for basic */}
            Buy Now <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
