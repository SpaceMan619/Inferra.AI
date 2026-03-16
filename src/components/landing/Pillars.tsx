import { Server, Brain, Scale } from "lucide-react";

const pillars = [
  {
    number: "01",
    title: "Infrastructure",
    description:
      "We track data centers, submarine cables, and power availability across the continent.",
    Icon: Server,
  },
  {
    number: "02",
    title: "Intelligence",
    description:
      "We power our platform with AI models trained on differentiated African market datasets.",
    Icon: Brain,
  },
  {
    number: "03",
    title: "Policy",
    description:
      "We monitor regulatory frameworks and investment signals across 54 nations.",
    Icon: Scale,
  },
];

export default function Pillars() {
  return (
    <section className="bg-[#fafaf8] px-6 md:px-10 py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-[1524px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
          {pillars.map((pillar) => (
            <div key={pillar.number} className="group">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[13px] font-light text-[#1a2b2c]/30 tabular-nums">
                  {pillar.number}
                </span>
                <pillar.Icon
                  size={20}
                  strokeWidth={1.5}
                  className="text-[#10b981]"
                />
              </div>

              <h3 className="text-[#1a2b2c] text-[20px] font-normal tracking-[-0.02em] mb-4">
                {pillar.title}
              </h3>

              <p className="text-[#1a2b2c]/55 text-[15px] font-light leading-[1.7] tracking-[-0.1px]">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
