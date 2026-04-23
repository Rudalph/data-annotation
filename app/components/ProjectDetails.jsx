// "use client";

// import React, { useEffect, useState } from "react";
// import { db } from "@/app/lib/firebase";
// import { doc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { useAuth } from "@/app/context/AuthContext";

// export default function ProjectDetails({ projectId }) {
//     const { user } = useAuth();

//     const [project, setProject] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [annotations, setAnnotations] = useState({});

//     useEffect(() => {
//         const fetchProject = async () => {
//             try {
//                 const docRef = doc(db, "projects", projectId);
//                 const docSnap = await getDoc(docRef);

//                 if (docSnap.exists()) {
//                     setProject({ id: docSnap.id, ...docSnap.data() });
//                 } else {
//                     console.log("Project not found");
//                 }
//             } catch (error) {
//                 console.error("Error fetching project:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProject();
//     }, [projectId]);

//     const handleLabelChange = (imageIndex, selectedLabel) => {
//         setAnnotations((prev) => ({
//             ...prev,
//             [imageIndex]: selectedLabel,
//         }));
//     };

//     const handleSubmitAnnotations = async () => {
//         if (!user) {
//             alert("Please login first");
//             return;
//         }

//         try {
//             const annotationEntries = Object.entries(annotations);

//             if (annotationEntries.length === 0) {
//                 alert("Please label at least one image");
//                 return;
//             }

//             for (const [imageIndex, selectedLabel] of annotationEntries) {
//                 const image = project.images[imageIndex];

//                 await addDoc(collection(db, "annotations"), {
//                     projectId: project.id,
//                     collaboratorEmail: user.email,
//                     collaboratorId: user.uid,
//                     imageIndex: Number(imageIndex),
//                     imageName: image.name,
//                     imageUrl: image.url,
//                     selectedLabel,
//                     createdAt: serverTimestamp(),
//                 });
//             }

//             alert("Annotations submitted successfully!");
//             setAnnotations({});
//         } catch (error) {
//             console.error("Error submitting annotations:", error);
//             alert("Something went wrong while submitting annotations");
//         }
//     };

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
//                 <div className="mb-8">
//                     <h1 className="text-3xl font-bold">
//                         {project.projectName || "Space Images Dataset"}
//                     </h1>
//                     <p className="text-base-content/70 mt-2">
//                         {project.rules || "No rules available"}
//                     </p>
//                 </div>

//                 <div className="mb-6">
//                     <h2 className="text-xl font-semibold mb-3">Available Labels</h2>
//                     <div className="flex flex-wrap gap-2">
//                         {project.labels?.map((label, index) => (
//                             <span key={index} className="badge badge-outline badge-lg">
//                                 {label}
//                             </span>
//                         ))}
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//                     {project.images?.map((image, index) => (
//                         <div
//                             key={index}
//                             className="bg-base-200 rounded-2xl shadow-md p-4"
//                         >
//                             <img
//                                 src={image.url}
//                                 alt={image.name}
//                                 className="w-full h-56 object-cover rounded-xl mb-4"
//                             />

//                             <h3 className="font-semibold mb-3 truncate">{image.name}</h3>

//                             <select
//                                 className="select select-bordered w-full"
//                                 value={annotations[index] || ""}
//                                 onChange={(e) =>
//                                     handleLabelChange(index, e.target.value)
//                                 }
//                             >
//                                 <option value="">Select label</option>
//                                 {project.labels?.map((label, labelIndex) => (
//                                     <option key={labelIndex} value={label}>
//                                         {label}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                     ))}
//                 </div>

//                 <div className="mt-8">
//                     <button
//                         className="btn btn-neutral px-8"
//                         onClick={handleSubmitAnnotations}
//                     >
//                         Submit Annotations
//                     </button>
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
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useAuth } from "@/app/context/AuthContext";

export default function ProjectDetails({ projectId }) {
  const { user } = useAuth();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [annotations, setAnnotations] = useState({});

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const docRef = doc(db, "projects", projectId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProject({ id: docSnap.id, ...docSnap.data() });
        } else {
          setProject(null);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        setProject(null);
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

  const annotatedCount = useMemo(
    () => Object.values(annotations).filter(Boolean).length,
    [annotations]
  );

  const totalImages = project?.images?.length || 0;

  const handleSubmitAnnotations = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }

    const annotationEntries = Object.entries(annotations).filter(
      ([, selectedLabel]) => selectedLabel
    );

    if (annotationEntries.length === 0) {
      alert("Please label at least one image");
      return;
    }

    try {
      setSubmitting(true);

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
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-3">
          <span className="loading loading-spinner loading-md text-black"></span>
          <p className="text-sm text-black/60">Loading project...</p>
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
            The requested project does not exist or is no longer available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 py-8 md:px-6 md:py-10">
      <div className="mx-auto max-w-7xl">
        {/* Top Section */}
        <div className="mb-8 rounded-3xl border border-black/10 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-black/45">
                Annotation Project
              </p>

              <h1 className="text-3xl font-semibold leading-tight text-black md:text-4xl">
                {project.projectName || "Space Images Dataset"}
              </h1>

              <p className="mt-4 text-sm leading-6 text-black/70 md:text-base">
                {project.rules || "No rules available for this project."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:w-fit">
              <div className="rounded-2xl border border-black/10 px-5 py-4">
                <p className="text-xs uppercase tracking-wide text-black/45">
                  Images
                </p>
                <p className="mt-1 text-2xl font-semibold text-black">
                  {totalImages}
                </p>
              </div>

              <div className="rounded-2xl border border-black/10 px-5 py-4">
                <p className="text-xs uppercase tracking-wide text-black/45">
                  Selected
                </p>
                <p className="mt-1 text-2xl font-semibold text-black">
                  {annotatedCount}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="mb-8 rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-black">Available Labels</h2>
          <p className="mt-1 text-sm text-black/60">
            Choose one label for each image from the predefined categories.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.labels?.length ? (
              project.labels.map((label, index) => (
                <span
                  key={index}
                  className="rounded-full border border-black/10 px-4 py-2 text-sm text-black/75"
                >
                  {label}
                </span>
              ))
            ) : (
              <span className="text-sm text-black/50">No labels available</span>
            )}
          </div>
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {project.images?.map((image, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-black/5">
                <img
                  src={image.url}
                  alt={image.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-5">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-black/45">
                      Image {index + 1}
                    </p>
                    <h3 className="mt-1 line-clamp-1 text-base font-semibold text-black">
                      {image.name}
                    </h3>
                  </div>

                  {annotations[index] && (
                    <span className="rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
                      Selected
                    </span>
                  )}
                </div>

                <label className="mb-2 block text-sm font-medium text-black">
                  Choose Label
                </label>

                <select
                  className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black"
                  value={annotations[index] || ""}
                  onChange={(e) => handleLabelChange(index, e.target.value)}
                >
                  <option value="">Select label</option>
                  {project.labels?.map((label, labelIndex) => (
                    <option key={labelIndex} value={label}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Action */}
        <div className="sticky bottom-4 mt-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-2xl border border-black/10 bg-white/95 p-4 shadow-sm backdrop-blur">
            <div>
              <p className="text-sm font-medium text-black">
                {annotatedCount} of {totalImages} images labeled
              </p>
              <p className="text-xs text-black/55">
                Review your selections before submitting annotations.
              </p>
            </div>

            <button
              onClick={handleSubmitAnnotations}
              disabled={submitting}
              className="rounded-xl bg-black px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit Annotations"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}