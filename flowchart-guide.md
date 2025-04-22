# Blog Application Flowchart Guide

This guide explains how to generate and use the flowcharts that visualize the architecture and data flow of the blog application.

## Generating Flowchart Images

The application includes scripts to generate visual representations of the application architecture using Mermaid diagrams.

### Prerequisites

To generate the flowchart images, you'll need to install the Mermaid CLI:

```bash
npm install -g @mermaid-js/mermaid-cli
```

### Generating Images

Run the following command to generate PNG images from the Mermaid diagrams:

```bash
npm run generate-flowcharts
```

This will:
1. Extract all Mermaid diagrams from `blog-application-flowchart.md`
2. Generate PNG images for each diagram
3. Save the images in the `flowchart-images` directory
4. Create an HTML file to view all diagrams

### Viewing the Flowcharts

After generating the images, you can:

1. Open `flowchart-images/index.html` in your browser to view all diagrams
2. Use the individual PNG files in presentations or documentation
3. Include the images in your PDF by using the markdown-pdf tool with the `--image` option

## Understanding the Flowcharts

The generated flowcharts represent different aspects of the application:

### 1. Application Architecture

This diagram shows the overall architecture of the application, including:
- Client Layer (Browser, Next.js, Server/Client Components)
- Authentication Layer (Clerk, Middleware)
- API Layer (API Routes, Validation)
- Database Layer (Prisma, PostgreSQL)
- External Services (Cloudinary)

### 2. Data Flow for Article Creation

This sequence diagram illustrates the process of creating a new article:
- User interaction with the UI
- Authentication verification
- Image upload to Cloudinary
- API request to save the article
- Database operations
- Response back to the user

### 3. User Authentication Flow

This flowchart shows the authentication process:
- Initial user visit
- Authentication check
- Login/signup process
- Token validation
- User data synchronization
- Access to protected routes

### 4. Database Schema Relationships

This entity-relationship diagram shows:
- The relationships between User, Articles, Comment, and Like entities
- The attributes of each entity
- Primary and foreign keys
- Cardinality of relationships

### 5. Component Hierarchy

This diagram illustrates the component structure of the application:
- App structure (layouts)
- Home page components
- Articles components
- Profile components
- Relationships between components

### 6. API Request Flow

This sequence diagram shows the flow of an API request:
- Client request with authentication token
- Middleware validation
- API processing
- Database query execution
- Response back to the client

## Using Flowcharts in Documentation

These flowcharts are valuable for:

1. **Technical Documentation**: Illustrate the architecture and data flow
2. **Onboarding**: Help new developers understand the system
3. **Presentations**: Visualize the application structure
4. **Interview Preparation**: Explain the technical decisions and architecture

## Customizing Flowcharts

To modify the flowcharts:

1. Edit the Mermaid diagrams in `blog-application-flowchart.md`
2. Run the generation script again to update the images
3. The changes will be reflected in the generated PNG files and HTML viewer 