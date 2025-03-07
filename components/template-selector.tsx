"use client"

import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

export function TemplateSelector({ selectedTemplate, onChange }) {
  const templates = [
    {
      id: "modern",
      name: "Modern",
      description: "Clean and contemporary design with a touch of color",
      image: "/placeholder.svg?height=120&width=90",
    },
    {
      id: "minimalist",
      name: "Minimalist",
      description: "Simple and elegant design with plenty of white space",
      image: "/placeholder.svg?height=120&width=90",
    },
    {
      id: "professional",
      name: "Professional",
      description: "Traditional layout ideal for corporate environments",
      image: "/placeholder.svg?height=120&width=90",
    },
    {
      id: "creative",
      name: "Creative",
      description: "Bold design for creative industries and portfolios",
      image: "/placeholder.svg?height=120&width=90",
    },
  ]

  return (
    <RadioGroup value={selectedTemplate} onValueChange={onChange} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {templates.map((template) => (
        <div key={template.id} className="relative">
          <RadioGroupItem value={template.id} id={template.id} className="sr-only" />
          <Label htmlFor={template.id} className="cursor-pointer block">
            <Card
              className={`p-4 h-full transition-all ${
                selectedTemplate === template.id
                  ? "border-primary ring-2 ring-primary ring-offset-2"
                  : "hover:border-primary/50"
              }`}
            >
              <div className="flex flex-col h-full">
                <div className="mb-3 flex justify-center">
                  <img
                    src={template.image || "/placeholder.svg"}
                    alt={template.name}
                    className="h-[120px] w-[90px] object-cover border"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-medium">{template.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                </div>
              </div>
              {selectedTemplate === template.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center"
                >
                  ✓
                </motion.div>
              )}
            </Card>
          </Label>
        </div>
      ))}
    </RadioGroup>
  )
}

