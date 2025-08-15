"use client";
import { Button } from "./ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navigationItems = [
    { label: "Home", href: "#", hasDropdown: false },
    { label: "About Us", href: "/about", hasDropdown: false },
    { label: "Features", href: "/features", hasDropdown: false },
    {
      label: "Services",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { label: "Join as a Business", href: "/join" },
        { label: "Opportunities & Tenders", href: "/opportunity" },
        { label: "Community Directory", href: "/community" },
      ],
    },
    { label: "Resources", href: "/resources", hasDropdown: false },
    { label: "Contact", href: "/contact", hasDropdown: false },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#005A8C] to-[#C9A74B] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">W</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[#005A8C]">WABLP</h1>
                  <p className="text-xs text-gray-600 hidden sm:block">
                    West Africa Business Linkages
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  item.hasDropdown && setActiveDropdown(item.label)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={item.href}
                  className="text-gray-700 hover:text-[#005A8C] px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center"
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown className="w-4 h-4 ml-1" />}
                </a>

                {/* Dropdown Menu */}
                {item.hasDropdown && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                    {item.dropdownItems?.map((dropdownItem) => (
                      <a
                        key={dropdownItem.label}
                        href={dropdownItem.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#005A8C] transition-colors"
                      >
                        {dropdownItem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              className="border-[#005A8C] text-[#005A8C] hover:bg-[#005A8C] hover:text-white"
            >
              Sign In
            </Button>
            <Button className="bg-[#C9A74B] text-white hover:bg-[#b8964a] shadow-lg">
              Join Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-[#005A8C] p-2"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <div key={item.label}>
                  <a
                    href={item.href}
                    className="block text-gray-700 hover:text-[#005A8C] px-3 py-2 text-base font-medium"
                  >
                    {item.label}
                  </a>
                  {item.hasDropdown &&
                    item.dropdownItems?.map((dropdownItem) => (
                      <a
                        key={dropdownItem.label}
                        href={dropdownItem.href}
                        className="block text-gray-600 hover:text-[#005A8C] px-6 py-2 text-sm"
                      >
                        {dropdownItem.label}
                      </a>
                    ))}
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
              <Button
                variant="outline"
                className="w-full border-[#005A8C] text-[#005A8C] hover:bg-[#005A8C] hover:text-white"
              >
                Sign In
              </Button>
              <Button className="w-full bg-[#C9A74B] text-white hover:bg-[#b8964a]">
                Join Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
