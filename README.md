# React Podcast App
This project introduces key new features including global audio playback, favouriting episodes, deployment best practices, UI enhancements, and optional listening progress tracking.
An advanced podcast browsing experience that allows users to dynamically search, sort, filter, and paginate a list of podcast shows. The goal is to create an intuitive interface that responds to user input in real time and maintains a consistent, seamless experience throughout navigation.


## Features

- Audio playback
- Favourites page
- Search
- Fitler dropdown select


## Installation

Follow these steps to set up the project locally:

Clone the repository
```
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

Install dependencies
Make sure you have Node.js and npm (or Yarn) installed. Then run:
```
npm install
```

or with Yarn:
```
yarn install
```

Start the development server
```
npm start
```

The app will usually run on: http://localhost:3000

Open it in your browser to see the genre dropdown and cards in action.

Build for production
```
npm run build
```

This creates an optimized build in the build/ folder, ready for deployment.

🔧 Tips

If you run into dependency issues, delete node_modules and package-lock.json, then reinstall:
```
rm -rf node_modules package-lock.json
npm install
```
```
Use VS Code + ESLint + Prettier to keep your code clean and consistent.
```
If you’re deploying to Netlify, Vercel, or GitHub Pages, the npm run build command is required.
    
## Deployment Link