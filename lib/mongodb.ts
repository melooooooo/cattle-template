import { MongoClient } from 'mongodb';

// 检查MongoDB URI是否存在
if (!process.env.MONGODB_URI) {
  console.warn(
    '未找到MONGODB_URI环境变量。请在本地开发时将使用内存数据；在生产环境请配置该变量。'
  );
}

// 确保我们有一个有效的URI
const uri = process.env.MONGODB_URI || '';
if (!uri) {
  console.error('MongoDB URI为空，本地将禁用数据库功能并使用内存数据');
}

const options = {};

let client: MongoClient | undefined;
let clientPromise: Promise<MongoClient>;

// 在没有URI时，不要抛出错误，返回一个会拒绝的Promise，供上层捕获并进行降级处理
const createRejectedPromise = (reason: string) => Promise.reject(new Error(reason));

// 创建一个MongoDB客户端的函数（仅在URI存在时调用）
const createClient = () => {
  return new MongoClient(uri, options);
};

if (process.env.NODE_ENV === 'development') {
  // 开发模式：使用全局变量，以避免HMR导致的重复连接
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    if (!uri) {
      globalWithMongo._mongoClientPromise = createRejectedPromise('缺少MONGODB_URI，开发环境将使用内存数据');
    } else {
      try {
        client = createClient();
        globalWithMongo._mongoClientPromise = client.connect().catch(err => {
          console.error('MongoDB连接失败:', err);
          throw new Error('连接MongoDB失败。请检查您的URI和网络连接。');
        });
      } catch (err) {
        console.error('创建MongoDB连接失败:', err);
        globalWithMongo._mongoClientPromise = createRejectedPromise('MongoDB连接初始化失败');
      }
    }
  }
  clientPromise = globalWithMongo._mongoClientPromise!;
} else {
  // 生产模式：不使用全局变量
  if (!uri) {
    clientPromise = createRejectedPromise('缺少MONGODB_URI，生产环境必须配置有效的连接字符串');
  } else {
    try {
      client = createClient();
      clientPromise = client.connect().catch(err => {
        console.error('MongoDB连接失败:', err);
        throw new Error('连接MongoDB失败。请检查您的URI和网络连接。');
      });
    } catch (err) {
      console.error('创建MongoDB连接失败:', err);
      clientPromise = createRejectedPromise('MongoDB连接初始化失败');
    }
  }
}

// 统一导出Promise，上层可在try/catch中降级到内存实现
export default clientPromise; 