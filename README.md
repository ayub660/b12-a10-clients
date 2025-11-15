Technologies Used

React.js – Frontend SPA

Tailwind CSS – Styling, responsive design

SweetAlert2 – Beautiful alerts and notifications

Node.js + Express.js – Backend server and API

MongoDB – Database for Issues & Contributions

Firebase Auth – Email/Password and Google login

React Router v6 – Private & public routes

Axios / Fetch API – Data fetching and state management

Authentication & Authorization

Private routes for Add Issue and My Issues pages

Login & Register pages with email/password and Google login

Password validation: minimum 6 characters, at least one uppercase & one lowercase letter

Profile avatar shows logged-in user info and logout button

Features

Navbar:

Left: Logo

Middle: Links (Home, Issues, My Issues, My Contributions)

Right: Login/Register or User Avatar with Logout dropdown

Home Page:

Banner carousel with 3 images

Categories section with 4 buttons

Recent complaints section

Add Issue Page (Private):

Form fields: Title, Category, Location, Description, Image, Suggested Budget

Automatically saves Date & logged-in user email

All Issues Page:

4-column grid layout

Each card shows Image, Title, Category

"See Detail" button opens Issue Detail page

Issue Detail Page:

Shows Title, Category, Location, Description, Image, Date, Amount

"Pay Cleanup Contribution" button opens modal form

My Issues Page:

Shows only the current user’s issues

Update button opens modal to edit the issue


Database Structure (MongoDB)

Collection: Issues

{
  "title": "Overflowing garbage on Road 21",
  "category": "Garbage",
  "location": "Mohakhali, Dhaka",
  "description": "Garbage has not been collected for 5 days.",
  "image": "https://...",
  "amount": 200,
  "status": "ongoing",
  "email": "user@mail.com",
  "date": "2025-10-26"
}


Collection: My Contributions

{
  "issueId": "abc123",
  "amount": 250,
  "name": "John Doe",
  "email": "johndoe@example.com",
  "phone": "01712345678",
  "address": "Banani, Dhaka",
  "date": "2025-11-10T14:30:00Z",
  "additionalInfo": "Looking forward to a cleaner community area!"
}
