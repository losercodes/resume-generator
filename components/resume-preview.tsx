"use client"

import { ModernTemplate } from "@/components/templates/modern-template"
import { MinimalistTemplate } from "@/components/templates/minimalist-template"
import { ProfessionalTemplate } from "@/components/templates/professional-template"
import { CreativeTemplate } from "@/components/templates/creative-template"

export function ResumePreview({ resumeData, template }) {
  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate resumeData={resumeData} />
      case "minimalist":
        return <MinimalistTemplate resumeData={resumeData} />
      case "professional":
        return <ProfessionalTemplate resumeData={resumeData} />
      case "creative":
        return <CreativeTemplate resumeData={resumeData} />
      default:
        return <ModernTemplate resumeData={resumeData} />
    }
  }

  return <div className="w-full h-full">{renderTemplate()}</div>
}

