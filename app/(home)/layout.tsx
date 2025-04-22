import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import React from 'react';

const layout = async ({ children }: { children: React.ReactNode }) => {
  try {
    const user = await currentUser();

    if (user) {
      const loggedInUser = await prisma.user.findUnique({
        where: { clerkUserId: user.id },
      });

      if (!loggedInUser) {
        await prisma.user.create({
          data: {
            name: user.fullName || 'Anonymous',
            clerkUserId: user.id,
            email: user.emailAddresses[0]?.emailAddress || '',
            imageUrl: user.imageUrl,
          },
        });
      }
    }
  } catch (error) {
    console.error('❌ Error in layout user setup:', error);
    // Do not throw, just silently fail to avoid breaking rendering
  }

  return <div>{children}</div>;
};

export default layout;
