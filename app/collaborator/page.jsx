// import React from "react";
// import FetchProjects from "../components/FetchProjects";
// import LogoutButton from "../components/Logout";

// export default function Collaborators () {
//     return (
//         <div>
//             <FetchProjects />
//             <LogoutButton />
//         </div>
//     )
// }

import React from "react";
import FetchProjects from "../components/FetchProjects";
import LogoutButton from "../components/Logout";

export default function Collaborators() {
  return (
    <div className=" bg-white">
      
      {/* Header */}
      <div className="border-b border-black/10 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-black">
        Available Projects
        </h1>
        <LogoutButton />
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        <FetchProjects />
      </div>

    </div>
  );
}