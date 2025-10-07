"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MapPin, Users, Star, ExternalLink, Filter, Grid, List } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import Link from "next/link";

const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia",
  "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium",
  "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei",
  "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Chad",
  "Chile", "China", "Colombia", "Comoros", "Costa Rica", "Croatia", "Cuba", "Cyprus",
  "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "DR Congo",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini",
  "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
  "Greece", "Grenada", "Guatemala", "Guinea", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland",
  "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon",
  "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar",
  "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico",
  "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia",
  "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea",
  "North Macedonia", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea",
  "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia",
  "Rwanda", "San Marino", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone",
  "Singapore", "Slovakia", "Slovenia", "Somalia", "South Africa", "South Korea", "South Sudan",
  "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan",
  "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia",
  "Turkey", "Turkmenistan", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
  "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
  "Yemen", "Zambia", "Zimbabwe"
];

const businesses = [
  {
    id: 1,
    name: "TechNova Solutions",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    sector: "Technology",
    location: "Lagos, Nigeria",
    description: "Leading IT solutions provider specializing in enterprise software development, digital transformation, and cloud services for businesses across West Africa.",
    employees: "150-500",
    rating: 4.9,
    verified: true,
    tags: ["Software Development", "Cloud Services", "Digital Transformation"],
    founded: "2015"
  },
  {
    id: 2,
    name: "GreenHarvest Limited",
    logo: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    sector: "Agriculture",
    location: "Accra, Ghana",
    description: "Sustainable agriculture and food processing company committed to organic farming practices and supply chain excellence.",
    employees: "50-150",
    rating: 4.8,
    verified: true,
    tags: ["Organic Farming", "Food Processing", "Supply Chain"],
    founded: "2012"
  },
  {
    id: 3,
    name: "AfricaBuild Corporation",
    logo: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    sector: "Construction",
    location: "Abidjan, Côte d'Ivoire",
    description: "Premier construction and infrastructure development company with expertise in commercial, residential, and industrial projects.",
    employees: "200-1000",
    rating: 4.7,
    verified: true,
    tags: ["Infrastructure", "Commercial Construction", "Project Management"],
    founded: "2008"
  },
  {
    id: 4,
    name: "WestPay Financial",
    logo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    sector: "Fintech",
    location: "Dakar, Senegal",
    description: "Innovative financial technology company providing digital payment solutions and banking services across West Africa.",
    employees: "50-150",
    rating: 4.6,
    verified: true,
    tags: ["Digital Payments", "Banking", "Mobile Money"],
    founded: "2018"
  },
  {
    id: 5,
    name: "EcoEnergy Solutions",
    logo: "https://images.unsplash.com/photo-1497436072909-f5e4be5b12ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    sector: "Renewable Energy",
    location: "Bamako, Mali",
    description: "Renewable energy company specializing in solar panel installation, wind energy projects, and sustainable power solutions.",
    employees: "25-50",
    rating: 4.5,
    verified: true,
    tags: ["Solar Energy", "Wind Power", "Sustainability"],
    founded: "2020"
  },
  {
    id: 6,
    name: "Maritime Logistics Ltd",
    logo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    sector: "Logistics",
    location: "Lomé, Togo",
    description: "Comprehensive logistics and supply chain management company with expertise in maritime shipping and freight forwarding.",
    employees: "100-200",
    rating: 4.4,
    verified: true,
    tags: ["Maritime Shipping", "Freight Forwarding", "Supply Chain"],
    founded: "2010"
  }
];

