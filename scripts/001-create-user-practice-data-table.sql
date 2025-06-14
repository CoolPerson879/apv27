CREATE TABLE IF NOT EXISTS user_practice_data (
  user_id UUID REFERENCES auth.users(id) PRIMARY KEY,
  last_score INT,
  total_questions INT,
  questions_attempted INT DEFAULT 0,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE user_practice_data ENABLE ROW LEVEL SECURITY;

-- Policy for users to view and update their own data
CREATE POLICY "Users can view and update their own practice data."
ON user_practice_data FOR ALL
USING (auth.uid() = user_id);
