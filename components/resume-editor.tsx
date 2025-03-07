"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"

export function ResumeEditor({ resumeData, onChange }) {
  const [activeTab, setActiveTab] = useState("personal")

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target
    onChange({
      personalInfo: {
        ...resumeData.personalInfo,
        [name]: value,
      },
    })
  }

  const handleSummaryChange = (e) => {
    onChange({ summary: e.target.value })
  }

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...resumeData.experience]
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    }
    onChange({ experience: updatedExperience })
  }

  const addExperience = () => {
    onChange({
      experience: [
        ...resumeData.experience,
        {
          title: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
          achievements: [],
        },
      ],
    })
  }

  const removeExperience = (index) => {
    const updatedExperience = [...resumeData.experience]
    updatedExperience.splice(index, 1)
    onChange({ experience: updatedExperience })
  }

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...resumeData.education]
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    }
    onChange({ education: updatedEducation })
  }

  const addEducation = () => {
    onChange({
      education: [
        ...resumeData.education,
        {
          degree: "",
          institution: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    })
  }

  const removeEducation = (index) => {
    const updatedEducation = [...resumeData.education]
    updatedEducation.splice(index, 1)
    onChange({ education: updatedEducation })
  }

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...resumeData.skills]
    updatedSkills[index] = value
    onChange({ skills: updatedSkills })
  }

  const addSkill = () => {
    onChange({
      skills: [...resumeData.skills, ""],
    })
  }

  const removeSkill = (index) => {
    const updatedSkills = [...resumeData.skills]
    updatedSkills.splice(index, 1)
    onChange({ skills: updatedSkills })
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-5 mb-6">
        <TabsTrigger value="personal">Personal</TabsTrigger>
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="experience">Experience</TabsTrigger>
        <TabsTrigger value="education">Education</TabsTrigger>
        <TabsTrigger value="skills">Skills</TabsTrigger>
      </TabsList>

      <TabsContent value="personal" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={resumeData.personalInfo.name || ""}
              onChange={handlePersonalInfoChange}
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={resumeData.personalInfo.email || ""}
              onChange={handlePersonalInfoChange}
              placeholder="john.doe@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              value={resumeData.personalInfo.phone || ""}
              onChange={handlePersonalInfoChange}
              placeholder="(123) 456-7890"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={resumeData.personalInfo.location || ""}
              onChange={handlePersonalInfoChange}
              placeholder="New York, NY"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website (Optional)</Label>
            <Input
              id="website"
              name="website"
              value={resumeData.personalInfo.website || ""}
              onChange={handlePersonalInfoChange}
              placeholder="www.johndoe.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn (Optional)</Label>
            <Input
              id="linkedin"
              name="linkedin"
              value={resumeData.personalInfo.linkedin || ""}
              onChange={handlePersonalInfoChange}
              placeholder="linkedin.com/in/johndoe"
            />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="summary" className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="summary">Professional Summary</Label>
          <Textarea
            id="summary"
            value={resumeData.summary || ""}
            onChange={handleSummaryChange}
            placeholder="Experienced software engineer with a passion for developing innovative solutions..."
            className="min-h-[200px]"
          />
        </div>
      </TabsContent>

      <TabsContent value="experience" className="space-y-6">
        {resumeData.experience.map((exp, index) => (
          <Card key={index} className="p-4 relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => removeExperience(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor={`job-title-${index}`}>Job Title</Label>
                <Input
                  id={`job-title-${index}`}
                  value={exp.title || ""}
                  onChange={(e) => handleExperienceChange(index, "title", e.target.value)}
                  placeholder="Software Engineer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`company-${index}`}>Company</Label>
                <Input
                  id={`company-${index}`}
                  value={exp.company || ""}
                  onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                  placeholder="Acme Inc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`location-${index}`}>Location</Label>
                <Input
                  id={`location-${index}`}
                  value={exp.location || ""}
                  onChange={(e) => handleExperienceChange(index, "location", e.target.value)}
                  placeholder="New York, NY"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor={`start-date-${index}`}>Start Date</Label>
                  <Input
                    id={`start-date-${index}`}
                    value={exp.startDate || ""}
                    onChange={(e) => handleExperienceChange(index, "startDate", e.target.value)}
                    placeholder="Jan 2020"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`end-date-${index}`}>End Date</Label>
                  <Input
                    id={`end-date-${index}`}
                    value={exp.endDate || ""}
                    onChange={(e) => handleExperienceChange(index, "endDate", e.target.value)}
                    placeholder="Present"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`description-${index}`}>Description</Label>
              <Textarea
                id={`description-${index}`}
                value={exp.description || ""}
                onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                placeholder="Describe your responsibilities and achievements..."
                className="min-h-[100px]"
              />
            </div>
          </Card>
        ))}
        <Button onClick={addExperience} className="w-full" variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Add Experience
        </Button>
      </TabsContent>

      <TabsContent value="education" className="space-y-6">
        {resumeData.education.map((edu, index) => (
          <Card key={index} className="p-4 relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => removeEducation(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor={`degree-${index}`}>Degree</Label>
                <Input
                  id={`degree-${index}`}
                  value={edu.degree || ""}
                  onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                  placeholder="Bachelor of Science in Computer Science"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`institution-${index}`}>Institution</Label>
                <Input
                  id={`institution-${index}`}
                  value={edu.institution || ""}
                  onChange={(e) => handleEducationChange(index, "institution", e.target.value)}
                  placeholder="University of Technology"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`edu-location-${index}`}>Location</Label>
                <Input
                  id={`edu-location-${index}`}
                  value={edu.location || ""}
                  onChange={(e) => handleEducationChange(index, "location", e.target.value)}
                  placeholder="Boston, MA"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor={`edu-start-date-${index}`}>Start Date</Label>
                  <Input
                    id={`edu-start-date-${index}`}
                    value={edu.startDate || ""}
                    onChange={(e) => handleEducationChange(index, "startDate", e.target.value)}
                    placeholder="Sep 2016"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`edu-end-date-${index}`}>End Date</Label>
                  <Input
                    id={`edu-end-date-${index}`}
                    value={edu.endDate || ""}
                    onChange={(e) => handleEducationChange(index, "endDate", e.target.value)}
                    placeholder="May 2020"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`edu-description-${index}`}>Description (Optional)</Label>
              <Textarea
                id={`edu-description-${index}`}
                value={edu.description || ""}
                onChange={(e) => handleEducationChange(index, "description", e.target.value)}
                placeholder="Relevant coursework, honors, etc."
              />
            </div>
          </Card>
        ))}
        <Button onClick={addEducation} className="w-full" variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Add Education
        </Button>
      </TabsContent>

      <TabsContent value="skills" className="space-y-6">
        <div className="space-y-4">
          {resumeData.skills.map((skill, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={skill || ""}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                placeholder="JavaScript"
              />
              <Button variant="ghost" size="icon" onClick={() => removeSkill(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <Button onClick={addSkill} className="w-full" variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Add Skill
        </Button>
      </TabsContent>
    </Tabs>
  )
}

