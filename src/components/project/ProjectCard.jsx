import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Clock } from 'lucide-react';

const ProjectCard = ({ project }) => {
    // Format the firestore timestamp loosely
    const timeAgo = project.createdAt ? new Date(project.createdAt.toMillis()).toLocaleDateString() : 'Just now';

    return (
        <div className="sketch-card project-card">
            <div className="project-card-header">
                <h3 className="project-title">{project.title}</h3>
                <span className="project-date"><Clock size={14} /> {timeAgo}</span>
            </div>

            <p className="project-owner">
                Posted by <span className="handwriting">{project.ownerName}</span>
            </p>

            <p className="project-desc">{project.description}</p>

            <div className="project-tags">
                {project.tags && project.tags.map(tag => (
                    <span key={tag} className="tag tag-sketch">#{tag}</span>
                ))}
            </div>

            <div className="project-card-footer mt-4">
                <div className="project-members">
                    <Users size={16} />
                    <span>{project.members?.length || 1} / {project.maxMembers || '?'} Members</span>
                </div>

                <Link to={`/projects/${project.id}`} className="btn btn-sm btn-secondary">
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default ProjectCard;
