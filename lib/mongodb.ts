import { MongoClient } from 'mongodb';

// 检查MongoDB URI是否存在
if (!process.env.MONGODB_URI) {
  // 不再直接抛出错误，而是给出警告
  console.warn(
    '请在环境变量中设置MONGODB_URI。应用将尝试继续运行，但某些功能可能不可用。'
  );
}

const uri = process.env.MONGODB_URI || '';
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect().catch(err => {
      console.error('无法连接到MongoDB:', err);
      throw new Error('无法连接到MongoDB数据库。请检查您的连接字符串和网络。');
    });
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect().catch(err => {
    console.error('无法连接到MongoDB:', err);
    throw new Error('无法连接到MongoDB数据库。请检查您的连接字符串和网络。');
  });
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise; 