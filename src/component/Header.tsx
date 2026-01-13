import React, { useState } from "react";
import {
  MenuOutlined,
  CloseOutlined,
  DashboardOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = (page: string) => {
    console.log(`Navigating to: ${page}`);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="#"
              className="flex items-center space-x-2"
              onClick={() => handleNavClick("home")}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span className="text-xl font-bold text-gray-800">Logo</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to={"dashboard"}
              onClick={() => handleNavClick("dashboard")}
              className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 font-medium transition-colors"
            >
              <DashboardOutlined className="text-lg" />
              <span>Dashboard</span>
            </Link>
            <Link
              to={"profile"}
              onClick={() => handleNavClick("profile")}
              className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 font-medium transition-colors"
            >
              <UserOutlined className="text-lg" />
              <span>Profile</span>
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to={"login"}>
              <button
                onClick={() => handleNavClick("signin")}
                className="px-5 py-2 text-purple-600 font-semibold hover:text-purple-700 transition-colors"
              >
                Sign In
              </button>
            </Link>

            <button
              onClick={() => handleNavClick("signup")}
              className="px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? (
              <CloseOutlined className="text-2xl" />
            ) : (
              <MenuOutlined className="text-2xl" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <a
                href="#"
                onClick={() => handleNavClick("dashboard")}
                className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg font-medium transition-colors"
              >
                <DashboardOutlined className="text-xl" />
                <span>Dashboard</span>
              </a>
              <a
                href="#"
                onClick={() => handleNavClick("profile")}
                className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg font-medium transition-colors"
              >
                <UserOutlined className="text-xl" />
                <span>Profile</span>
              </a>
              <div className="pt-4 space-y-3 border-t border-gray-200">
                <button
                  onClick={() => handleNavClick("signin")}
                  className="w-full px-4 py-2 text-purple-600 font-semibold border-2 border-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleNavClick("signup")}
                  className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-md"
                >
                  Sign Up
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </header>
  );
};

export default Header;
