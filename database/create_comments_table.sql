-- Create application_comments table
CREATE TABLE IF NOT EXISTS application_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID NOT NULL,
  application_type TEXT NOT NULL CHECK (application_type IN ('financial', 'work', 'venture')),
  comment_type TEXT NOT NULL CHECK (comment_type IN ('comment', 'status_change', 'edit')),
  content TEXT NOT NULL,
  previous_status TEXT,
  new_status TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by TEXT DEFAULT 'System'
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_comments_application ON application_comments(application_id, application_type);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON application_comments(created_at DESC);

-- Enable Row Level Security
ALTER TABLE application_comments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
DROP POLICY IF EXISTS "Enable read access for all users" ON application_comments;
CREATE POLICY "Enable read access for all users" ON application_comments
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable insert for all users" ON application_comments;
CREATE POLICY "Enable insert for all users" ON application_comments
  FOR INSERT WITH CHECK (true);

-- Add comments to explain the table
COMMENT ON TABLE application_comments IS 'Stores comments and activity logs for all application types';
COMMENT ON COLUMN application_comments.comment_type IS 'Type of comment: comment (manual), status_change (automatic), edit (automatic)';
