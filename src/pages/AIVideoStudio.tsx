import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Video, 
  Play, 
  Pause,
  Square,
  Download, 
  Share,
  Edit,
  Trash2,
  Plus,
  Wand2,
  Camera,
  Mic,
  Settings,
  Clock,
  Eye,
  Upload
} from 'lucide-react'

export function AIVideoStudio() {
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  // Mock video data
  const videos = [
    {
      id: '1',
      title: 'Introduction - Google Application',
      company: 'Google',
      position: 'Senior Software Engineer',
      duration: '2:34',
      createdAt: '2 hours ago',
      status: 'completed',
      thumbnail: '/thumbnails/video1.jpg',
      views: 0,
      aiGenerated: true,
      script: 'Hi, I\'m excited to apply for the Senior Software Engineer position at Google...'
    },
    {
      id: '2',
      title: 'Personal Pitch - Microsoft',
      company: 'Microsoft',
      position: 'Product Manager',
      duration: '1:58',
      createdAt: '1 day ago',
      status: 'completed',
      thumbnail: '/thumbnails/video2.jpg',
      views: 3,
      aiGenerated: false,
      script: 'Hello Microsoft team, I\'m passionate about building products that impact millions...'
    },
    {
      id: '3',
      title: 'Skills Showcase',
      company: 'General',
      position: 'Various',
      duration: '3:12',
      createdAt: '3 days ago',
      status: 'processing',
      thumbnail: '/thumbnails/video3.jpg',
      views: 0,
      aiGenerated: true,
      script: 'Let me walk you through my technical skills and recent projects...'
    }
  ]

  const templates = [
    {
      id: '1',
      name: 'Professional Introduction',
      description: 'Standard introduction for job applications',
      duration: '2-3 minutes',
      sections: ['Greeting', 'Background', 'Skills', 'Interest', 'Closing']
    },
    {
      id: '2',
      name: 'Skills Showcase',
      description: 'Highlight your technical and soft skills',
      duration: '3-4 minutes',
      sections: ['Introduction', 'Technical Skills', 'Projects', 'Achievements', 'Call to Action']
    },
    {
      id: '3',
      name: 'Company-Specific Pitch',
      description: 'Tailored pitch for specific companies',
      duration: '2-3 minutes',
      sections: ['Personal Connection', 'Company Research', 'Value Proposition', 'Fit', 'Next Steps']
    },
    {
      id: '4',
      name: 'Career Change Story',
      description: 'Explain your career transition',
      duration: '3-5 minutes',
      sections: ['Current Background', 'Motivation', 'Transferable Skills', 'Learning Journey', 'Future Goals']
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleRecord = () => {
    if (!isRecording) {
      setIsRecording(true)
      setIsPaused(false)
      // Start recording timer
      const interval = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
      // Store interval ID for cleanup
      ;(window as any).recordingInterval = interval
    } else {
      setIsRecording(false)
      setIsPaused(false)
      setRecordingTime(0)
      clearInterval((window as any).recordingInterval)
    }
  }

  const handlePause = () => {
    setIsPaused(!isPaused)
    if (isPaused) {
      // Resume timer
      const interval = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
      ;(window as any).recordingInterval = interval
    } else {
      // Pause timer
      clearInterval((window as any).recordingInterval)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Video Studio</h1>
        <p className="text-muted-foreground">
          Create compelling video introductions with AI assistance
        </p>
      </div>

      <Tabs defaultValue="videos" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="videos">My Videos</TabsTrigger>
          <TabsTrigger value="record">Record</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="ai-script">AI Script</TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="space-y-4">
          {/* Quick Actions */}
          <div className="flex gap-4">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Video
            </Button>
            <Button variant="outline">
              <Wand2 className="w-4 h-4 mr-2" />
              AI Script Generator
            </Button>
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Upload Video
            </Button>
          </div>

          {/* Video Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">{videos.length}</p>
                    <p className="text-sm text-muted-foreground">Total Videos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-sm text-muted-foreground">Total Views</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold">2</p>
                    <p className="text-sm text-muted-foreground">AI Generated</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-2xl font-bold">8:44</p>
                    <p className="text-sm text-muted-foreground">Total Duration</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Video List */}
          <div className="grid gap-4">
            {videos.map((video) => (
              <Card key={video.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-24 h-16 bg-muted rounded-lg flex items-center justify-center">
                        <Video className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg">{video.title}</h3>
                          <Badge className={getStatusColor(video.status)}>
                            {video.status}
                          </Badge>
                          {video.aiGenerated && (
                            <Badge variant="outline" className="text-purple-600 border-purple-200">
                              <Wand2 className="w-3 h-3 mr-1" />
                              AI Generated
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{video.company} - {video.position}</span>
                          <span>•</span>
                          <span>Duration: {video.duration}</span>
                          <span>•</span>
                          <span>Created: {video.createdAt}</span>
                          <span>•</span>
                          <span>{video.views} views</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                      "{video.script.substring(0, 100)}..."
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Play className="w-4 h-4 mr-1" />
                          Play
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Share className="w-4 h-4 mr-1" />
                          Share
                        </Button>
                        <Button size="sm">
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

        <TabsContent value="record" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Recording Panel */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Video Recording</CardTitle>
                  <CardDescription>
                    Record your video introduction with real-time feedback
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Camera Preview */}
                  <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                    <div className="text-center text-white">
                      <Camera className="w-12 h-12 mx-auto mb-2" />
                      <p>Camera Preview</p>
                      {isRecording && (
                        <div className="flex items-center justify-center gap-2 mt-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-red-500 font-mono">
                            {formatTime(recordingTime)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Recording Controls */}
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      variant={isRecording ? "destructive" : "default"}
                      size="lg"
                      onClick={handleRecord}
                    >
                      {isRecording ? (
                        <>
                          <Square className="w-5 h-5 mr-2" />
                          Stop Recording
                        </>
                      ) : (
                        <>
                          <Video className="w-5 h-5 mr-2" />
                          Start Recording
                        </>
                      )}
                    </Button>
                    
                    {isRecording && (
                      <Button variant="outline" onClick={handlePause}>
                        {isPaused ? (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Resume
                          </>
                        ) : (
                          <>
                            <Pause className="w-4 h-4 mr-2" />
                            Pause
                          </>
                        )}
                      </Button>
                    )}
                  </div>

                  {/* Settings */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Camera Quality</label>
                      <Select defaultValue="hd">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hd">HD (720p)</SelectItem>
                          <SelectItem value="fhd">Full HD (1080p)</SelectItem>
                          <SelectItem value="4k">4K (2160p)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Audio Input</label>
                      <Select defaultValue="default">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Default Microphone</SelectItem>
                          <SelectItem value="external">External Microphone</SelectItem>
                          <SelectItem value="headset">Headset</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Script Panel */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Script & Notes</CardTitle>
                  <CardDescription>
                    Keep your talking points handy while recording
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Video Title</label>
                    <Input placeholder="e.g., Introduction - Google Application" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Target Company</label>
                    <Input placeholder="e.g., Google" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Position</label>
                    <Input placeholder="e.g., Senior Software Engineer" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Script / Talking Points</label>
                    <Textarea 
                      placeholder="Write your script or key talking points here..."
                      rows={8}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Wand2 className="w-4 h-4 mr-2" />
                      Generate AI Script
                    </Button>
                    <Button variant="outline">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Video Templates</CardTitle>
              <CardDescription>
                Choose from proven templates to structure your video introduction
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{template.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {template.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{template.duration}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Structure:</h4>
                      <div className="space-y-1">
                        {template.sections.map((section, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium">
                              {index + 1}
                            </div>
                            <span>{section}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Preview
                      </Button>
                      <Button size="sm" className="flex-1">
                        Use Template
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ai-script" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Input Panel */}
            <Card>
              <CardHeader>
                <CardTitle>AI Script Generator</CardTitle>
                <CardDescription>
                  Generate personalized video scripts based on your background and target role
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Target Company</label>
                  <Input placeholder="e.g., Google" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Position</label>
                  <Input placeholder="e.g., Senior Software Engineer" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Background</label>
                  <Textarea 
                    placeholder="Briefly describe your experience, skills, and achievements..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Video Type</label>
                  <Select defaultValue="introduction">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="introduction">Professional Introduction</SelectItem>
                      <SelectItem value="skills">Skills Showcase</SelectItem>
                      <SelectItem value="company-specific">Company-Specific Pitch</SelectItem>
                      <SelectItem value="career-change">Career Change Story</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Tone</label>
                  <Select defaultValue="professional">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="confident">Confident</SelectItem>
                      <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full">
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate Script
                </Button>
              </CardContent>
            </Card>

            {/* Output Panel */}
            <Card>
              <CardHeader>
                <CardTitle>Generated Script</CardTitle>
                <CardDescription>
                  Your AI-generated video script with timing suggestions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-4">
                    Click "Generate Script" to create your personalized video script
                  </p>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex gap-3">
                      <span className="text-primary font-medium">[0:00-0:15]</span>
                      <p>Opening & Greeting</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-primary font-medium">[0:15-0:45]</span>
                      <p>Background & Experience</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-primary font-medium">[0:45-1:30]</span>
                      <p>Skills & Achievements</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-primary font-medium">[1:30-2:00]</span>
                      <p>Interest in Company/Role</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-primary font-medium">[2:00-2:30]</span>
                      <p>Closing & Call to Action</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Script
                  </Button>
                  <Button className="flex-1">
                    <Video className="w-4 h-4 mr-2" />
                    Start Recording
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}