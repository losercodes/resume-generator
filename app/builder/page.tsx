"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ResumeEditor } from "@/components/resume-editor"
import { ResumePreview } from "@/components/resume-preview"
import { JobAnalyzer } from "@/components/job-analyzer"
import { TemplateSelector } from "@/components/template-selector"
import { ExportOptions } from "@/components/export-options"
import { FileUploader } from "@/components/file-uploader"

export default function Builder() {
  const [activeStep, setActiveStep] = useState(0)
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      linkedin: "",
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
  })
  const [selectedTemplate, setSelectedTemplate] = useState("modern")
  const [jobDescription, setJobDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [suggestions, setSuggestions] = useState([])

  const steps = [
    { id: "upload", label: "Upload Resume" },
    { id: "edit", label: "Edit Resume" },
    { id: "analyze", label: "Job Analysis" },
    { id: "template", label: "Choose Template" },
    { id: "export", label: "Export" },
  ]

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1)
    }
  }

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1)
    }
  }

  const handleResumeDataChange = (newData) => {
    setResumeData({ ...resumeData, ...newData })
  }

  const handleTemplateChange = (template) => {
    setSelectedTemplate(template)
  }

  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value)
  }
  const handleAnalyzeJob = async () => {
    if (!jobDescription.trim()) return
  
    setIsAnalyzing(true)
    try {
      const response = await fetch('/api/analyze-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeData,
          jobDescription,
        }),
      })
  
      const data = await response.json()
      if (response.ok) {
        setSuggestions(data.suggestions)
      } else {
        console.error("Error analyzing job description:", data.error)
      }
    } catch (error) {
      console.error("Error analyzing job description:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }
  const handleFileUpload = (parsedData) => {
    setResumeData(parsedData)
    handleNext()
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Resume Builder</h1>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center" onClick={() => setActiveStep(index)}>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${
                  index === activeStep
                    ? "bg-primary text-primary-foreground"
                    : index < activeStep
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`text-sm mt-2 ${
                  index === activeStep ? "text-primary font-medium" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
        <div className="relative h-2 bg-muted rounded-full">
          <motion.div
            className="absolute h-2 bg-primary rounded-full"
            initial={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            animate={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          {activeStep === 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl font-bold mb-4">Upload Your Resume</h2>
              <p className="text-muted-foreground mb-6">
                Upload your existing resume or start from scratch. Our AI will help extract key information.
              </p>
              <FileUploader onUpload={handleFileUpload} />
              <div className="mt-8 text-center">
                <p className="text-muted-foreground mb-4">Or start from scratch</p>
                <Button onClick={handleNext}>Create New Resume</Button>
              </div>
            </motion.div>
          )}

          {activeStep === 1 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl font-bold mb-4">Edit Your Resume</h2>
              <ResumeEditor resumeData={resumeData} onChange={handleResumeDataChange} />
            </motion.div>
          )}

          {activeStep === 2 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl font-bold mb-4">Job Description Analysis</h2>
              <JobAnalyzer
                jobDescription={jobDescription}
                onChange={handleJobDescriptionChange}
                onAnalyze={handleAnalyzeJob}
                isAnalyzing={isAnalyzing}
                suggestions={suggestions}
              />
            </motion.div>
          )}

          {activeStep === 3 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl font-bold mb-4">Choose a Template</h2>
              <TemplateSelector selectedTemplate={selectedTemplate} onChange={handleTemplateChange} />
            </motion.div>
          )}

          {activeStep === 4 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl font-bold mb-4">Export Your Resume</h2>
              <ExportOptions resumeData={resumeData} template={selectedTemplate} />
            </motion.div>
          )}
        </Card>

        <Card className="p-6 bg-muted/30">
          <h2 className="text-2xl font-bold mb-4">Live Preview</h2>
          <div className="bg-background rounded-lg shadow-lg p-6 h-[600px] overflow-auto">
            <ResumePreview resumeData={resumeData} template={selectedTemplate} />
          </div>
        </Card>
      </div>

      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={handleBack} disabled={activeStep === 0}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={activeStep === steps.length - 1}>
          {activeStep === steps.length - 2 ? "Finish" : "Next"}
        </Button>
      </div>
    </div>
  )
}

