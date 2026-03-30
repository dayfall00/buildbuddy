import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users } from 'lucide-react';

export default function ProjectCard({ project }) {
    const navigate = useNavigate();

    // Status text formatting
    const isRecruiting = project.status === 'active' || project.recruiting !== false;
    const statusText = isRecruiting ? 'Recruiting' : 'Closed';
    const statusClass = isRecruiting 
        ? 'bg-green-100 text-green-700 border-green-200' 
        : 'bg-gray-100 text-gray-600 border-gray-200';

    // Calculate team numbers
    const memberCount = project.members?.length || 1;
    const maxMembers = project.teamSize || 4;
    
    // Description fallback
    const description = project.shortDescription || project.description || '';
    
    // Skills
    const skillsToRender = project.requiredSkills?.length > 0 ? project.requiredSkills : project.techStack || [];

    const handleCardClick = (e) => {
        navigate(`/projects/${project.id}`);
    };

    return (
        <div 
            onClick={handleCardClick}
            className="flex flex-col bg-surface-container-lowest border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-[2px] transition-all duration-300 cursor-pointer h-full"
        >
            {/* Top row */}
            <div className="flex justify-between items-center mb-4">
                <span className={`px-3 py-1 text-xs font-bold rounded-full border tracking-wide uppercase ${statusClass}`}>
                    {statusText}
                </span>
                <div className="flex items-center gap-1.5 font-bold text-sm text-on-surface-variant bg-surface-container-low px-2 py-1 rounded-full">
                    <Users size={14} className="text-on-surface-variant" strokeWidth={2.5} />
                    <span>{memberCount}/{maxMembers}</span>
                </div>
            </div>

            {/* Title & Subtitle */}
            <div className="mb-4 flex-grow">
                <h3 className="text-xl font-bold font-heading text-on-surface mb-2 line-clamp-2 leading-tight">
                    {project.title || project.name}
                </h3>
                {description && (
                    <p className="text-on-surface-variant text-sm line-clamp-2 leading-relaxed mb-3">
                        {description}
                    </p>
                )}
                
                <p className="text-on-surface-variant text-xs font-medium">
                    <span className="opacity-70">by</span> {project.ownerName || 'Unknown'}
                </p>
            </div>

            {/* Tech Stack Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
                {skillsToRender.slice(0, 3).map(skill => (
                    <span key={skill} className="px-2 py-1 bg-surface-container-low text-on-surface-variant text-xs font-bold rounded-md uppercase tracking-wider">
                        {skill}
                    </span>
                ))}
                {skillsToRender.length > 3 && (
                    <span className="px-2 py-1 bg-surface-container-low text-on-surface-variant text-xs font-bold rounded-md">
                        +{skillsToRender.length - 3}
                    </span>
                )}
            </div>

            {/* Action */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/projects/${project.id}`);
                }}
                className="btn btn-primary w-full py-2.5 mt-auto transition-colors duration-200 justify-center"
            >
                Open Build
            </button>
        </div>
    );
}
