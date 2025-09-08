import { ListingSection } from "@/components/ListingSection";
import { OpportunitiesHeroSection } from "@/components/OpportunitiesHeroSection";

const Opportunity = () => {
  return (
    <>
      <OpportunitiesHeroSection />
      <ListingSection />
            {/* Placeholder for opportunity cards and filters */}
            {/* <div className="py-20 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl text-[#005A8C] mb-4">Opportunity Listings</h2>
                <p className="text-gray-600 mb-8">Advanced search and filtering functionality would be implemented here</p>
                <div className="bg-white rounded-xl shadow-lg p-12">
                  <p className="text-lg text-gray-500">
                    Interactive opportunity cards, advanced filters, and pagination would be displayed in this section.
                  </p>
                </div>
              </div>
            </div> */}
    </>
  );
};

export default Opportunity;