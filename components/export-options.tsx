"use client"
import { Card } from "@/components/ui/card"
import { FileDown, FileText, Code } from "lucide-react"
import { motion } from "framer-motion"

export function ExportOptions({ resumeData, template }) {
  const handleExportPDF = () => {
    // In a real implementation, this would use a library like jsPDF or html2pdf
    // to generate a PDF from the resume data and template
    console.log("Exporting PDF...", { resumeData, template })
    alert("PDF export functionality would be implemented here")
  }

  const handleExportDOCX = () => {
    // In a real implementation, this would use a library like docx
    // to generate a DOCX file from the resume data
    console.log("Exporting DOCX...", { resumeData, template })
    alert("DOCX export functionality would be implemented here")
  }

  const handleExportJSON = () => {
    // Create a JSON file from the resume data
    const dataStr = JSON.stringify(resumeData, null, 2)
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`

    const exportFileDefaultName = "resume.json"

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const exportOptions = [
    {
      id: "pdf",
      name: "PDF",
      description: "Best for submitting applications online",
      icon: FileDown,
      action: handleExportPDF,
    },
    {
      id: "docx",
      name: "Word Document",
      description: "Editable format for further customization",
      icon: FileText,
      action: handleExportDOCX,
    },
    {
      id: "json",
      name: "JSON",
      description: "Save your data to import later",
      icon: Code,
      action: handleExportJSON,
    },
  ]

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground mb-4">
        Your resume is ready to export! Choose your preferred format below.
      </p>

      <div className="grid gap-4">
        {exportOptions.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="p-4 hover:bg-muted/50 transition-colors cursor-pointer" onClick={option.action}>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <option.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{option.name}</h3>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h3 className="font-medium mb-2">What happens next?</h3>
        <p className="text-sm text-muted-foreground">
          After downloading your resume, you can submit it directly to job applications. Remember to tailor your resume
          for each position you apply for to increase your chances of success.
        </p>
      </div>
    </div>
  )
}

