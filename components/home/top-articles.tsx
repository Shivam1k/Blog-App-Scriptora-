import React from 'react'
import { Card } from '../ui/card'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { prisma } from '@/lib/prisma'

const TopArticles = async () => {
  try {
    const articles = await prisma.articles.findMany({
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
      },
      take: 3
    })

    // Convert Date to string to avoid serialization issues
    const safeArticles = articles.map((article) => ({
      ...article,
      createdAt: article.createdAt.toISOString()
    }))

    if (!safeArticles || safeArticles.length === 0) {
      return (
        <div className="text-center py-10">
          <p className="text-gray-500 dark:text-gray-400">No articles found.</p>
        </div>
      )
    }

    return (
      <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
        {safeArticles.map((article) => (
          <Card
            className={cn(
              "group relative overflow-hidden transition-all hover:scale-[1.02]",
              "border-gray-200/50 dark:border-white/10",
              "bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg"
            )}
            key={article.id}
          >
            <div className='p-6'>
              <Link href={`/articles/${article.id}`}>
                <div className='relative mb-4 h-48 w-full overflow-hidden rounded-xl'>
                  <Image
                    src={article.featuredImage || "/placeholder.png"}
                    alt={article.title || "Article Image"}
                    fill
                    className='object-cover'
                  />
                </div>

                <div className='flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400'>
                  <Avatar className='h-8 w-8'>
                    <AvatarImage src={article.author?.imageUrl || "/avatar.png"} />
                    <AvatarFallback>{article.author?.name?.charAt(0) || "A"}</AvatarFallback>
                  </Avatar>
                  <span>{article.author?.name || "Anonymous"}</span>
                </div>

                <h3 className='mt-4 text-xl font-semibold text-gray-900 dark:text-white'>
                  {article.title || "Untitled"}
                </h3>
                <p className='mt-2 text-gray-600 dark:text-gray-300'>
                  {article.category || "Uncategorized"}
                </p>

                <div className='mt-6 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400'>
                  <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                  <span>12 min to read</span>
                </div>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    )
  } catch (error) {
    console.error("Error fetching articles:", error)
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Error loading articles. Please try again later.</p>
      </div>
    )
  }
}

export default TopArticles







//   TopArticles
// │
// └── <div> Grid Container (responsive grid layout)
//     │
//     └── <Card> (Article Preview)
//         ├── Transition Effects on Hover (scale up, blur bg)
//         └── <div class="p-6"> (Card Content)
//             │
//             └── <Link href={`/articles/${1234}`}> (Clickable card)
//                 ├── Image (Top thumbnail)
//                 │   └── <Image> fills card top with cover fit
//                 │
//                 ├── Author Info
//                 │   ├── <Avatar> with image/fallback initials
//                 │   └── Author Name: "Patel MernStack"
//                 │
//                 ├── Title: "How to become frontend web developer in 2026"
//                 │
//                 ├── Description: (currently empty)
//                 │
//                 └── Metadata Row
//                     ├── Date: "12 feb"
//                     └── Read Time: "12 min to read"
