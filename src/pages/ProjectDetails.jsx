import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AppNavbar from '../components/layout/AppNavbar';
import { useAuth } from '../contexts/AuthContext';
import { getProjectById } from '../services/projectService';
import { Users, Clock, Tag } from 'lucide-react';
import './ProjectDetails.css';

const ProjectDetails = () => {
    const { id } = useParams();
    const { currentUser } = useAuth();

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function loadProject() {
            try {
                const data = await getProjectById(id);
                setProject(data);
            } catch (err) {
                setError('Failed to load project details.');
            } finally {
                setLoading(false);
            }
        }
        loadProject();
    }, [id]);

    const handleJoinRequest = async () => {
        // This will be implemented in Phase 4
        console.log("Send join request for project:", id);
        alert("Join request feature coming in Phase 4!");
    };

    if (loading) {
        return (
            <div className="details-page">
                <AppNavbar />
                <div className="container text-center mt-4">
                    <h2 className="handwriting">Loading project details...</h2>
                </div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="details-page">
                <AppNavbar />
                <div className="container mt-4">
                    <div className="sketch-card error-card text-center">
                        <h3>Oops!</h3>
                        <p>{error || "Project not found"}</p>
                        <Link to="/dashboard" className="btn btn-secondary mt-3">Back to Dashboard</Link>
                    </div>
                </div>
            </div>
        );
    }

    const isOwner = currentUser.uid === project.ownerId;
    const isMember = project.members?.includes(currentUser.uid);
    const timeAgo = project.createdAt ? new Date(project.createdAt.toMillis()).toLocaleDateString() : '';

    return (
        <div className="details-page">
            <AppNavbar />

            <main className="details-main container">
                <div className="sketch-card details-header">
                    <div className="header-meta">
                        <span className="badge badge-status">{project.status.toUpperCase()}</span>
                        <span className="meta-text"><Clock size={16} /> {timeAgo}</span>
                    </div>
                    <h1 className="details-title">{project.title}</h1>
                    <p className="details-owner">
                        Hosted by <Link to={`/profile/${project.ownerId}`} className="handwriting link-hover">{project.ownerName}</Link>
                    </p>
                </div>

                <div className="details-grid mt-4">
                    <div className="sketch-card details-body">
                        <h3>About this Project</h3>
                        <div className="desc-content">
                            {project.description.split('\n').map((line, i) => (
                                <p key={i}>{line}</p>
                            ))}
                        </div>

                        <h4 className="mt-4 mb-2"><Tag size={18} className="inline-icon" /> Skills Needed</h4>
                        <div className="project-tags">
                            {project.tags && project.tags.map(tag => (
                                <span key={tag} className="tag tag-sketch">#{tag}</span>
                            ))}
                        </div>
                    </div>

                    <div className="details-sidebar">
                        <div className="sketch-card team-card">
                            <h3>Team <Users size={20} className="inline-icon" /></h3>
                            <div className="progress-container">
                                <div
                                    className="progress-bar"
                                    style={{ width: `${Math.min(100, (project.members.length / project.maxMembers) * 100)}%` }}
                                ></div>
                            </div>
                            <p className="team-count">
                                <strong>{project.members?.length || 1}</strong> out of <strong>{project.maxMembers}</strong> seats filled
                            </p>

                            <div className="action-area mt-4">
                                {isOwner ? (
                                    <button className="btn w-100 btn-secondary" disabled>You are the owner</button>
                                ) : isMember ? (
                                    <button className="btn w-100 btn-secondary" disabled>You are a member</button>
                                ) : (
                                    <button onClick={handleJoinRequest} className="btn btn-primary w-100">
                                        Request to Join
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProjectDetails;
