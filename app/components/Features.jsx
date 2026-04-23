import React from "react";
import { Handshake, Tags, ShieldCheck, Database } from "lucide-react";

const features = [
  {
    title: "Collaborative Annotation at Scale",
    description:
      "Enable multiple annotators to work on shared datasets in real time. Assign projects, track contributions, and manage labeling workflows efficiently across teams.",
    icon: <Handshake className="w-8 h-8 text-black-400" />,
  },
  {
    title: "Structured Labeling & Rules Engine",
    description:
      "Define custom label categories and enforce annotation guidelines. Ensure consistency and high-quality datasets with rule-based validation and clear instructions.",
    icon: <Tags className="w-8 h-8 text-black-400" />,
  },
  {
    title: "Quality Control & Disagreement Analysis",
    description:
      "Monitor annotations per image, detect conflicts between annotators, and analyze disagreements to improve dataset reliability and model performance.",
    icon: <ShieldCheck className="w-8 h-8 text-black-400" />,
  },
  {
    title: "Export-Ready AI Datasets",
    description:
      "Seamlessly export annotated data in structured formats for machine learning pipelines, enabling faster experimentation and deployment of AI models.",
    icon: <Database className="w-8 h-8 text-black-400" />,
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