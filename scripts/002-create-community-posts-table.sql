CREATE TABLE IF NOT EXISTS community_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  user_name TEXT, -- To store the user's display name
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users to read all posts
CREATE POLICY "Authenticated users can view all community posts."
ON community_posts FOR SELECT
USING (auth.role() = 'authenticated');

-- Policy for authenticated users to create posts
CREATE POLICY "Authenticated users can create community posts."
ON community_posts FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Optional: Policy for users to update their own posts
CREATE POLICY "Users can update their own community posts."
ON community_posts FOR UPDATE
USING (auth.uid() = user_id);

-- Optional: Policy for users to delete their own posts
CREATE POLICY "Users can delete their own community posts."
ON community_posts FOR DELETE
USING (auth.uid() = user_id);
