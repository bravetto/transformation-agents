# 🚀 THE BRIDGE PROJECT - LOCAL SETUP GUIDE

## 📋 Prerequisites

- **Node.js**: v18.x or v20.x (currently using v20.5.0)
- **npm**: v9.x or higher
- **Git**: For version control

## 🛠️ Quick Setup

### 1. Clone or Download the Repository

If you haven't already cloned the repository:
```bash
git clone https://github.com/bravetto/transformation-agents-bridge-project.git
cd transformation-agents-bridge-project
```

### 2. Clean Install (Recommended)

```bash
# Remove any existing build artifacts and dependencies
rm -rf .next node_modules

# Install fresh dependencies
npm install
```

### 3. Start Development Server

```bash
# Start on default port 3000
npm run dev

# Or start on a specific port
npm run dev -- -p 3001
```

## 🌐 Access Your Local Site

Once the server is running, open your browser and visit:
- **http://localhost:3000** (or the port shown in terminal)

## 📁 Project Structure

```
transformation-agents-bridge-project/
├── src/
│   ├── app/              # Next.js app directory (pages)
│   ├── components/       # React components
│   ├── data/            # People data files
│   ├── lib/             # Utility functions
│   └── types/           # TypeScript types
├── public/              # Static assets
│   └── images/          # Image files
├── package.json         # Dependencies
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── vercel.json         # Vercel deployment config
```

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run dev:4200        # Start on port 4200

# Production
npm run build           # Build for production
npm run start           # Start production server

# Code Quality
npm run type-check      # Check TypeScript types
npm run lint            # Run ESLint
npm test               # Run tests
```

## 🎨 Key Features

1. **Homepage** - The Bridge Project introduction
2. **People Pages** - Individual stories:
   - JAHmere Webb
   - Martha Henderson
   - Jordan Dungy
   - Michael Mataluni
   - Coach Tony Dungy
   - Jay Forte
3. **Letters** - Powerful testimonies
4. **Judge Dashboard** - Data visualization
5. **Contact** - Support form

## 🔍 Troubleshooting

### Port Already in Use
```bash
# Kill processes on port 3000
pkill -f "node.*3000"

# Or use a different port
npm run dev -- -p 3001
```

### Build Errors
```bash
# Clean build cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
The project currently has `ignoreBuildErrors: true` in next.config.js. 
To see TypeScript errors:
```bash
npm run type-check
```

## 🌟 Development Tips

1. **Hot Reload**: Changes to components automatically refresh
2. **Fast Refresh**: React state is preserved during edits
3. **Error Overlay**: Development errors show in browser
4. **Image Placeholders**: Using Unsplash for development

## 📝 Environment Variables

Currently, no environment variables are required for basic local development.

For future features, create a `.env.local` file:
```env
# Example (not currently required)
DATABASE_URL=your_database_url
NEXTAUTH_SECRET=your_secret
```

## 🚀 Next Steps

1. **Explore the Code**: Start with `src/app/page.tsx`
2. **Modify Content**: Edit files in `src/data/people/`
3. **Style Changes**: Update `src/app/globals.css`
4. **Add Features**: Create new components in `src/components/`

## 🆘 Need Help?

- Check the console for error messages
- Review the [Next.js Documentation](https://nextjs.org/docs)
- Look at existing components for patterns

---

**Happy coding! Build bridges, transform lives. 🌉**

**Clear Eyes. Full Hearts. Can't Lose. 🔥** 