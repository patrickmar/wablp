import { Check, X } from "lucide-react";

const comparisonData = [
  {
    feature: "West Africa Focus",
    wablp: true,
    competitor1: false,
    competitor2: false
  },
  {
    feature: "Supplier Diversity Programs",
    wablp: true,
    competitor1: true,
    competitor2: false
  },
  {
    feature: "Local Language Support",
    wablp: true,
    competitor1: false,
    competitor2: false
  },
  {
    feature: "Regional Compliance Tools",
    wablp: true,
    competitor1: false,
    competitor2: true
  },
  {
    feature: "Verified Business Profiles",
    wablp: true,
    competitor1: true,
    competitor2: true
  },
  {
    feature: "Advanced Analytics Dashboard",
    wablp: true,
    competitor1: true,
    competitor2: false
  },
  {
    feature: "Mobile-First Design",
    wablp: true,
    competitor1: false,
    competitor2: true
  },
  {
    feature: "24/7 Local Support",
    wablp: true,
    competitor1: false,
    competitor2: false
  },
  {
    feature: "Sustainability Tracking",
    wablp: true,
    competitor1: false,
    competitor2: false
  },
  {
    feature: "Integrated Payment Solutions",
    wablp: true,
    competitor1: true,
    competitor2: false
  }
];

export function ComparisonTableSection() {
  return (
    <section className="py-20 bg-[#003366]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-white mb-4">
            Why Choose WABLP?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Compare our comprehensive platform with other business networking solutions
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-lg font-medium text-[#003366]">
                    Features
                  </th>
                  <th className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-[#FFD700] text-[#003366] rounded-full flex items-center justify-center mb-2">
                        <span className="font-bold">W</span>
                      </div>
                      <span className="text-lg font-medium text-[#003366]">WABLP</span>
                    </div>
                  </th>
                  {/* <th className="px-6 py-4 text-center text-lg font-medium text-gray-600">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center mb-2">
                        <span className="font-bold">A</span>
                      </div>
                      <span>Competitor A</span>
                    </div>
                  </th> */}
                  {/* <th className="px-6 py-4 text-center text-lg font-medium text-gray-600">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center mb-2">
                        <span className="font-bold">B</span>
                      </div>
                      <span>Competitor B</span>
                    </div>
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 text-gray-700 font-medium">
                      {row.feature}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.wablp ? (
                        <div className="inline-flex items-center justify-center w-8 h-8 bg-[#FFD700] text-[#003366] rounded-full">
                          <Check className="w-5 h-5" />
                        </div>
                      ) : (
                        <div className="inline-flex items-center justify-center w-8 h-8 bg-gray-200 text-gray-400 rounded-full">
                          <X className="w-5 h-5" />
                        </div>
                      )}
                    </td>
                    {/* <td className="px-6 py-4 text-center">
                      {row.competitor1 ? (
                        <div className="inline-flex items-center justify-center w-8 h-8 bg-green-100 text-green-600 rounded-full">
                          <Check className="w-5 h-5" />
                        </div>
                      ) : (
                        <div className="inline-flex items-center justify-center w-8 h-8 bg-gray-200 text-gray-400 rounded-full">
                          <X className="w-5 h-5" />
                        </div>
                      )}
                    </td> */}
                    {/* <td className="px-6 py-4 text-center">
                      {row.competitor2 ? (
                        <div className="inline-flex items-center justify-center w-8 h-8 bg-green-100 text-green-600 rounded-full">
                          <Check className="w-5 h-5" />
                        </div>
                      ) : (
                        <div className="inline-flex items-center justify-center w-8 h-8 bg-gray-200 text-gray-400 rounded-full">
                          <X className="w-5 h-5" />
                        </div>
                      )}
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}