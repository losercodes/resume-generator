"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, FileText, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

export function FileUploader({ onUpload }) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [fileName, setFileName] = useState("")

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file) => {
    setFileName(file.name)
    setIsUploading(true)

    // In a real implementation, this would use a library to parse the resume
    // For now, we'll simulate the parsing with a timeout
    setTimeout(() => {
      // Mock parsed data
      const parsedData = {
        personalInfo: {
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "(123) 456-7890",
          location: "New York, NY",
          website: "johndoe.com",
          linkedin: "linkedin.com/in/johndoe",
        },
        summary:
          "Experienced software engineer with a passion for developing innovative solutions that accelerate efficiency and effectiveness of organizational success.",
        experience: [
          {
            title: "Senior Software Engineer",
            company: "Tech Solutions Inc.",
            location: "New York, NY",
            startDate: "Jan 2020",
            endDate: "Present",
            description: "Lead developer for client-facing web applications using React and Node.js.",
          },
        ],
        education: [
          {
            degree: "Bachelor of Science in Computer Science",
            institution: "University of Technology",
            location: "Boston, MA",
            startDate: "Sep 2012",
            endDate: "May 2016",
            description: "",
          },
        ],
        skills: ["JavaScript", "React", "Node.js", "TypeScript", "HTML/CSS"],
        projects: [],
        certifications: [],
      }

      setIsUploading(false)
      onUpload(parsedData)
    }, 2000)
  }

  return (
    <div className="space-y-4">
      <Card
        className={`border-2 border-dashed p-8 text-center ${
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Drag & drop your resume</h3>
            <p className="text-sm text-muted-foreground">Supports PDF and DOCX files up to 5MB</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">or</span>
          </div>
          <label htmlFor="resume-upload">
            <Button variant="outline" className="cursor-pointer" as="span">
              Browse Files
            </Button>
            <input id="resume-upload" type="file" accept=".pdf,.docx" className="sr-only" onChange={handleFileInput} />
          </label>
        </div>
      </Card>

      {fileName && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
          <Card className="p-4 flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm truncate">{fileName}</p>
              {isUploading ? (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  <span>Analyzing resume...</span>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">Upload complete</p>
              )}
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

