import { useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Upload as UploadIcon, FileText, CheckCircle, Loader2 } from 'lucide-react'
import axios from 'axios'

export default function Upload() {
  const { user } = useUser();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [resumeTitle, setResumeTitle] = useState('');
  const [uploadedUrl, setUploadedUrl] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (
      selectedFile &&
      (selectedFile.type === 'application/pdf' ||
        selectedFile.type.includes('document'))
    ) {
      setFile(selectedFile)
    } else {
      alert('Please select a PDF or DOC file')
    }
  }
  const handleUpload = async (e) => {
    if (!file || !resumeTitle) alert("Please select a file and enter a title");
    e.preventDefault();
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("resumeTitle", resumeTitle);
      formData.append("user", user.username.charAt(0).toUpperCase() + user.username.slice(1));
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/uploadResume`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setFile(null);
      setResumeTitle("");
      setUploaded(true);
      setUploading(false);
      setUploadedUrl(response.data.url);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploading(false);
    }
  }
  if (uploaded) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="text-center">
          <CardHeader>
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-2xl">
              Resume Uploaded Successfully!
            </CardTitle>
            <CardDescription>
              Your resume is now live and recruiters can start swiping on it.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setUploaded(false)} className="mr-4">
              Upload Another
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = '/dashboard')}
            >
              View Dashboard
            </Button>
            {uploadedUrl && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Preview:</h3>
                <embed src={uploadedUrl} type="application/pdf" width="100%" height="600px" style={{ border: "1px solid #ccc", borderRadius: "8px" }}></embed>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UploadIcon className="h-6 w-6" />
            <p className='font-bold text-2xl'>
              Upload Your Resume
            </p>
          </CardTitle>
          <CardDescription>
            Upload multiple resumes with different titles and skills to maximize
            your visibility
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Resume Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Resume Title</label>
            <Input
              placeholder="e.g., Software Engineer Resume, Marketing Portfolio..."
              value={resumeTitle}
              onChange={(e) => setResumeTitle(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Give your resume a descriptive title (optional)
            </p>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Resume File (PDF or DOC)</label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              {file ? (
                <div className="flex items-center justify-center gap-2">
                  <FileText className="h-8 w-8 text-primary" />
                  <span className="font-medium">{file.name}</span>
                </div>
              ) : (
                <div>
                  <UploadIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">
                    Drag and drop your resume here, or click to browse
                  </p>
                </div>
              )}
              <Input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="mt-4"
              />
            </div>
          </div>

          <Button
            onClick={handleUpload}
            onKeyDown={(e) => { if (e.key === 'Enter') handleUpload(e); }}
            disabled={!file || uploading}
            className="w-full flex items-center justify-center"
          >
            {uploading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Uploading...
              </>
            ) : (
              'Upload Resume'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}