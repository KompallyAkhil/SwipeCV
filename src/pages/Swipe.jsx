import { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import TinderCard from 'react-tinder-card'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Heart, X, FileText, User, Mail, Download } from 'lucide-react'
import axios from 'axios'

export default function Swipe() {
  const { user } = useUser()
  const [resumes, setResumes] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [viewingPDF, setViewingPDF] = useState(null)
  useEffect(() => {
    fetchResumes()
    const interval = setInterval(fetchResumes, 30000);
    return () => clearInterval(interval);
  }, [user])
  const name = user.username.charAt(0).toUpperCase() + user.username.slice(1);
  const fetchResumes = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/getResumes/${name}`);
      setResumes(response.data);
      setCurrentIndex(response.data.length - 1);
    } catch (error) {
      console.error('Failed to fetch resumes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleButtonSwipe = async (action) => {
    if (currentIndex >= 0) {
      const resume = resumes[currentIndex];

      try {
        await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/swipeResume`, {
          currentUser: name,
          resumeOwner: resume.name,
          action,
          resume,
        });
      } catch (err) {
        console.error("Failed to save swipe:", err);
      }

      setCurrentIndex(currentIndex - 1);
    }
  }

  const handleViewResume = (resume) => {
    setViewingPDF(resume)
  }

  const handleDownloadResume = (resume) => {
    const link = document.createElement('a');
    link.href = resume.url.replace("/upload", "/upload/fl_attachment/");
    link.download = `${resume.name}_Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  if (loading) {
    return <p className="text-center mt-8">Loading resumes...</p>
  }

  if (resumes.length === 0) {
    return (
      <div className="text-center mt-8">
        <p className='font-bold text-muted-foreground p-4'>No resumes to show. Check back later!</p>
        <Button onClick={fetchResumes}>Refresh</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Swipe Resumes</h1>
        <p className="text-muted-foreground">
          {currentIndex + 1} of {resumes.length} resumes remaining
        </p>
      </div>

      <div className="relative h-96 mb-8">
        {resumes.map((resume, index) => (
          index === currentIndex && (
            <TinderCard
              key={resume._id || index}
              onSwipe={(dir) => {
                if (dir === 'right') {
                  handleButtonSwipe('like');
                } else if (dir === 'left') {
                  handleButtonSwipe('dislike');
                }
              }}
              preventSwipe={['up', 'down']}
              className="absolute inset-0"
            >
              <Card className="h-full cursor-grab active:cursor-grabbing shadow-lg">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{resume.name}</CardTitle>
                  {resume.title && (
                    <p className="text-sm font-medium text-primary">{resume.title}</p>
                  )}
                  {resume.email && (
                    <div className="flex items-center justify-center gap-1 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">{resume.email}</span>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleViewResume(resume)}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      View PDF
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadResume(resume)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TinderCard>
          )
        ))}
      </div>


      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={() => handleButtonSwipe('dislike')}
          disabled={currentIndex < 0}
          className="w-16 h-16 rounded-full p-0"
        >
          <X className="h-6 w-6 text-red-500" />
        </Button>
        <Button
          size="lg"
          onClick={() => handleButtonSwipe('like')}
          disabled={currentIndex < 0}
          className="w-16 h-16 rounded-full p-0 bg-green-500 hover:bg-green-600"
        >
          <Heart className="h-6 w-6" />
        </Button>
      </div>

      {viewingPDF && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl h-full max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <div>
                <h3 className="text-lg font-semibold">{viewingPDF.name}</h3>
                <p className="text-sm text-muted-foreground">{viewingPDF.title}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setViewingPDF(null)}>
                Close
              </Button>
            </div>
            <div className="flex-1 p-4">
              <embed src={viewingPDF.url} type="application/pdf" width="100%" height="100%" style={{ border: "1px solid #ccc", borderRadius: "8px" }}></embed>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}