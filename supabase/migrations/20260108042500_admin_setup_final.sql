-- Admin Setup Script for mayurwaghchoure1995@gmail.com
-- Run this after the user has created their account

-- First, let's check if the user exists and assign admin role
DO $$
DECLARE
    user_uuid UUID;
BEGIN
    -- Get the user ID from auth.users
    SELECT id INTO user_uuid 
    FROM auth.users 
    WHERE email = 'mayurwaghchoure1995@gmail.com';
    
    -- If user exists, assign admin role
    IF user_uuid IS NOT NULL THEN
        INSERT INTO public.user_roles (user_id, role)
        VALUES (user_uuid, 'admin')
        ON CONFLICT (user_id, role) DO NOTHING;
        
        RAISE NOTICE 'Admin role assigned to mayurwaghchoure1995@gmail.com';
    ELSE
        RAISE NOTICE 'User mayurwaghchoure1995@gmail.com not found. Please sign up first.';
    END IF;
END $$;

-- Verify the admin role assignment
SELECT 
    u.email,
    ur.role,
    ur.created_at as role_assigned_at
FROM auth.users u
JOIN public.user_roles ur ON u.id = ur.user_id
WHERE u.email = 'mayurwaghchoure1995@gmail.com' AND ur.role = 'admin';
