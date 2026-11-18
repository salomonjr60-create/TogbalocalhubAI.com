import React from 'react';
import '../styles/RecentProjects.css';

interface Project {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'completed' | 'pending';
  date: string;
  progress: number;
  isDemoData?: boolean;
}

interface RecentProjectsProps {
  projects: Project[];
}

const RecentProjects: React.FC<RecentProjectsProps> = ({ projects }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#10b981';
      case 'completed':
        return '#3b82f6';
      case 'pending':
        return '#f59e0b';
      default:
        return '#94a3b8';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Blog Post':
        return '📝';
      case 'Social Campaign':
        return '📱';
      case 'Email Campaign':
        return '✉️';
      case 'Video':
        return '🎥';
      default:
        return '📄';
    }
  };

  return (
    <div className="recent-projects">
      <div className="section-header">
        <h2>Recent Projects</h2>
        <span className="demo-badge">📊 Demo Data</span>
      </div>

      <div className="projects-list">
        {projects.map((project) => (
          <div key={project.id} className="project-item">
            <div className="project-info">
              <div className="project-icon">{getTypeIcon(project.type)}</div>
              <div className="project-details">
                <h3 className="project-name">{project.name}</h3>
                <p className="project-type">{project.type}</p>
              </div>
            </div>

            <div className="project-progress">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
              <span className="progress-text">{project.progress}%</span>
            </div>

            <div className="project-meta">
              <span
                className="status-badge"
                style={{ backgroundColor: `${getStatusColor(project.status)}20`, color: getStatusColor(project.status) }}
              >
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </span>
              <span className="project-date">{project.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;
