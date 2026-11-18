import React from 'react';
import '../styles/RecentActivity.css';

interface Activity {
  id: string;
  action: string;
  description: string;
  time: string;
  icon: string;
  isDemoData?: boolean;
}

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  return (
    <div className="recent-activity">
      <div className="section-header">
        <h2>Recent Activity</h2>
        <span className="demo-badge">📋 Demo Data</span>
      </div>

      <div className="activity-list">
        {activities.map((activity) => (
          <div key={activity.id} className="activity-item">
            <div className="activity-icon">{activity.icon}</div>
            <div className="activity-content">
              <h3 className="activity-action">{activity.action}</h3>
              <p className="activity-description">{activity.description}</p>
            </div>
            <div className="activity-time">{activity.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
