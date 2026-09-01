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
console.log('Platform:', process.platform);

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

console.log('\nCreating runtime directories...');
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log('  Created:', dir);
  }
});

// Set environment variables for paths
process.env.HOME = path.join(runtimeRoot, 'home');
process.env.XDG_CONFIG_HOME = path.join(runtimeRoot, 'xdg-config');
process.env.TMPDIR = path.join(runtimeRoot, 'tmp');
process.env.WRANGLER_LOG_PATH = path.join(runtimeRoot, 'wrangler', 'logs');
process.env.MINIFLARE_REGISTRY_PATH = path.join(runtimeRoot, 'wrangler', 'registry');

try {
  console.log('\n=== Installing dependencies ===');
  execSync('npm ci', { stdio: 'inherit', cwd: projectRoot });
  
  console.log('\n=== Building with Vinext ===');
  
  // Try to find vinext
  const vinextPath = path.join(projectRoot, 'node_modules', '.bin', 'vinext');
  console.log('Looking for vinext at:', vinextPath);
  
  if (!fs.existsSync(vinextPath)) {
    console.error('ERROR: vinext not found at', vinextPath);
    console.log('Contents of node_modules/.bin:');
    const binDir = path.join(projectRoot, 'node_modules', '.bin');
    if (fs.existsSync(binDir)) {
      const files = fs.readdirSync(binDir);
      files.forEach(f => console.log('  -', f));
    }
    throw new Error('vinext executable not found');
  }
  
  console.log('Found vinext, running build...');
  execSync(`node "${vinextPath}" build`, { stdio: 'inherit', cwd: projectRoot, env: process.env });
  
  console.log('\n=== Build completed successfully ===');
  
  // Check output directories
  console.log('\nChecking output directories:');
  if (fs.existsSync(path.join(projectRoot, '.next'))) {
    console.log('✓ .next/ directory found');
  } else {
    console.log('✗ .next/ directory NOT found');
  }
  
  process.exit(0);
} catch (error) {
  console.error('\n=== BUILD FAILED ===');
  console.error('Error:', error.message);
  if (error.stdout) console.error('STDOUT:', error.stdout.toString());
  if (error.stderr) console.error('STDERR:', error.stderr.toString());
  process.exit(1);
}


