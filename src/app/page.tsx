import { CommunitySpotlightSection } from "@/components/CommunitySpotlightSection";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { KeyFeaturesSection } from "@/components/KeyFeaturesSection";
import { SpotlightSection2 } from "@/components/SpotlightSection2";
import { TechnologySecuritySection } from "@/components/TechnologySecuritySection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { VideoShowcaseSection } from "@/components/VideoShowcaseSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <KeyFeaturesSection />
      <CommunitySpotlightSection />
      <VideoShowcaseSection />
      <SpotlightSection2 />
      <HowItWorksSection />
      <TechnologySecuritySection />
      <TestimonialsSection />
    </>
  );
}
