// 'use client'

// import React, { useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { useAuth } from "@/app/context/AuthContext";
// import AddProjects from '../components/AddProjects'
// import CurrentUser from "../components/CurrentUser"
// import LogoutButton from '../components/Logout';
// import AdminProjectsList from '../components/AdminProjectsList';

// export default function Admin() {
//     const { user } = useAuth();
//     const router = useRouter();

//     useEffect(() => {
//         if (user === null) {
//             router.push("/signin");
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
                
//                 <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
//                     <div>
//                         <h1 className="text-3xl md:text-4xl font-bold">Admin Dashboard</h1>
//                         <p className="text-base-content/70 mt-2">
//                             Manage projects, upload image datasets, and review collaborator annotations.
//                         </p>
//                     </div>

//                     <div className="flex items-center gap-3">
//                         <div className="bg-base-200 rounded-xl px-4 py-2 shadow-sm">
//                             <CurrentUser />
//                         </div>
//                         <LogoutButton />
//                     </div>
//                 </div>

//                 <div className="bg-base-200 rounded-2xl shadow-md p-6 mb-8">
//                     <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//                         <div>
//                             <h2 className="text-xl font-semibold">Projects</h2>
//                             <p className="text-sm text-base-content/70 mt-1">
//                                 Create and review annotation projects.
//                             </p>
//                         </div>
//                         <AddProjects />
//                     </div>
//                 </div>

//                 <AdminProjectsList />
//             </div>
//         </div>
//     )
// }


'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from "@/app/context/AuthContext"
import AddProjects from '../components/AddProjects'
import CurrentUser from "../components/CurrentUser"
import LogoutButton from '../components/Logout'
import AdminProjectsList from '../components/AdminProjectsList'

export default function Admin() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user === null) {
      router.push("/auth")
    }
  }, [user, router])

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <span className="loading loading-spinner loading-md text-black"></span>
          <p className="text-sm text-black/60">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white px-4 py-6 md:px-6 md:py-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 rounded-3xl border border-black/10 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            
            <div className="max-w-3xl">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-black/45">
                Admin Panel
              </p>
              <h1 className="text-3xl md:text-4xl font-semibold text-black">
                Admin Dashboard
              </h1>
              <p className="mt-3 text-sm md:text-base leading-6 text-black/65">
                Manage annotation projects, upload datasets, define rules, and
                review collaborator activity from one central workspace.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="rounded-2xl border border-black/10 px-4 py-3 text-sm text-black/75">
                <CurrentUser />
              </div>
              <LogoutButton />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-black">Project Management</h2>
            <p className="mt-2 text-sm leading-6 text-black/60">
              Create new annotation projects, upload image datasets, define
              labels, and set annotation rules for collaborators.
            </p>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm flex items-center justify-between lg:flex-col lg:items-start lg:justify-center gap-4">
            <div>
              <p className="text-sm font-medium text-black">Create Project</p>
              <p className="mt-1 text-sm text-black/55">
                Start a new annotation workflow.
              </p>
            </div>
            <AddProjects />
          </div>
        </div>

        {/* Project List */}
        <div className="rounded-3xl border border-black/10 bg-white p-4 md:p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-black">Existing Projects</h2>
            <p className="mt-1 text-sm text-black/60">
              View, manage, and monitor all active annotation projects.
            </p>
          </div>

          <AdminProjectsList />
        </div>
      </div>
    </div>
  )
}