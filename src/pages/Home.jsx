import { Link } from 'react-router-dom'
import { SignedIn, SignedOut, SignUpButton } from '@clerk/clerk-react'
import { Button } from '../components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Heart, Upload, BarChart3, Users, Zap, Shield } from 'lucide-react'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Find Your Perfect
          <span className="text-primary"> Career Match</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          SwipeCV revolutionizes hiring by letting recruiters swipe through resumes like dating profiles. 
          Get instant feedback and connect with the right opportunities.
        </p>
        
        <SignedOut>
          <SignUpButton mode="modal">
            <Button size="lg" className="text-lg px-8 py-6">
              Get Started Free
            </Button>
          </SignUpButton>
        </SignedOut>
        
        <SignedIn>
          <div className="space-x-4">
            <Link to="/upload">
              <Button size="lg" className="text-lg px-8 py-6">
                Upload Resume
              </Button>
            </Link>
            <Link to="/swipe">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Start Swiping
              </Button>
            </Link>
          </div>
        </SignedIn>
      </div>

      <div className="py-20">
        <h2 className="text-3xl font-bold text-center mb-12">How SwipeCV Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Upload Your Resume</CardTitle>
              <CardDescription>
                Upload your resume and let recruiters discover your skills
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Swipe & Match</CardTitle>
              <CardDescription>
                Recruiters swipe right on profiles they like, just like dating apps
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Track Your Success</CardTitle>
              <CardDescription>
                See real-time analytics of likes, views, and potential matches
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      <div className="py-20 bg-muted/50 rounded-lg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose SwipeCV?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Get feedback on your resume in minutes, not weeks
              </p>
            </div>
            
            <div className="text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real Recruiters</h3>
              <p className="text-muted-foreground">
                Connect with actual hiring managers and HR professionals
              </p>
            </div>
            
            <div className="text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
              <p className="text-muted-foreground">
                Your data is secure and you control who sees your information
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
