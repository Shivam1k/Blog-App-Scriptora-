// BlogDashboard.tsx
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { PlusCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import RecentArticles from './recent-articles'
import { prisma } from '../../lib/prisma'

const BlogDashboard = async () => {
  const [rawArticles, totalComments] = await Promise.all([
    prisma.articles.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        comments: true,
        author: {
          select: {
            name: true,
            email: true,
            imageUrl: true
          }
        }
      }
    }),
    prisma.comment.count(),
  ])

  const articles = rawArticles.map(article => ({
    ...article,
    author: {
      ...article.author,
      imageUrl: article.author.imageUrl || '' // Ensure imageUrl is always a string
    }
  }))

  return (
    <main className='flex-1 p-4 md:p-8'>
      {/* Header */}
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='font-bold text-2xl'>Blog Dashboard</h1>
          <p>Manage your content and analytics</p>
        </div>
        <Link href="/dashboard/articles/create">
          <Button>
            <PlusCircle className='h-4 w-4 mr-2' />
            New Article
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className='grid md:grid-cols-3 mb-8 gap-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{articles.length}</div>
            <p className='text-sm text-muted-foreground mt-1'>+5 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{totalComments}</div>
            <p className='text-sm text-muted-foreground mt-1'>+5 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className="text-sm font-medium">Avg. Rating Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>4.2</div>
            <p className='text-sm text-muted-foreground mt-1'>+0.6 from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Articles Table */}
      <RecentArticles articles={articles} />
    </main>
  )
}

export default BlogDashboard




// User visits /dashboard
//          ↓
// <BlogDashboard /> (Server Component)
//          ↓
// Fetch Data using Prisma:
// - articles (with comments & author)
// - totalComments (count)
//          ↓
// Sanitize Articles:
// - Ensure author.imageUrl is always a string
//          ↓
// Render Dashboard Layout:
// - Header with title & "New Article" button
// - Stats Cards (Total Articles, Total Comments, Avg. Rating)
// - <RecentArticles /> (Client Component)
//          ↓
// RecentArticles Table:
// - List each article with:
//   Title | Status | Comments | Date | Edit/Delete Buttons
//          ↓
// <DeleteButton />:
// - Calls `deleteArticle(articleId)`
// - Server Action (uses Prisma to delete + revalidatePath("/dashboard"))
