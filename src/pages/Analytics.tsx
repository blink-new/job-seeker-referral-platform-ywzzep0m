import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  BarChart3, 
  TrendingUp,
  TrendingDown,
  Target,
  Clock,
  CheckCircle,
  XCircle,
  Users,
  Building,
  MapPin,
  Calendar,
  Award,
  Eye,
  MessageCircle,
  FileText,
  Video
} from 'lucide-react'

export function Analytics() {
  // Mock analytics data
  const overallStats = {
    totalApplications: 24,
    responseRate: 67,
    interviewRate: 42,
    offerRate: 17,
    averageResponseTime: 8,
    activeApplications: 6
  }

  const monthlyData = [
    { month: 'Jan', applications: 8, interviews: 3, offers: 1 },
    { month: 'Feb', applications: 12, interviews: 5, offers: 2 },
    { month: 'Mar', applications: 4, interviews: 2, offers: 1 }
  ]

  const topCompanies = [
    { name: 'Google', applications: 3, interviews: 2, offers: 1, responseRate: 100 },
    { name: 'Microsoft', applications: 2, interviews: 1, offers: 0, responseRate: 50 },
    { name: 'Apple', applications: 2, interviews: 1, offers: 0, responseRate: 50 },
    { name: 'Netflix', applications: 1, interviews: 1, offers: 1, responseRate: 100 },
    { name: 'Amazon', applications: 2, interviews: 0, offers: 0, responseRate: 0 }
  ]

  const skillsAnalysis = [
    { skill: 'React', demand: 85, proficiency: 90, gap: -5 },
    { skill: 'Python', demand: 78, proficiency: 75, gap: 3 },
    { skill: 'TypeScript', demand: 72, proficiency: 85, gap: -13 },
    { skill: 'Node.js', demand: 68, proficiency: 70, gap: -2 },
    { skill: 'AWS', demand: 82, proficiency: 60, gap: 22 },
    { skill: 'Docker', demand: 65, proficiency: 55, gap: 10 }
  ]

  const applicationKitStats = {
    resume: { used: 22, success: 15, rate: 68 },
    coverLetter: { used: 18, success: 13, rate: 72 },
    aiInterview: { used: 12, success: 9, rate: 75 },
    referral: { used: 8, success: 7, rate: 88 },
    coverVideo: { used: 6, success: 5, rate: 83 }
  }

  const timeToResponse = [
    { range: '0-3 days', count: 8, percentage: 33 },
    { range: '4-7 days', count: 6, percentage: 25 },
    { range: '1-2 weeks', count: 4, percentage: 17 },
    { range: '2+ weeks', count: 3, percentage: 13 },
    { range: 'No response', count: 3, percentage: 13 }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Track your job search performance and identify areas for improvement
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{overallStats.totalApplications}</p>
                <p className="text-sm text-muted-foreground">Applications</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{overallStats.responseRate}%</p>
                <p className="text-sm text-muted-foreground">Response Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{overallStats.interviewRate}%</p>
                <p className="text-sm text-muted-foreground">Interview Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{overallStats.offerRate}%</p>
                <p className="text-sm text-muted-foreground">Offer Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{overallStats.averageResponseTime}</p>
                <p className="text-sm text-muted-foreground">Avg Response (days)</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{overallStats.activeApplications}</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Monthly Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Trends</CardTitle>
                <CardDescription>
                  Track your application activity over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((month) => (
                    <div key={month.month} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{month.month} 2024</span>
                        <span className="text-muted-foreground">
                          {month.applications} apps, {month.interviews} interviews, {month.offers} offers
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="space-y-1">
                          <div className="h-2 bg-blue-200 rounded-full">
                            <div 
                              className="h-2 bg-blue-600 rounded-full" 
                              style={{ width: `${(month.applications / 12) * 100}%` }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">Applications</p>
                        </div>
                        <div className="space-y-1">
                          <div className="h-2 bg-yellow-200 rounded-full">
                            <div 
                              className="h-2 bg-yellow-600 rounded-full" 
                              style={{ width: `${(month.interviews / 5) * 100}%` }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">Interviews</p>
                        </div>
                        <div className="space-y-1">
                          <div className="h-2 bg-green-200 rounded-full">
                            <div 
                              className="h-2 bg-green-600 rounded-full" 
                              style={{ width: `${(month.offers / 2) * 100}%` }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">Offers</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Response Time Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Response Time Distribution</CardTitle>
                <CardDescription>
                  How quickly companies respond to your applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeToResponse.map((item) => (
                    <div key={item.range} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{item.range}</span>
                        <span className="text-muted-foreground">
                          {item.count} ({item.percentage}%)
                        </span>
                      </div>
                      <Progress value={item.percentage} className="w-full" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Application Status Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Application Status Breakdown</CardTitle>
              <CardDescription>
                Current status of all your job applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">Applied</span>
                  </div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-sm text-muted-foreground">33% of total</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-yellow-600" />
                    <span className="font-medium">Interviewing</span>
                  </div>
                  <p className="text-2xl font-bold">6</p>
                  <p className="text-sm text-muted-foreground">25% of total</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="font-medium">Offers</span>
                  </div>
                  <p className="text-2xl font-bold">4</p>
                  <p className="text-sm text-muted-foreground">17% of total</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-600" />
                    <span className="font-medium">Rejected</span>
                  </div>
                  <p className="text-2xl font-bold">6</p>
                  <p className="text-sm text-muted-foreground">25% of total</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="companies" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Performance</CardTitle>
              <CardDescription>
                Your application success rate by company
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCompanies.map((company) => (
                  <div key={company.name} className="space-y-3 p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                          <Building className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{company.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {company.applications} applications
                          </p>
                        </div>
                      </div>
                      <Badge 
                        className={
                          company.responseRate >= 75 ? 'bg-green-100 text-green-800' :
                          company.responseRate >= 50 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }
                      >
                        {company.responseRate}% response
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Applications</p>
                        <p className="font-semibold">{company.applications}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Interviews</p>
                        <p className="font-semibold">{company.interviews}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Offers</p>
                        <p className="font-semibold">{company.offers}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Success Rate</span>
                        <span>{Math.round((company.offers / company.applications) * 100)}%</span>
                      </div>
                      <Progress 
                        value={(company.offers / company.applications) * 100} 
                        className="w-full" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Skills Gap Analysis</CardTitle>
              <CardDescription>
                Compare your skills with market demand to identify improvement areas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {skillsAnalysis.map((skill) => (
                  <div key={skill.skill} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{skill.skill}</h3>
                      <div className="flex items-center gap-2">
                        {skill.gap > 0 ? (
                          <Badge className="bg-red-100 text-red-800">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            +{skill.gap}% gap
                          </Badge>
                        ) : skill.gap < 0 ? (
                          <Badge className="bg-green-100 text-green-800">
                            <TrendingDown className="w-3 h-3 mr-1" />
                            {Math.abs(skill.gap)}% ahead
                          </Badge>
                        ) : (
                          <Badge className="bg-blue-100 text-blue-800">
                            Perfect match
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Market Demand</span>
                          <span>{skill.demand}%</span>
                        </div>
                        <Progress value={skill.demand} className="w-full" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Your Proficiency</span>
                          <span>{skill.proficiency}%</span>
                        </div>
                        <Progress value={skill.proficiency} className="w-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Application Kit Performance</CardTitle>
              <CardDescription>
                Success rates of different tools in your application kit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-3 p-4 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold">Resume</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Success Rate</span>
                        <span>{applicationKitStats.resume.rate}%</span>
                      </div>
                      <Progress value={applicationKitStats.resume.rate} className="w-full" />
                      <p className="text-xs text-muted-foreground">
                        {applicationKitStats.resume.success} successful out of {applicationKitStats.resume.used} used
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 p-4 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-green-600" />
                      <span className="font-semibold">Cover Letter</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Success Rate</span>
                        <span>{applicationKitStats.coverLetter.rate}%</span>
                      </div>
                      <Progress value={applicationKitStats.coverLetter.rate} className="w-full" />
                      <p className="text-xs text-muted-foreground">
                        {applicationKitStats.coverLetter.success} successful out of {applicationKitStats.coverLetter.used} used
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 p-4 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-purple-600" />
                      <span className="font-semibold">AI Interview</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Success Rate</span>
                        <span>{applicationKitStats.aiInterview.rate}%</span>
                      </div>
                      <Progress value={applicationKitStats.aiInterview.rate} className="w-full" />
                      <p className="text-xs text-muted-foreground">
                        {applicationKitStats.aiInterview.success} successful out of {applicationKitStats.aiInterview.used} used
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 p-4 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-orange-600" />
                      <span className="font-semibold">Referral</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Success Rate</span>
                        <span>{applicationKitStats.referral.rate}%</span>
                      </div>
                      <Progress value={applicationKitStats.referral.rate} className="w-full" />
                      <p className="text-xs text-muted-foreground">
                        {applicationKitStats.referral.success} successful out of {applicationKitStats.referral.used} used
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 p-4 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Video className="w-5 h-5 text-red-600" />
                      <span className="font-semibold">Cover Video</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Success Rate</span>
                        <span>{applicationKitStats.coverVideo.rate}%</span>
                      </div>
                      <Progress value={applicationKitStats.coverVideo.rate} className="w-full" />
                      <p className="text-xs text-muted-foreground">
                        {applicationKitStats.coverVideo.success} successful out of {applicationKitStats.coverVideo.used} used
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Key Insights</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Referrals have the highest success rate at 88%</li>
                    <li>• Cover videos show strong performance with 83% success</li>
                    <li>• AI interviews are effective with 75% success rate</li>
                    <li>• Consider using referrals and videos more frequently</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}