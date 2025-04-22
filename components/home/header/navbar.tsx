// "use client";

// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import React from "react";
// import SearchInput from "./search-input";
// import ToggleMode from "./toggle-mode";
// import { Menu, Search, User, X } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

// const navbar = () => {
//   const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);

//   return (
//     <div className="sticky top-0 z-50  w-full border border-b bg-bagckground/95 backdrop-blur supports-[backdrop-filter]:bg-bagckground/60">
//       <div className=" container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex h-16 items-center justify-between">
//           {/* {Left Section} */}

//           <div className="flex items-center gap-8">
//             <Link href="/" className="flex items-center space-x-2">
//               <span>
//                 <span className="bg-gradient-to-r from-purple-600 to bg-indigo-600  dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
//                   Byte
//                 </span>
//                 <span className="text-foreground">Code</span>
//               </span>
//             </Link>
//           </div>
//           {/* {Desktop Menu} */}
//           <div className="hidden md:flex items-center gap-4">
//             <Link
//               href={"/articles"}
//               className="text-sm font-medium  text-foreground transition-colors hover:text-foreground"
//             >
//               Articles
//             </Link>
//             <Link
//               href={"/tutorial"}
//               className="text-sm font-medium  text-foreground transition-colors hover:text-foreground"
//             >
//               Tutorial
//             </Link>
//             <Link
//               href={"/about"}
//               className="text-sm font-medium  text-foreground transition-colors hover:text-foreground"
//             >
//               About
//             </Link>
//             <Link
//               href={"/dashboard"}
//               className="text-sm font-medium  text-foreground transition-colors hover:text-foreground"
//             >
//               Dashboard
//             </Link>
//           </div>

//           {/* {Right Section} */}
//           <div className=" flex items-center gap-4 ">
//             <SearchInput />
//             <ToggleMode />

//             {/* {USer action} */}

//             <SignedIn>
//               <UserButton/>
//             </SignedIn>

//             <SignedOut>

//             <div className="hidden md:flex items-center gap-2">
//               <SignInButton>
//               <Button>Login</Button>
//               </SignInButton>
//               <SignUpButton>
//               <Button>Signup</Button>
//               </SignUpButton>
//             </div>
              
//             </SignedOut>
//           </div>

//           {/* {Mobile Menu Button} */}

//           <Button variant={'ghost'}  size={'icon'} className="md:hidden text-muted-foreground hover:text-foreground" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
//             {
//               isMobileMenuOpen ?(<X className = "h-5 w-5"/>) : (<Menu className = "h-5 w-5"/>)
//             }
//           </Button>




//         </div>
//       </div>


//       {/* {Mobile Menu} */}
//       {isMobileMenuOpen && (
//           <div className="md:hidden py-4 space-y-4 border-t">
//             {/* Search Bar (Mobile) */}
//             <div className="px-4">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                 <Input
//                   type="search"
//                   placeholder="Search articles..."
//                   className="pl-10 w-full focus-visible:ring-1"
//                 />
//               </div>
//             </div>

//             {/* Mobile Navigation Links */}
//             <div className="space-y-2 px-4">
//               <Link
//                 href="/articles"
//                 className="block px-3 py-2 text-base font-medium text-foreground"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 Articles
//               </Link>
//               <Link
//                 href="/tutorials"
//                 className="block px-3 py-2 text-base font-medium text-foreground"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 Tutorials
//               </Link>
//               <Link
//                 href="/about"
//                 className="block px-3 py-2 text-base font-medium text-foreground"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 About
//               </Link>
//               <Link
//                 href="/dashboard"
//                 className="block px-3 py-2 text-base font-medium text-foreground"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 Dashboard
//               </Link>
//             </div>

//             {/* Mobile Auth Buttons */}
//             {/* <SignedOut> */}
//               <div className="px-4 flex flex-col gap-2">
//                 {/* <SignInButton> */}
//                   <Button variant="outline" className="w-full">
//                     Login
//                   </Button>
//                 {/* </SignInButton> */}
//                 {/* <SignUpButton> */}
//                   <Button className="w-full">Sign up</Button>
//                 {/* </SignUpButton> */}
//               </div>
//             {/* </SignedOut> */}
//           </div>
//         )}
//     </div>
//   );
// };

// export default navbar;



'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, Search, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SearchInput from './search-input';
import ToggleMode from './toggle-mode';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs';
import { SearchAction } from '@/actions/search';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  Scrip
                </span>
                <span className="text-foreground">tora</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/articles" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Articles
            </Link>
            <Link href="/tutorial" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Tutorial
            </Link>
            <Link href="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/dashboard" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Dashboard
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <SearchInput />
            <ToggleMode />

            <SignedIn>
              <UserButton />
            </SignedIn>

            <SignedOut>
              <div className="hidden md:flex items-center gap-2">
                <SignInButton>
                  <Button>Login</Button>
                </SignInButton>
                <SignUpButton>
                  <Button>Signup</Button>
                </SignUpButton>
              </div>
            </SignedOut>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden py-4 space-y-4 border-t">
          {/* Search (Mobile) */}
          <div className="px-4">
            <form  action={SearchAction} className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles..."
                name="search"
                className="pl-10 w-full focus-visible:ring-1"
              />
            </form>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2 px-4">
            {['articles', 'tutorial', 'about', 'dashboard'].map((path) => (
              <Link
                key={path}
                href={`/${path}`}
                className="block px-3 py-2 text-base font-medium text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {path.charAt(0).toUpperCase() + path.slice(1)}
              </Link>
            ))}
          </div>

          {/* Auth Buttons (Mobile) */}
          <SignedOut>
            <div className="px-4 flex flex-col gap-2">
              <SignInButton mode="modal">
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button className="w-full">Sign Up</Button>
              </SignUpButton>
            </div>
          </SignedOut>
        </div>
      )}
    </div>
  );
};

export default Navbar;


// Navbar Component (Sticky, Responsive)
// │
// ├── Left Section (Logo)
// │   └── Link to Home ("/")
// │       └── Brand Name:
// │           ├── "Byte" with Gradient Text
// │           └── "Code" with Normal Text
// │
// ├── Center Section (Desktop Menu - only visible on md+)
// │   ├── Link to "/articles"
// │   ├── Link to "/tutorial"
// │   ├── Link to "/about"
// │   └── Link to "/dashboard"
// │
// └── Right Section
//     ├── SearchInput Component
//     ├── ToggleMode Component
//     └── Auth Buttons (only visible on md+)
//         ├── Login Button
//         └── Signup Button
