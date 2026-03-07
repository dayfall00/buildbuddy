import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppNavbar from '../components/layout/AppNavbar';
import ProjectCard from '../components/project/ProjectCard';
import { useAuth } from '../contexts/AuthContext';
import { getUserById } from '../services/userService';
import { getUserProjects } from '../services/projectService';
import { Mail, Edit3, Github } from 'lucide-react';
import './Profile.css';

const Profile = () => {
    const { uid } = useParams();
    const { currentUser } = useAuth();

    const [profileUser, setProfileUser] = useState(null);
    const [userProjects, setUserProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function loadProfile() {
            try {
                setLoading(true);
                const userData = await getUserById(uid);
                const projectsData = await getUserProjects(uid);

                setProfileUser(userData);
                setUserProjects(projectsData);
            } catch (err) {
                setError('Failed to load profile.');
            } finally {
                setLoading(false);
            }
        }
        loadProfile();
    }, [uid]);

    const isOwnProfile = currentUser && currentUser.uid === uid;

    if (loading) {
        return (
            <div className="profile-page">
                <AppNavbar />
                <div className="container text-center mt-4"><h2 className="handwriting">Loading profile...</h2></div>
            </div>
        );
    }

    if (error || !profileUser) {
        return (
            <div className="profile-page">
                <AppNavbar />
                <div className="container mt-4">
                    <div className="sketch-card error-card text-center">
                        <h3>Oops!</h3>
                        <p>{error || "User not found"}</p>
                    </div>
                </div>
            </div>
        );
    }

    const joinDate = profileUser.createdAt ? new Date(profileUser.createdAt.toMillis()).toLocaleDateString() : 'Unknown';

    return (
        <div className="profile-page">
            <AppNavbar />

            <div className="profile-container container">

                <aside className="sketch-card sidebar">
                    <span className="label">// The Human</span>
                    <div className="avatar-box">
                        {profileUser.displayName?.charAt(0).toUpperCase() || '?'}
                    </div>
                    <h1>{profileUser.displayName}</h1>
                    <div className="details">
                        {profileUser.email} <br />
                        Joined Buddy on {joinDate}
                    </div>

                    <div className="divider"></div>

                    <div className="academic-info">
                        <p className="degree-text">{profileUser.year} • {profileUser.branch}</p>
                        <p className="uni-text">{profileUser.university}</p>
                    </div>

                    <p className="bio-text">
                        <strong>Bio:</strong> {profileUser.bio || "This user hasn't written a bio yet."}
                    </p>

                    <div className="social-links">
                        {profileUser.linkedin && (
                            <a href={profileUser.linkedin} target="_blank" rel="noreferrer" className="tag social-tag">LinkedIn ↗</a>
                        )}
                        {profileUser.github && (
                            <a href={profileUser.github} target="_blank" rel="noreferrer" className="tag social-tag">GitHub ↗</a>
                        )}
                        {profileUser.portfolio && (
                            <a href={profileUser.portfolio} target="_blank" rel="noreferrer" className="tag social-tag">Portfolio ↗</a>
                        )}
                    </div>
                </aside>

                <main className="main-content">
                    <div className="bento-grid">
                        <section className="sketch-card project-area">
                            {isOwnProfile && <button className="btn-edit" onClick={() => alert('Edit profile coming soon')}>✎ Edit Profile</button>}
                            <span className="label project-label">// My Projects</span>

                            {userProjects.length === 0 ? (
                                <div className="empty-projects-wrapper">
                                    <h3 className="empty-projects-title">Scanning for active builds...</h3>
                                    <p className="empty-projects-desc">Not part of any projects yet.</p>
                                    {isOwnProfile && (
                                        <a href="/projects/new" className="btn btn-primary mt-3 inline-block">
                                            <span>🚀</span> Create Project
                                        </a>
                                    )}
                                </div>
                            ) : (
                                <div className="projects-list w-100">
                                    {userProjects.map(project => (
                                        <ProjectCard key={project.id} project={project} />
                                    ))}
                                </div>
                            )}
                        </section>

                        <section className="sketch-card skills-card">
                            <span className="label">// Skills & Stack</span>
                            <div className="skills-tags mt-3">
                                {profileUser.skills && profileUser.skills.length > 0 ? (
                                    profileUser.skills.map(skill => (
                                        <span key={skill} className="tag tag-sketch">#{skill}</span>
                                    ))
                                ) : (
                                    <p className="empty-text">No skills added yet.</p>
                                )}
                            </div>
                        </section>

                        <section className="sketch-card academic-card">
                            <span className="label academic-label">// Academic Focus</span>
                            <p className="degree-title">{profileUser.degree} {profileUser.branch}</p>
                            <p className="degree-subtitle">Specializing at {profileUser.university}</p>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Profile;
