# NextPlay 🎮 | Full-Stack Game Library & Discovery App

**Live Demo:** [https://next-play-1nb4.vercel.app/](https://next-play-1nb4.vercel.app/)  
**Backend API:** [https://next-play-gules.vercel.app](https://next-play-gules.vercel.app)

*(Application Interface)*
![NextPlay UI Screenshot](./docs/screenshot.png) 
*(Note: Create a `docs` folder in your repo, drop your screenshot in there as `screenshot.png`, and this link will display it automatically!)*

---

## 📝 What is NextPlay?

**The Inspiration:** 
As a gamer, I always struggled to keep track of what I was currently playing, what I had finished, and what was sitting in my backlog across different platforms. I built NextPlay to solve my own "choice paralysis." It is a unified, full-stack web application that lets users build a personal digital library and discover their next favorite game through a smart recommendation engine. 

**What I Built (Core Features):**
- **Secure Authentication:** Users can safely register and log in. I implemented stateless auth using JSON Web Tokens (JWT) and hashed passwords with bcrypt.
- **Dynamic Game Discovery:** I integrated the RAWG Video Games Database API so users can seamlessly search, filter, and browse thousands of real game titles.
- **Library Management:** Full CRUD functionality. Users can add games to their personal library and update their status (e.g., Wishlist, Playing, Completed).
- **Custom Recommendations:** A recommendation engine that suggests new titles based on what is already saved in a user's library.
- **Serverless-Ready Backend:** I specifically engineered the MongoDB connection logic to cache across Vercel Serverless Functions, solving the dreaded "cold start" database timeouts.
- **Modern UI:** Designed a responsive, dark-mode glassmorphism interface using Tailwind CSS to give it a sleek, immersive feel.

---

## 🛠️ Tech Stack 

**Frontend:** React.js (Vite), Tailwind CSS, Axios  
**Backend:** Node.js, Express.js, MongoDB Atlas (Mongoose), JWT, bcryptjs  
**Deployment:** Vercel (Frontend & Serverless Backend)

---

## 🗄️ Database Architecture

To keep data retrieval fast and relational, I designed the MongoDB database using Mongoose references. The `User` model handles the secure credentials, while the `Library` model stores the actual game data. 

Each item in the library references a specific user's `ObjectId` and saves the unique RAWG `gameId` along with the player's customized progress status. 

*Schema Relationship Snippet:*
```javascript
const librarySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gameId: { type: String, required: true },
  title: { type: String, required: true },
  status: { type: String, enum: ['wishlist', 'playing', 'completed'], default: 'wishlist' }
}, { timestamps: true });