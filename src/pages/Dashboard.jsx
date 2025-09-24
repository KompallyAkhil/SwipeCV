import { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Heart, X, TrendingUp, Users, FileText } from 'lucide-react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import LikedResumes from './LikedResumes'
import { Skeleton } from '../components/ui/skeleton'
export default function Dashboard() {
  const { user } = useUser();
  const [stats, setStats] = useState({
    totalLikes: 0,
    totalDislikes: 0,
    totalViews: 0,
    hasResume: false
  })
  const name = user.username.charAt(0).toUpperCase() + user.username.slice(1);
  const [eachResumeDetails, setEachResumeDetails] = useState();
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();
  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/dashboard/${name}`
      )
      setStats(response.data)
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }
  const fetchEachResumeDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/resumes/feedback/${name}`
      )
      setEachResumeDetails(response.data);
    } catch (error) {
      console.error('Failed to fetch each resume details:', error)
    }
  }


  useEffect(() => {
    fetchDashboardData()
    fetchEachResumeDetails();
    const interval = setInterval(fetchDashboardData, 30000)
    return () => clearInterval(interval)
  }, [user, name])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-72" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-3 w-40 mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-3 w-40 mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-3 w-40 mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-14" />
              <Skeleton className="h-3 w-40 mt-2" />
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 border rounded-xl bg-card">
                <Skeleton className="h-5 w-40 mb-2" />
                <Skeleton className="h-4 w-24 mb-4" />
                <div className="flex gap-4 mt-4">
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
              </div>
              <div className="p-6 border rounded-xl bg-card">
                <Skeleton className="h-5 w-40 mb-2" />
                <Skeleton className="h-4 w-24 mb-4" />
                <div className="flex gap-4 mt-4">
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!stats.hasResume) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="text-center">
          <CardHeader>
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <CardTitle className="font-bold text-2xl">No Resume Uploaded</CardTitle>
            <CardDescription className="font-bold text-muted-foreground">
              Upload your resume to start getting likes and feedback from recruiters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/upload')}>
              Upload Resume
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const totalInteractions = stats.totalLikes + stats.totalDislikes
  const likeRate = totalInteractions > 0 ? ((stats.totalLikes / totalInteractions) * 100).toFixed(1) : 0

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome banner */}
      <div className="mb-8">
        <div className="relative overflow-hidden rounded-2xl border bg-card">
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />
          <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Welcome back{name ? `, ${name}` : ''}!</h1>
              <p className="text-sm md:text-base text-muted-foreground mt-1">
                Here’s how your resume is performing today.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
              <div className="text-center border rounded-xl p-3">
                <div className="text-lg font-bold text-green-600 dark:text-green-400">{stats.totalLikes}</div>
                <div className="text-[11px] text-muted-foreground">Likes</div>
              </div>
              <div className="text-center border rounded-xl p-3">
                <div className="text-lg font-bold text-red-500">{stats.totalDislikes}</div>
                <div className="text-[11px] text-muted-foreground">Passes</div>
              </div>
              <div className="text-center border rounded-xl p-3">
                <div className="text-lg font-bold text-primary">{totalInteractions}</div>
                <div className="text-[11px] text-muted-foreground">Total</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border bg-card">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
              <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-green-500/15 text-green-600 dark:text-green-400">
                <Heart className="h-4 w-4" />
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-green-600 dark:text-green-400">{stats.totalLikes}</div>
            <p className="text-xs text-muted-foreground mt-1">Recruiters who liked your resume</p>
          </CardContent>
        </Card>

        <Card className="border bg-card">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Total Passes</CardTitle>
              <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-red-500/15 text-red-600">
                <X className="h-4 w-4" />
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-red-600">{stats.totalDislikes}</div>
            <p className="text-xs text-muted-foreground mt-1">Recruiters who passed on your resume</p>
          </CardContent>
        </Card>

        <Card className="border bg-card">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Like Rate</CardTitle>
              <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary/15 text-primary">
                <TrendingUp className="h-4 w-4" />
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-primary">{likeRate}%</div>
            <div className="mt-2 h-2 w-full rounded-full bg-muted">
              <div
                className="h-2 rounded-full bg-primary"
                style={{ width: `${likeRate}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Percentage of positive responses</p>
          </CardContent>
        </Card>

        <Card className="border bg-card">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
              <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-muted text-foreground/70">
                <Users className="h-4 w-4" />
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold">{totalInteractions}</div>
            <p className="text-xs text-muted-foreground mt-1">Total recruiter interactions</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="font-bold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button onClick={() => navigate('/upload')} className="">Upload Resume</Button>
          <Button variant="outline" onClick={() => navigate('/swipe')}>Start Swiping</Button>
          <Button variant="outline" onClick={() => fetchDashboardData()}>Refresh Data</Button>
        </CardContent>
      </Card>
      <Card className="mt-8 bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold">
            <FileText className="h-6 w-6 text-primary" /> Resume Feedbacks
          </CardTitle>
        </CardHeader>
        <CardContent>
          {eachResumeDetails?.resumes?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {eachResumeDetails.resumes.map((resume) => (
                <div
                  key={resume.resumeId}
                  className="p-6 border rounded-xl bg-card shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-500" /> {resume.title}
                    </h3>
                    <a
                      href={resume.url}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex px-3 py-1 border rounded-xl items-center hover:underline font-medium texxt-sm"
                    >
                       View PDF
                    </a>
                  </div>
                  <p className="text-xs font-bold text-gray-500 mb-2">
                    Uploaded: {new Date(resume.uploadedAt).toLocaleString()}
                  </p>
                  <div className="flex gap-4 mt-4">
                    <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                      <Heart className="h-4 w-4 text-green-500" /> {resume.likes} Likes
                    </span>
                    <span className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full font-medium">
                      <X className="h-4 w-4 text-red-500" /> {resume.dislikes} Dislikes
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
              <p className="text-gray-500 text-lg">No resumes found for this user.</p>
            </div>
          )}
        </CardContent>
      </Card>
      <LikedResumes/>

    </div>
  )
}