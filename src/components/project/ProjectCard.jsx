import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users } from 'lucide-react';
import './ProjectCard.css';

export default function ProjectCard({ project }) {
    const navigate = useNavigate();

    // Status text formatting
    const isRecruiting = project.status === 'active' || project.recruiting !== false;
    const statusText = isRecruiting ? 'RECRUITING' : 'CLOSED';

    // Calculate team numbers
    const memberCount = project.members?.length || 1;
    const maxMembers = project.teamSize || 4;

    return (
        <div className="project-card-new">
            {/* Top row */}
            <div className="flex justify-between items-start mb-4">
                <span className={isRecruiting ? 'badge-recruiting' : 'badge-closed'}>
                    {statusText}
                </span>
                <div className="flex items-center gap-1 font-bold text-sm text-primary-ink">
                    <Users size={16} className="text-primary-ink" style={{ strokeWidth: 2.5 }} />
                    <span>{memberCount}/{maxMembers}</span>
                </div>
            </div>

            {/* Title & Subtitle */}
            <div className="mb-4 grow">
                <h3 className="text-2xl font-black text-primary-ink mb-1 line-clamp-2 leading-tight">
                    {project.title}
                </h3>
                <p className="text-gray-500 font-medium italic text-sm truncate">
                    {project.category || 'project'} • by {project.ownerName || 'Unknown'}
                </p>
            </div>

            {/* Tech Stack Tags */}
            <div className="flex flex-wrap gap-2 mb-2 h-[50px] overflow-hidden">
                {project.techStack?.slice(0, 3).map(tech => (
                    <span key={tech} className="tech-tag-sharp">
                        {tech}
                    </span>
                ))}
                {project.techStack?.length > 3 && (
                    <span className="tech-tag-sharp">
                        +{project.techStack.length - 3}
                    </span>
                )}
            </div>

            {/* Action */}
            <button
                onClick={() => navigate(`/projects/${project.id}`)}
                className="btn-sketch-action mt-4"
            >
                OPEN BUILD
            </button>
        </div>
    );
}
