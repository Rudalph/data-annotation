import React from "react";
import ProjectDetails from "@/app/components/ProjectDetails";

export default async function ProjectPage({ params }) {
    const { projectId } = await params;

    return (
        <div>
            <ProjectDetails projectId={projectId} />
        </div>
    );
}