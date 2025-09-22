import { useState, useEffect } from "react";
import { useUser } from '@clerk/clerk-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import axios from "axios";
import { Heart, FileText, ExternalLink } from "lucide-react";
import { getSocket } from "../lib/socket";

const LikedResumes = () => {
  const { user } = useUser();
  const [likedResumes, setLikedResumes] = useState([]);
  const name = user.username.charAt(0).toUpperCase() + user.username.slice(1);

  useEffect(() => {
    let mounted = true;
    const fetchLikedResumes = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API_URL}/likedResumes/${name}`
        );
        if (mounted) setLikedResumes(response.data);
      } catch (error) {
        console.error("Error fetching liked resumes:", error);
      }
    };

    fetchLikedResumes();

    const socket = getSocket({ username: name });
    const onRefresh = () => fetchLikedResumes();
    socket.on('likedResumes:refresh', onRefresh);

    return () => {
      mounted = false;
      socket.off('likedResumes:refresh', onRefresh);
    };
  }, [name]);
  return (
    <>
      {likedResumes && likedResumes.length > 0 && (
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
            {likedResumes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {likedResumes.map((resume, idx) => (
                  <Card
                    key={idx}
                    className="border hover:shadow-md transition rounded-xl"
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <FileText className="w-5 h-5 text-blue-500" />
                        {resume.title || "Untitled Resume"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-3 text-sm text-gray-600">
                        <strong>Email:</strong> {resume.email}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <a
                          href={resume.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View PDF
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">
                You haven’t liked any resumes yet.
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default LikedResumes;
