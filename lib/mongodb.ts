import { MongoClient } from 'mongodb';

// 如果没有提供MongoDB URI，则使用内存模式
const uri = process.env.MONGODB_URI || 'mongodb://memory-mode';
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

// 在内存模式下提供一个假的Promise
const createMemoryModeClient = () => {
  console.warn('WARNING: Using memory mode for MongoDB. Data will not persist between restarts.');
  
  // 创建一个模拟的MongoDB客户端
  const fakeClient = {
    db: (dbName: string) => ({
      collection: (collectionName: string) => ({
        find: () => ({ 
          sort: () => ({ 
            toArray: async () => [] 
          })
        }),
        findOne: async () => null,
        insertOne: async (doc: any) => ({ insertedId: `memory-${Date.now()}` }),
        insertMany: async (docs: any[]) => ({ insertedCount: docs.length }),
        updateOne: async () => ({ matchedCount: 0 }),
        countDocuments: async () => 0
      })
    }),
    connect: () => Promise.resolve(fakeClient)
  } as unknown as MongoClient;

  return Promise.resolve(fakeClient);
};

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    if (uri === 'mongodb://memory-mode') {
      globalWithMongo._mongoClientPromise = createMemoryModeClient();
    } else {
      client = new MongoClient(uri, options);
      globalWithMongo._mongoClientPromise = client.connect();
    }
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  if (uri === 'mongodb://memory-mode') {
    clientPromise = createMemoryModeClient();
  } else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise; 