import React, { useEffect, useState } from 'react';
import AppNavbar from '../components/layout/AppNavbar';
import ProjectCard from '../components/project/ProjectCard';
import { getFeedProjects } from '../services/projectService';
import './Feed.css';

const Feed = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadProjects() {
            try {
                const data = await getFeedProjects();
                setProjects(data);
            } catch (err) {
                setError("Failed to load feed. " + err.message);
            } finally {
                setLoading(false);
            }
        }

        loadProjects();
    }, []);

    return (
        <div className="feed-page">
            <AppNavbar />

            <main className="feed-main container">
                <div className="feed-header">
                    <h2>Latest <span className="handwriting highlight">Projects</span></h2>
                    <p>Find a team and start building.</p>
                </div>

                {error && <div className="sketch-card error-card mb-4">{error}</div>}

                {loading ? (
                    <div className="loading-state sketch-card text-center">
                        <h3 className="handwriting">Loading awesome ideas...</h3>
                    </div>
                ) : projects.length === 0 ? (
                    <div className="empty-state sketch-card text-center">
                        <h3>No projects found!</h3>
                        <p>Be the first to create one and start building.</p>
                        <a href="/projects/new" className="btn btn-primary mt-3">Create Project</a>
                    </div>
                ) : (
                    <div className="feed-grid">
                        {projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Feed;
