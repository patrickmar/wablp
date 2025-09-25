import { CommunitySpotlightSection } from "@/components/CommunitySpotlightSection";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { KeyFeaturesSection } from "@/components/KeyFeaturesSection";
import NewsMarquee from "@/components/NewsMarquee";
import { PartnerPage } from "@/components/PartnerPage";
import { SpotlightSection2 } from "@/components/SpotlightSection2";
import { TechnologySecuritySection } from "@/components/TechnologySecuritySection";
import { Testimonial } from "@/components/Testimonial";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { VideoShowcaseSection } from "@/components/VideoShowcaseSection";
import { VideoTesti } from "@/components/VideoTesti";

export default function Home() {
  return (
    <>
              <HeroSection />
              <NewsMarquee className="my-4" speed={50} />
              <KeyFeaturesSection />
              <CommunitySpotlightSection />
              <VideoTesti />
              <VideoShowcaseSection />
              <HowItWorksSection />
              <Testimonial />
              <TestimonialsSection />
              <SpotlightSection2 />
              <TechnologySecuritySection />
              <PartnerPage />
            </>
  );
}
