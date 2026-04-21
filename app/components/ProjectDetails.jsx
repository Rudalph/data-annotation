"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/app/lib/firebase";
import { doc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/app/context/AuthContext";

export default function ProjectDetails({ projectId }) {
    const { user } = useAuth();

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [annotations, setAnnotations] = useState({});

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const docRef = doc(db, "projects", projectId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProject({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.log("Project not found");
                }
            } catch (error) {
                console.error("Error fetching project:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [projectId]);

    const handleLabelChange = (imageIndex, selectedLabel) => {
        setAnnotations((prev) => ({
            ...prev,
            [imageIndex]: selectedLabel,
        }));
    };

    const handleSubmitAnnotations = async () => {
        if (!user) {
            alert("Please login first");
            return;
        }

        try {
            const annotationEntries = Object.entries(annotations);

            if (annotationEntries.length === 0) {
                alert("Please label at least one image");
                return;
            }

            for (const [imageIndex, selectedLabel] of annotationEntries) {
                const image = project.images[imageIndex];

                await addDoc(collection(db, "annotations"), {
                    projectId: project.id,
                    collaboratorEmail: user.email,
                    collaboratorId: user.uid,
                    imageIndex: Number(imageIndex),
                    imageName: image.name,
                    imageUrl: image.url,
                    selectedLabel,
                    createdAt: serverTimestamp(),
                });
            }

            alert("Annotations submitted successfully!");
            setAnnotations({});
        } catch (error) {
            console.error("Error submitting annotations:", error);
            alert("Something went wrong while submitting annotations");
        }
    };

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
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">
                        {project.projectName || "Untitled Project"}
                    </h1>
                    <p className="text-base-content/70 mt-2">
                        {project.rules || "No rules available"}
                    </p>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">Available Labels</h2>
                    <div className="flex flex-wrap gap-2">
                        {project.labels?.map((label, index) => (
                            <span key={index} className="badge badge-outline badge-lg">
                                {label}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {project.images?.map((image, index) => (
                        <div
                            key={index}
                            className="bg-base-200 rounded-2xl shadow-md p-4"
                        >
                            <img
                                src={image.url}
                                alt={image.name}
                                className="w-full h-56 object-cover rounded-xl mb-4"
                            />

                            <h3 className="font-semibold mb-3 truncate">{image.name}</h3>

                            <select
                                className="select select-bordered w-full"
                                value={annotations[index] || ""}
                                onChange={(e) =>
                                    handleLabelChange(index, e.target.value)
                                }
                            >
                                <option value="">Select label</option>
                                {project.labels?.map((label, labelIndex) => (
                                    <option key={labelIndex} value={label}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>

                <div className="mt-8">
                    <button
                        className="btn btn-neutral px-8"
                        onClick={handleSubmitAnnotations}
                    >
                        Submit Annotations
                    </button>
                </div>
            </div>
        </div>
    );
}