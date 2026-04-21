import React from "react";
import { Globe } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const team = [
  {
    name: "John Doe",
    role: "Frontend Developer",
    image: "https://i.pravatar.cc/300?img=12",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    portfolio: "https://portfolio.com",
  },
  {
    name: "Jane Smith",
    role: "Backend Engineer",
    image: "https://i.pravatar.cc/300?img=32",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    portfolio: "https://portfolio.com",
  },
];

export default function Team() {
  return (
    <section className="bg-base-200 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">Meet Our Team</h2>
          <p className="mt-2 text-sm sm:text-base text-base-content/70">
            The people behind our platform
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {team.map((member, index) => (
            <div
              key={index}
              className="card bg-base-100 border border-base-300 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="card-body items-center text-center p-6 sm:p-7">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-24 w-24 sm:h-28 sm:w-28 rounded-full object-cover ring ring-base-300 ring-offset-2 ring-offset-base-100"
                />

                <div className="mt-3">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="mt-1 text-sm text-base-content/70">
                    {member.role}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-4">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} LinkedIn`}
                    className="text-base-content/70 transition hover:text-blue-600"
                  >
                    <FaLinkedin className="h-5 w-5" />
                  </a>

                  <a
                    href={member.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} GitHub`}
                    className="text-base-content/70 transition hover:text-base-content"
                  >
                    <FaGithub className="h-5 w-5" />
                  </a>

                  <a
                    href={member.portfolio}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} Portfolio`}
                    className="text-base-content/70 transition hover:text-yellow-500"
                  >
                    <Globe className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}