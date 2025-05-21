# Kashrut Authority Application

This is the main repository for the Kashrut Authority timesheeting and onboarding platform.

## Project Setup

### Frontend

- Navigate to the `frontend` directory: `cd frontend`
- Install dependencies: `npm install`
- Start the development server: `npm start`

### Backend (To be implemented)

Details will be added as the backend is developed.

## Azure Deployment

### Prerequisites
- Azure account and access to Azure App Service
- Azure SQL Database and Storage account (if used)
- Node.js 18+ (recommended by Azure)

### Environment Variables (Backend)
Set these in Azure App Service > Configuration:
- `DB_USER`: Azure SQL username
- `DB_PASSWORD`: Azure SQL password
- `DB_SERVER`: Azure SQL server name (e.g., yourserver.database.windows.net)
- `DB_DATABASE`: Database name
- `DB_PORT`: Usually 1433
- `JWT_SECRET`: Secret for JWT tokens
- `AZURE_STORAGE_CONNECTION_STRING`: Azure Storage connection string
- `AZURE_STORAGE_CONTAINER_NAME`: Blob container name
- `PORT`: (optional, Azure sets this automatically)

### Deployment Steps
1. Build the frontend:
   ```sh
   cd frontend
   npm install
   npm run build
   ```
2. Ensure the backend serves the frontend build (already configured in `backend/server.js`).
3. Deploy the backend folder as a Node.js app to Azure App Service:
   - Set the startup command to `npm start` (or leave blank for default)
   - Set all required environment variables in Azure portal
   - Use local git or GitHub Actions for CI/CD

### Example Local Deployment Script
You can use this script to build and prepare for deployment:
```sh
# Build frontend
cd frontend
npm install
npm run build
cd ..
# Install backend dependencies
cd backend
npm install
```

Push the entire project to your Azure App Service or GitHub repo for CI/CD. 