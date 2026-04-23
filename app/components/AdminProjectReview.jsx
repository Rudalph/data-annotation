// "use client";

// import React, { useEffect, useState } from "react";
// import { db } from "@/app/lib/firebase";
// import {
//     doc,
//     getDoc,
//     collection,
//     getDocs,
//     query,
//     where,
// } from "firebase/firestore";

// export default function AdminProjectReview({ projectId }) {
//     const [project, setProject] = useState(null);
//     const [groupedAnnotations, setGroupedAnnotations] = useState({});
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchProjectAndAnnotations = async () => {
//             try {
//                 // 1. Fetch project
//                 const projectRef = doc(db, "projects", projectId);
//                 const projectSnap = await getDoc(projectRef);

//                 if (!projectSnap.exists()) {
//                     console.log("Project not found");
//                     setLoading(false);
//                     return;
//                 }

//                 const projectData = {
//                     id: projectSnap.id,
//                     ...projectSnap.data(),
//                 };

//                 setProject(projectData);

//                 // 2. Fetch annotations for this project
//                 const annotationsRef = collection(db, "annotations");
//                 const q = query(annotationsRef, where("projectId", "==", projectId));
//                 const querySnapshot = await getDocs(q);

//                 const annotations = querySnapshot.docs.map((doc) => ({
//                     id: doc.id,
//                     ...doc.data(),
//                 }));

//                 // 3. Group annotations by imageIndex
//                 const grouped = {};

//                 annotations.forEach((annotation) => {
//                     const imageIndex = annotation.imageIndex;

//                     if (!grouped[imageIndex]) {
//                         grouped[imageIndex] = [];
//                     }

//                     grouped[imageIndex].push(annotation);
//                 });

//                 setGroupedAnnotations(grouped);
//             } catch (error) {
//                 console.error("Error fetching admin review data:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProjectAndAnnotations();
//     }, [projectId]);

//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <span className="loading loading-spinner loading-lg"></span>
//             </div>
//         );
//     }

//     if (!project) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <p className="text-lg font-semibold">Project not found</p>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-base-100 px-6 py-8">
//             <div className="max-w-7xl mx-auto">
//                 {/* Header */}
//                 <div className="mb-8">
//                     <h1 className="text-3xl font-bold">
//                         {project.projectName || "Untitled Project"} - Review
//                     </h1>
//                     <p className="text-base-content/70 mt-2">
//                         {project.rules || "No rules provided"}
//                     </p>
//                 </div>

//                 {/* Labels */}
//                 <div className="mb-8">
//                     <h2 className="text-xl font-semibold mb-3">Project Labels</h2>
//                     <div className="flex flex-wrap gap-2">
//                         {project.labels?.map((label, index) => (
//                             <span key={index} className="badge badge-outline badge-lg">
//                                 {label}
//                             </span>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Images + grouped annotations */}
//                 <div className="space-y-8">
//                     {project.images?.map((image, index) => {
//                         const imageAnnotations = groupedAnnotations[index] || [];

//                         return (
//                             <div
//                                 key={index}
//                                 className="bg-base-200 rounded-2xl shadow-md p-6"
//                             >
//                                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                                     {/* Image */}
//                                     <div className="lg:col-span-1">
//                                         <img
//                                             src={image.url}
//                                             alt={image.name}
//                                             className="w-full h-72 object-cover rounded-xl"
//                                         />
//                                         <p className="mt-3 font-medium truncate">{image.name}</p>
//                                     </div>

//                                     {/* Annotation review */}
//                                     <div className="lg:col-span-2">
//                                         <div className="flex items-center justify-between mb-4">
//                                             <h3 className="text-xl font-semibold">
//                                                 Annotations for Image {index + 1}
//                                             </h3>
//                                             <span className="badge badge-neutral">
//                                                 {imageAnnotations.length} submission(s)
//                                             </span>
//                                         </div>

//                                         {imageAnnotations.length === 0 ? (
//                                             <div className="bg-base-100 rounded-xl p-4 border border-base-300">
//                                                 <p className="text-base-content/70">
//                                                     No annotations submitted yet.
//                                                 </p>
//                                             </div>
//                                         ) : (
//                                             <div className="overflow-x-auto">
//                                                 <table className="table bg-base-100 rounded-xl">
//                                                     <thead>
//                                                         <tr>
//                                                             <th>Collaborator</th>
//                                                             <th>Selected Label</th>
//                                                         </tr>
//                                                     </thead>
//                                                     <tbody>
//                                                         {imageAnnotations.map((annotation) => (
//                                                             <tr key={annotation.id}>
//                                                                 <td>{annotation.collaboratorEmail}</td>
//                                                                 <td>
//                                                                     <span className="badge badge-outline">
//                                                                         {annotation.selectedLabel}
//                                                                     </span>
//                                                                 </td>
//                                                             </tr>
//                                                         ))}
//                                                     </tbody>
//                                                 </table>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>
//         </div>
//     );
// }

"use client";

import React, { useEffect, useMemo, useState } from "react";
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
        const projectRef = doc(db, "projects", projectId);
        const projectSnap = await getDoc(projectRef);

        if (!projectSnap.exists()) {
          setProject(null);
          setLoading(false);
          return;
        }

        const projectData = {
          id: projectSnap.id,
          ...projectSnap.data(),
        };

        setProject(projectData);

        const annotationsRef = collection(db, "annotations");
        const q = query(annotationsRef, where("projectId", "==", projectId));
        const querySnapshot = await getDocs(q);

        const annotations = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const grouped = {};
        annotations.forEach((annotation) => {
          const imageIndex = annotation.imageIndex;
          if (!grouped[imageIndex]) grouped[imageIndex] = [];
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

  const getImageAnalysis = (annotations = []) => {
    const counts = {};
    annotations.forEach((a) => {
      counts[a.selectedLabel] = (counts[a.selectedLabel] || 0) + 1;
    });

    const uniqueLabels = Object.keys(counts);
    const total = annotations.length;

    let majorityLabel = "—";
    let majorityCount = 0;

    uniqueLabels.forEach((label) => {
      if (counts[label] > majorityCount) {
        majorityCount = counts[label];
        majorityLabel = label;
      }
    });

    const agreementRate = total ? Math.round((majorityCount / total) * 100) : 0;
    const disagreement = uniqueLabels.length > 1;

    return {
      total,
      uniqueLabels,
      counts,
      majorityLabel,
      majorityCount,
      agreementRate,
      disagreement,
    };
  };

  const overallStats = useMemo(() => {
    if (!project?.images) {
      return {
        totalImages: 0,
        reviewedImages: 0,
        disagreementImages: 0,
        totalAnnotations: 0,
      };
    }

    let reviewedImages = 0;
    let disagreementImages = 0;
    let totalAnnotations = 0;

    project.images.forEach((_, index) => {
      const annotations = groupedAnnotations[index] || [];
      const analysis = getImageAnalysis(annotations);

      if (annotations.length > 0) reviewedImages += 1;
      if (analysis.disagreement) disagreementImages += 1;
      totalAnnotations += annotations.length;
    });

    return {
      totalImages: project.images.length,
      reviewedImages,
      disagreementImages,
      totalAnnotations,
    };
  }, [project, groupedAnnotations]);

  const handleExportJSON = () => {
    if (!project) return;

    const payload = {
      project: {
        id: project.id,
        projectName: project.projectName || "",
        rules: project.rules || "",
        labels: project.labels || [],
      },
      summary: overallStats,
      images: (project.images || []).map((image, index) => {
        const annotations = groupedAnnotations[index] || [];
        const analysis = getImageAnalysis(annotations);

        return {
          imageIndex: index,
          imageName: image.name,
          imageUrl: image.url,
          annotations,
          analysis,
        };
      }),
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${project.projectName || "project-review"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <span className="loading loading-spinner loading-md text-black"></span>
          <p className="text-sm text-black/60">Loading review data...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl border border-black/10 bg-white p-8 text-center shadow-sm">
          <h2 className="text-2xl font-semibold text-black">Project not found</h2>
          <p className="mt-2 text-sm text-black/60">
            The requested review page could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 py-8 md:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 rounded-3xl border border-black/10 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-black/45">
                Admin Review
              </p>
              <h1 className="text-3xl md:text-4xl font-semibold text-black">
                {project.projectName || "Space Images Dataset"}
              </h1>
              <p className="mt-3 text-sm md:text-base leading-6 text-black/65">
                {project.rules || "No project rules provided."}
              </p>
            </div>

            <button
              onClick={handleExportJSON}
              className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              Export Review JSON
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-black/10 p-5 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-black/45">Images</p>
            <p className="mt-2 text-3xl font-semibold text-black">
              {overallStats.totalImages}
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 p-5 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-black/45">Reviewed</p>
            <p className="mt-2 text-3xl font-semibold text-black">
              {overallStats.reviewedImages}
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 p-5 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-black/45">
              Total Annotations
            </p>
            <p className="mt-2 text-3xl font-semibold text-black">
              {overallStats.totalAnnotations}
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 p-5 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-black/45">
              Disagreement Cases
            </p>
            <p className="mt-2 text-3xl font-semibold text-black">
              {overallStats.disagreementImages}
            </p>
          </div>
        </div>

        {/* Labels */}
        <div className="mb-8 rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-black">Project Labels</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.labels?.map((label, index) => (
              <span
                key={index}
                className="rounded-full border border-black/10 px-4 py-2 text-sm text-black/75"
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Review Items */}
        <div className="space-y-8">
          {project.images?.map((image, index) => {
            const imageAnnotations = groupedAnnotations[index] || [];
            const analysis = getImageAnalysis(imageAnnotations);

            return (
              <div
                key={index}
                className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm"
              >
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  {/* Image */}
                  <div>
                    <div className="overflow-hidden rounded-2xl border border-black/10 bg-black/5">
                      <img
                        src={image.url}
                        alt={image.name}
                        className="h-72 w-full object-cover"
                      />
                    </div>
                    <p className="mt-3 text-sm font-medium text-black truncate">
                      {image.name}
                    </p>
                  </div>

                  {/* Review */}
                  <div className="lg:col-span-2">
                    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-black">
                          Image {index + 1} Review
                        </h3>
                        <p className="mt-1 text-sm text-black/55">
                          {analysis.total} submission
                          {analysis.total !== 1 ? "s" : ""}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-4 py-2 text-xs font-medium ${
                          analysis.disagreement
                            ? "border border-black bg-black text-white"
                            : "border border-black/10 text-black/70"
                        }`}
                      >
                        {analysis.disagreement ? "Disagreement Detected" : "Consensus"}
                      </span>
                    </div>

                    {/* Analysis */}
                    <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl border border-black/10 p-4">
                        <p className="text-xs uppercase tracking-wide text-black/45">
                          Majority Label
                        </p>
                        <p className="mt-2 text-lg font-semibold text-black">
                          {analysis.majorityLabel}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-black/10 p-4">
                        <p className="text-xs uppercase tracking-wide text-black/45">
                          Agreement Rate
                        </p>
                        <p className="mt-2 text-lg font-semibold text-black">
                          {analysis.agreementRate}%
                        </p>
                      </div>

                      <div className="rounded-2xl border border-black/10 p-4">
                        <p className="text-xs uppercase tracking-wide text-black/45">
                          Unique Labels
                        </p>
                        <p className="mt-2 text-lg font-semibold text-black">
                          {analysis.uniqueLabels.length}
                        </p>
                      </div>
                    </div>

                    {/* Label distribution */}
                    {analysis.uniqueLabels.length > 0 && (
                      <div className="mb-5 rounded-2xl border border-black/10 p-4">
                        <p className="mb-3 text-sm font-semibold text-black">
                          Label Distribution
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {analysis.uniqueLabels.map((label) => (
                            <span
                              key={label}
                              className="rounded-full border border-black/10 px-3 py-1.5 text-sm text-black/75"
                            >
                              {label} ({analysis.counts[label]})
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Annotation table */}
                    {imageAnnotations.length === 0 ? (
                      <div className="rounded-2xl border border-black/10 p-5 text-sm text-black/60">
                        No annotations submitted yet.
                      </div>
                    ) : (
                      <div className="overflow-x-auto rounded-2xl border border-black/10">
                        <table className="w-full text-sm">
                          <thead className="border-b border-black/10 bg-black/[0.03]">
                            <tr className="text-left">
                              <th className="px-4 py-3 font-semibold text-black">
                                Collaborator
                              </th>
                              <th className="px-4 py-3 font-semibold text-black">
                                Selected Label
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {imageAnnotations.map((annotation) => (
                              <tr
                                key={annotation.id}
                                className="border-b border-black/5 last:border-0"
                              >
                                <td className="px-4 py-3 text-black/70">
                                  {annotation.collaboratorEmail}
                                </td>
                                <td className="px-4 py-3">
                                  <span className="rounded-full border border-black/10 px-3 py-1 text-xs text-black/80">
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