import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Root monorepo .env (financial_manager/.env)
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
// Fallback: server/.env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
