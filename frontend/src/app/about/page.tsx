import { AboutHeroSection } from "@/components/AboutHeroSection";
import { Difference } from "@/components/Difference";
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
      <Difference />
      <TeamMembersSection />
      <OurImpactSection />
    </>
  );
};

export default About;
