import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AppNavbar from '../components/layout/AppNavbar';
import { useAuth } from '../contexts/AuthContext';
import { getProjectById, deleteProject } from '../services/projectService';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';
import ApplyModal from '../components/project/ApplyModal';
import ProjectHeader from '../components/project/details/ProjectHeader';
import ProjectOverview from '../components/project/details/ProjectOverview';
import TeamSection from '../components/project/details/TeamSection';
import RolesSection from '../components/project/details/RolesSection';
import RequestsSection from '../components/project/details/RequestsSection';

const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // UI State
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
    const [initialRoleForModal, setInitialRoleForModal] = useState('');
    const [hasApplied, setHasApplied] = useState(false);

    useEffect(() => {
        async function loadProject() {
            try {
                const data = await getProjectById(id);
                setProject(data);

                // Check if current user has already applied
                if (currentUser && data.ownerId !== currentUser.uid) {
                    const applicationsRef = collection(db, 'applications');
                    const q = query(
                        applicationsRef, 
                        where('projectId', '==', id),
                        where('applicantId', '==', currentUser.uid)
                    );
                    const querySnapshot = await getDocs(q);
                    
                    // If any application exists (pending or otherwise) we consider them "applied"
                    if (!querySnapshot.empty) {
                        setHasApplied(true);
                    }
                }
            } catch (err) {
                setError('Failed to load project details.');
            } finally {
                setLoading(false);
            }
        }
        loadProject();
    }, [id, currentUser]);

    if (loading) {
        return (
            <div className="min-h-screen bg-bg-color">
                <AppNavbar />
                <div className="container mt-12 flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-surface-container-low animate-pulse"></div>
                </div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="min-h-screen bg-bg-color">
                <AppNavbar />
                <div className="container mt-12 max-w-2xl mx-auto">
                    <div className="sketch-card text-center p-8">
                        <h2 className="text-3xl font-heading mb-4">Project Not Found</h2>
                        <p className="text-on-surface-variant mb-6">{error || "This project may have been deleted."}</p>
                        <button onClick={() => navigate('/dashboard')} className="btn btn-primary">
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const handleApplyClick = (role = '') => {
        setInitialRoleForModal(role);
        setIsApplyModalOpen(true);
    };

    const isOwner = currentUser.uid === project.ownerId;
    const isMember = project.members?.includes(currentUser.uid);

    return (
        <div className="min-h-screen bg-bg-color pb-16">
            <AppNavbar />
            
            <main className="container mt-8 max-w-5xl mx-auto px-4 md:px-0">
                <ProjectHeader 
                    project={project} 
                    isOwner={isOwner} 
                    isMember={isMember} 
                    onApply={() => handleApplyClick()}
                    hasApplied={hasApplied} 
                />

                <div className="grid grid-cols-1 gap-8">
                    {/* Modular Sections Assembled */}
                    <ProjectOverview project={project} />
                    
                    {isOwner && <RequestsSection project={project} />}
                    
                    <TeamSection project={project} />
                    
                    {!isOwner && !isMember && !hasApplied && project.recruiting && (
                        <RolesSection project={project} onApply={handleApplyClick} />
                    )}
                </div>
            </main>

            {isApplyModalOpen && (
                <ApplyModal 
                    project={project} 
                    onClose={() => {
                        setIsApplyModalOpen(false);
                        setInitialRoleForModal('');
                    }} 
                    initialRole={initialRoleForModal}
                />
            )}
        </div>
    );
};

export default ProjectDetails;
