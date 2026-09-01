#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();

// Set up environment
process.env.SITES_PROJECT_ROOT = projectRoot;
process.env.SITES_ENV_READY = '1';
process.env.npm_config_audit = 'false';
process.env.npm_config_fund = 'false';
process.env.npm_config_update_notifier = 'false';
process.env.WRANGLER_WRITE_LOGS = 'false';

// Create runtime directories
const runtimeRoot = path.join(projectRoot, '.sites-runtime');
const dirs = [
  path.join(runtimeRoot, 'home'),
  path.join(runtimeRoot, 'npm-cache'),
  path.join(runtimeRoot, 'xdg-config'),
  path.join(runtimeRoot, 'tmp'),
  path.join(runtimeRoot, 'wrangler', 'logs'),
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Run build
try {
  console.log('Building project...');
  execSync('npm run build', { stdio: 'inherit', cwd: projectRoot });
  console.log('Build completed successfully!');
  process.exit(0);
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
