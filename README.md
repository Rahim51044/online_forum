
---

Online Forum (Client)

description  
MERN Forum — a discussion forum with posts, comments, upvote/downvote, tags, and membership controls.

**Live project link:** `https://online-forum-661b8.web.app/` 

**Technologies used:**  
React, Express, MongoDB, Node.js, Tailwind CSS, React Router, Firebase Auth optional

## README.md (paste into repo)
```md
Online Forum (Client)

**Live:** https://online-forum-661b8.web.app/

## Overview
A forum application (client-side) built with React. Users can create posts, comment, upvote/downvote, and search by tags. There is an admin panel for moderation and role management.

## Screenshot
![App Screenshot](./screenshot.png)

## Main Technologies
- React (Vite)
- Tailwind CSS
- React Router
- Axios
- Express + MongoDB (backend)
- react-hook-form, react-select

## Core Features
- Create / Edit / Delete posts (users limited e.g., 5 posts unless premium)
- Upvote / Downvote and popularity sorting
- Comments on posts
- Tagging system with auto-suggestions
- Admin dashboard: manage users, announcements, reported posts

## Dependencies
- react, react-dom, react-router-dom
- axios
- react-hook-form, react-select
- tailwindcss
- firebase (optional for auth) or JWT libs

## Environment Variables (Client)
`.env.local` (Vite):
