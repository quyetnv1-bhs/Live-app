## Overview

# Project name: Live app

# Author: Nguyen Van Quyet

# Description:

This project builds a video streaming application that successfully integrates technologies such as Clerk and livekit into the project.

# Expected function:

- Users can watch online videos and perform online video streaming.
- User management function
- Live stream management
- Manage broadcast channels
- Parameter and service configuration with Clerk platform technology
- Synchronize database with Clerk platform
- Manage connections on many social networking platforms
- The website will update information in real time and save directly to the database, allowing users to administrate, monitor and manage visually.

# Purpose:

- The system is built to help small and medium-sized businesses and individuals manage and operate live streaming - their services easily, quickly, conveniently, optimally and in accordance with their needs. . . its business model.

## The project is built and developed by NVQ.

## More information about this project:

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# run ngrok

ngrok http --domain=grouse-fit-cow.ngrok-free.app 3000

# genarate db

npx prisma db push
npx prisma generate

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
