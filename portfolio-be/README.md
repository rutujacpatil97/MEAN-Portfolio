# Portfolio backend

Node, Express and MongoDB API for my portfolio.

## Run it

```
npm install
copy .env.example .env      (then put your MongoDB connection string in .env)
npm run seed                (saves data/profile.json in MongoDB)
npm run dev                 (http://localhost:3000)
```

## Endpoints

- `GET /api/health` shows if the server and database are up
- `GET /api/profile` returns the whole profile (about, skills, journey, projects, awards)
- `POST /api/contact` saves a message from the contact form (`name`, `email`, `message`)

## Folders

- `src/config` database connection
- `src/models` mongoose schemas
- `src/controllers` what each endpoint does
- `src/routes` which URL goes to which controller
- `scripts/seed.js` loads `data/profile.json` into the database

## Deploying

Set `MONGO_URI` and `CORS_ORIGIN` (the address of the frontend) as environment variables on the host.
