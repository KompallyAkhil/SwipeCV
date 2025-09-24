import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import axios from "axios";
import { Heart, FileText, ExternalLink } from "lucide-react";
import { Skeleton } from "../components/ui/skeleton";

const LikedResumes = () => {
  const { user } = useUser();
  const [likedResumes, setLikedResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  const name =
    user.username.charAt(0).toUpperCase() + user.username.slice(1);

  useEffect(() => {
    const fetchLikedResumes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API_URL}/likedResumes/${name}`
        );
        setLikedResumes(response.data);
      } catch (error) {
        console.error("Error fetching liked resumes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLikedResumes();
  }, []);

  return (
    <Card className="mt-8 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Heart className="w-6 h-6 text-red-500" />
          Liked Resumes
        </CardTitle>
        <CardDescription>
          A collection of resumes you’ve liked
        </CardDescription>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[0, 1].map((i) => (
              <div key={i} className="border rounded-xl p-4 bg-card">
                <Skeleton className="h-5 w-40 mb-3" />
                <Skeleton className="h-4 w-56 mb-4" />
                <Skeleton className="h-9 w-28 rounded-md" />
              </div>
            ))}
          </div>
        ) : likedResumes && likedResumes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {likedResumes.map((resume, idx) => (
              <Card
                key={idx}
                className="border hover:shadow-md transition rounded-xl bg-card"
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="w-5 h-5 text-blue-500" />
                    {resume.title || "Untitled Resume"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-3 text-sm text-muted-foreground">
                    <strong>Email:</strong> {resume.email}
                  </p>
                  <Button
                    size="sm"
                    asChild
                    className="flex items-center gap-2"
                  >
                    <a
                      href={resume.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View PDF
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            You haven’t liked any resumes yet.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default LikedResumes;
