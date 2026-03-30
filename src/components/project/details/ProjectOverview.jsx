import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users } from 'lucide-react';

const ProjectOverview = ({ project }) => {
    const timeAgo = project.createdAt ? new Date(project.createdAt.toMillis()).toLocaleDateString() : 'Recently';
    const slotsFilled = project.members?.length || 1;
    const maxSlots = project.teamSize || 4;
    const openRolesCount = Math.max(0, maxSlots - slotsFilled);
    
    return (
        <div className="sketch-card p-8 rounded-2xl mb-8">
            <h2 className="text-2xl font-heading mb-6 border-b border-gray-200 pb-4">Project Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left: About & Meta */}
                <div className="space-y-6">
                    <div>
                        <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-2">About</h3>
                        <div className="text-on-surface leading-relaxed whitespace-pre-line">
                            {project.description}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container-low border border-gray-200 flex items-center justify-center font-bold">
                            {project.ownerPhoto ? (
                                <img src={project.ownerPhoto} alt={project.ownerName} className="w-full h-full object-cover" />
                            ) : (
                                project.ownerName?.charAt(0) || 'U'
                            )}
                        </div>
                        <div>
                            <p className="text-sm text-on-surface-variant m-0">Created by</p>
                            <Link to={`/profile/${project.ownerId}`} className="font-heading font-bold text-primary hover:opacity-80 transition-opacity">
                                {project.ownerName}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right: Stats & Team Details */}
                <div className="space-y-6 md:pl-8 md:border-l md:border-gray-100">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-surface-container-low text-primary rounded-xl">
                            <Calendar size={20} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-1">Created</p>
                            <p className="font-medium text-lg text-on-surface">{timeAgo}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-surface-container-low text-primary rounded-xl">
                            <Users size={20} />
                        </div>
                        <div className="w-full">
                            <p className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-1">Team Size</p>
                            <div className="flex justify-between items-end mb-2">
                                <p className="font-medium text-lg text-on-surface">{slotsFilled} / {maxSlots} Filled</p>
                                <p className="text-sm font-bold text-primary">{openRolesCount} Openings</p>
                            </div>
                            <div className="w-full bg-surface-container-low rounded-full h-2 overflow-hidden">
                                <div
                                    className="bg-primary h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${Math.min(100, (slotsFilled / maxSlots) * 100)}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectOverview;
