# 🎓 AI Exam Notes Generator

An AI-powered web application that helps students generate structured, examination-oriented study notes from academic topics and study content.

The application is built using the **MERN Stack** and integrates an external AI API to generate organized and easy-to-understand notes.

🌐 **Live Demo:**  
https://ai-exam-notes-generator-frontend.onrender.com

---

## 📌 Overview

Students often spend a significant amount of time searching for study material, organizing information, and preparing examination notes.

**AI Exam Notes Generator** provides a web-based solution where students can enter an academic topic or provide study content, and the system generates structured notes using AI.

The generated content is presented in an organized format suitable for examination preparation and revision.

---

## ✨ Features

- 🔐 User Registration and Login
- 👤 Secure User Authentication
- 🤖 AI-Based Examination Notes Generation
- 📝 Generate structured notes from academic topics/content
- 📚 Examination-oriented content generation
- 📄 Academic content/PDF processing
- 💾 Save generated notes
- 🕒 View previously generated notes
- 🔍 Notes History
- ✏️ AI-generated revision content
- 📤 Export generated content
- 📱 Responsive web interface
- 💳 Credit/Pricing management
- ⚡ MERN-based full-stack architecture

---

## 🏗️ System Architecture

The application follows a client-server architecture:

```text
┌─────────────────────┐
│     Student/User    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   React Frontend    │
│      (Vite)         │
└──────────┬──────────┘
           │ HTTP Requests
           ▼
┌─────────────────────┐
│  Node.js + Express  │
│      Backend        │
└──────────┬──────────┘
           │
     ┌─────┴─────────┐
     ▼               ▼
┌───────────┐   ┌──────────────┐
│ MongoDB   │   │ External AI  │
│ Database  │   │     API      │
└───────────┘   └──────────────┘
