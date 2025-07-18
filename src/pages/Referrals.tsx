import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Search, 
  Users, 
  Building, 
  MapPin,
  MessageCircle,
  UserPlus,
  Star,
  Briefcase,
  Mail,
  Phone,
  ExternalLink,
  Filter
} from 'lucide-react'

export function Referrals() {
  const [searchQuery, setSearchQuery] = useState('')

  // Mock referral data
  const referrals = [
    {
      id: '1',
      name: 'Sarah Chen',
      title: 'Senior Software Engineer',
      company: 'Google',
      location: 'Mountain View, CA',
      avatar: '',
      connectionStrength: 'Strong',
      mutualConnections: 12,
      canRefer: true,
      lastContact: '2 weeks ago',
      email: 'sarah.chen@google.com',
      phone: '+1 (555) 123-4567',
      skills: ['React', 'Python', 'Machine Learning'],
      bio: 'Passionate about building scalable web applications and mentoring junior developers.'
    },
    {
      id: '2',
      name: 'Michael Rodriguez',
      title: 'Product Manager',
      company: 'Microsoft',
      location: 'Seattle, WA',
      avatar: '',
      connectionStrength: 'Medium',
      mutualConnections: 8,
      canRefer: true,
      lastContact: '1 month ago',
      email: 'michael.r@microsoft.com',
      phone: '+1 (555) 987-6543',
      skills: ['Product Strategy', 'Agile', 'Data Analysis'],
      bio: 'Leading product initiatives for cloud services with focus on user experience.'
    },
    {
      id: '3',
      name: 'Emily Johnson',
      title: 'iOS Developer',
      company: 'Apple',
      location: 'Cupertino, CA',
      avatar: '',
      connectionStrength: 'Strong',
      mutualConnections: 15,
      canRefer: false,
      lastContact: '3 days ago',
      email: 'emily.j@apple.com',
      phone: '+1 (555) 456-7890',
      skills: ['Swift', 'iOS SDK', 'UIKit'],
      bio: 'Creating beautiful and intuitive mobile experiences for millions of users.'
    }
  ]

  const potentialReferrals = [
    {
      id: '4',
      name: 'David Kim',
      title: 'Engineering Manager',
      company: 'Netflix',
      location: 'Los Gatos, CA',
      avatar: '',
      connectionStrength: 'Weak',
      mutualConnections: 3,
      canRefer: true,
      skills: ['Leadership', 'System Design', 'Microservices']
    },
    {
      id: '5',
      name: 'Lisa Wang',
      title: 'UX Designer',
      company: 'Airbnb',
      location: 'San Francisco, CA',
      avatar: '',
      connectionStrength: 'Medium',
      mutualConnections: 6,
      canRefer: true,
      skills: ['Design Systems', 'User Research', 'Prototyping']
    }
  ]

  const getConnectionColor = (strength: string) => {
    switch (strength) {
      case 'Strong':
        return 'bg-green-100 text-green-800'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'Weak':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredReferrals = referrals.filter(referral =>
    !searchQuery || 
    referral.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    referral.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    referral.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredPotential = potentialReferrals.filter(referral =>
    !searchQuery || 
    referral.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    referral.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    referral.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Referrals</h1>
        <p className="text-muted-foreground">
          Connect with your network to find job opportunities and referrals
        </p>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search Network
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, company, or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="network" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="network">My Network</TabsTrigger>
          <TabsTrigger value="discover">Discover</TabsTrigger>
        </TabsList>

        <TabsContent value="network" className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredReferrals.length} connection{filteredReferrals.length !== 1 ? 's' : ''} in your network
            </p>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="grid gap-4">
            {filteredReferrals.map((referral) => (
              <Card key={referral.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={referral.avatar} />
                        <AvatarFallback>
                          {referral.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <div>
                          <h3 className="font-semibold text-lg">{referral.name}</h3>
                          <p className="text-muted-foreground">{referral.title}</p>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Building className="w-4 h-4" />
                            {referral.company}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {referral.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {referral.mutualConnections} mutual
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getConnectionColor(referral.connectionStrength)}>
                        {referral.connectionStrength}
                      </Badge>
                      {referral.canRefer && (
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          Can Refer
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {referral.bio}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {referral.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {referral.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {referral.phone}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Message
                        </Button>
                        {referral.canRefer && (
                          <Button size="sm">
                            <UserPlus className="w-4 h-4 mr-1" />
                            Request Referral
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="discover" className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredPotential.length} potential connection{filteredPotential.length !== 1 ? 's' : ''} discovered
            </p>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="grid gap-4">
            {filteredPotential.map((referral) => (
              <Card key={referral.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={referral.avatar} />
                        <AvatarFallback>
                          {referral.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <div>
                          <h3 className="font-semibold text-lg">{referral.name}</h3>
                          <p className="text-muted-foreground">{referral.title}</p>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Building className="w-4 h-4" />
                            {referral.company}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {referral.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {referral.mutualConnections} mutual
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getConnectionColor(referral.connectionStrength)}>
                        {referral.connectionStrength}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {referral.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <p className="text-sm text-muted-foreground">
                        Connect to unlock contact details and referral opportunities
                      </p>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          View Profile
                        </Button>
                        <Button size="sm">
                          <UserPlus className="w-4 h-4 mr-1" />
                          Connect
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {(filteredReferrals.length === 0 && filteredPotential.length === 0) && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No connections found</h3>
            <p className="text-muted-foreground text-center">
              Try adjusting your search or import your contacts to build your network.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}