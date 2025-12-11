# 🧠 Mind Notes AI

> Transform any content into structured learning materials with the power of AI

Mind Notes AI is an intelligent note-taking and learning platform that leverages artificial intelligence to convert various content sources (YouTube videos, PDFs, text, audio/video files) into comprehensive study materials including detailed notes, summaries, flashcards, and interactive quizzes. Built to enhance learning efficiency and retention for students, professionals, and lifelong learners.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/react-%5E18.2.0-blue)](https://reactjs.org/)

---

## 📑 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [What Users Can Do](#-what-users-can-do)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
- [Learning Journey](#-learning-journey--what-i-learned)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🎯 Core Features

- **Multi-Source Content Input**
  - 📺 YouTube video transcription
  - 📄 PDF document parsing
  - 📝 Direct text input
  - 🎥 Local video/audio file transcription
  - 📋 Subtitle file (.srt, .vtt) upload

- **AI-Powered Content Generation**
  - 📖 **Smart Notes**: Automatically generate comprehensive, well-structured notes from any source
  - 📊 **Summaries**: Create concise summaries highlighting key points
  - 🃏 **Flashcards**: Generate interactive flashcards for active recall practice
  - 🎯 **Quizzes**: Auto-generate multiple-choice quizzes to test understanding

- **User Management**
  - 🔐 Secure authentication (JWT-based)
  - 🔑 Google OAuth integration
  - ✉️ Email verification
  - 👤 User profile management

- **Enhanced Learning Experience**
  - 🗣️ Text-to-speech for notes (accessibility feature)
  - 📤 Export notes to PDF
  - 🎴 Interactive flashcard study mode
  - 🎮 Quiz gameplay with instant feedback
  - 📱 Responsive design for mobile and desktop

- **Smart Organization**
  - 📁 Project-based note organization
  - 🔍 Search and filter capabilities
  - 📄 Pagination for large note collections
  - 🕒 Session management

- **AI Chatbot Assistant**
  - 💬 Context-aware chatbot for answering questions about your notes
  - 🤖 Powered by Google Gemini AI
  - 🎯 Helps clarify concepts and provide additional explanations

---

## 🛠️ Technology Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | Modern UI library with hooks |
| **React Router v7** | Client-side routing |
| **Vite** | Fast build tool and dev server |
| **Tailwind CSS** | Utility-first CSS framework |
| **Ant Design** | UI component library |
| **Axios** | HTTP client for API requests |
| **React Hot Toast** | Elegant notifications |
| **React Markdown** | Markdown rendering with syntax highlighting |
| **React Icons** | Comprehensive icon library |
| **jsPDF** | PDF generation for export |
| **html2canvas** | Screenshot and PDF conversion |

### Backend (Node.js/Express)
| Technology | Purpose |
|------------|---------|
| **Node.js & Express** | Server framework |
| **MongoDB & Mongoose** | NoSQL database and ODM |
| **Google Generative AI (Gemini)** | AI content generation |
| **Passport.js** | Authentication middleware |
| **JWT** | Token-based authentication |
| **Bcrypt.js** | Password hashing |
| **Multer** | File upload handling |
| **pdf-parse** | PDF text extraction |
| **youtube-transcript** | YouTube subtitle fetching |
| **Nodemailer** | Email sending service |
| **Helmet** | Security headers |
| **Express Rate Limit** | API rate limiting |
| **Morgan** | HTTP request logging |

### AI/ML Services (FastAPI)
| Technology | Purpose |
|------------|---------|
| **FastAPI** | High-performance Python API framework |
| **OpenAI Whisper** | Audio/video transcription |
| **FFmpeg** | Audio/video processing |
| **Uvicorn** | ASGI server |

### DevOps & Tools
- **Git** - Version control
- **ESLint** - Code linting
- **Nodemon** - Auto-restart development server
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

---

## 👥 What Users Can Do

### 📚 For Students
1. **Convert Lectures to Study Materials**
   - Upload recorded lectures or link YouTube educational videos
   - Automatically generate comprehensive notes
   - Create flashcards for memorization
   - Test knowledge with auto-generated quizzes

2. **PDF Textbook Processing**
   - Upload textbook chapters or research papers
   - Get AI-generated summaries
   - Extract key concepts as flashcards
   - Practice with chapter-specific quizzes

3. **Organize by Subject/Project**
   - Create separate projects for different courses
   - Manage all notes related to a subject in one place
   - Track learning progress with sessions

### 💼 For Professionals
1. **Meeting & Conference Notes**
   - Upload meeting recordings or transcripts
   - Get structured notes with key points
   - Create action items and summaries
   - Export professional-looking PDF reports

2. **Training & Development**
   - Process training videos and materials
   - Create knowledge base flashcards
   - Test understanding with quizzes
   - Build learning resources for teams

### 🎓 For Lifelong Learners
1. **Content Curation**
   - Convert online courses and tutorials into notes
   - Build personal knowledge bases
   - Practice with spaced repetition using flashcards
   - Track learning across multiple topics

2. **Accessibility Features**
   - Text-to-speech for audio learning
   - Multiple content input formats
   - Clean, readable note formatting
   - Export options for offline use

---

## 🏗️ Project Architecture

```
mind-notes/
├── frontend/              # React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── apis/         # API integration layer
│   │   ├── context/      # React Context (Auth)
│   │   ├── hooks/        # Custom React hooks
│   │   ├── routes/       # Routing configuration
│   │   ├── utils/        # Helper functions
│   │   └── landingPage/  # Marketing site components
│   └── public/           # Static assets
│
├── server/               # Node.js/Express backend
│   ├── controller/       # Route controllers
│   ├── model/           # MongoDB schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── helper/          # Helper functions
│   ├── prompt/          # AI prompt templates
│   ├── config/          # Configuration files
│   └── utils/           # Utility functions
│
└── fastapi/             # Python transcription service
    ├── server.py        # FastAPI application
    └── temp/            # Temporary file storage
```

### Data Flow

```
User Input → Upload/URL → Backend Processing → AI Generation → Database Storage → Frontend Display
                                ↓
                         FastAPI (if video/audio)
                                ↓
                         Whisper Transcription
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **MongoDB** (local or Atlas)
- **FFmpeg** (for video/audio processing)
- **Google Gemini API Key**

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/ayaannn05/mind-notes-ai.git
cd mind-notes-ai
```

#### 2. Setup Backend (Node.js)
```bash
cd server
npm install
```

Create `.env` file in the `server` directory:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/mind-notes
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/mind-notes

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
JWT_COOKIE_EXPIRES_IN=7

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/v1/auth/google/callback

# AI Service
GEMINI_API_KEY=your_gemini_api_key_here

# Email Configuration (for verification)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_email_app_password

# Frontend URL
CLIENT_URL=http://localhost:5173

# FastAPI URL
FASTAPI_URL=http://localhost:8000
```

Start the backend server:
```bash
npm run dev
# For production:
# npm run prod
```

#### 3. Setup FastAPI (Python)
```bash
cd fastapi
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Install FFmpeg (if not already installed):
```bash
# macOS
brew install ffmpeg

# Ubuntu/Debian
sudo apt install ffmpeg

# Windows
# Download from: https://ffmpeg.org/download.html
```

Start the FastAPI server:
```bash
python server.py
# Or using uvicorn:
# uvicorn server:app --reload --host 127.0.0.1 --port 8000
```

#### 4. Setup Frontend (React)
```bash
cd frontend
npm install
```

Create `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:5000/api/v1
```

Start the development server:
```bash
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **FastAPI**: http://localhost:8000

### 🏃‍♂️ Quick Start Guide

1. **Register an Account**
   - Navigate to http://localhost:5173
   - Sign up with email or use Google OAuth
   - Verify your email address

2. **Create Your First Note**
   - Click "Create New Note"
   - Choose your content source (YouTube, PDF, Text, etc.)
   - Upload/paste your content
   - Click "Generate" and wait for AI processing

3. **Explore Generated Content**
   - View AI-generated notes
   - Read the summary
   - Study with flashcards
   - Take quizzes to test your knowledge

4. **Export and Share**
   - Export notes as PDF
   - Use text-to-speech for audio learning
   - Ask the AI chatbot questions about your notes

---

## 📚 Learning Journey & What I Learned

### 🎓 Key Learnings

#### **Full-Stack Development**
- Implemented a complete MERN stack application from scratch
- Learned to integrate multiple services (Node.js, Python FastAPI) in one project
- Understood the importance of proper project architecture and separation of concerns

#### **AI Integration**
- Integrated Google Gemini AI for content generation
- Learned prompt engineering to get high-quality outputs
- Implemented OpenAI Whisper for audio transcription
- Understood how to structure prompts for different content types (notes, flashcards, quizzes)

#### **Authentication & Security**
- Implemented JWT-based authentication
- Added Google OAuth for social login
- Learned about secure password hashing with bcrypt
- Implemented email verification workflow
- Applied security best practices (helmet, rate limiting, XSS protection)

#### **File Processing**
- Worked with multiple file types (PDF, video, audio, subtitles)
- Learned to use Multer for file uploads
- Implemented PDF parsing with pdf-parse
- Used FFmpeg for video/audio conversion
- Managed temporary file storage and cleanup

#### **API Design**
- Designed RESTful APIs with proper HTTP methods
- Implemented pagination for large datasets
- Created reusable controller patterns with factory functions
- Learned error handling middleware patterns

#### **Frontend Development**
- Built a modern React application with hooks
- Implemented complex UI components (flashcards, quiz player)
- Used Context API for state management
- Learned React Router v7 for navigation
- Implemented protected routes
- Used Tailwind CSS for responsive design

#### **Real-Time Features**
- Integrated markdown rendering with syntax highlighting
- Implemented draggable chatbot component
- Created interactive quiz gameplay
- Added text-to-speech functionality

### 🔧 Development Process

**Phase 1: Planning & Design**
- Identified the problem: inefficient note-taking from various sources
- Designed the data models and API structure
- Created wireframes for the UI

**Phase 2: Backend Development**
- Set up Express server with MongoDB
- Implemented authentication system
- Created content processing pipelines for different source types
- Integrated AI services (Gemini, Whisper)

**Phase 3: Frontend Development**
- Built React components following atomic design principles
- Implemented routing and navigation
- Created forms for content upload
- Designed the note display and study interfaces

**Phase 4: Integration & Testing**
- Connected frontend with backend APIs
- Tested different file upload scenarios
- Optimized AI prompt responses
- Fixed bugs and edge cases

**Phase 5: Enhancement & Polish**
- Added export to PDF feature
- Implemented text-to-speech
- Created the landing page
- Improved UI/UX based on testing

### 💡 Challenges Overcome

1. **Video Transcription Performance**
   - Challenge: Slow transcription with large video files
   - Solution: Created separate FastAPI service to handle transcription asynchronously

2. **AI Response Consistency**
   - Challenge: Inconsistent JSON formatting from AI
   - Solution: Created robust JSON extraction utility that handles various response formats

3. **File Upload Management**
   - Challenge: Managing temporary files and preventing storage overflow
   - Solution: Implemented automatic cleanup after processing

4. **Cross-Origin Issues**
   - Challenge: CORS errors between frontend and multiple backend services
   - Solution: Properly configured CORS middleware with specific origins

5. **State Management**
   - Challenge: Managing authentication state across components
   - Solution: Implemented Context API for global auth state


## 🐛 Known Issues & Future Enhancements

### Known Issues
- Large video files (>100MB) may take longer to process
- PDF parsing may not work well with image-heavy documents
- Text-to-speech only supports English currently

### Planned Features
- [ ] Support for more languages
- [ ] Collaborative note-sharing
- [ ] Mobile app (React Native)
- [ ] Dark mode
- [ ] Voice input for notes
- [ ] Advanced search with filters
- [ ] Note templates
- [ ] Spaced repetition algorithm for flashcards
- [ ] Progress tracking and analytics
- [ ] Integration with note-taking apps (Notion, Evernote)

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Ayaan Ansari**

- GitHub: [@ayaannn05](https://github.com/ayaannn05)
- Repository: [mind-notes-ai](https://github.com/ayaannn05/mind-notes-ai)

---

## 🙏 Acknowledgments

- **Google Gemini AI** for content generation capabilities
- **OpenAI Whisper** for accurate audio transcription
- **React Community** for excellent documentation and resources
- **MongoDB** for flexible data storage
- All open-source contributors whose libraries made this project possible

---

## 📞 Support

If you encounter any issues or have questions:

1. Check existing [Issues](https://github.com/ayaannn05/mind-notes-ai/issues)
2. Create a new issue with detailed description
3. Contact via GitHub

---

<div align="center">

**⭐ Star this repository if you find it helpful! ⭐**

Made with ❤️ and ☕ by Ayaan Ansari

</div>