export function BusinessProfileCardsSection() {
  const [locationFilter, setLocationFilter] = useState("all");


  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl text-[#005A8C] mb-6">Filter Directory</h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry Sector</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Sectors" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sectors</SelectItem>
                      <SelectItem value="technology">Agribusiness and Agroprocessing</SelectItem>
                      <SelectItem value="agriculture">Mining and Extraction</SelectItem>
                      <SelectItem value="construction">Oil and Gas</SelectItem>
                      <SelectItem value="fintech">Manufacturing (automotive, aerospace, e.t.c)</SelectItem>
                      <SelectItem value="energy">Construction</SelectItem>
                      <SelectItem value="logistics">Utilities (electric power, water)</SelectItem>
                      <SelectItem value="logistics">Wholesale and Retail Trade</SelectItem>
                      <SelectItem value="logistics">Transportation and Warehousing</SelectItem>
                      <SelectItem value="logistics">Information Technology and Software</SelectItem>
                      <SelectItem value="logistics">Telecommunications</SelectItem>
                      <SelectItem value="logistics"> Financial Services (banking, insurance)</SelectItem>
                      <SelectItem value="logistics">Real Estate</SelectItem>
                      <SelectItem value="logistics">Professional, Scientific and Technical Services</SelectItem>
                      <SelectItem value="logistics">Health Care and Social Assistance</SelectItem>
                      <SelectItem value="logistics">Education</SelectItem>
                      <SelectItem value="logistics">Arts, Entertainment and Recreation</SelectItem>
                      <SelectItem value="logistics">Hospitality and Tourism</SelectItem>
                      <SelectItem value="logistics">Public Administration</SelectItem>
                      <SelectItem value="logistics">Administrative and Support Services</SelectItem>
                      <SelectItem value="logistics">Waste Management and Remediation Services</SelectItem>
                      <SelectItem value="logistics">Energy (including renewable)</SelectItem>
                      <SelectItem value="logistics">Media and Broadcasting</SelectItem>
                      <SelectItem value="logistics">Science and Technology Services</SelectItem>
                      <SelectItem value="logistics">Environmental Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Countries" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 overflow-y-auto">
                      <SelectItem value="all">All Countries</SelectItem>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {/* <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Countries" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Countries</SelectItem>
                      <SelectItem value="nigeria">Nigeria</SelectItem>
                      <SelectItem value="ghana">Ghana</SelectItem>
                      <SelectItem value="senegal">Senegal</SelectItem>
                      <SelectItem value="cote-divoire">Côte d&apos;Ivoire</SelectItem>
                      <SelectItem value="mali">Mali</SelectItem>
                      <SelectItem value="togo">Togo</SelectItem>
                    </SelectContent>
                  </Select> */}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Sizes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sizes</SelectItem>
                      <SelectItem value="startup">1-25 employees</SelectItem>
                      <SelectItem value="small">25-50 employees</SelectItem>
                      <SelectItem value="medium">50-200 employees</SelectItem>
                      <SelectItem value="large">200+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full bg-[#005A8C] text-white hover:bg-[#004a73]">
                  <Filter className="w-4 h-4 mr-2" />
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            {/* <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl text-[#005A8C]">560 Businesses Found</h2>
                <p className="text-gray-600">Showing verified business profiles</p>
              </div>
              <div className="flex items-center gap-4">
                <Select defaultValue="recent">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="name">Company Name</SelectItem>
                    <SelectItem value="size">Company Size</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex border border-gray-300 rounded-lg">
                  <Button variant="ghost" size="sm" className="border-r">
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div> */}

            {/* Business Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {businesses.map((business) => (
                <div
                  key={business.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                          <ImageWithFallback
                            src={business.logo}
                            alt={`${business.name} logo`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg text-[#005A8C] group-hover:text-[#C9A74B] transition-colors">
                              {business.name}
                            </h3>
                            {business.verified && (
                              <Badge variant="secondary" className="bg-[#C9A74B] text-white text-xs">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <p className="text-[#C9A74B] text-sm font-medium">{business.sector}</p>
                          <div className="flex items-center text-gray-500 text-sm mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            {business.location}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center justify-end mb-1">
                          <Star className="w-4 h-4 text-[#C9A74B] fill-current mr-1" />
                          <span className="text-sm font-medium">{business.rating}</span>
                        </div>
                        <div className="flex items-center text-gray-500 text-xs">
                          <Users className="w-3 h-3 mr-1" />
                          {business.employees}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {business.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {business.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-sm">
                        Founded {business.founded}
                      </span>
                      <Button
                        size="sm"
                        className="bg-[#005A8C] text-white hover:bg-[#004a73] group-hover:bg-[#C9A74B] group-hover:hover:bg-[#b8964a] transition-all"
                      >
                        <Link href="/sign-up">View Profile</Link>
                        {/* View Profile */}
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {/* <div className="flex justify-center items-center space-x-4 mt-12">
              <Button variant="outline" disabled>Previous</Button>
              <div className="flex space-x-2">
                <Button className="bg-[#005A8C] text-white">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">...</Button>
                <Button variant="outline">47</Button>
              </div>
              <Button variant="outline">Next</Button>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}