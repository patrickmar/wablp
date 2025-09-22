import { BenefitsSection } from "@/components/BenefitsSection";
import { ComparisonTableSection } from "@/components/ComparisonTableSection";
import { CTASection } from "@/components/CTASection";
import { FeatureGridSection } from "@/components/FeatureGridSection";
import { FeaturesHeroSection } from "@/components/FeaturesHeroSection";
import React from "react";

const Features = () => {
  return (
    <>
      <FeaturesHeroSection />
      <FeatureGridSection />
      <ComparisonTableSection />
      <BenefitsSection />
      <CTASection />
    </>
  );
};

export default Features;
