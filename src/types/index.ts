export interface User {
  id: string
  email: string
  displayName?: string
  avatar?: string
  createdAt: string
}

export interface Job {
  id: string
  title: string
  company: string
  location: string
  description: string
  requirements: string[]
  salary?: string
  type: 'full-time' | 'part-time' | 'contract' | 'internship'
  remote: boolean
  postedAt: string
  applicationUrl?: string
  userId?: string
}

export interface Contact {
  id: string
  name: string
  email: string
  company?: string
  position?: string
  linkedinUrl?: string
  notes?: string
  source: 'gmail' | 'outlook' | 'manual'
  userId: string
  createdAt: string
}

export interface Resume {
  id: string
  name: string
  content: string
  jobId?: string
  userId: string
  createdAt: string
  updatedAt: string
}

export interface Application {
  id: string
  jobId: string
  resumeId: string
  status: 'applied' | 'interview' | 'rejected' | 'offer'
  appliedAt: string
  notes?: string
  userId: string
}

export interface VideoIntro {
  id: string
  title: string
  videoUrl: string
  transcript?: string
  jobId?: string
  userId: string
  createdAt: string
}