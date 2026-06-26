export NODE_ENV=production
pwd
# Read Queries from and store them in a file
# npx tsx ./release_06262026/read_db.ts

# Run Prisma migration
# npx prisma migrate reset

# Query LLM with questions and store its responses in DB
npx tsx ./release_06262026/write_db.ts
