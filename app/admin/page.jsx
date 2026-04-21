// 'use client'

// import React, { useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { useAuth } from "@/app/context/AuthContext";
// import AddProjects from '../components/AddProjects'
// import CurrentUser from "../components/CurrentUser"
// import LogoutButton from '../components/Logout';

// export default function Admin() {
//     const { user } = useAuth();
//     const router = useRouter();

//     useEffect(() => {
//         if (user === null) {
//             router.push("/auth");
//         }
//     }, [user, router]);

//     if (!user) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-base-100">
//                 <span className="loading loading-spinner loading-lg"></span>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-base-100 px-6 py-8">
//             <div className="max-w-7xl mx-auto">
                
//                 {/* Header */}
//                 <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
//                     <div>
//                         <h1 className="text-3xl md:text-4xl font-bold">Admin Dashboard</h1>
//                         <p className="text-base-content/70 mt-2">
//                             Manage projects, upload image datasets, and monitor annotation workflow.
//                         </p>
//                     </div>

//                     <div className="flex items-center gap-3">
//                         <div className="bg-base-200 rounded-xl px-4 py-2 shadow-sm">
//                             <CurrentUser />
//                         </div>
//                         <LogoutButton />
//                     </div>
//                 </div>

//                 {/* Main Grid */}
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
//                     {/* Left Section */}
//                     <div className="lg:col-span-2 space-y-6">
//                         <div className="bg-base-200 rounded-2xl shadow-md p-6">
//                             <div className="flex items-center justify-between mb-4">
//                                 <div>
//                                     <h2 className="text-xl font-semibold">Projects</h2>
//                                     <p className="text-sm text-base-content/70 mt-1">
//                                         Create and manage annotation projects.
//                                     </p>
//                                 </div>
//                                 <AddProjects />
//                             </div>

//                             <div className="border border-dashed border-base-300 rounded-xl p-8 text-center">
//                                 <h3 className="text-lg font-medium mb-2">No projects preview yet</h3>
//                                 <p className="text-sm text-base-content/60">
//                                     Once you create projects, you can show them here as cards or a table.
//                                 </p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Right Section */}
//                     <div className="space-y-6">
//                         <div className="bg-base-200 rounded-2xl shadow-md p-6">
//                             <h2 className="text-xl font-semibold mb-2">Admin Info</h2>
//                             <p className="text-sm text-base-content/70 mb-4">
//                                 Logged in account information.
//                             </p>

//                             <div className="bg-base-100 rounded-xl p-4">
//                                 <CurrentUser />
//                             </div>
//                         </div>

//                         <div className="bg-base-200 rounded-2xl shadow-md p-6">
//                             <h2 className="text-xl font-semibold mb-2">Quick Actions</h2>
//                             <p className="text-sm text-base-content/70 mb-4">
//                                 Useful shortcuts for admin workflow.
//                             </p>

//                             <div className="flex flex-col gap-3">
//                                 <AddProjects />
//                                 <LogoutButton />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from "@/app/context/AuthContext";
import AddProjects from '../components/AddProjects'
import CurrentUser from "../components/CurrentUser"
import LogoutButton from '../components/Logout';
import AdminProjectsList from '../components/AdminProjectsList';

export default function Admin() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user === null) {
            router.push("/signin");
        }
    }, [user, router]);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-100">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100 px-6 py-8">
            <div className="max-w-7xl mx-auto">
                
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold">Admin Dashboard</h1>
                        <p className="text-base-content/70 mt-2">
                            Manage projects, upload image datasets, and review collaborator annotations.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="bg-base-200 rounded-xl px-4 py-2 shadow-sm">
                            <CurrentUser />
                        </div>
                        <LogoutButton />
                    </div>
                </div>

                <div className="bg-base-200 rounded-2xl shadow-md p-6 mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-semibold">Projects</h2>
                            <p className="text-sm text-base-content/70 mt-1">
                                Create and review annotation projects.
                            </p>
                        </div>
                        <AddProjects />
                    </div>
                </div>

                <AdminProjectsList />
            </div>
        </div>
    )
}