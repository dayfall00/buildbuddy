import { collection, doc, query, where, orderBy, getDocs, addDoc, updateDoc, serverTimestamp, writeBatch, arrayUnion, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';

// 1. Apply to a project
export const applyToProject = async (applicationData) => {
    const appsRef = collection(db, 'applications');

    // Check if an application already exists to prevent duplicates
    const q = query(
        appsRef,
        where('projectId', '==', applicationData.projectId),
        where('applicantId', '==', applicationData.applicantId)
    );

    const existing = await getDocs(q);
    if (!existing.empty) {
        throw new Error("You have already applied to this project.");
    }

    const newApp = {
        projectId: applicationData.projectId,
        projectTitle: applicationData.projectTitle,
        ownerId: applicationData.ownerId,
        applicantId: applicationData.applicantId,
        applicantName: applicationData.applicantName,
        applicantPhoto: applicationData.applicantPhoto || '',
        message: applicationData.message || '',
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(appsRef, newApp);
    return docRef.id;
};

// 2. Fetch applications for an owner to review (manage applications)
export const getManageableApplications = async (ownerId) => {
    const appsRef = collection(db, 'applications');

    // NOTE: Requires a composite index on ownerId and status
    const q = query(
        appsRef,
        where('ownerId', '==', ownerId),
        where('status', '==', 'pending'),
        orderBy('createdAt', 'desc')
    );

    try {
        const querySnapshot = await getDocs(q);
        const apps = [];
        querySnapshot.forEach((doc) => {
            apps.push({ id: doc.id, ...doc.data() });
        });
        return apps;
    } catch (error) {
        if (error.code === 'failed-precondition') {
            console.error("Firestore Index Missing for getManageableApplications. Fallback to client filtering.");
            return await fallbackGetManageable(ownerId);
        }
        throw error;
    }
};

const fallbackGetManageable = async (ownerId) => {
    const appsRef = collection(db, 'applications');
    const q = query(appsRef, where('ownerId', '==', ownerId));
    const querySnapshot = await getDocs(q);
    const apps = [];
    querySnapshot.forEach((doc) => {
        if (doc.data().status === 'pending') {
            apps.push({ id: doc.id, ...doc.data() });
        }
    });
    apps.sort((a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis());
    return apps;
};


// 3. Accept an application
export const acceptApplication = async (applicationId, projectId, applicantId) => {
    const batch = writeBatch(db);

    const appRef = doc(db, 'applications', applicationId);
    const projectRef = doc(db, 'projects', projectId);

    // Update Application Status
    batch.update(appRef, {
        status: 'accepted',
        updatedAt: serverTimestamp()
    });

    // Add member to Project Document
    batch.update(projectRef, {
        members: arrayUnion(applicantId)
    });

    await batch.commit();
};

// 4. Reject an application
export const rejectApplication = async (applicationId) => {
    const appRef = doc(db, 'applications', applicationId);
    await updateDoc(appRef, {
        status: 'rejected',
        updatedAt: serverTimestamp()
    });
};


// 5. Fetch a user's application history
export const getUserApplications = async (applicantId) => {
    const appsRef = collection(db, 'applications');

    const q = query(
        appsRef,
        where('applicantId', '==', applicantId)
        // orderBy('createdAt', 'desc') // Requires composite index, so we sort client side
    );

    const querySnapshot = await getDocs(q);
    const apps = [];
    querySnapshot.forEach((doc) => {
        apps.push({ id: doc.id, ...doc.data() });
    });

    // Client-side sort fallback since simple query returns unsorted
    apps.sort((a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis());

    return apps;
};
