import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  Search, 
  Upload, 
  Mail, 
  Phone,
  Building,
  MapPin,
  Download,
  FileText,
  Users,
  Plus,
  Import,
  Filter,
  MoreHorizontal
} from 'lucide-react'

export function Contacts() {
  const [searchQuery, setSearchQuery] = useState('')
  const [importProgress, setImportProgress] = useState(0)
  const [isImporting, setIsImporting] = useState(false)

  // Mock contact data
  const contacts = [
    {
      id: '1',
      name: 'Alex Thompson',
      email: 'alex.thompson@gmail.com',
      phone: '+1 (555) 123-4567',
      company: 'Google',
      title: 'Software Engineer',
      location: 'Mountain View, CA',
      avatar: '',
      source: 'Gmail',
      tags: ['Colleague', 'Tech'],
      lastContact: '2 weeks ago',
      notes: 'Met at tech conference, interested in AI/ML projects'
    },
    {
      id: '2',
      name: 'Maria Garcia',
      email: 'maria.garcia@microsoft.com',
      phone: '+1 (555) 987-6543',
      company: 'Microsoft',
      title: 'Product Manager',
      location: 'Seattle, WA',
      avatar: '',
      source: 'Outlook',
      tags: ['Manager', 'Product'],
      lastContact: '1 month ago',
      notes: 'Former colleague, now at Microsoft Azure team'
    },
    {
      id: '3',
      name: 'James Wilson',
      email: 'james.w@apple.com',
      phone: '+1 (555) 456-7890',
      company: 'Apple',
      title: 'iOS Developer',
      location: 'Cupertino, CA',
      avatar: '',
      source: 'Manual',
      tags: ['Developer', 'Mobile'],
      lastContact: '3 days ago',
      notes: 'University friend, works on iOS apps'
    }
  ]

  const importSources = [
    {
      name: 'Gmail',
      icon: Mail,
      description: 'Import contacts from your Gmail account',
      status: 'connected',
      lastSync: '2 hours ago',
      contactCount: 1247
    },
    {
      name: 'Outlook',
      icon: Mail,
      description: 'Import contacts from your Outlook account',
      status: 'connected',
      lastSync: '1 day ago',
      contactCount: 892
    },
    {
      name: 'LinkedIn',
      icon: Users,
      description: 'Import your LinkedIn connections',
      status: 'not_connected',
      lastSync: null,
      contactCount: 0
    },
    {
      name: 'CSV File',
      icon: FileText,
      description: 'Upload contacts from a CSV file',
      status: 'available',
      lastSync: null,
      contactCount: 0
    }
  ]

  const filteredContacts = contacts.filter(contact =>
    !searchQuery || 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleImport = async (source: string) => {
    setIsImporting(true)
    setImportProgress(0)
    
    // Simulate import progress
    const interval = setInterval(() => {
      setImportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsImporting(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'Gmail':
        return 'bg-red-100 text-red-800'
      case 'Outlook':
        return 'bg-blue-100 text-blue-800'
      case 'LinkedIn':
        return 'bg-blue-100 text-blue-800'
      case 'Manual':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-green-100 text-green-800'
      case 'not_connected':
        return 'bg-gray-100 text-gray-800'
      case 'available':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
        <p className="text-muted-foreground">
          Import and manage your professional contacts from various sources
        </p>
      </div>

      {/* Import Progress */}
      {isImporting && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Import className="w-5 h-5" />
              Importing Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{importProgress}%</span>
              </div>
              <Progress value={importProgress} className="w-full" />
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="contacts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="contacts">My Contacts</TabsTrigger>
          <TabsTrigger value="import">Import Sources</TabsTrigger>
        </TabsList>

        <TabsContent value="contacts" className="space-y-4">
          {/* Search and Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Search Contacts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, email, company..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Contact
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">{contacts.length}</p>
                    <p className="text-sm text-muted-foreground">Total Contacts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">2,139</p>
                    <p className="text-sm text-muted-foreground">Email Contacts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold">47</p>
                    <p className="text-sm text-muted-foreground">Companies</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-2xl font-bold">1,892</p>
                    <p className="text-sm text-muted-foreground">Phone Numbers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contacts List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {filteredContacts.length} contact{filteredContacts.length !== 1 ? 's' : ''} found
              </p>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>

            <div className="grid gap-4">
              {filteredContacts.map((contact) => (
                <Card key={contact.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={contact.avatar} />
                          <AvatarFallback>
                            {contact.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                          <div>
                            <h3 className="font-semibold text-lg">{contact.name}</h3>
                            <p className="text-muted-foreground">{contact.title}</p>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Building className="w-4 h-4" />
                              {contact.company}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {contact.location}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getSourceColor(contact.source)}>
                          {contact.source}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span>{contact.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span>{contact.phone}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {contact.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {contact.notes && (
                        <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                          {contact.notes}
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t">
                        <p className="text-xs text-muted-foreground">
                          Last contact: {contact.lastContact}
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Mail className="w-4 h-4 mr-1" />
                            Email
                          </Button>
                          <Button size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="import" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Import Sources</CardTitle>
              <CardDescription>
                Connect your email accounts and other sources to automatically import contacts
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            {importSources.map((source) => (
              <Card key={source.name} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                        <source.icon className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold">{source.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {source.description}
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(source.status)}>
                      {source.status === 'connected' ? 'Connected' : 
                       source.status === 'not_connected' ? 'Not Connected' : 'Available'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {source.status === 'connected' && (
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Contacts</p>
                          <p className="font-semibold">{source.contactCount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Last Sync</p>
                          <p className="font-semibold">{source.lastSync}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      {source.status === 'connected' ? (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleImport(source.name)}
                            disabled={isImporting}
                          >
                            <Import className="w-4 h-4 mr-1" />
                            Sync Now
                          </Button>
                          <Button variant="outline" size="sm">
                            Settings
                          </Button>
                        </>
                      ) : source.status === 'not_connected' ? (
                        <Button size="sm">
                          <Plus className="w-4 h-4 mr-1" />
                          Connect
                        </Button>
                      ) : (
                        <Button size="sm">
                          <Upload className="w-4 h-4 mr-1" />
                          Upload File
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {filteredContacts.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No contacts found</h3>
            <p className="text-muted-foreground text-center">
              Try adjusting your search or import contacts from your email accounts.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}