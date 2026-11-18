import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import OverviewCards from './components/OverviewCards';
import RecentProjects from './components/RecentProjects';
import QuickAccessTools from './components/QuickAccessTools';
import RecentActivity from './components/RecentActivity';
import AIContentStudio from './components/AIContentStudio';
import './styles/App.css';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sample data for overview cards
  const overviewCards = [
    {
      title: 'Active Campaigns',
      value: '12',
      change: 15,
      icon: '📢',
      trend: 'up' as const,
      isDemoData: true,
    },
    {
      title: 'Content Generated',
      value: '248',
      change: 32,
      icon: '✍️',
      trend: 'up' as const,
      isDemoData: true,
    },
    {
      title: 'Leads Generated',
      value: '1,842',
      change: 8,
      icon: '🎯',
      trend: 'up' as const,
      isDemoData: true,
    },
    {
      title: 'Campaign Performance',
      value: '87%',
      change: -5,
      icon: '📈',
      trend: 'down' as const,
      isDemoData: true,
    },
  ];

  // Sample data for recent projects
  const recentProjects = [
    {
      id: '1',
      name: 'Summer Product Launch',
      type: 'Social Campaign',
      status: 'active' as const,
      date: 'Dec 15, 2024',
      progress: 65,
      isDemoData: true,
    },
    {
      id: '2',
      name: 'Monthly Newsletter - December',
      type: 'Email Campaign',
      status: 'active' as const,
      date: 'Dec 10, 2024',
      progress: 85,
      isDemoData: true,
    },
    {
      id: '3',
      name: 'Blog Post: AI Marketing Trends',
      type: 'Blog Post',
      status: 'completed' as const,
      date: 'Dec 8, 2024',
      progress: 100,
      isDemoData: true,
    },
  ];

  // Quick access tools - Featured AI Tools
  const quickAccessTools = [
    {
      id: 'content',
      name: 'AI Content Studio',
      description: 'Generate engaging content',
      icon: '✍️',
      color: '#3b82f6',
    },
    {
      id: 'google-ads',
      name: 'Google Ads Assistant',
      description: 'Optimize Google campaigns',
      icon: '🔍',
      color: '#ea4335',
    },
    {
      id: 'meta-ads',
      name: 'Meta Ads Assistant',
      description: 'Manage Meta campaigns',
      icon: '👥',
      color: '#1877f2',
    },
    {
      id: 'seo',
      name: 'SEO Assistant',
      description: 'Improve search rankings',
      icon: '🚀',
      color: '#10b981',
    },
    {
      id: 'email',
      name: 'Email Marketing',
      description: 'Create email campaigns',
      icon: '✉️',
      color: '#f59e0b',
    },
    {
      id: 'image',
      name: 'AI Image Studio',
      description: 'Generate AI images',
      icon: '🎨',
      color: '#8b5cf6',
    },
  ];

  // Recent activity data
  const recentActivity = [
    {
      id: '1',
      action: 'Campaign Created',
      description: 'New social media campaign launched',
      time: '2 hours ago',
      icon: '📢',
      isDemoData: true,
    },
    {
      id: '2',
      action: 'Content Generated',
      description: '5 new blog post ideas created',
      time: '4 hours ago',
      icon: '✍️',
      isDemoData: true,
    },
    {
      id: '3',
      action: 'Report Generated',
      description: 'Weekly performance report ready',
      time: '1 day ago',
      icon: '📊',
      isDemoData: true,
    },
    {
      id: '4',
      action: 'Team Invited',
      description: 'New team member added to project',
      time: '2 days ago',
      icon: '👤',
      isDemoData: true,
    },
  ];

  return (
    <div className="app-layout">
      <Sidebar 
        activeSection={activeSection} 
        onNavigate={setActiveSection}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={setIsMobileMenuOpen}
      />
      <div className="app-container">
        <Header 
          userName="User" 
          userRole="Digital Marketer"
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          activeSection={activeSection}
        />
        <div className="main-content">
          {activeSection === 'ai-content' ? (
            <AIContentStudio 
              onNavigateToDashboard={() => setActiveSection('dashboard')}
            />
          ) : (
            <>
              <OverviewCards cards={overviewCards} />
              <QuickAccessTools tools={quickAccessTools} />
              <RecentProjects projects={recentProjects} />
              <RecentActivity activities={recentActivity} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
