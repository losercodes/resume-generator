export function MinimalistTemplate({ resumeData }) {
  const { personalInfo, summary, experience, education, skills } = resumeData

  return (
    <div className="font-sans max-w-[800px] mx-auto p-8 bg-white text-gray-800">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-light tracking-wide text-gray-900 mb-2">{personalInfo.name || "Your Name"}</h1>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-8">
          <h2 className="text-md uppercase tracking-wider font-normal text-gray-500 mb-3 border-b border-gray-200 pb-1">
            Profile
          </h2>
          <p className="text-sm">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-md uppercase tracking-wider font-normal text-gray-500 mb-3 border-b border-gray-200 pb-1">
            Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-medium">{exp.title}</h3>
                  <span className="text-sm text-gray-500">
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
        <section className="mb-8">
          <h2 className="text-md uppercase tracking-wider font-normal text-gray-500 mb-3 border-b border-gray-200 pb-1">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-medium">{edu.degree}</h3>
                  <span className="text-sm text-gray-500">
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

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section>
          <h2 className="text-md uppercase tracking-wider font-normal text-gray-500 mb-3 border-b border-gray-200 pb-1">
            Skills
          </h2>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {skills.map((skill, index) => (
              <span key={index} className="text-sm">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

