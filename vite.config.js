import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Custom Vite plugin to handle local data.json updates during development
const apiServerPlugin = () => ({
  name: 'api-server',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      // Endpoint for updating data.json
      if (req.url === '/api/update-data' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });

        req.on('end', () => {
          try {
            const dataPath = path.resolve(__dirname, 'src/data.json');
            const data = JSON.parse(body);

            // Validate it's actually saving something before overwriting
            if (data && typeof data === 'object') {
              fs.writeFileSync(dataPath, JSON.stringify(data, null, 4));
              res.statusCode = 200;
              res.end(JSON.stringify({ success: true, message: 'Data updated successfully' }));
            } else {
              res.statusCode = 400;
              res.end(JSON.stringify({ success: false, message: 'Invalid payload payload' }));
            }
          } catch (e) {
            console.error('Failed to update data.json:', e);
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, message: e.message }));
          }
        });
        return; // Stop execution here for this route
      }
      next(); // Continue for all other routes
    });
  }
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), apiServerPlugin()],
  base: '/Portfolio/',
})
