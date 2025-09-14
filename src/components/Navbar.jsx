import { Link } from 'react-router-dom'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { Button } from './ui/button'
import { Heart, Upload, BarChart3 } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">SwipeCV</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <SignedIn>
              <Link to="/swipe">
                <Button variant="ghost" size="sm">
                  <Heart className="h-4 w-4 mr-2" />
                  Swipe
                </Button>
              </Link>
              <Link to="/upload">
                <Button variant="ghost" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            
            <SignedOut>
              <SignInButton mode="modal">
                <Button>Sign In</Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  )
}
