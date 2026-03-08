import React, { useEffect, useState } from 'react';
import AppNavbar from '../components/layout/AppNavbar';
import ProjectCard from '../components/project/ProjectCard';
import { getUserProjects, getProjectById } from '../services/projectService';
import { getUserApplications } from '../services/applicationService';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import './MyProjects.css';

export default function MyProjects() {
    const { currentUser } = useAuth();
    const [projects, setProjects] = useState([]);
    const [appliedProjects, setAppliedProjects] = useState([]);
    const [pendingRequests, setPendingRequests] = useState('00');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('my-builds');

    useEffect(() => {
        async function loadUserProjects() {
            if (!currentUser) return;
            
            try {
                // Fetch both user's projects and their sent applications in parallel
                const [userProjectsData, userAppsData] = await Promise.all([
                    getUserProjects(currentUser.uid),
                    getUserApplications(currentUser.uid)
                ]);
                
                const pendingOutgoingRequests = userAppsData.filter(app => app.status === 'pending');
                
                // Fetch full project details for the pending requests
                const appliedProjectsData = await Promise.all(
                    pendingOutgoingRequests.map(async (app) => {
                        try {
                            const projectData = await getProjectById(app.projectId);
                            // add the application status/date to the project card object if needed
                            return { ...projectData, applicationStatus: app.status, appliedAt: app.createdAt };
                        } catch (err) {
                            console.warn("Could not fetch project details for applied project", app.projectId);
                            return null;
                        }
                    })
                );

                setProjects(userProjectsData);
                setAppliedProjects(appliedProjectsData.filter(Boolean)); // Filter out any nulls from failed fetches
                setPendingRequests(pendingOutgoingRequests.length.toString().padStart(2, '0'));
            } catch (err) {
                console.error("Error fetching user projects:", err);
                setError("Failed to load your projects.");
            } finally {
                setLoading(false);
            }
        }

        loadUserProjects();
    }, [currentUser]);

    // For now, mock statistics for open roles
    const activeBuildsCount = Math.max(1, projects.length).toString().padStart(2, '0');
    // Sum open roles across all owned projects
    const openRolesCount = '09'; // Placeholder matching screenshot

    // Determine which projects to feed into the grid
    const displayedProjects = activeTab === 'pending' ? appliedProjects : projects;

    return (
        <div className="page-wrapper my-projects-page">
            <AppNavbar />
            
            <main className="container mt-5">
                {/* Custom Header Section */}
                <div className="projects-header-container">
                    <div className="header-title-section">
                        <h2>MY PROJECTS</h2>
                        <div className="projects-tabs">
                            <button 
                                className={`tab-btn ${activeTab === 'my-builds' ? 'active' : ''}`}
                                onClick={() => setActiveTab('my-builds')}
                            >
                                My Builds ({projects.length})
                            </button>
                            <button 
                                className={`tab-btn ${activeTab === 'joined-builds' ? 'active' : ''}`}
                                onClick={() => setActiveTab('joined-builds')}
                            >
                                Joined Builds (0)
                            </button>
                        </div>
                    </div>
                    
                    <Link to="/projects/new" className="btn btn-red">
                        + New Build
                    </Link>
                </div>

                {/* Statistics Grid */}
                <div className="stats-grid">
                    <div className="stat-card bg-neon">
                        <span className="stat-title">ACTIVE BUILDS</span>
                        <span className="stat-value">{activeBuildsCount}</span>
                    </div>
                    
                    <div className="stat-card bg-white">
                        <span className="stat-title">OPEN ROLES</span>
                        <span className="stat-value red-text">{openRolesCount}</span>
                    </div>

                    <div 
                        className={`stat-card bg-blue cursor-pointer ${activeTab === 'pending' ? 'active-stat' : ''}`}
                        onClick={() => setActiveTab('pending')}
                    >
                        <span className="stat-title">PENDING REQUESTS</span>
                        <span className="stat-value">{pendingRequests}</span>
                    </div>
                </div>

                <hr className="section-divider" />

                {error && <div className="sketch-card error-card mb-4">{error}</div>}

                {loading ? (
                    <div className="loading-state text-center mt-5">
                        <h3 className="handwriting">Loading your projects...</h3>
                    </div>
                ) : (
                    <div className="feed-grid">
                        {/* Only show the Start a New Project placeholder in the My Builds tab */}
                        {activeTab === 'my-builds' && (
                            <Link to="/projects/new" className="new-project-placeholder">
                                START A NEW PROJECT
                            </Link>
                        )}

                        {/* Map existing projects */}
                        {displayedProjects.length === 0 ? (
                            <div className="sketch-card w-100 p-4 text-center" style={{ gridColumn: '1 / -1' }}>
                                <p className="text-muted mb-0">No projects to display in this section.</p>
                            </div>
                        ) : (
                            displayedProjects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
