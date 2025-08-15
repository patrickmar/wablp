import { FAQSection } from "@/components/FAQSection";
import { JoinBusinessHeroSection } from "@/components/JoinBusinessHeroSection";
import { MembershipTiersSection } from "@/components/MembershipTiersSection";
import { SignupFormSection } from "@/components/SignupFormSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { WhyJoinSection } from "@/components/WhyJoinSection";

const Join = () => {
  return (
    <>
      <JoinBusinessHeroSection />
            <WhyJoinSection />
            <MembershipTiersSection />
            <TestimonialsSection />
            <SignupFormSection />
            <FAQSection />
    </>
  );
};

export default Join;