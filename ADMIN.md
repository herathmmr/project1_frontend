# Admin Credentials

To test the admin interface, use these credentials:

Email: admin@example.com
Password: admin123

# Regular User Credentials

To test as a regular user:

Email: user@example.com
Password: user123

# Routes

- `/admin/dashboard` - Admin only, shows product and user management
- `/` - Regular users get redirected here after login
- `/login` - Both admin and regular users login here
- `/profile` - Protected route for all authenticated users
- `/products` - Public route
- `/products/:id` - Public route
- `/inquiry` - Protected route for authenticated users

# Role-Based Behavior

1. When an admin logs in, they are redirected to `/admin/dashboard`
2. When a regular user logs in, they are redirected to the home page
3. If a non-admin tries to access `/admin/dashboard`, they are redirected to login
4. All authenticated users can access `/profile` and `/inquiry`

Note: Make sure your backend properly sets the role in the JWT token payload.