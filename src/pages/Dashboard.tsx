import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Search, 
  Users, 
  FileText, 
  Video, 
  Briefcase,
  TrendingUp,
  Calendar,
  Target,
  ArrowRight,
  CheckCircle,
  Clock,
  Plus,
  Bell,
  MoreHorizontal,
  Building,
  MapPin,
  Wand2,
  UserPlus,
  ExternalLink,
  Star,
  Bookmark,
  Archive,
  Trash2,
  Edit3
} from 'lucide-react'

interface DashboardProps {
  onPageChange: (page: string) => void
}

type ApplicationStatus = 'Applied' | 'Interviewing' | 'Decision' | 'Saved' | 'Archived'

interface ApplicationKit {
  id: string
  company: string
  position: string
  location: string
  skillMatch: number
  status: ApplicationStatus
  progress: number
  completedItems: string[]
  pendingItems: string[]
  lastUpdated: string
  avatar: string
  jobUrl?: string
  priority: 'high' | 'medium' | 'low'
  deadline?: string
}

interface NextStep {
  id: string
  task: string
  action: string
  icon: any
  completed: boolean
  priority: 'high' | 'medium' | 'low'
  dueDate?: string
}

export function Dashboard({ onPageChange }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<ApplicationStatus>('Applied')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedKits, setSelectedKits] = useState<string[]>([])
  
  // Mock application kits data with enhanced details
  const [applicationKits, setApplicationKits] = useState<ApplicationKit[]>([
    {
      id: '1',
      company: 'Amazon Pay',
      position: 'Senior Software Engineer',
      location: 'Seattle, US',
      skillMatch: 65,
      status: 'Applied',
      progress: 25,
      completedItems: ['Resume'],
      pendingItems: ['AI Interview', 'Referral', 'Cover Video'],
      lastUpdated: '5 hours ago',
      avatar: 'A',
      jobUrl: 'https://amazon.jobs/en/jobs/123456',
      priority: 'high',
      deadline: '2024-01-25'
    },
    {
      id: '2', 
      company: 'Amazon',
      position: 'Senior Software Engineer',
      location: 'California, US',
      skillMatch: 65,
      status: 'Applied',
      progress: 50,
      completedItems: ['Resume', 'AI Interview'],
      pendingItems: ['Referral', 'Cover Video'],
      lastUpdated: '5 hours ago',
      avatar: 'a',
      jobUrl: 'https://amazon.jobs/en/jobs/789012',
      priority: 'medium'
    },
    {
      id: '3',
      company: 'Google',
      position: 'Senior Software Engineer', 
      location: 'California, US',
      skillMatch: 65,
      status: 'Applied',
      progress: 100,
      completedItems: ['Resume', 'AI Interview', 'Referral', 'Cover Video'],
      pendingItems: [],
      lastUpdated: '5 hours ago',
      avatar: 'G',
      jobUrl: 'https://careers.google.com/jobs/123',
      priority: 'high'
    },
    {
      id: '4',
      company: 'Microsoft',
      position: 'Principal Engineer',
      location: 'Redmond, US',
      skillMatch: 78,
      status: 'Interviewing',
      progress: 75,
      completedItems: ['Resume', 'AI Interview', 'Referral'],
      pendingItems: ['Cover Video'],
      lastUpdated: '2 hours ago',
      avatar: 'M',
      priority: 'high',
      deadline: '2024-01-20'
    },
    {
      id: '5',
      company: 'Meta',
      position: 'Staff Software Engineer',
      location: 'Menlo Park, US',
      skillMatch: 82,
      status: 'Decision',
      progress: 100,
      completedItems: ['Resume', 'AI Interview', 'Referral', 'Cover Video'],
      pendingItems: [],
      lastUpdated: '1 day ago',
      avatar: 'M',
      priority: 'high'
    },
    {
      id: '6',
      company: 'Netflix',
      position: 'Senior Backend Engineer',
      location: 'Los Gatos, US',
      skillMatch: 71,
      status: 'Saved',
      progress: 0,
      completedItems: [],
      pendingItems: ['Resume', 'AI Interview', 'Referral', 'Cover Video'],
      lastUpdated: '3 days ago',
      avatar: 'N',
      priority: 'low'
    }
  ])

  const [nextSteps, setNextSteps] = useState<NextStep[]>([
    {
      id: '1',
      task: 'Find Referral for Amazon, California.',
      action: 'Search for Referral',
      icon: Users,
      completed: false,
      priority: 'high',
      dueDate: '2024-01-22'
    },
    {
      id: '2', 
      task: 'Take AI Interview to complete your application for Amazon Pay, Seattle.',
      action: 'Take AI Interview',
      icon: Wand2,
      completed: false,
      priority: 'high',
      dueDate: '2024-01-20'
    },
    {
      id: '3',
      task: 'Boost your application score for 3 of your saved jobs by taking a skill assessment.',
      action: 'View Learning Modules',
      icon: Target,
      completed: false,
      priority: 'medium'
    },
    {
      id: '4',
      task: 'Update your resume with latest project experience.',
      action: 'Edit Resume',
      icon: FileText,
      completed: true,
      priority: 'medium'
    }
  ])

  const statusTabs: { status: ApplicationStatus; count: number }[] = [
    { status: 'Applied', count: applicationKits.filter(k => k.status === 'Applied').length },
    { status: 'Interviewing', count: applicationKits.filter(k => k.status === 'Interviewing').length },
    { status: 'Decision', count: applicationKits.filter(k => k.status === 'Decision').length },
    { status: 'Saved', count: applicationKits.filter(k => k.status === 'Saved').length },
    { status: 'Archived', count: applicationKits.filter(k => k.status === 'Archived').length }
  ]

  const filteredKits = applicationKits.filter(kit => {
    const matchesTab = kit.status === activeTab
    const matchesSearch = searchQuery === '' || 
      kit.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kit.position.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case 'Applied':
        return 'bg-blue-100 text-blue-800'
      case 'Interviewing':
        return 'bg-green-100 text-green-800'
      case 'Decision':
        return 'bg-yellow-100 text-yellow-800'
      case 'Saved':
        return 'bg-gray-100 text-gray-800'
      case 'Archived':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return 'text-red-600'
      case 'medium':
        return 'text-yellow-600'
      case 'low':
        return 'text-green-600'
      default:
        return 'text-gray-600'
    }
  }

  const handleKitSelection = (kitId: string) => {
    setSelectedKits(prev => 
      prev.includes(kitId) 
        ? prev.filter(id => id !== kitId)
        : [...prev, kitId]
    )
  }

  const handleSelectAll = () => {
    if (selectedKits.length === filteredKits.length) {
      setSelectedKits([])
    } else {
      setSelectedKits(filteredKits.map(kit => kit.id))
    }
  }

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on kits:`, selectedKits)
    // Here you would implement the actual bulk actions
    setSelectedKits([])
  }

  const handleStepToggle = (stepId: string) => {
    setNextSteps(prev => prev.map(step => 
      step.id === stepId 
        ? { ...step, completed: !step.completed }
        : step
    ))
  }

  const handleActionClick = (action: string, kitId?: string) => {
    switch (action) {
      case 'AI Interview':
        onPageChange('video')
        break
      case 'Find Referral':
        onPageChange('referrals')
        break
      case 'Cover Video':
        onPageChange('video')
        break
      case 'Edit Resume':
        onPageChange('resume')
        break
      case 'View Learning Modules':
        onPageChange('analytics')
        break
      case 'Search for Referral':
        onPageChange('referrals')
        break
      case 'Take AI Interview':
        onPageChange('video')
        break
      default:
        console.log(`Action: ${action}`, kitId)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with Search */}
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for a company, role, or person"
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm">
            <Bell className="w-4 h-4" />
          </Button>
          <Avatar className="w-8 h-8">
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content - Application Kits */}
        <div className="lg:col-span-2 space-y-6">
          {/* Application Kits Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Your Application Kits</h1>
            {selectedKits.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {selectedKits.length} selected
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleBulkAction('archive')}
                >
                  <Archive className="w-4 h-4 mr-1" />
                  Archive
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleBulkAction('delete')}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            )}
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-6 border-b">
            {statusTabs.map(({ status, count }) => (
              <button 
                key={status}
                className={`pb-2 border-b-2 font-medium transition-colors ${
                  activeTab === status 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setActiveTab(status)}
              >
                {status === 'Applied' && '•'} {status} {count > 0 && `(${count})`} {status !== 'Applied' && status !== 'Archived' && '•'}
              </button>
            ))}
          </div>

          {/* Bulk Actions Bar */}
          {filteredKits.length > 0 && (
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <Checkbox 
                checked={selectedKits.length === filteredKits.length}
                onCheckedChange={handleSelectAll}
              />
              <span className="text-sm font-medium">
                Select all ({filteredKits.length})
              </span>
            </div>
          )}

          {/* Application Kits List */}
          <div className="space-y-4">
            {filteredKits.length === 0 ? (
              <Card className="p-8 text-center">
                <div className="space-y-3">
                  <Briefcase className="w-12 h-12 mx-auto text-muted-foreground" />
                  <h3 className="text-lg font-medium">No applications found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery ? 'Try adjusting your search terms' : `No applications in ${activeTab} status`}
                  </p>
                  <Button onClick={() => onPageChange('jobs')}>
                    <Plus className="w-4 h-4 mr-2" />
                    Find Jobs
                  </Button>
                </div>
              </Card>
            ) : (
              filteredKits.map((kit) => (
                <Card key={kit.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="flex items-center gap-3">
                          <Checkbox 
                            checked={selectedKits.includes(kit.id)}
                            onCheckedChange={() => handleKitSelection(kit.id)}
                          />
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                              {kit.avatar}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-lg">{kit.company}</h3>
                            <Badge className="bg-green-100 text-green-800">
                              {kit.skillMatch}% Skill Match
                            </Badge>
                            <Badge className={getStatusColor(kit.status)}>
                              • {kit.status}
                            </Badge>
                            {kit.priority === 'high' && (
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4" />
                              {kit.position}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {kit.location}
                            </div>
                            {kit.deadline && (
                              <div className="flex items-center gap-1 text-red-600">
                                <Calendar className="w-4 h-4" />
                                Due {kit.deadline}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {kit.jobUrl && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => window.open(kit.jobUrl, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Progress */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Application Kit Progress</span>
                          <span className="font-medium">{kit.progress}%</span>
                        </div>
                        <Progress value={kit.progress} className="h-2" />
                      </div>

                      {/* Completed Items */}
                      <div className="flex flex-wrap gap-2">
                        {kit.completedItems.map((item, index) => (
                          <Badge key={index} variant="outline" className="text-green-600 border-green-200">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {item}
                          </Badge>
                        ))}
                        {kit.pendingItems.map((item, index) => (
                          <Badge key={index} variant="outline" className="text-gray-500 border-gray-200">
                            <Clock className="w-3 h-3 mr-1" />
                            {item}
                          </Badge>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex gap-2">
                          {kit.pendingItems.includes('AI Interview') && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleActionClick('AI Interview', kit.id)}
                            >
                              <Wand2 className="w-4 h-4 mr-1" />
                              Add AI Interview
                            </Button>
                          )}
                          {kit.pendingItems.includes('Referral') && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleActionClick('Find Referral', kit.id)}
                            >
                              <UserPlus className="w-4 h-4 mr-1" />
                              Find Referral
                            </Button>
                          )}
                          {kit.pendingItems.includes('Cover Video') && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleActionClick('Cover Video', kit.id)}
                            >
                              <Video className="w-4 h-4 mr-1" />
                              Add Cover Video
                            </Button>
                          )}
                          {kit.progress === 100 && kit.status === 'Applied' && (
                            <Button size="sm">
                              <ArrowRight className="w-4 h-4 mr-1" />
                              Submit Application
                            </Button>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-medium ${getPriorityColor(kit.priority)}`}>
                            {kit.priority.toUpperCase()}
                          </span>
                          <p className="text-xs text-muted-foreground">
                            Updated {kit.lastUpdated}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Start New Section */}
          <Card>
            <CardHeader>
              <CardTitle>Start New</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => onPageChange('resume')}
              >
                <FileText className="w-4 h-4 mr-2" />
                Create New Kit
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => onPageChange('referrals')}
              >
                <Users className="w-4 h-4 mr-2" />
                Find Referrals
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => onPageChange('video')}
              >
                <Video className="w-4 h-4 mr-2" />
                Take Mock Interview
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => onPageChange('analytics')}
              >
                <Target className="w-4 h-4 mr-2" />
                Take Skill Assessment
              </Button>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Next steps for you</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    const newStep: NextStep = {
                      id: Date.now().toString(),
                      task: 'New task',
                      action: 'Complete task',
                      icon: Target,
                      completed: false,
                      priority: 'medium'
                    }
                    setNextSteps(prev => [...prev, newStep])
                  }}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {nextSteps.map((step) => (
                <div key={step.id} className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Checkbox 
                      checked={step.completed}
                      onCheckedChange={() => handleStepToggle(step.id)}
                      className="mt-0.5"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <p className={`text-sm ${step.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {step.task}
                        </p>
                        {step.priority === 'high' && (
                          <Star className="w-3 h-3 text-red-500 fill-current ml-2" />
                        )}
                      </div>
                      {step.dueDate && (
                        <p className="text-xs text-muted-foreground">
                          Due: {step.dueDate}
                        </p>
                      )}
                      {!step.completed && (
                        <Button 
                          variant="link" 
                          className="h-auto p-0 text-blue-600"
                          onClick={() => handleActionClick(step.action)}
                        >
                          {step.action} <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {applicationKits.filter(k => k.status === 'Applied').length}
                  </div>
                  <div className="text-xs text-muted-foreground">Active Apps</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {applicationKits.filter(k => k.status === 'Interviewing').length}
                  </div>
                  <div className="text-xs text-muted-foreground">Interviews</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {Math.round(applicationKits.reduce((acc, kit) => acc + kit.skillMatch, 0) / applicationKits.length)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Avg Match</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {nextSteps.filter(s => !s.completed).length}
                  </div>
                  <div className="text-xs text-muted-foreground">Pending</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}