-- Create admin user for mayurwaghchoure1995@gmail.com
-- This will be executed after the user signs up for the first time

-- Insert admin role assignment for the specific user
-- Note: This assumes the user has already been created in auth.users
-- We'll use the email to identify the user

-- Create a function to assign admin role by email
CREATE OR REPLACE FUNCTION assign_admin_by_email(email_param TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    user_uuid UUID;
BEGIN
    -- Get the user ID from auth.users by email
    SELECT id INTO user_uuid 
    FROM auth.users 
    WHERE email = email_param;
    
    -- If user exists, assign admin role
    IF user_uuid IS NOT NULL THEN
        INSERT INTO public.user_roles (user_id, role)
        VALUES (user_uuid, 'admin')
        ON CONFLICT (user_id, role) DO NOTHING;
    END IF;
END;
$$;

-- Assign admin role to mayurwaghchoure1995@gmail.com
-- This will work once the user account exists
SELECT assign_admin_by_email('mayurwaghchoure1995@gmail.com');

-- Clean up the function
DROP FUNCTION assign_admin_by_email(TEXT);
