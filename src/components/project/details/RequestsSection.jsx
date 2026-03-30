import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const RequestsSection = ({ project }) => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!project.id) return;

        const applicationsRef = collection(db, 'applications');
        const q = query(
            applicationsRef, 
            where('projectId', '==', project.id),
            where('status', '==', 'pending')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const apps = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
            setRequests(apps);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [project.id]);

    const handleAccept = async (app) => {
        try {
            await updateDoc(doc(db, 'applications', app.id), { status: 'accepted' });
            await updateDoc(doc(db, 'projects', project.id), {
                members: arrayUnion(app.applicantId)
            });
            // Decrement notifications if tracked
        } catch (err) {
            console.error("Failed to accept", err);
        }
    };

    const handleReject = async (appId) => {
        try {
            await updateDoc(doc(db, 'applications', appId), { status: 'rejected' });
        } catch (err) {
            console.error("Failed to reject", err);
        }
    };

    if (!loading && requests.length === 0) return null;

    return (
        <div className="sketch-card p-8 rounded-2xl mb-8 border-2 border-primary-container">
            <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
                <h2 className="text-2xl font-heading text-primary">Pending Requests</h2>
                <span className="bg-primary text-on-primary text-sm font-bold px-3 py-1 rounded-full">
                    {requests.length} New
                </span>
            </div>

            {loading ? (
                <p className="text-on-surface-variant">Loading requests...</p>
            ) : (
                <div className="flex flex-col gap-4">
                    {requests.map(app => (
                        <div key={app.id} className="bg-surface-container-lowest border border-gray-100 p-4 rounded-xl flex flex-col md:flex-row justify-between md:items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4">
                                <Link to={`/profile/${app.applicantId}`} className="w-12 h-12 rounded-full overflow-hidden bg-surface-container-low flex-shrink-0">
                                    {app.applicantPhoto ? (
                                        <img src={app.applicantPhoto} alt={app.applicantName} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center font-bold text-lg text-primary">
                                            {(app.applicantName || 'U').charAt(0)}
                                        </div>
                                    )}
                                </Link>
                                <div>
                                    <Link to={`/profile/${app.applicantId}`} className="font-bold font-heading text-lg text-on-surface hover:text-primary transition-colors">
                                        {app.applicantName}
                                    </Link>
                                    <p className="text-sm text-on-surface-variant mt-1 whitespace-pre-wrap">
                                        {app.message || "No message provided."}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex gap-2 flex-shrink-0">
                                <button 
                                    className="btn px-4 py-2 bg-green-100 text-green-800 hover:bg-green-200 font-bold"
                                    onClick={() => handleAccept(app)}
                                >
                                    Accept
                                </button>
                                <button 
                                    className="btn px-4 py-2 bg-red-100 text-red-800 hover:bg-red-200 font-bold"
                                    onClick={() => handleReject(app.id)}
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RequestsSection;
