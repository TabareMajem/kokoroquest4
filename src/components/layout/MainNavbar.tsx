import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import LanguageSwitch from '../LanguageSwitch';
import { useLanguage } from '../../contexts/LanguageContext';

export default function MainNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleDemoClick = () => {
    navigate('/demo');
  };

  const handleGetStarted = () => {
    navigate('/register');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-purple-600">
            Kokoro Quest
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/science" className="text-gray-600 hover:text-purple-600 transition-colors">
              {t('nav.science')}
            </Link>
            <Link to="/use-cases" className="text-gray-600 hover:text-purple-600 transition-colors">
              {t('nav.success')}
            </Link>
            <Link to="/pricing" className="text-gray-600 hover:text-purple-600 transition-colors">
              {t('nav.pricing')}
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-purple-600 transition-colors">
              {t('nav.contact')}
            </Link>
            <LanguageSwitch />
            <button
              onClick={handleDemoClick}
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              {t('nav.seeDemo')}
            </button>
            <button
              onClick={handleGetStarted}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              {t('nav.getStarted')}
            </button>
          </div>
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
      {/* Mobile menu panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/science"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.science')}
            </Link>
            <Link
              to="/use-cases"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.success')}
            </Link>
            <Link
              to="/pricing"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.pricing')}
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.contact')}
            </Link>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleDemoClick();
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              {t('nav.seeDemo')}
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleGetStarted();
              }}
              className="block w-full px-3 py-2 rounded-md text-base font-medium bg-purple-600 text-white hover:bg-purple-700"
            >
              {t('nav.getStarted')}
            </button>
            <div className="px-3 py-2">
              <LanguageSwitch />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}