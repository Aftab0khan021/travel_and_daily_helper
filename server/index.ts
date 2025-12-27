import { spawn } from 'child_process';

const vite = spawn('npx', ['vite', '--host', '0.0.0.0', '--port', '5000'], {
  cwd: process.cwd(),
  stdio: 'inherit',
  shell: true,
});

vite.on('error', (err) => {
  console.error('Failed to start Vite:', err);
  process.exit(1);
});
