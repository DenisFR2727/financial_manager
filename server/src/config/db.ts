import dns from 'dns';
import mongoose from 'mongoose';

// Windows routers often block SRV lookups (querySrv ECONNREFUSED).
dns.setDefaultResultOrder('ipv4first');
if (process.platform === 'win32') {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
}

export async function connectDB(): Promise<void> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      'MONGODB_URI is not defined. Create .env in project root (see .env.example).',
    );
  }

  if (uri.startsWith('mongodb://') && uri.includes('.mongodb.net')) {
    throw new Error(
      'Standard mongodb:// Atlas URI often fails on Windows (ReplicaSetNoPrimary). ' +
        'Use mongodb+srv:// from Atlas → Connect → Drivers.',
    );
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log('MongoDB connected');
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    if (message.includes('querySrv ECONNREFUSED')) {
      throw new Error(
        'DNS SRV lookup failed (querySrv ECONNREFUSED). ' +
          'Replace mongodb+srv:// with standard mongodb:// URI in .env. ' +
          'Atlas → Connect → Drivers → copy "Standard connection string".',
      );
    }

    if (message.includes('whitelist') || message.includes('IP')) {
      throw new Error(
        'MongoDB Atlas blocked connection: your IP is not whitelisted. ' +
          'Atlas → Network Access → Add IP Address (or 0.0.0.0/0 for development).',
      );
    }

    throw error;
  }
}
