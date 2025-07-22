# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your configuration

# Setup database
createdb muhasibatliq_pro
npm run migrate

# Start development server
npm run dev

# Environment setup
NODE_ENV=production
PORT=3000

# Database setup
DB_HOST=your-postgres-host
DB_NAME=muhasibatliq_pro_prod

# Security
JWT_SECRET=your-super-secure-secret

# Run tests
npm test

# API testing
npm run test:api

# Load testing
npm run test:load



