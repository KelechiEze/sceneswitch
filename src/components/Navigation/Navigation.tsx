import { useState } from 'react';
import { Menu, X, Video, Upload, Download, Home } from 'lucide-react';
import './Navigation.css';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Navigation = ({ currentPage, onNavigate }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'upload', label: 'Upload', icon: Upload },
    { id: 'preview', label: 'Preview', icon: Video },
    { id: 'export', label: 'Export', icon: Download },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo" onClick={() => handleNavigation('home')}>
          <Video className="logo-icon" />
          <span className="logo-text">SceneSwitch</span>
        </div>

        {/* Desktop Navigation */}
        <div className="nav-links-desktop">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                className={`nav-link ${currentPage === item.id ? 'nav-link-active' : ''}`}
                onClick={() => handleNavigation(item.id)}
              >
                <IconComponent className="nav-icon" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {isMenuOpen ? <X className="menu-icon" /> : <Menu className="menu-icon" />}
        </button>

        {/* Mobile Navigation */}
        <div className={`nav-mobile ${isMenuOpen ? 'nav-mobile-open' : ''}`}>
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                className={`nav-link-mobile ${currentPage === item.id ? 'nav-link-mobile-active' : ''}`}
                onClick={() => handleNavigation(item.id)}
              >
                <IconComponent className="nav-icon" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMenuOpen && <div className="mobile-overlay" onClick={toggleMenu}></div>}
    </nav>
  );
};

export default Navigation;