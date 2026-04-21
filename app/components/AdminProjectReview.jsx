"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/app/lib/firebase";
import {
    doc,
    getDoc,
    collection,
    getDocs,
    query,
    where,
} from "firebase/firestore";

export default function AdminProjectReview({ projectId }) {
    const [project, setProject] = useState(null);
    const [groupedAnnotations, setGroupedAnnotations] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjectAndAnnotations = async () => {
            try {
                // 1. Fetch project
                const projectRef = doc(db, "projects", projectId);
                const projectSnap = await getDoc(projectRef);

                if (!projectSnap.exists()) {
                    console.log("Project not found");
                    setLoading(false);
                    return;
                }

                const projectData = {
                    id: projectSnap.id,
                    ...projectSnap.data(),
                };

                setProject(projectData);

                // 2. Fetch annotations for this project
                const annotationsRef = collection(db, "annotations");
                const q = query(annotationsRef, where("projectId", "==", projectId));
                const querySnapshot = await getDocs(q);

                const annotations = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                // 3. Group annotations by imageIndex
                const grouped = {};

                annotations.forEach((annotation) => {
                    const imageIndex = annotation.imageIndex;

                    if (!grouped[imageIndex]) {
                        grouped[imageIndex] = [];
                    }

                    grouped[imageIndex].push(annotation);
                });

                setGroupedAnnotations(grouped);
            } catch (error) {
                console.error("Error fetching admin review data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjectAndAnnotations();
    }, [projectId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg font-semibold">Project not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100 px-6 py-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">
                        {project.projectName || "Untitled Project"} - Review
                    </h1>
                    <p className="text-base-content/70 mt-2">
                        {project.rules || "No rules provided"}
                    </p>
                </div>

                {/* Labels */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-3">Project Labels</h2>
                    <div className="flex flex-wrap gap-2">
                        {project.labels?.map((label, index) => (
                            <span key={index} className="badge badge-outline badge-lg">
                                {label}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Images + grouped annotations */}
                <div className="space-y-8">
                    {project.images?.map((image, index) => {
                        const imageAnnotations = groupedAnnotations[index] || [];

                        return (
                            <div
                                key={index}
                                className="bg-base-200 rounded-2xl shadow-md p-6"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    {/* Image */}
                                    <div className="lg:col-span-1">
                                        <img
                                            src={image.url}
                                            alt={image.name}
                                            className="w-full h-72 object-cover rounded-xl"
                                        />
                                        <p className="mt-3 font-medium truncate">{image.name}</p>
                                    </div>

                                    {/* Annotation review */}
                                    <div className="lg:col-span-2">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-xl font-semibold">
                                                Annotations for Image {index + 1}
                                            </h3>
                                            <span className="badge badge-neutral">
                                                {imageAnnotations.length} submission(s)
                                            </span>
                                        </div>

                                        {imageAnnotations.length === 0 ? (
                                            <div className="bg-base-100 rounded-xl p-4 border border-base-300">
                                                <p className="text-base-content/70">
                                                    No annotations submitted yet.
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="overflow-x-auto">
                                                <table className="table bg-base-100 rounded-xl">
                                                    <thead>
                                                        <tr>
                                                            <th>Collaborator</th>
                                                            <th>Selected Label</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {imageAnnotations.map((annotation) => (
                                                            <tr key={annotation.id}>
                                                                <td>{annotation.collaboratorEmail}</td>
                                                                <td>
                                                                    <span className="badge badge-outline">
                                                                        {annotation.selectedLabel}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}