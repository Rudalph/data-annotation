import React, { useState } from "react";
import { db } from "@/app/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddProjects() {
    const [files, setFiles] = useState([]);
    const [rules, setRules] = useState("");
    const [labels, setLabels] = useState([""]);

    const handleLabelChange = (index, value) => {
        const updated = [...labels];
        updated[index] = value;
        setLabels(updated);
    };

    const addLabelField = () => {
        setLabels([...labels, ""]);
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     console.log("Files:", files);
    //     console.log("Rules:", rules);
    //     console.log("Labels:", labels);

    //     alert("Project created successfully!");

    //     setFiles([]);
    //     setRules("");
    //     setLabels([""]);

    //     document.getElementById("add_projects").close();
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            alert("Uploading images...");
    
            const uploadedImages = [];
    
            for (let file of files) {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", "data-annotation");
    
                const res = await fetch(
                    "https://api.cloudinary.com/v1_1/dwixtgoxg/image/upload",
                    {
                        method: "POST",
                        body: formData,
                    }
                );
    
                const data = await res.json();
    
                uploadedImages.push({
                    name: file.name,
                    url: data.secure_url,
                    public_id: data.public_id,
                });
            }
    
            // Save to Firestore
            await addDoc(collection(db, "projects"), {
                rules,
                labels,
                images: uploadedImages,
                createdAt: new Date(),
            });
    
            alert("Project created successfully!");
    
            // Reset
            setFiles([]);
            setRules("");
            setLabels([""]);
    
            document.getElementById("add_projects").close();
    
        } catch (error) {
            console.error(error);
            alert("Something went wrong!");
        }
    };

    return (
        <div>
            <button
                className="btn"
                onClick={() => document.getElementById("add_projects").showModal()}
            >
                Add Project
            </button>

            <dialog id="add_projects" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                    </form>

                    <h3 className="font-bold text-lg mb-4">Add New Project</h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="font-semibold">Upload Images</label>
                            <input
                                type="file"
                                multiple
                                webkitdirectory="true"
                                directory=""
                                className="file-input file-input-bordered w-full mt-2"
                                onChange={(e) => setFiles(Array.from(e.target.files))}
                            />
                        </div>

                        <div>
                            <label className="font-semibold">Annotation Rules</label>
                            <textarea
                                className="textarea textarea-bordered w-full mt-2"
                                placeholder="Define rules for collaborators..."
                                value={rules}
                                onChange={(e) => setRules(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="font-semibold">Labels</label>

                            {labels.map((label, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    placeholder={`Label ${index + 1}`}
                                    className="input input-bordered w-full mt-2"
                                    value={label}
                                    onChange={(e) => handleLabelChange(index, e.target.value)}
                                />
                            ))}

                            <button
                                type="button"
                                className="btn btn-sm mt-2"
                                onClick={addLabelField}
                            >
                                + Add Label
                            </button>
                        </div>

                        <button type="submit" className="btn btn-neutral w-full">
                            Create Project
                        </button>
                    </form>
                </div>
            </dialog>
        </div>
    );
}