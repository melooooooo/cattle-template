import { MongoClient } from 'mongodb';

// 检查MongoDB URI是否存在
if (!process.env.MONGODB_URI) {
  console.warn(
    '未找到MONGODB_URI环境变量。请在Vercel项目设置中添加此环境变量。'
  );
}

// 确保我们有一个有效的URI
const uri = process.env.MONGODB_URI || '';
if (!uri) {
  console.error('MongoDB URI为空，数据库功能将不可用');
}

const options = {};

let client;
let clientPromise: Promise<MongoClient>;

// 创建一个MongoDB客户端的函数
const createClient = () => {
  // 只有当URI非空时才尝试连接
  if (!uri) {
    throw new Error('MongoDB URI为空，无法连接到数据库');
  }

  try {
    return new MongoClient(uri, options);
  } catch (err) {
    console.error('创建MongoDB客户端失败:', err);
    throw new Error('无法创建MongoDB客户端');
  }
};

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    try {
      client = createClient();
      globalWithMongo._mongoClientPromise = client.connect().catch(err => {
        console.error('MongoDB连接失败:', err);
        throw new Error('连接MongoDB失败。请检查您的URI和网络连接。');
      });
    } catch (err) {
      console.error('创建MongoDB连接失败:', err);
      // 重新抛出错误以便上层处理
      throw err;
    }
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  try {
    client = createClient();
    clientPromise = client.connect().catch(err => {
      console.error('MongoDB连接失败:', err);
      throw new Error('连接MongoDB失败。请检查您的URI和网络连接。');
    });
  } catch (err) {
    console.error('创建MongoDB连接失败:', err);
    // 为了避免应用程序完全崩溃，我们返回一个永远会拒绝的promise
    clientPromise = Promise.reject(new Error('MongoDB连接初始化失败'));
  }
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise; 