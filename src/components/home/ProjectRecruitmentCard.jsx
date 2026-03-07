import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';
import ApplyModal from '../project/ApplyModal';
import './ProjectRecruitmentCard.css';

export default function ProjectRecruitmentCard({ project }) {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [ownerDetails, setOwnerDetails] = useState(null);
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

    // Fetch the owner's academic details asynchronously so we don't have to restructure the projects collection database yet
    useEffect(() => {
        if (!project.ownerId) return;

        const fetchOwnerData = async () => {
            try {
                const userRef = doc(db, 'users', project.ownerId);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    setOwnerDetails(userSnap.data());
                }
            } catch (error) {
                console.error("Error fetching project owner details", error);
            }
        };

        fetchOwnerData();
    }, [project.ownerId]);

    const isMember = project.members?.includes(currentUser?.uid);
    const isOwner = project.ownerId === currentUser?.uid;

    // Formatting the badge status
    let statusText = "RECRUITING";
    let badgeClass = "badge-recruiting";
    if (project.status === 'closed' || !project.recruiting) {
        statusText = "CLOSED";
        badgeClass = "badge-closed";
    }

    const academicInfo = ownerDetails
        ? `${ownerDetails.year || 'Student'} • ${ownerDetails.branch || 'University'}`
        : 'Loading intro...';

    const avatarInitial = project.ownerName?.charAt(0).toUpperCase() || 'U';

    return (
        <div className="sketch-card recruitment-card mt-4">

            {/* Header: User Info & Status */}
            <div className="rc-header">
                <div className="rc-user-info cursor-pointer" onClick={() => navigate(`/profile/${project.ownerId}`)}>
                    <div className="rc-avatar">
                        {avatarInitial}
                    </div>
                    <div className="rc-user-meta">
                        <div className="rc-creator-name">{project.ownerName}</div>
                        <div className="rc-academic-info text-muted">{academicInfo}</div>
                    </div>
                </div>

                <div className={`rc-status-badge ${badgeClass}`}>
                    {statusText}
                </div>
            </div>

            {/* Body: Title & Desc */}
            <div className="rc-body mt-3">
                <h3 className="rc-title" onClick={() => navigate(`/projects/${project.id}`)}>
                    {project.title}
                </h3>
                <p className="rc-desc line-clamp-3">
                    {project.description}
                </p>
            </div>

            {/* Tags */}
            <div className="rc-tags mt-3">
                {project.tags && project.tags.map(tag => (
                    <span key={tag} className="tag tag-sketch tag-small">#{tag}</span>
                ))}
            </div>

            {/* Action Row */}
            <div className="rc-actions mt-4">
                {isOwner ? (
                    <button className="btn btn-secondary" disabled>You are the owner</button>
                ) : isMember ? (
                    <button className="btn btn-secondary" disabled>You are a member</button>
                ) : (project.status === 'closed' || !project.recruiting) ? (
                    <button className="btn btn-secondary" disabled>Team Full</button>
                ) : (
                    <button className="btn btn-primary" onClick={() => setIsApplyModalOpen(true)}>
                        Apply to Build
                    </button>
                )}

                <Link to={`/projects/${project.id}`} className="rc-details-link font-bold">
                    Details
                </Link>
            </div>

            {isApplyModalOpen && (
                <ApplyModal project={project} onClose={() => setIsApplyModalOpen(false)} />
            )}
        </div>
    );
}
