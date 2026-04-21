import React from "react";
import { Zap, Palette, ShieldCheck, Headphones } from "lucide-react";

const features = [
  {
    title: "Fast Performance",
    description:
      "Optimized solutions built for speed, smooth experience, and reliable performance across devices.",
    icon: <Zap className="w-8 h-8 text-black-400" />,
  },
  {
    title: "Modern Design",
    description:
      "Beautiful, user-friendly interfaces crafted with a modern design system and clean layouts.",
    icon: <Palette className="w-8 h-8 text-black-400" />,
  },
  {
    title: "Secure Platform",
    description:
      "Strong security practices to help protect your data, users, and overall digital experience.",
    icon: <ShieldCheck className="w-8 h-8 text-black-400" />,
  },
  {
    title: "24/7 Support",
    description:
      "Dedicated assistance whenever you need help, ensuring your business keeps running smoothly.",
    icon: <Headphones className="w-8 h-8 text-black-400" />,
  },
];

export default function Features() {
  return (
    <section className="px-6 py-16 bg-base-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold">Features We Provide</h2>
          <p className="mt-3 text-base-content/70 max-w-2xl mx-auto">
            We deliver powerful solutions designed to help your business grow
            with confidence.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card bg-base-100 border border-base-300 shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="card-body items-start">
                <div className="mb-3">{feature.icon}</div>
                <h3 className="card-title">{feature.title}</h3>
                <p className="text-base-content/70">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}