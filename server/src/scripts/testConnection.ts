import dns from 'dns';
import '../config/env.js';
import mongoose from 'mongoose';

dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

const uri = process.env.MONGODB_URI!;

const variants = [{ label: 'env URI', uri }];

for (const { label, uri: testUri } of variants) {
  console.log(`\n--- ${label} ---`);
  try {
    await mongoose.connect(testUri, { serverSelectionTimeoutMS: 8000 });
    console.log('OK');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error((err as Error).message.slice(0, 200));
    await mongoose.disconnect().catch(() => {});
  }
}

process.exit(1);
