"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/app/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

export default function FetchProjects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "projects"));

                const projectsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setProjects(projectsData);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100 px-6 py-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-2">Collaborator Dashboard</h1>
                <p className="text-base-content/70 mb-8">
                    View available annotation projects and start contributing.
                </p>

                {projects.length === 0 ? (
                    <div className="bg-base-200 rounded-2xl p-8 text-center shadow">
                        <h2 className="text-xl font-semibold mb-2">No projects available</h2>
                        <p className="text-base-content/70">
                            Projects created by admin will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="bg-base-200 rounded-2xl shadow-md p-5 border border-base-300"
                            >
                                <h2 className="text-xl font-semibold mb-2">
                                    {project.projectName || "Untitled Project"}
                                </h2>

                                <p className="text-sm text-base-content/70 mb-3 line-clamp-3">
                                    {project.rules || "No rules added"}
                                </p>

                                <div className="mb-3">
                                    <p className="text-sm font-medium mb-2">Labels</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.labels?.map((label, index) => (
                                            <span
                                                key={index}
                                                className="badge badge-outline"
                                            >
                                                {label}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="text-sm text-base-content/70 mb-4">
                                    Images: {project.images?.length || 0}
                                </div>

                                <Link href={`/collaborator/${project.id}`}>
                                <button className="btn btn-neutral w-full">
                                    Open Project
                                </button>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}