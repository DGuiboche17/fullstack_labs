# Pixell River Backend

## Database Setup

Create a Postgres database locally or with Neon, then copy the connection string into `apps/backend/.env`.

```bash
cp .env.example .env
```

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require"
```

After the connection string is set, run these commands from the repository root:

```bash
npm run db:migrate
npm run db:seed
```

`npm run db:migrate` applies the Prisma migration in `prisma/migrations`.
`npm run db:seed` fills the database with the Pixell River employee, department, role, and leader data from the previous labs.

## Schema Notes

The Prisma schema keeps the data normalized:

- `Department` stores department names.
- `Employee` stores employee names and references one department by `departmentId`.
- `Role` stores role titles.
- `Leader` stores leader names and references one role by `roleId`.
