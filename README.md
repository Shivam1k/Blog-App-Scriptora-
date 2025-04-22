# Modern Blog Application

A full-featured blog application built with Next.js, featuring authentication, article management, and a modern UI.

## Features

- **Authentication**: Secure user authentication using Clerk
- **Article Management**: Create, read, update, and delete articles
- **User Profiles**: User profiles with customizable information
- **Comments**: Comment on articles with real-time updates
- **Likes**: Like/unlike articles
- **Responsive Design**: Mobile-friendly interface
- **Dark Mode**: Support for light and dark themes
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Authentication**: Clerk
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS, shadcn/ui components
- **Image Handling**: Cloudinary
- **Rich Text Editor**: React Quill
- **Form Validation**: Zod

## Project Structure

```
my-app/
├── app/                    # Next.js app directory
│   ├── (home)/             # Home page and layout
│   ├── articles/           # Article-related pages
│   ├── profile/            # User profile pages
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles
├── components/             # Reusable components
│   ├── home/               # Home page components
│   ├── articles/           # Article-related components
│   ├── profile/            # Profile-related components
│   └── ui/                 # UI components (shadcn/ui)
├── lib/                    # Utility functions and configurations
├── prisma/                 # Database schema and migrations
└── public/                 # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database
- Clerk account for authentication
- Cloudinary account for image hosting

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/blog_db"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Schema

The application uses the following data models:

- **User**: Stores user information and authentication details
- **Articles**: Blog posts with title, content, and metadata
- **Comment**: User comments on articles
- **Like**: Tracks user likes on articles

## Deployment

The application can be deployed to any platform that supports Next.js applications, such as Vercel, Netlify, or a custom server.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
