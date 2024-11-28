# My Trello App

My Trello App is a Trello-like application built with a modern web stack. It allows users to manage boards, columns, and cards, similar to Trello, with authentication and authorization features.

## Features

- User authentication and authorization
- Create, update, and delete boards, columns, and cards
- Responsive design using Material-UI
- Backend API built with Node.js and Express
- Database management with Prisma

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Material-UI

### Backend

- Node.js
- Express
- Prisma
- JWT for authentication
- Joi for validation

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- PostgreSQL (or another supported database)

### Installation

1. Clone the repository:

```sh
git clone https://github.com/vogiaan1904/my-trello-app.git
cd my-trello-app
```
2. Install dependencies for both frontend and backend:
```
cd my-trello-app
npm install
cd ../server
npm install
```
3. Set up environment variables:
   Create a .env file in the server directory and add the following:
```
DATABASE_URL=your-database-url
TOKEN_SECRET=your-jwt-secret
```
4. Run database migrations:
```
cd server
npx prisma migrate dev
```
### Running the Application
1. Start the backend server:
```
cd server
npm run dev
```
2. Start the frontend development server:
```
cd my-trello-app
npm run dev
```
3. Open your browser and navigate to http://localhost:3000.

## License
This project is licensed under the MIT License.

