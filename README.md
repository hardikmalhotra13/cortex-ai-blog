# 🚀 Cortex – AI-Powered Blogging Platform

Cortex is a full-stack blogging platform built using Next.js and Supabase, enhanced with AI-generated summaries. This project demonstrates modern full-stack development practices, role-based access control, and AI integration.

---

## 📌 Project Objective

The goal of this project is to build a simple yet functional blogging platform that:

* Supports authentication and role-based access
* Enables blog creation and interaction
* Integrates AI for automated content summarization
* Demonstrates clean architecture and development understanding

---

## 🛠️ Tech Stack

| Layer              | Technology           |
| ------------------ | -------------------- |
| Frontend + Backend | Next.js (App Router) |
| Authentication     | Supabase Auth        |
| Database           | Supabase             |
| Styling            | Tailwind CSS         |
| AI Integration     | Google Gemini API    |
| Deployment         | Vercel               |
| Version Control    | Git + GitHub         |

---

## 👥 User Roles & Permissions

### 📝 Author

* Create blog posts
* Edit their own posts
* View comments on their posts

### 👀 Viewer

* View blog posts
* Read AI-generated summaries
* Add comments

### 🛡️ Admin

* View all posts
* Edit any post
* Monitor all comments

---

## ✨ Features

### 📚 Blog System

* Create, edit, and view blog posts
* Post fields:

  * Title
  * Body content
  * Image URL
  * Author ID
  * AI-generated summary

### 💬 Comments

* Users can comment on posts
* Comments displayed under each post

### 🔍 Additional Features

* Search functionality
* Pagination for posts
* Role-based edit access

---

## 🤖 AI Summary Feature

When a new post is created:

1. The content is sent to the Google Gemini API
2. A ~200-word summary is generated
3. The summary is stored in the database
4. The summary is displayed in the post listing

### 💡 Optimization Strategy

* Summary is generated only once
* Stored in database to avoid repeated API calls
* Reduces token usage and cost

---

## 🗄️ Database Schema

### Users

* id
* name
* email
* role

### Posts

* id
* title
* body
* image_url
* author_id
* summary

### Comments

* id
* post_id
* user_id
* comment_text

---

## 🔐 Authentication Flow

* Users sign up or log in via Supabase Auth
* Session is maintained using Supabase client
* Role is assigned and used for access control

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-username/cortex.git
cd cortex
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
```

---

### 4. Run Locally

```bash
npm run dev
```

Visit:

```
http://localhost:3000
```

---

## 🌍 Deployment

### Step 1 – Push to GitHub

* Initialize repository
* Commit and push code

### Step 2 – Deploy on Vercel

* Import GitHub repository into Vercel
* Add environment variables
* Deploy

---

## 🧠 Development Understanding

### 🔧 Challenges Faced

* Managing environment setup issues (Node.js, npm, configs)
* Fixing TypeScript and import path errors
* Integrating Supabase with Next.js App Router

### ✅ Solutions

* Reconfigured project setup
* Fixed path alias issues
* Simplified architecture for faster implementation

---

## 🏗️ Architectural Decisions

* Used modular folder structure for scalability
* Implemented role-based logic on frontend for simplicity
* Stored AI summaries to optimize cost and performance

---

## 🤖 AI Tool Usage

### Tool Used

Antigravity / Cursor (AI Coding Assistant)

### Why Chosen

* Accelerates development
* Helps in debugging and structuring code
* Improves productivity

### How It Helped

* Generated boilerplate and structure
* Assisted in fixing errors
* Helped implement features efficiently

---

## 📊 Evaluation Readiness

This project fulfills:

* ✅ AI Tool Usage
* ✅ Code Quality
* ✅ Role-Based Access
* ✅ Database Design
* ✅ AI Integration
* ✅ Deployment
* ✅ Code Understanding

---

## 📎 Deliverables

* GitHub Repository
* Live Deployed URL
* Documentation (this README)

---

## 👨‍💻 Author

Developed as part of an internship selection assignment.

---

## ⭐ Final Note

This project focuses on delivering a functional, clean, and scalable system while effectively integrating AI capabilities into a real-world application.
