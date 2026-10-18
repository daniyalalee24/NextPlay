# NextPlay 🎮 | Full-Stack Smart Game Recommendation Web App

**Live Demo:** [https://next-play-1nb4.vercel.app/](https://next-play-1nb4.vercel.app/)  
**Backend API:** [https://next-play-gules.vercel.app](https://next-play-gules.vercel.app)

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

_(Application Interface)_

### 1. Game Discovery & Dashboard

![NextPlay Dashboard](./screenshots/screenshot1.png)

### 2. For Discovering New Games

![Discover New Games Page](./screenshots/screenshot2.png)

### 3. Personal Game Library

![Personal Library](./screenshots/screenshot3.png)

### 4. Smart Recommendations

![Recommendation Engine](./screenshots/screenshot4.png)

---

## 🗄️ Database Architecture

To keep data retrieval fast and relational, I designed the MongoDB database using Mongoose references. The `User` model handles the secure credentials, while the `Library` model stores the actual game data.

Each item in the library references a specific user's `ObjectId` and saves the unique RAWG `gameId` along with the player's customized progress status.

_Schema Relationship Snippet:_

```javascript
const librarySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    gameId: { type: String, required: true },
    title: { type: String, required: true },
    status: { type: String, enum: ["wishlist", "playing", "completed"], default: "wishlist" }
  },
  { timestamps: true }
);
```

---

**Author:** Daniyal Ali  
_Full-Stack Software Engineer_
