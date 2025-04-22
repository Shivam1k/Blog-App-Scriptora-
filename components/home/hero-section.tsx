import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

const HeroSection = () => {
  return (
    
    <section className="relative min-h-[600px] w-full sm:min-h-[800px]  overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-950 to-indigo-950 ">
      {/* {Dradient overlay} */}
      <div className="absolute inset-0 before:absolute before:left-1/4 before:h-[500px] before:rounded-full before:bg-gradient-to-r before:from-violet-600/20 before:to-indigo-600/20 before:blur-3xl  ">
        <div className="container relative mx-auto flex h-full flex-col items-center px-4 py-24 md:flex-row md:py-32">
          <div className=" flex-1 space-y-8 text-center md:text-left">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Explore the World Through
              <span className="bg-gradient-to-r from-violet-400 bg-clip-text text-transparent">
                {" "}
                Words
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg text-gray-300 md:text-xl">
              {" "}
              Discover insightful articles, thought-provoking stories, and expert perspectives on technology, lifestyle, and innovation.
              </p>
            <div className=" flex flex-col items-center gap-4 sm:flex-row md:justify-start">
              <Button className="rounded-full ">Start Reading</Button>
              <Button className="rounded-full" variant={"outline"}>
                {" "}
                Explore Topic
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8 text-white md:mx-w-md">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">1k+</div>
                <div className="text-sm text-gray-400">Published articles</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">1k+</div>
                <div className="text-sm text-gray-400">Expert Writer </div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">1k+</div>
                <div className="text-sm text-gray-400">Monthly readers</div>
              </div>
            </div>

          
          </div>
          
            {/* {Image Frame} */}

            <div className="mt-12 flex-1 md:mt-0">
              <div
                className={cn(
                  "relative mx-auto w-64 h-64 rounded-2xl overflow-hidden",
                  " bg-gradient-to-br from-white/5 to-transparent",
                  "border border-primary/20 backdrop-blur-lg",
                  "shadow-2xl shadow-indigo-500/10"
                )}
              >
                <Image
                    src={"https://plus.unsplash.com/premium_photo-1680680514571-e16201d23e9d?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGFwdG9wJTIwb24lMjBkZXNrfGVufDB8fDB8fHww"}
                    fill
                    alt="hero image"
                    className="object-cover "/>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;













// HeroSection
// │
// └── <section> (Full width + Gradient background)
//     │
//     └── Gradient Overlay (Visual styling using ::before)
//         │
//         └── <div class="container"> (Main layout wrapper)
//             │
//             ├── Left Column (Textual Content)
//             │   ├── Headline: "Explore the World Through Words"
//             │   │   └── "Words" styled with a gradient effect
//             │   │
//             │   ├── Paragraph: Introductory tagline about articles
//             │   │
//             │   ├── Buttons:
//             │   │   ├── "Start Reading" (solid style)
//             │   │   └── "Explore Topic" (outline style)
//             │   │
//             │   └── Stats Grid (3 Columns):
//             │       ├── "1k+ Published articles"
//             │       ├── "1k+ Expert Writers"
//             │       └── "1k+ Monthly readers"
//             │
//             └── Right Column (Hero Image)
//                 └── Image Frame (Gradient border + blur)
//                     └── <Image> with object-cover
