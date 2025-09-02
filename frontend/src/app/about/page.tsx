import { AboutHeroSection } from "@/components/AboutHeroSection";
import { OurImpactSection } from "@/components/OurImpactSection";
import { OurMissionSection } from "@/components/OurMissionSection";
import { OurStorySection } from "@/components/OurStorySection";
import { TeamMembersSection } from "@/components/TeamMembersSection";
import { VisionValuesSection } from "@/components/VisionValuesSection";
import React from "react";

const About = () => {
  return (
    <>
      <AboutHeroSection />
      <OurMissionSection />
      <VisionValuesSection />
      <OurStorySection />
      <OurImpactSection />
      <TeamMembersSection />
    </>
  );
};

export default About;
