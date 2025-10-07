import * as fs from 'fs';
import * as path from 'path';

const projectRoot = path.resolve(__dirname, '..');
const envFilePath = path.join(projectRoot, '.env');

if (fs.existsSync(envFilePath)) {
  console.log('Warning: .env file already exists.');
  console.log('To regenerate, please remove or rename the existing .env file first.');
  process.exit(1);
}

const defaultEnvContent = `
  NODE_ENV=development
  NODE_PORT=3000
  LOG_LEVEL=DEBUG
  DB_PATH=./database.sqlite
  TZ=America/Lima
`;

try {
  fs.writeFileSync(envFilePath, defaultEnvContent, 'utf8');
  
  console.log('.env file has been generated successfully with default values.');
  console.log('You can modify these values as needed for your environment.');
} catch (error) {
  console.error('Error creating .env file:', error);
  process.exit(1);
}
