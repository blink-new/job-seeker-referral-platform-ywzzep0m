import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Search, 
  Building, 
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  ExternalLink,
  FileText,
  Video,
  Users,
  Mail,
  Phone
} from 'lucide-react'

export function Applications() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Mock application data
  const applications = [
    {
      id: '1',
      company: 'Google',
      position: 'Senior Software Engineer',
      location: 'Mountain View, CA',
      appliedDate: '2024-01-15',
      status: 'interviewing',
      stage: 'Technical Interview',
      progress: 75,
      salary: '$150k - $200k',
      jobType: 'Full-time',
      remote: true,
      logo: '',
      nextStep: 'System Design Interview',
      nextStepDate: '2024-01-22',
      contacts: [
        { name: 'Sarah Chen', role: 'Hiring Manager', email: 'sarah.chen@google.com' }
      ],
      documents: ['Resume', 'Cover Letter'],
      notes: 'Great conversation with the team. They seem excited about my background in distributed systems.',
      applicationKit: {
        resume: true,
        coverLetter: true,
        aiInterview: true,
        referral: true,
        coverVideo: false
      }
    },
    {
      id: '2',
      company: 'Microsoft',
      position: 'Product Manager',
      location: 'Seattle, WA',
      appliedDate: '2024-01-10',
      status: 'applied',
      stage: 'Application Review',
      progress: 25,
      salary: '$130k - $180k',
      jobType: 'Full-time',
      remote: false,
      logo: '',
      nextStep: 'Waiting for response',
      nextStepDate: null,
      contacts: [],
      documents: ['Resume', 'Cover Letter', 'Portfolio'],
      notes: 'Applied through referral from Maria Garcia. Strong match for Azure team.',
      applicationKit: {
        resume: true,
        coverLetter: true,
        aiInterview: false,
        referral: true,
        coverVideo: true
      }
    },
    {
      id: '3',
      company: 'Apple',
      position: 'iOS Developer',
      location: 'Cupertino, CA',
      appliedDate: '2024-01-08',
      status: 'rejected',
      stage: 'Final Decision',
      progress: 100,
      salary: '$140k - $190k',
      jobType: 'Full-time',
      remote: false,
      logo: '',
      nextStep: 'Application closed',
      nextStepDate: null,
      contacts: [
        { name: 'Emily Johnson', role: 'Technical Lead', email: 'emily.j@apple.com' }
      ],
      documents: ['Resume', 'Cover Letter'],
      notes: 'Feedback: Strong technical skills but looking for more iOS-specific experience.',
      applicationKit: {
        resume: true,
        coverLetter: true,
        aiInterview: true,
        referral: false,
        coverVideo: false
      }
    },
    {
      id: '4',
      company: 'Netflix',
      position: 'Frontend Developer',
      location: 'Los Gatos, CA',
      appliedDate: '2024-01-20',
      status: 'offer',
      stage: 'Offer Negotiation',
      progress: 90,
      salary: '$120k - $160k',
      jobType: 'Contract',
      remote: true,
      logo: '',
      nextStep: 'Salary negotiation call',
      nextStepDate: '2024-01-25',
      contacts: [
        { name: 'David Kim', role: 'Engineering Manager', email: 'david.k@netflix.com' }
      ],
      documents: ['Resume', 'Portfolio'],
      notes: 'Received offer! Need to negotiate salary and start date.',
      applicationKit: {
        resume: true,
        coverLetter: false,
        aiInterview: true,
        referral: false,
        coverVideo: true
      }
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied':
        return 'bg-blue-100 text-blue-800'
      case 'interviewing':
        return 'bg-yellow-100 text-yellow-800'
      case 'offer':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'withdrawn':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'applied':
        return <Clock className="w-4 h-4" />
      case 'interviewing':
        return <AlertCircle className="w-4 h-4" />
      case 'offer':
        return <CheckCircle className="w-4 h-4" />
      case 'rejected':
        return <XCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const filteredApplications = applications.filter(app => {
    const matchesSearch = !searchQuery || 
      app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.position.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const statusCounts = {
    all: applications.length,
    applied: applications.filter(app => app.status === 'applied').length,
    interviewing: applications.filter(app => app.status === 'interviewing').length,
    offer: applications.filter(app => app.status === 'offer').length,
    rejected: applications.filter(app => app.status === 'rejected').length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
        <p className="text-muted-foreground">
          Track and manage your job applications with detailed progress monitoring
        </p>
      </div>

      {/* Application Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{statusCounts.all}</p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{statusCounts.applied}</p>
                <p className="text-sm text-muted-foreground">Applied</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{statusCounts.interviewing}</p>
                <p className="text-sm text-muted-foreground">Interviewing</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{statusCounts.offer}</p>
                <p className="text-sm text-muted-foreground">Offers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{statusCounts.rejected}</p>
                <p className="text-sm text-muted-foreground">Rejected</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by company or position..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status ({statusCounts.all})</SelectItem>
                <SelectItem value="applied">Applied ({statusCounts.applied})</SelectItem>
                <SelectItem value="interviewing">Interviewing ({statusCounts.interviewing})</SelectItem>
                <SelectItem value="offer">Offers ({statusCounts.offer})</SelectItem>
                <SelectItem value="rejected">Rejected ({statusCounts.rejected})</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Applications List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredApplications.length} application{filteredApplications.length !== 1 ? 's' : ''} found
          </p>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Application
          </Button>
        </div>

        <div className="grid gap-4">
          {filteredApplications.map((app) => (
            <Card key={app.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={app.logo} />
                      <AvatarFallback>
                        {app.company.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg">{app.position}</h3>
                        <Badge className={getStatusColor(app.status)}>
                          {getStatusIcon(app.status)}
                          <span className="ml-1 capitalize">{app.status}</span>
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Building className="w-4 h-4" />
                          {app.company}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {app.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Applied {app.appliedDate}
                        </div>
                        {app.remote && (
                          <Badge variant="outline">Remote</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Application Progress</span>
                      <span>{app.progress}%</span>
                    </div>
                    <Progress value={app.progress} className="w-full" />
                    <p className="text-sm text-muted-foreground">
                      Current stage: {app.stage}
                    </p>
                  </div>

                  {/* Application Kit */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Application Kit</h4>
                    <div className="flex flex-wrap gap-2">
                      {app.applicationKit.resume && (
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Resume
                        </Badge>
                      )}
                      {app.applicationKit.coverLetter && (
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Cover Letter
                        </Badge>
                      )}
                      {app.applicationKit.aiInterview && (
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          AI Interview
                        </Badge>
                      )}
                      {app.applicationKit.referral && (
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Referral
                        </Badge>
                      )}
                      {app.applicationKit.coverVideo && (
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Cover Video
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Next Steps */}
                  {app.nextStep && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 text-sm">
                        <AlertCircle className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">Next Step:</span>
                        <span>{app.nextStep}</span>
                        {app.nextStepDate && (
                          <span className="text-muted-foreground">
                            ({app.nextStepDate})
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Contacts */}
                  {app.contacts.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Contacts</h4>
                      <div className="flex flex-wrap gap-2">
                        {app.contacts.map((contact, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm bg-muted/50 px-3 py-1 rounded-full">
                            <Users className="w-3 h-3" />
                            <span>{contact.name}</span>
                            <span className="text-muted-foreground">({contact.role})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  {app.notes && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Notes</h4>
                      <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                        {app.notes}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{app.salary}</span>
                      <span>•</span>
                      <span>{app.jobType}</span>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        View Job
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="w-4 h-4 mr-1" />
                        Follow Up
                      </Button>
                      <Button size="sm">
                        Update Status
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {filteredApplications.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No applications found</h3>
            <p className="text-muted-foreground text-center mb-4">
              Try adjusting your search criteria or add your first job application.
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Application
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}