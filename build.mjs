#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = __dirname;

console.log('=== Build Started ===');
console.log('Project Root:', projectRoot);
console.log('Node Version:', process.version);

// Set up environment variables
process.env.SITES_PROJECT_ROOT = projectRoot;
process.env.SITES_ENV_READY = '1';
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

console.log('\n=== Creating runtime directories ===');
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

// Clear npm cache issues
delete process.env.npm_config_cache;

try {
  console.log('\n=== Installing dependencies ===');
  // Use npm install instead of npm ci to avoid cache issues
  execSync('npm install --legacy-peer-deps', { stdio: 'inherit', cwd: projectRoot });
  
  console.log('\n=== Running Vite build ===');
  // Use npx to run vite directly
  execSync('npx vite build', { stdio: 'inherit', cwd: projectRoot, env: process.env });
  
  console.log('\n=== Build completed successfully ===');
  
  // Check output directories
  console.log('\nOutput directories:');
  const outputDirs = ['.next', 'dist', '.vercel/output'];
  outputDirs.forEach(dir => {
    const fullPath = path.join(projectRoot, dir);
    if (fs.existsSync(fullPath)) {
      console.log(`✓ ${dir}/ found`);
    }
  });
  
  process.exit(0);
} catch (error) {
  console.error('\n=== BUILD FAILED ===');
  console.error('Error:', error.message);
  process.exit(1);
}



