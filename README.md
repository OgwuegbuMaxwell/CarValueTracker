# CarValueTracker

CarValueTracker is a simple yet powerful NestJS REST API for estimating used car prices and submitting actual sale reports. It includes role-based access for admins to approve reported data.

## Features
- User registration and login (email/password)
- Get used car value estimates by make, model, year, and mileage
- Submit real-world sale data
- Admin dashboard for reviewing and approving sale reports

## Tech Stack
- NestJS
- TypeORM or Prisma (for DB access)

## Setup Instructions
```
npm install
npm run start:dev
```

## API Endpoints
- `POST /auth/signup` – Register a user
- `POST /auth/login` – Log in and get a token
- `GET /reports` – Get price estimate for a vehicle
- `POST /reports` – Submit a sale report
- `PATCH /reports/:id` – Approve a sale report (admin only)

## License
MIT

