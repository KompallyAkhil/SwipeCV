import { Link } from 'react-router-dom'
import { SignedIn, SignedOut, SignUpButton } from '@clerk/clerk-react'
import { Button } from '../components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { Heart, Upload, BarChart3, Users, Zap, Shield, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react'

export default function Home() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-muted/50" />
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20">
                <Sparkles className="h-3.5 w-3.5" /> New Way of Job Hunting
              </span>
              <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight">
                Supercharge your job hunt with
                <span className="text-primary"> SwipeCV</span>
              </h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-xl">
                Upload, get instant feedback, and connect with recruiters in a familiar swipe experience.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <SignedOut>
                  <SignUpButton mode="modal">
                    <Button size="lg" className="px-8 py-6 text-base">
                      Get Started Free
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <div className="flex gap-4">
                    <Link to="/upload">
                      <Button size="lg" className="px-8 py-6 text-base">
                        Upload Resume
                      </Button>
                    </Link>
                    <Link to="/swipe">
                      <Button variant="outline" size="lg" className="px-8 py-6 text-base">
                        Start Swiping
                      </Button>
                    </Link>
                  </div>
                </SignedIn>
              </div>

            </div>

            {/* Visual Preview */}
            <Card className="bg-card/50 backdrop-blur-sm border shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl">What it looks like</CardTitle>
                <CardDescription>Familiar swipe UI tailored for hiring</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="border rounded-xl p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">Alex Johnson</div>
                      <div className="text-sm text-muted-foreground">Frontend Engineer</div>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <Button variant="outline" size="sm" className="flex-1">View PDF</Button>
                    <Button size="sm" className="bg-blue-500 hover:bg-blue-600"><Heart className="h-4 w-4" /></Button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[1,2,3].map((i) => (
                    <div key={i} className="border rounded-lg p-3 text-center">
                      <div className="text-lg font-bold">{i === 1 ? '98%' : i === 2 ? '2.1k' : '4.8/5'}</div>
                      <div className="text-xs text-muted-foreground">{i === 1 ? 'Match' : i === 2 ? 'Views' : 'Rating'}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Everything you need to get noticed</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[{
              icon: Upload,
              title: 'Upload in seconds',
              desc: 'Drag and drop your resume. We handle the rest.',
            },{
              icon: Heart,
              title: 'Swipe to connect',
              desc: 'A familiar, delightful experience for recruiters.',
            },{
              icon: BarChart3,
              title: 'Track performance',
              desc: 'Real-time analytics on likes, passes, and views.',
            }].map(({icon: Icon, title, desc}) => (
              <Card key={title} className="border rounded-2xl">
                <CardHeader className="text-center">
                  <Icon className="h-10 w-10 text-primary mx-auto mb-2" />
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How it works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Create account', desc: 'Sign up and set your preferences.' },
              { step: '2', title: 'Upload resume', desc: 'Add your latest resume in a click.' },
              { step: '3', title: 'Start swiping', desc: 'Match with recruiters and get feedback.' },
            ].map(({step, title, desc}) => (
              <div key={step} className="border rounded-2xl p-6 bg-card">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  {step}
                </div>
                <h3 className="mt-4 text-xl font-semibold">{title}</h3>
                <p className="text-muted-foreground text-sm mt-1">{desc}</p>

              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Final CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="border rounded-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Ready to land your next role faster?</CardTitle>
              <CardDescription>Join thousands using SwipeCV to stand out.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <SignedOut>
                <SignUpButton mode="modal">
                  <Button size="lg" className="px-8">Create your free account</Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <div className="flex gap-3">
                  <Link to="/upload"><Button size="lg">Upload Resume</Button></Link>
                  <Link to="/swipe"><Button variant="outline" size="lg">Start Swiping</Button></Link>
                </div>
              </SignedIn>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
