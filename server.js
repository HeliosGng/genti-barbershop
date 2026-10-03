import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '8080', 10);

// Cloud Run Health Check Endpoint
app.get('/_health', (req, res) => {
  res.status(200).send('OK');
});

// Serve built static assets from Vite
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '1d',
  setHeaders: (res, filePath) => {
    // Immutable cache for fingerprinted assets
    if (filePath.includes('/assets/')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }
}));

// SPA fallback: Send index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`💈 Genti's Barbershop is live and listening on http://0.0.0.0:${port}`);
});
