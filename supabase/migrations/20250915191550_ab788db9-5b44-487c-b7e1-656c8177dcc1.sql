-- Create user role enum
CREATE TYPE user_role AS ENUM ('admin', 'moderator', 'instructor', 'user');

-- Update profiles table to use the enum and set default
ALTER TABLE profiles ALTER COLUMN role TYPE user_role USING role::user_role;
ALTER TABLE profiles ALTER COLUMN role SET DEFAULT 'user';

-- Create user permissions table
CREATE TABLE user_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  permission TEXT NOT NULL,
  granted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  granted_by UUID REFERENCES profiles(id),
  UNIQUE(user_id, permission)
);

-- Enable RLS on user_permissions
ALTER TABLE user_permissions ENABLE ROW LEVEL SECURITY;

-- Create function to check if user is admin (security definer to avoid RLS recursion)
CREATE OR REPLACE FUNCTION is_admin(user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = user_id AND role = 'admin'
  );
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;

-- Create function to check user role
CREATE OR REPLACE FUNCTION get_user_role(user_id UUID DEFAULT auth.uid())
RETURNS user_role AS $$
  SELECT role FROM profiles WHERE id = user_id;
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;

-- Add admin policies for user_permissions
CREATE POLICY "Admins can manage all permissions" ON user_permissions
FOR ALL USING (is_admin());

-- Add admin policies for profiles management
CREATE POLICY "Admins can manage all profiles" ON profiles
FOR UPDATE USING (is_admin());

-- Add admin policies for courses management  
CREATE POLICY "Admins can manage all courses" ON courses
FOR ALL USING (is_admin());

-- Add admin policies for community management
CREATE POLICY "Admins can manage all posts" ON community_posts
FOR ALL USING (is_admin());

CREATE POLICY "Admins can manage all groups" ON community_groups
FOR ALL USING (is_admin());

-- Create audit log table for admin actions
CREATE TABLE admin_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL,
  target_table TEXT,
  target_id UUID,
  old_values JSONB,
  new_values JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on audit log
ALTER TABLE admin_audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Admins can view audit logs" ON admin_audit_log
FOR SELECT USING (is_admin());

-- Insert initial admin user (replace with actual user ID)
-- You'll need to manually update this with the first admin user ID after signup