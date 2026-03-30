import React from 'react';
import { Briefcase } from 'lucide-react';

const RolesSection = ({ project, onApply }) => {
    if (!project.openRoles || project.openRoles.length === 0) return null;

    const slotsFilled = project.members?.length || 1;
    const maxSlots = project.teamSize || 4;
    const openSlotsCount = Math.max(0, maxSlots - slotsFilled);

    if (openSlotsCount === 0) {
        return null;
    }

    return (
        <div className="sketch-card p-8 rounded-2xl mb-8">
            <h2 className="text-2xl font-heading mb-6 border-b border-gray-200 pb-4 flex items-center gap-2">
                <Briefcase size={24} className="text-primary" />
                Open Roles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.openRoles.map((role, idx) => (
                    <div key={idx} className="bg-surface-container-lowest border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold font-heading text-on-surface">{role}</h3>
                                <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap">
                                    {openSlotsCount} Slot{openSlotsCount !== 1 ? 's' : ''} Open on Team
                                </span>
                            </div>

                            {project.requiredSkills && project.requiredSkills.length > 0 && (
                                <div className="mt-4 mb-6">
                                    <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Ideal Skills</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.requiredSkills.map(skill => (
                                            <span key={skill} className="px-2 py-1 bg-surface-container-low rounded-md text-xs font-medium text-on-surface">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <button 
                            className="btn btn-primary w-full mt-2 py-2"
                            onClick={() => onApply(role)}
                        >
                            Apply for Role
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RolesSection;
