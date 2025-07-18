import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  FileText, 
  Download, 
  Eye,
  Edit,
  Copy,
  Trash2,
  Plus,
  Wand2,
  Target,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react'

export function ResumeBuilder() {
  const [selectedResume, setSelectedResume] = useState<string | null>(null)

  // Mock resume data
  const resumes = [
    {
      id: '1',
      name: 'Software Engineer - Google',
      jobTitle: 'Senior Software Engineer',
      company: 'Google',
      lastModified: '2 hours ago',
      status: 'optimized',
      matchScore: 92,
      template: 'Modern',
      sections: ['Contact', 'Summary', 'Experience', 'Skills', 'Education'],
      tailoredFor: 'Google - Senior Software Engineer'
    },
    {
      id: '2',
      name: 'Product Manager - Microsoft',
      jobTitle: 'Product Manager',
      company: 'Microsoft',
      lastModified: '1 day ago',
      status: 'draft',
      matchScore: 78,
      template: 'Professional',
      sections: ['Contact', 'Summary', 'Experience', 'Skills', 'Education', 'Projects'],
      tailoredFor: 'Microsoft - Product Manager'
    },
    {
      id: '3',
      name: 'Master Resume',
      jobTitle: 'General',
      company: 'All',
      lastModified: '3 days ago',
      status: 'complete',
      matchScore: null,
      template: 'Classic',
      sections: ['Contact', 'Summary', 'Experience', 'Skills', 'Education', 'Projects', 'Certifications'],
      tailoredFor: null
    }
  ]

  const templates = [
    {
      id: '1',
      name: 'Modern',
      description: 'Clean and contemporary design',
      preview: '/templates/modern.png',
      popular: true
    },
    {
      id: '2',
      name: 'Professional',
      description: 'Traditional corporate style',
      preview: '/templates/professional.png',
      popular: false
    },
    {
      id: '3',
      name: 'Creative',
      description: 'Bold and eye-catching layout',
      preview: '/templates/creative.png',
      popular: false
    },
    {
      id: '4',
      name: 'Minimal',
      description: 'Simple and elegant design',
      preview: '/templates/minimal.png',
      popular: true
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimized':
        return 'bg-green-100 text-green-800'
      case 'complete':
        return 'bg-blue-100 text-blue-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'optimized':
        return <CheckCircle className="w-4 h-4" />
      case 'complete':
        return <CheckCircle className="w-4 h-4" />
      case 'draft':
        return <Clock className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Resume Builder</h1>
        <p className="text-muted-foreground">
          Create and customize resumes tailored for specific job applications
        </p>
      </div>

      <Tabs defaultValue="resumes" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="resumes">My Resumes</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="editor">Editor</TabsTrigger>
        </TabsList>

        <TabsContent value="resumes" className="space-y-4">
          {/* Quick Actions */}
          <div className="flex gap-4">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create New Resume
            </Button>
            <Button variant="outline">
              <Wand2 className="w-4 h-4 mr-2" />
              AI Resume Builder
            </Button>
            <Button variant="outline">
              <Target className="w-4 h-4 mr-2" />
              Tailor for Job
            </Button>
          </div>

          {/* Resume Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">{resumes.length}</p>
                    <p className="text-sm text-muted-foreground">Total Resumes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">2</p>
                    <p className="text-sm text-muted-foreground">Optimized</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold">85%</p>
                    <p className="text-sm text-muted-foreground">Avg Match Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-sm text-muted-foreground">Downloads</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resume List */}
          <div className="grid gap-4">
            {resumes.map((resume) => (
              <Card key={resume.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg">{resume.name}</h3>
                        <Badge className={getStatusColor(resume.status)}>
                          {getStatusIcon(resume.status)}
                          <span className="ml-1 capitalize">{resume.status}</span>
                        </Badge>
                        {resume.matchScore && (
                          <Badge variant="outline" className="text-green-600 border-green-200">
                            {resume.matchScore}% Match
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Template: {resume.template}</span>
                        <span>•</span>
                        <span>Modified: {resume.lastModified}</span>
                        {resume.tailoredFor && (
                          <>
                            <span>•</span>
                            <span>Tailored for: {resume.tailoredFor}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {resume.sections.map((section, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {section}
                        </Badge>
                      ))}
                    </div>

                    {resume.matchScore && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Job Match Score</span>
                          <span>{resume.matchScore}%</span>
                        </div>
                        <Progress value={resume.matchScore} className="w-full" />
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          Download PDF
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          Preview
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Wand2 className="w-4 h-4 mr-1" />
                          AI Optimize
                        </Button>
                        <Button size="sm" onClick={() => setSelectedResume(resume.id)}>
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resume Templates</CardTitle>
              <CardDescription>
                Choose from professionally designed templates to create your resume
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center mb-4">
                    <FileText className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{template.name}</h3>
                      {template.popular && (
                        <Badge variant="outline" className="text-orange-600 border-orange-200">
                          <Star className="w-3 h-3 mr-1" />
                          Popular
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {template.description}
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                    <Button size="sm" className="flex-1">
                      Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="editor" className="space-y-4">
          {selectedResume ? (
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Editor Panel */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Resume Editor</CardTitle>
                    <CardDescription>
                      Edit your resume content and see changes in real-time
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <Input placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Professional Title</label>
                      <Input placeholder="Senior Software Engineer" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input placeholder="john.doe@email.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone</label>
                      <Input placeholder="+1 (555) 123-4567" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Professional Summary</label>
                      <Textarea 
                        placeholder="Write a compelling summary of your professional experience..."
                        rows={4}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline">
                        <Wand2 className="w-4 h-4 mr-2" />
                        AI Enhance
                      </Button>
                      <Button>
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Preview Panel */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Live Preview</CardTitle>
                    <CardDescription>
                      See how your resume will look to employers
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-[3/4] bg-white border rounded-lg p-6 shadow-sm">
                      <div className="space-y-4">
                        <div className="text-center border-b pb-4">
                          <h2 className="text-xl font-bold">John Doe</h2>
                          <p className="text-muted-foreground">Senior Software Engineer</p>
                          <p className="text-sm text-muted-foreground">
                            john.doe@email.com • +1 (555) 123-4567
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Professional Summary</h3>
                          <p className="text-sm text-muted-foreground">
                            Experienced software engineer with 5+ years of experience...
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Experience</h3>
                          <div className="space-y-2">
                            <div>
                              <p className="font-medium text-sm">Senior Software Engineer</p>
                              <p className="text-xs text-muted-foreground">Google • 2021 - Present</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Resume Selected</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Select a resume from the "My Resumes" tab to start editing
                </p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Resume
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}