import { Users, Globe, Network, Shield } from "lucide-react";
import { Button } from "./ui/button"; // ✅ Import your button component

const features = [
  {
    icon: Users,
    title: "Supplier Diversity",
    description: "The West African economy is heavily reliant on small, medium, and micro enterprises (SMMEs), which form its backbone. The WABLP platform is designed to facilitate connections between large corporations and a wide range of these SMMEs, including those in different geographical locations. By helping to integrate these businesses into formal supply chains, the platform plays vital role in local economic development and address a core challenge of supplier development across the region.",
    link: "/sign-up"
  },
  {
    icon: Globe,
    title: "Market Access",
    description: "This platform provides critical solution to challenges by creating a single, comprehensive hub for businesses to expand their reach. By leveraging its digital infrastructure, the platform can help businesses access new markets and align with broader regional trade initiatives, such as the African Continental Free Trade Area (AfCFTA). This enables seamless cross-border trade, which is a significant untapped opportunity in the region.   ",
    link: "/sign-up"
  },
  {
    icon: Network,
    title: "Business Networking",
    description: "The West African tech and business ecosystems thrive on a culture of strong collaboration and community, where founders and entrepreneurs often co-invest in each other's ventures. Engaging network allows participants to tap into a broader ecosystem of stakeholders, investors, and innovators, which can enhance their visibility and reputation as a leader in their industry.",
    link: "/sign-up"
  },
  {
    icon: Shield,
    title: "Secure Transactions",
    description: "Trust is a fundamental element in West African commerce, particularly for the large unbanked population. This platform prioritizes this by employing secure, encrypted data transmission. In addition, modern fintech solutions can be integrated to further build trust and security.  This focus on a transparent, secure, and reliable environment is essential for a business that aims to serve as a key part of the region's digital public infrastructure.",
    link: "/sign-up"
  }
];

export function KeyFeaturesSection() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-[#005A8C] mb-4">
            Everything You Need to Grow
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful tools and features designed specifically for West African businesses
          </p>
        </div>
        
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center group hover:-translate-y-2 transition-all duration-300 p-6 rounded-2xl"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#005A8C] to-[#0066a3] text-white rounded-2xl mb-6 group-hover:shadow-xl transition-shadow duration-300">
                <feature.icon className="w-10 h-10" />
              </div>
              <h3 className="text-xl text-[#005A8C] mb-4 group-hover:text-[#C9A74B] transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {feature.description}
              </p>

              {/* Learn More Button */}
              <Button
                asChild
                variant="outline"
                className="text-[#005A8C] border-[#005A8C] hover:bg-[#005A8C] hover:text-white"
              >
                <a href={feature.link}>Learn More</a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}




// import { Users, Globe, Network, Shield } from "lucide-react";

// const features = [
//   {
//     icon: Users,
//     title: "Supplier Diversity",
//     description: "Connect with certified diverse suppliers and promote inclusive business practices across West Africa."
//   },
//   {
//     icon: Globe,
//     title: "Market Access",
//     description: "Expand your reach across regional and international markets with our comprehensive platform."
//   },
//   {
//     icon: Network,
//     title: "Business Networking",
//     description: "Build meaningful relationships with verified businesses through intelligent matching."
//   },
//   {
//     icon: Shield,
//     title: "Secure Transactions",
//     description: "Conduct business safely with encrypted communication and verified member profiles."
//   }
// ];

// export function KeyFeaturesSection() {
//   return (
//     <section className="py-20 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl text-[#005A8C] mb-4">
//             Everything You Need to Grow
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Powerful tools and features designed specifically for West African businesses
//           </p>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {features.map((feature, index) => (
//             <div 
//               key={index}
//               className="text-center group hover:-translate-y-2 transition-all duration-300"
//             >
//               <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#005A8C] to-[#0066a3] text-white rounded-2xl mb-6 group-hover:shadow-xl transition-shadow duration-300">
//                 <feature.icon className="w-10 h-10" />
//               </div>
//               <h3 className="text-xl text-[#005A8C] mb-4 group-hover:text-[#C9A74B] transition-colors">
//                 {feature.title}
//               </h3>
//               <p className="text-gray-600 leading-relaxed">
//                 {feature.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }