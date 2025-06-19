"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth-provider";
import { getSupabaseClient } from "@/lib/supabase";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  MessageSquare,
  User,
  Clock,
  Send,
  AlertCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNowStrict } from "date-fns"; // You might need to install date-fns: npm install date-fns

interface CommunityPost {
  id: string;
  user_id: string;
  user_name: string | null;
  content: string;
  created_at: string;
}

export default function CommunityPage() {
  const { user, loading: authLoading } = useAuth();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [submittingPost, setSubmittingPost] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = getSupabaseClient();

  const fetchPosts = async () => {
    setLoadingPosts(true);
    setError(null);
    const { data, error: dbError } = await supabase
      .from("community_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (dbError) {
      console.error("Error fetching community posts:", dbError);
      setError("Failed to load community posts. Please try again.");
    } else {
      // @ts-expect-error - all of this is so stupid
      setPosts(data || []);
    }
    setLoadingPosts(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []); // Fetch posts on initial load

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newPostContent.trim()) return;

    setSubmittingPost(true);
    setError(null);

    const { data, error: dbError } = await supabase
      .from("community_posts")
      .insert({
        user_id: user.id,
        user_name: user.name || user.email.split("@")[0], // Use user's name or part of email
        content: newPostContent.trim(),
      })
      .select()
      .single(); // Select the inserted row to get its data

    if (dbError) {
      console.error("Error submitting post:", dbError);
      setError("Failed to submit post. Please try again.");
    } else if (data) {
      // @ts-expect-error - all of this is so stupid
      setPosts([data, ...posts]); // Add new post to the top
      setNewPostContent("");
    }
    setSubmittingPost(false);
  };

  if (authLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="mt-4 text-lg text-muted-foreground">
          Loading user data...
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <MessageSquare className="h-9 w-9" />
          Community Forum
        </h1>
        <p className="text-lg text-muted-foreground">
          Connect with other AP World History students, ask questions, and share
          insights!
        </p>
      </div>

      {/* Post Submission Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Share Your Thoughts</CardTitle>
          <CardDescription>
            Post a question, share a study tip, or discuss a historical topic.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {user ? (
            <form onSubmit={handleSubmitPost} className="space-y-4">
              <Textarea
                placeholder="What's on your mind?"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                rows={4}
                disabled={submittingPost}
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
              <Button
                type="submit"
                disabled={submittingPost || !newPostContent.trim()}
              >
                {submittingPost && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                <Send className="mr-2 h-4 w-4" />
                Post Comment
              </Button>
            </form>
          ) : (
            <div className="text-center py-6">
              <AlertCircle className="h-10 w-10 text-yellow-500 mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">
                Please sign in to post comments.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Community Posts */}
      <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
      {loadingPosts ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="mt-4 text-lg text-muted-foreground">Loading posts...</p>
        </div>
      ) : error && !posts.length ? (
        <div className="text-center py-12">
          <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-4" />
          <p className="text-lg text-red-500">{error}</p>
          <Button onClick={fetchPosts} className="mt-4">
            Retry Loading Posts
          </Button>
        </div>
      ) : posts.length === 0 ? (
        <Card className="text-center py-8">
          <CardContent>
            <p className="text-lg text-muted-foreground">
              No posts yet. Be the first to share!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${
                        post.user_name || post.user_id
                      }`}
                    />
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold">
                        {post.user_name || "Anonymous"}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDistanceToNowStrict(new Date(post.created_at), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-foreground">{post.content}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
