import React from "react";
import AdminProjectReview from "@/app/components/AdminProjectReview";

export default async function AdminProjectPage({ params }) {
    const { projectId } = await params;

    return (
        <div>
            <AdminProjectReview projectId={projectId} />
        </div>
    );
}