import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserById } from '../../../services/userService';

const TeamSection = ({ project }) => {
    const [teamDetails, setTeamDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTeam() {
            if (!project.members || project.members.length === 0) {
                setLoading(false);
                return;
            }
            try {
                // Fetch details for each member UID
                const promises = project.members.map(uid => getUserById(uid));
                const results = await Promise.all(promises);
                
                // Sort owner to the top
                const sorted = results.sort((a, b) => {
                    if (a.uid === project.ownerId) return -1;
                    if (b.uid === project.ownerId) return 1;
                    return 0;
                });
                
                setTeamDetails(sorted);
            } catch (err) {
                console.error("Failed to load team members", err);
            } finally {
                setLoading(false);
            }
        }
        fetchTeam();
    }, [project.members, project.ownerId]);

    return (
        <div className="sketch-card p-8 rounded-2xl mb-8">
            <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
                <h2 className="text-2xl font-heading">Meet the Team</h2>
                <span className="text-sm font-bold bg-surface-container-low px-3 py-1 rounded-full text-primary">
                    {project.members?.length || 1} / {project.teamSize || 4}
                </span>
            </div>

            {loading ? (
                <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-full bg-surface-container-low animate-pulse"></div>
                    <div className="w-16 h-16 rounded-full bg-surface-container-low animate-pulse"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {teamDetails.map(member => (
                        <Link 
                            key={member.uid} 
                            to={`/profile/${member.uid}`}
                            className="flex items-center gap-4 p-4 rounded-xl bg-surface-container-lowest border border-gray-100 hover:bg-surface-container-low transition-colors group"
                        >
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container-low border border-gray-200 flex items-center justify-center font-bold flex-shrink-0 group-hover:border-primary transition-colors">
                                {member.photoURL ? (
                                    <img src={member.photoURL} alt={member.displayName} className="w-full h-full object-cover" />
                                ) : (
                                    (member.displayName || 'U').charAt(0)
                                )}
                            </div>
                            <div className="overflow-hidden">
                                <p className="font-bold text-on-surface truncate group-hover:text-primary transition-colors">
                                    {member.displayName || 'Anonymous Buddy'}
                                </p>
                                <p className="text-sm text-on-surface-variant truncate">
                                    {member.uid === project.ownerId ? 'Project Leader' : (member.headline || 'Team Member')}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TeamSection;
