export function CreativeTemplate({ resumeData }) {
  const { personalInfo, summary, experience, education, skills } = resumeData

  return (
    <div className="font-sans max-w-[800px] mx-auto p-8 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 text-gray-800">
      {/* Header */}
      <header className="mb-8 relative">
        <div className="absolute top-0 left-0 w-24 h-24 bg-primary/20 rounded-full -z-10 blur-xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-cyan-200/30 rounded-full -z-10 blur-xl"></div>

        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-cyan-600 bg-clip-text text-transparent mb-2">
          {personalInfo.name || "Your Name"}
        </h1>

        <div className="flex flex-wrap gap-4 text-sm">
          {personalInfo.email && (
            <span className="flex items-center gap-1 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {personalInfo.location}
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-8 bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold text-primary mb-3 flex items-center">
            <span className="w-8 h-1 bg-primary mr-2 rounded-full"></span>
            About Me
          </h2>
          <p className="text-sm leading-relaxed">{summary}</p>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Experience */}
          {experience && experience.length > 0 && (
            <section className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-bold text-primary mb-4 flex items-center">
                <span className="w-8 h-1 bg-primary mr-2 rounded-full"></span>
                Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={index} className="relative pl-6 border-l-2 border-primary/20">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                      <h3 className="font-bold text-gray-800">{exp.title}</h3>
                      <span className="text-sm text-primary font-medium">
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {exp.company}
                      {exp.location && `, ${exp.location}`}
                    </div>
                    <p className="text-sm">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <section className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-bold text-primary mb-4 flex items-center">
                <span className="w-8 h-1 bg-primary mr-2 rounded-full"></span>
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="relative pl-6 border-l-2 border-primary/20">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                      <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                      <span className="text-sm text-primary font-medium">
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-1">
                      {edu.institution}
                      {edu.location && `, ${edu.location}`}
                    </div>
                    {edu.description && <p className="text-sm">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="space-y-6">
          {/* Skills */}
          {skills && skills.length > 0 && (
            <section className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-bold text-primary mb-4 flex items-center">
                <span className="w-8 h-1 bg-primary mr-2 rounded-full"></span>
                Skills
              </h2>
              <div className="space-y-2">
                {skills.map((skill, index) => (
                  <div key={index} className="bg-white/80 px-4 py-2 rounded-lg shadow-sm">
                    {skill}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Contact */}
          <section className="bg-primary/10 backdrop-blur-sm p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center">
              <span className="w-8 h-1 bg-primary mr-2 rounded-full"></span>
              Contact
            </h2>
            <div className="space-y-3">
              {personalInfo.email && (
                <div className="flex items-center gap-2">
                  <div className="bg-white p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <div className="bg-white p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm">{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-2">
                  <div className="bg-white p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                  </div>
                  <span className="text-sm">{personalInfo.website}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-2">
                  <div className="bg-white p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm">{personalInfo.linkedin}</span>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

