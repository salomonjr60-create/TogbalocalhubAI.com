import React, { useState } from 'react';
import '../styles/Sidebar.css';

interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  isMobileMenuOpen?: boolean;
  onMobileMenuToggle?: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onNavigate, isMobileMenuOpen = false, onMobileMenuToggle }) => {
  const [isOpen, setIsOpen] = useState(true);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'ai-content', label: 'AI Content Studio', icon: '✍️' },
    { id: 'social-media', label: 'Social Media Marketing', icon: '📱' },
    { id: 'google-ads', label: 'Google Ads Assistant', icon: '🔍' },
    { id: 'meta-ads', label: 'Meta Ads Assistant', icon: '👥' },
    { id: 'seo', label: 'SEO Assistant', icon: '🚀' },
    { id: 'email', label: 'Email Marketing', icon: '✉️' },
    { id: 'strategy', label: 'Marketing Strategy', icon: '🎯' },
    { id: 'image', label: 'AI Image Studio', icon: '🎨' },
    { id: 'planner', label: 'Campaign Planner', icon: '📅' },
    { id: 'analytics', label: 'Analytics & Reports', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const handleNavigate = (id: string) => {
    onNavigate(id);
    // Close mobile menu after navigation
    if (isMobileMenuOpen && onMobileMenuToggle) {
      onMobileMenuToggle(false);
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="sidebar-overlay visible" 
          onClick={() => onMobileMenuToggle && onMobileMenuToggle(false)}
        ></div>
      )}
      
      <aside className={`sidebar ${isOpen ? 'open' : 'collapsed'} ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        {/* Logo Section */}
        <div className="sidebar-logo">
          <div className="logo-container">
            <span className="logo-icon">🤖</span>
            {isOpen && (
              <>
                <span className="logo-text">Togba Hub</span>
                <span className="logo-subtext">AI</span>
              </>
            )}
          </div>
          <button
            className="toggle-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle sidebar"
          >
            {isOpen ? '‹' : '›'}
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => handleNavigate(item.id)}
              title={!isOpen ? item.label : ''}
            >
              <span className="nav-icon">{item.icon}</span>
              {isOpen && <span className="nav-label">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          {isOpen && (
            <div className="footer-text">
              <p>Your AI-Powered Digital Marketing Assistant</p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
