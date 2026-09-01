/**
 * BarrierVerse MERN Architecture - Express Backend Server
 */

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import { setupBarrierRoutes } from './routes/barriers.js';
import { setupOrganizationRoutes } from './routes/organizations.js';
import { setupAIRoutes } from './routes/ai.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static frontend files
app.use(express.static(rootDir));

// API Routes
setupBarrierRoutes(app);
setupOrganizationRoutes(app);
setupAIRoutes(app);

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(rootDir, 'index.html'));
});

// Start Server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 BarrierVerse MERN Backend running at http://localhost:${PORT}`);
  });
}

export default app;
