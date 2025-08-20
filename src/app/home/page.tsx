import { CommunitySpotlightSection } from "@/components/CommunitySpotlightSection";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { KeyFeaturesSection } from "@/components/KeyFeaturesSection";
import { TechnologySecuritySection } from "@/components/TechnologySecuritySection";
import { TestimonialsSection } from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <KeyFeaturesSection />
      <CommunitySpotlightSection />
      <HowItWorksSection />
      <TechnologySecuritySection />
      <TestimonialsSection />
    </>
  );
}
