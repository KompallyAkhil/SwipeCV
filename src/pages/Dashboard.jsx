import { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Heart, X, TrendingUp, Users, FileText } from 'lucide-react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
export default function Dashboard() {
  const { user } = useUser()
  const [stats, setStats] = useState({
    totalLikes: 0,
    totalDislikes: 0,
    totalViews: 0,
    hasResume: false
  })
  const [eachResumeDetails, setEachResumeDetails] = useState();
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();
  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/dashboard/${user.username.charAt(0).toUpperCase() + user.username.slice(1)}`
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
        `${import.meta.env.VITE_BACKEND_API_URL}/api/resumes/feedback/${user.username.charAt(0).toUpperCase() + user.username.slice(1)}`
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
  }, [user])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Loading dashboard...</p>
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="font-bold text-muted-foreground">
          Track how your resume is performing with recruiters
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
            <Heart className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{stats.totalLikes}</div>
            <p className="text-xs text-muted-foreground">Recruiters who liked your resume</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Passes</CardTitle>
            <X className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{stats.totalDislikes}</div>
            <p className="text-xs text-muted-foreground">Recruiters who passed on your resume</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Like Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{likeRate}%</div>
            <p className="text-xs text-muted-foreground">Percentage of positive responses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInteractions}</div>
            <p className="text-xs text-muted-foreground">Total recruiter interactions</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button onClick={() => navigate('/upload')}>Upload Resume</Button>
          <Button variant="outline" onClick={() => navigate('/swipe')}>Start Swiping</Button>
          <Button variant="outline" onClick={() => fetchDashboardData()}>Refresh Data</Button>
        </CardContent>
      </Card>
      <Card className="mt-8">
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
                  className="p-6 border rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-500" /> {resume.title}
                    </h3>
                    <a
                      href={resume.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex px-3 py-1 rounded-full items-center hover:underline font-medium bg-gray-100 texxt-sm"
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

    </div>
  )
}