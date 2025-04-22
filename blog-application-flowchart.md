# Blog Application Architecture Flowchart

Below is a flowchart representation of the blog application architecture using Mermaid syntax. You can render this in any Markdown viewer that supports Mermaid.

## Application Architecture

```mermaid
graph TD
    subgraph "Client Layer"
        Browser[Browser]
        NextJS[Next.js App Router]
        ServerComponents[React Server Components]
        ClientComponents[React Client Components]
    end

    subgraph "Authentication Layer"
        Clerk[Clerk Auth]
        Middleware[Next.js Middleware]
    end

    subgraph "API Layer"
        API[API Routes]
        Validation[Zod Validation]
    end

    subgraph "Database Layer"
        Prisma[Prisma ORM]
        PostgreSQL[(PostgreSQL)]
    end

    subgraph "External Services"
        Cloudinary[Cloudinary]
    end

    Browser --> NextJS
    NextJS --> ServerComponents
    NextJS --> ClientComponents
    NextJS --> Middleware
    Middleware --> Clerk
    ServerComponents --> API
    ClientComponents --> API
    API --> Validation
    API --> Prisma
    Prisma --> PostgreSQL
    API --> Cloudinary
```

## Data Flow for Article Creation

```mermaid
sequenceDiagram
    participant User
    participant UI as Client UI
    participant API as API Routes
    participant Auth as Clerk Auth
    participant DB as PostgreSQL
    participant Cloud as Cloudinary

    User->>UI: Create new article
    UI->>Auth: Verify authentication
    Auth-->>UI: Authentication confirmed
    UI->>Cloud: Upload featured image
    Cloud-->>UI: Return image URL
    UI->>API: Submit article data
    API->>DB: Save article
    DB-->>API: Article saved
    API-->>UI: Success response
    UI-->>User: Article published
```

## User Authentication Flow

```mermaid
flowchart TD
    A[User visits site] --> B{Is authenticated?}
    B -->|No| C[Show login/signup options]
    B -->|Yes| D[Load user profile]
    C --> E[User authenticates with Clerk]
    E --> F[Clerk provides session token]
    F --> G[Middleware validates token]
    G --> H[Create/update user in database]
    H --> D
    D --> I[Access protected routes]
```

## Database Schema Relationships

```mermaid
erDiagram
    User ||--o{ Articles : "authors"
    User ||--o{ Comment : "writes"
    User ||--o{ Like : "creates"
    Articles ||--o{ Comment : "has"
    Articles ||--o{ Like : "receives"

    User {
        string id PK
        string clerkUserId
        string email
        string name
        string imageUrl
        string role
    }

    Articles {
        string id PK
        string title
        string content
        string category
        string featuredImage
        string authorId FK
        datetime createdAt
    }

    Comment {
        string id PK
        string body
        string articleId FK
        string authorId FK
        datetime createdAt
    }

    Like {
        string id PK
        boolean isLiked
        string userId FK
        string articleId FK
        datetime createdAt
    }
```

## Component Hierarchy

```mermaid
graph TD
    subgraph "App Structure"
        RootLayout[Root Layout]
        HomeLayout[Home Layout]
        ArticlesLayout[Articles Layout]
        ProfileLayout[Profile Layout]
    end

    subgraph "Home Page"
        HomePage[Home Page]
        Navbar[Navbar]
        HeroSection[Hero Section]
        TopArticles[Top Articles]
        BlogFooter[Blog Footer]
    end

    subgraph "Articles"
        ArticlesPage[Articles Page]
        ArticleDetail[Article Detail]
        ArticleForm[Article Form]
        Comments[Comments Section]
    end

    subgraph "Profile"
        ProfilePage[Profile Page]
        UserArticles[User Articles]
        UserSettings[User Settings]
    end

    RootLayout --> HomeLayout
    RootLayout --> ArticlesLayout
    RootLayout --> ProfileLayout
    
    HomeLayout --> HomePage
    HomePage --> Navbar
    HomePage --> HeroSection
    HomePage --> TopArticles
    HomePage --> BlogFooter
    
    ArticlesLayout --> ArticlesPage
    ArticlesLayout --> ArticleDetail
    ArticlesLayout --> ArticleForm
    
    ArticleDetail --> Comments
    
    ProfileLayout --> ProfilePage
    ProfilePage --> UserArticles
    ProfilePage --> UserSettings
```

## API Request Flow

```mermaid
sequenceDiagram
    participant Client
    participant Middleware
    participant API
    participant Prisma
    participant DB

    Client->>Middleware: Request with auth token
    Middleware->>Middleware: Validate token
    Middleware-->>Client: Token valid
    Client->>API: API request
    API->>Prisma: Database query
    Prisma->>DB: Execute query
    DB-->>Prisma: Query results
    Prisma-->>API: Formatted data
    API-->>Client: JSON response
``` 