"use client"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function JobAnalyzer({ jobDescription, onChange, onAnalyze, isAnalyzing, suggestions }) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Paste the job description below and our AI will analyze it to help tailor your resume.
        </p>
        <Textarea
          value={jobDescription}
          onChange={onChange}
          placeholder="Paste job description here..."
          className="min-h-[200px]"
        />
      </div>

      <Button onClick={onAnalyze} disabled={isAnalyzing || !jobDescription.trim()} className="w-full">
        {isAnalyzing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
          </>
        ) : (
          "Analyze Job Description"
        )}
      </Button>

      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-4 bg-primary/5 border-primary/20">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                AI Suggestions
              </h3>
              <ul className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                    className="flex items-start gap-2 text-sm"
                  >
                    <span className="text-primary mt-1">•</span>
                    <span>{suggestion}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-4 p-3 bg-background rounded-md border text-sm">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <p>
                    These suggestions are based on AI analysis of the job description. Consider incorporating them into
                    your resume to increase your chances of getting noticed.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

