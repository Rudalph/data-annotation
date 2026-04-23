// "use client";

// import React, { useEffect, useState } from "react";
// import { db } from "@/app/lib/firebase";
// import { collection, getDocs } from "firebase/firestore";
// import Link from "next/link";

// export default function FetchProjects() {
//     const [projects, setProjects] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchProjects = async () => {
//             try {
//                 const querySnapshot = await getDocs(collection(db, "projects"));

//                 const projectsData = querySnapshot.docs.map((doc) => ({
//                     id: doc.id,
//                     ...doc.data(),
//                 }));

//                 setProjects(projectsData);
//             } catch (error) {
//                 console.error("Error fetching projects:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProjects();
//     }, []);

//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <span className="loading loading-spinner loading-lg"></span>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-base-100 px-6 py-8">
//             <div className="max-w-6xl mx-auto">
//                 <h1 className="text-3xl font-bold mb-2">Collaborator Dashboard</h1>
//                 <p className="text-base-content/70 mb-8">
//                     View available annotation projects and start contributing.
//                 </p>

//                 {projects.length === 0 ? (
//                     <div className="bg-base-200 rounded-2xl p-8 text-center shadow">
//                         <h2 className="text-xl font-semibold mb-2">No projects available</h2>
//                         <p className="text-base-content/70">
//                             Projects created by admin will appear here.
//                         </p>
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//                         {projects.map((project) => (
//                             <div
//                                 key={project.id}
//                                 className="bg-base-200 rounded-2xl shadow-md p-5 border border-base-300"
//                             >
//                                 <h2 className="text-xl font-semibold mb-2">
//                                     {project.projectName || "Untitled Project"}
//                                 </h2>

//                                 <p className="text-sm text-base-content/70 mb-3 line-clamp-3">
//                                     {project.rules || "No rules added"}
//                                 </p>

//                                 <div className="mb-3">
//                                     <p className="text-sm font-medium mb-2">Labels</p>
//                                     <div className="flex flex-wrap gap-2">
//                                         {project.labels?.map((label, index) => (
//                                             <span
//                                                 key={index}
//                                                 className="badge badge-outline"
//                                             >
//                                                 {label}
//                                             </span>
//                                         ))}
//                                     </div>
//                                 </div>

//                                 <div className="text-sm text-base-content/70 mb-4">
//                                     Images: {project.images?.length || 0}
//                                 </div>

//                                 <Link href={`/collaborator/${project.id}`}>
//                                 <button className="btn btn-neutral w-full">
//                                     Open Project
//                                 </button>
//                                 </Link>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

export default function FetchProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));

        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProjects(data);
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
      <div className=" bg-white flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-md text-black"></span>
          <p className="text-sm text-black/60">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white px-4 py-10 md:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.18em] text-black/50 mb-2">
            Collaborator Workspace
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold text-black">
            {/* Available Projects */}
          </h1>
          <p className="mt-3 max-w-2xl text-sm md:text-base text-black/65">
            Browse annotation projects, review their labeling instructions, and
            start contributing with clarity and consistency.
          </p>
        </div>

        {/* Empty State */}
        {projects.length === 0 ? (
          <div className="rounded-3xl border border-black/10 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-black/10">
              <span className="text-xl">+</span>
            </div>
            <h2 className="text-xl font-semibold text-black">
              No projects available
            </h2>
            <p className="mt-2 text-sm text-black/60">
              Projects created by the admin will appear here once they are ready
              to be shared.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold text-black leading-snug">
                      {project.projectName || "Space Images Dataset"}
                    </h2>
                    <p className="mt-1 text-sm text-black/50">
                      {project.images?.length || 0} image
                      {(project.images?.length || 0) !== 1 ? "s" : ""}
                    </p>
                  </div>

                  <div className="rounded-full border border-black/10 px-3 py-1 text-xs font-medium text-black/70">
                    Active
                  </div>
                </div>

                <div className="mb-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-black/45">
                    Annotation Rules
                  </p>
                  <p className="line-clamp-4 text-sm leading-6 text-black/70">
                    {project.rules || "No annotation rules have been added yet."}
                  </p>
                </div>

                <div className="mb-6">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-black/45">
                    Labels
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.labels?.length ? (
                      project.labels.map((label, index) => (
                        <span
                          key={index}
                          className="rounded-full border border-black/10 px-3 py-1 text-xs text-black/75"
                        >
                          {label}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-black/50">
                        No labels defined
                      </span>
                    )}
                  </div>
                </div>

                <Link href={`/collaborator/${project.id}`} className="block">
                  <button className="w-full rounded-xl bg-black px-4 py-3 text-sm font-medium text-white transition hover:opacity-90">
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