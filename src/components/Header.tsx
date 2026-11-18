import React from 'react';
import '../styles/Header.css';

interface HeaderProps {
  userName?: string;
  userRole?: string;
  onMobileMenuToggle?: () => void;
  activeSection?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  userName = 'User', 
  userRole = 'Digital Marketer',
  onMobileMenuToggle,
  activeSection = 'dashboard',
}) => {
  // Map section IDs to display titles
  const getTitleForSection = () => {
    const sectionTitles: Record<string, string> = {
      'dashboard': 'Togba Local Hub AI',
      'ai-content': 'AI Content Studio',
      'ai-social': 'Social Media Marketing',
      'ai-google': 'Google Ads Assistant',
      'ai-meta': 'Meta Ads Assistant',
      'ai-seo': 'SEO Assistant',
      'ai-email': 'Email Marketing',
      'ai-marketing': 'Marketing Strategy',
      'ai-image': 'AI Image Studio',
      'campaign': 'Campaign Planner',
      'analytics': 'Analytics & Reports',
      'settings': 'Settings',
    };
    return sectionTitles[activeSection] || 'Togba Local Hub AI';
  };

  const getSubtitleForSection = () => {
    const sectionSubtitles: Record<string, string> = {
      'dashboard': 'Welcome to your marketing command center',
      'ai-content': 'Create professional marketing content powered by AI',
      'ai-social': 'Manage your social media presence',
      'ai-google': 'Optimize your Google Ads campaigns',
      'ai-meta': 'Manage your Meta advertising',
      'ai-seo': 'Improve your search rankings',
      'ai-email': 'Create engaging email campaigns',
      'ai-marketing': 'Plan your marketing strategy',
      'ai-image': 'Generate AI-powered images',
      'campaign': 'Plan and manage campaigns',
      'analytics': 'View your performance metrics',
      'settings': 'Configure your preferences',
    };
    return sectionSubtitles[activeSection] || 'Welcome to your marketing command center';
  };
  return (
    <header className="header">
      <div className="header-left">
        <div className="header-top">
          <button 
            className="mobile-menu-toggle" 
            onClick={onMobileMenuToggle}
            aria-label="Toggle navigation menu"
          >
            ☰
          </button>
          <div className="header-branding">
            <h1 className="page-title">{getTitleForSection()}</h1>
            {activeSection === 'dashboard' && (
              <p className="page-tagline">Your AI-Powered Digital Marketing Assistant</p>
            )}
          </div>
        </div>
        <p className="page-subtitle">{getSubtitleForSection()}</p>
      </div>

      <div className="header-right">
        {/* Quick Actions */}
        <div className="quick-actions">
          <button className="action-btn" title="Notifications">
            🔔
            <span className="notification-badge">3</span>
          </button>
          <button className="action-btn" title="Messages">
            💬
          </button>
        </div>

        {/* User Profile */}
        <div className="user-profile">
          <div className="profile-avatar">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="profile-info">
            <p className="profile-name">{userName}</p>
            <p className="profile-role">{userRole}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
