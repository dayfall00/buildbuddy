import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';

const ProjectHeader = ({ project, isOwner, isMember, onApply, hasApplied }) => {
    const statusText = project.recruiting ? 'Open' : 'Closed';
    const statusClass = project.recruiting ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-600 border border-gray-200';

    return (
        <div className="sketch-card flex flex-col md:flex-row justify-between items-start gap-6 p-8 rounded-2xl mb-8">
            <div className="flex-1 w-full">
                <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${statusClass}`}>
                        {statusText}
                    </span>
                    {project.category && (
                        <span className="tag-ethereal capitalize">{project.category}</span>
                    )}
                </div>
                
                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-3">{project.title}</h1>
                <p className="text-xl text-on-surface-variant mb-5 leading-relaxed">{project.shortDescription}</p>
                
                <div className="flex flex-wrap gap-2">
                    {project.tags?.map((tag, idx) => (
                        <span key={idx} className="text-sm font-medium text-primary opacity-80">#{tag}</span>
                    ))}
                </div>
            </div>

            <div className="w-full md:w-auto flex-shrink-0 flex flex-col gap-3 min-w-[160px]">
                {isOwner ? (
                    <button className="btn btn-secondary w-full" onClick={() => alert('Edit feature coming soon')}>
                        Edit Project
                    </button>
                ) : isMember ? (
                    <div className="text-center px-4 py-3 bg-surface-container-low rounded-xl font-bold text-on-surface">
                        Team Member
                    </div>
                ) : hasApplied ? (
                    <div className="text-center px-4 py-3 bg-orange-100 text-primary-container rounded-xl font-bold">
                        Requested
                    </div>
                ) : !project.recruiting ? (
                    <div className="text-center px-4 py-3 bg-surface-container-low rounded-xl font-bold text-on-surface-variant opacity-70">
                        Closed
                    </div>
                ) : (
                    <button className="btn btn-primary w-full" onClick={onApply}>
                        Join Project
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProjectHeader;
