#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = __dirname;

// Set up environment variables
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

// Set environment variables for paths
process.env.HOME = path.join(runtimeRoot, 'home');
process.env.XDG_CONFIG_HOME = path.join(runtimeRoot, 'xdg-config');
process.env.TMPDIR = path.join(runtimeRoot, 'tmp');
process.env.WRANGLER_LOG_PATH = path.join(runtimeRoot, 'wrangler', 'logs');
process.env.MINIFLARE_REGISTRY_PATH = path.join(runtimeRoot, 'wrangler', 'registry');

// Run build with vinext
try {
  console.log('Installing dependencies...');
  execSync('npm ci', { stdio: 'inherit', cwd: projectRoot });
  
  console.log('Building project with Vinext...');
  const vinextPath = path.join(projectRoot, 'node_modules', '.bin', 'vinext');
  execSync(`node "${vinextPath}" build`, { stdio: 'inherit', cwd: projectRoot });
  
  console.log('Build completed successfully!');
  
  // Check output directory
  if (fs.existsSync(path.join(projectRoot, 'dist'))) {
    console.log('✓ dist/ directory created');
  }
  if (fs.existsSync(path.join(projectRoot, '.next'))) {
    console.log('✓ .next/ directory created');
  }
  
  process.exit(0);
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}

