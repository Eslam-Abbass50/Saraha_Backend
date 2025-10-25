# Saraha Backend

A Node.js/Express backend for an anonymous messaging platform inspired by Sarahah. Users can register, verify their email, and receive anonymous messages via public profiles. The service includes request validation, authentication, email-based confirmation, and robust error handling.

## Features

- User registration and login
- Email confirmation with templated emails
- JWT-based authentication and protected routes
- Anonymous message creation and retrieval
- Centralized error handling
- Input validation middleware
- Modular architecture for users and messages
- MongoDB integration (via Mongoose)

## Tech Stack

- Runtime: Node.js
- Framework: Express
- Database: MongoDB (Mongoose)
- Auth: JSON Web Tokens (JWT)
- Email: Nodemailer (with templated confirmation)
- Validation: Custom middleware + schema validators
- Error Handling: Centralized middleware

## Project Structure

- app.js — Express app bootstrap and global middleware registration
- database/
  - dbConection.js — MongoDB connection logic
- model/
  - userModel.js — User schema/model
  - mesageModel.js — Message schema/model
- src/
  - emails/
    - sendEmails.js — Email sending utility
    - templetConfirmation.js — Email confirmation template
  - middelware/
    - Auth.js — JWT authentication middleware
    - validation.js — Request validation rules/middleware
  - modules/
    - user/
      - user.controller.js — User controller (register/login/confirm/etc.)
      - user.router.js — User routes
      - user.validation.js — Validation schemas for user endpoints
    - message/
      - massage.controller.js — Message controller (create/list/etc.)
      - message.router.js — Message routes
  - utils/
    - CatchAyncError.js — Async error wrapper
    - CreateError.js — Custom error helper
    - globalMiddelwareHandling.js — Central error handler
- package.json — Dependencies and scripts
- .gitattributes — Repo attributes
- .env — Environment variables (not committed)

Note: Some file names appear misspelled (e.g., mesageModel, massage.controller, middelware). They still function but consider renaming for clarity in the future.

## Prerequisites

- Node.js LTS installed
- MongoDB instance (local or hosted like MongoDB Atlas)
- SMTP credentials for sending emails (or a test service like Mailtrap)

## Environment Variables

Create a `.env` file at the project root with values like:

- PORT: Port the server will run on (e.g., 3000)
- DB_URI: MongoDB connection string
- JWT_SECRET: Secret key for signing JWT tokens
- JWT_EXPIRES_IN: Token TTL (e.g., 7d)
- SMTP_HOST: SMTP server host
- SMTP_PORT: SMTP server port
- SMTP_USER: SMTP username
- SMTP_PASS: SMTP password
- EMAIL_FROM: From address used for outbound emails
- BASE_URL: Base URL of your deployed frontend or API (used in email links)

Example `.env`:

```
PORT=3000
DB_URI=mongodb://localhost:27017/saraha_backend
JWT_SECRET=change_this_secret
JWT_EXPIRES_IN=7d
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_user
SMTP_PASS=your_pass
EMAIL_FROM="Saraha <no-reply@saraha.local>"
BASE_URL=http://localhost:3000
```

## Installation

1) Install dependencies

```
npm install
```

2) Set up environment
- Create and populate the `.env` file as shown above.

3) Start MongoDB
- Ensure your MongoDB instance is running and accessible via `DB_URI`.

## Running the App

- Development

```
npm run dev
```

- Production

```
npm start
```

The server will start on the port specified in `.env` (default: 3000).

## API Overview

Routes are organized by module. Below is a typical shape based on the repository:

- /api/v1/users
  - POST /register — Create an account and trigger email confirmation
  - GET /confirm — Confirm user email via token (sent in email)
  - POST /login — Authenticate and receive JWT
  - GET /me — Get current user profile (requires JWT)
- /api/v1/messages
  - POST /:username — Create an anonymous message for a user
  - GET / — List messages for the authenticated user (requires JWT)

Note: Exact routes may differ slightly based on implementation in `user.router.js` and `message.router.js`.

## Validation and Error Handling

- Validation: `src/middelware/validation.js` and `user.validation.js` apply schema-based validation to incoming requests. Invalid requests will be rejected with detailed error messages.
- Error Handling: Centralized in `src/utils/globalMiddelwareHandling.js` and helpers (`CreateError`, `CatchAyncError`) to ensure consistent error responses.

## Email Workflow

- `sendEmails.js` handles sending emails via SMTP.
- `templetConfirmation.js` constructs the email confirmation template and link.
- After registration, users receive an email with a confirmation link pointing back to the API, which verifies and activates the account.

## Security

- JWT for stateless authentication on protected endpoints
- Basic validation and sanitization via middleware
- Keep `JWT_SECRET` and SMTP credentials secure in `.env` (never commit secrets)

## Scripts

Common scripts in `package.json` (names may vary):

- `start` — Run the server
- `dev` — Run with auto-reload (nodemon)

## Development Notes

- Be mindful of the misspelled filenames; align imports accordingly or refactor names consistently.
- Ensure `BASE_URL` matches the domain used in email links so confirmation succeeds.
- For local development, use Mailtrap or a similar sandbox SMTP to safely test emails.

## License

This project is provided as-is. Add your preferred license if you plan to distribute.

## Acknowledgements

- Inspired by Sarahah
- Built with Express, Mongoose, and Nodemailer
