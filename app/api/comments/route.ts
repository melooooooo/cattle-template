import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId, Document } from 'mongodb';

// Define comment interface
interface Comment {
  _id?: ObjectId | string;
  id?: string | number;  // 添加id字段，可以是字符串或数字
  name: string;
  email: string;
  content: string;
  date: string;
  likes: number;
  dislikes: number;
  createdAt?: Date;
}

// 全局内存评论数组，确保所有评论都有唯一ID
let comments: Comment[] = [
  {
    id: '1', 
    _id: '1',
    name: 'Jack',
    email: 'jack@example.com',
    content: 'Pulled my first Sparkling tooth thanks to the drill-dust rhythm. The guide here is gold!',
    date: '3 weeks ago',
    likes: 4,
    dislikes: 1
  },
  {
    id: '2',
    _id: '2',
    name: 'Mina',
    email: 'mina@example.com',
    content: 'Night Owl targets terrified me until I read the meter breakdown—now they fall asleep mid-drill.',
    date: '1 week ago',
    likes: 6,
    dislikes: 2
  },
  {
    id: '3',
    _id: '3',
    name: 'Ravi',
    email: 'ravi@example.com',
    content: 'The rare trait dossier finally helped me nab that Watcher tooth. Long live the Queen!',
    date: '1 month ago',
    likes: 9,
    dislikes: 0
  }
];

// Initial comment data, only imported on first use
const initialComments = [
  {
    name: 'Jack',
    email: 'jack@example.com',
    content: 'Pulled my first Sparkling tooth thanks to the drill-dust rhythm. The guide here is gold!',
    date: '3 weeks ago',
    likes: 4,
    dislikes: 1,
    createdAt: new Date()
  },
  {
    name: 'Mina',
    email: 'mina@example.com',
    content: 'Night Owl targets terrified me until I read the meter breakdown—now they fall asleep mid-drill.',
    date: '1 week ago',
    likes: 6,
    dislikes: 2,
    createdAt: new Date()
  },
  {
    name: 'Ravi',
    email: 'ravi@example.com',
    content: 'The rare trait dossier finally helped me nab that Watcher tooth. Long live the Queen!',
    date: '1 month ago',
    likes: 9,
    dislikes: 0,
    createdAt: new Date()
  }
];

// 统一处理评论的辅助函数
function formatComment(comment: any): Comment {
  // 确保评论有id字段，可以从_id转换
  if (!comment.id && comment._id) {
    comment.id = String(comment._id);
  }
  // 确保评论有_id字段，可以从id转换
  if (!comment._id && comment.id) {
    comment._id = String(comment.id);
  }
  return comment;
}

// Ensure comments collection is ready and contains initial data
async function ensureCommentsCollection() {
  try {
    const client = await clientPromise;
    const db = client.db('crazy-cattle');
    const commentsCollection = db.collection('comments');
    
    // Check if collection exists and has data
    const count = await commentsCollection.countDocuments();
    
    // If no data, initialize with sample comments
    if (count === 0) {
      console.log('Initializing comments collection...');
      await commentsCollection.insertMany(initialComments as any);
      console.log('Initial comment data added');
    }
    
    return commentsCollection;
  } catch (error) {
    console.error('Error preparing comments collection:', error);
    throw error;
  }
}

// GET 请求处理函数 - 获取评论列表（支持无MongoDB时的内存降级）
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sortBy = searchParams.get('sortBy') || 'latest';

  const sortMemory = (list: Comment[]) => {
    const copy = [...list];
    if (sortBy === 'likes') {
      return copy.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    }
    if (sortBy === 'oldest') {
      return copy; // 内存示例数据无createdAt，按原始顺序即可
    }
    return copy; // latest 同上
  };

  // 如果没有配置MongoDB，直接使用内存数据
  if (!process.env.MONGODB_URI) {
    return NextResponse.json(sortMemory(comments.map(formatComment)));
  }
  
  try {
    // 调试信息 - 检查MongoDB URI是否存在
    console.log('MongoDB连接状态:', {
      uriExists: !!process.env.MONGODB_URI,
      uriLength: process.env.MONGODB_URI ? process.env.MONGODB_URI.length : 0,
      env: process.env.NODE_ENV
    });

    // 连接到MongoDB
    const client = await clientPromise;
    const db = client.db('crazy-cattle');
    const commentsCollection = db.collection('comments');
    
    // 定义排序条件
    let sortOptions = {} as any;
    
    switch (sortBy) {
      case 'oldest':
        sortOptions = { createdAt: 1 };
        break;
      case 'likes':
        sortOptions = { likes: -1 };
        break;
      case 'latest':
      default:
        sortOptions = { createdAt: -1 };
        break;
    }
    
    // 获取评论列表
    const list = await commentsCollection
      .find({})
      .sort(sortOptions)
      .toArray();
      
    // 格式化日期
    const formattedComments = list.map(comment => {
      const date = comment.createdAt 
        ? new Date(comment.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })
        : 'Unknown date';
        
      return {
        ...comment,
        date,
        id: comment._id.toString()
      };
    });
    
    return NextResponse.json(formattedComments);
  } catch (error) {
    console.error('获取评论失败，使用内存数据降级:', error);
    return NextResponse.json(comments.map(formatComment));
  }
}

// POST 请求处理函数 - 添加新评论（支持无MongoDB时的内存降级）
export async function POST(request: Request) {
  try {
    const { name, email, content } = await request.json();
    
    // 验证必填字段
    if (!name || !email || !content) {
      return NextResponse.json(
        { error: '请填写所有必填字段' },
        { status: 400 }
      );
    }

    // 无MongoDB时，写入内存并返回
    if (!process.env.MONGODB_URI) {
      const id = Date.now().toString();
      const newCommentMem: Comment = {
        id,
        _id: id,
        name,
        email,
        content,
        likes: 0,
        dislikes: 0,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        createdAt: new Date()
      };
      comments.unshift(newCommentMem);
      return NextResponse.json({ message: '评论提交成功(内存)', id });
    }
    
    // 连接到MongoDB
    const client = await clientPromise;
    const db = client.db('crazy-cattle');
    const commentsCollection = db.collection('comments');
    
    // 准备新评论数据
    const newComment = {
      name,
      email,
      content,
      likes: 0,
      dislikes: 0,
      createdAt: new Date()
    };
    
    // 插入新评论
    const result = await commentsCollection.insertOne(newComment);
    
    // 返回成功响应
    return NextResponse.json({
      message: '评论提交成功',
      id: result.insertedId,
    });
  } catch (error) {
    console.error('添加评论失败，降级为内存:', error);
    // 降级：尝试写入内存
    try {
      const id = Date.now().toString();
      const { name, email, content } = await request.json();
      const newCommentMem: Comment = {
        id,
        _id: id,
        name,
        email,
        content,
        likes: 0,
        dislikes: 0,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        createdAt: new Date()
      };
      comments.unshift(newCommentMem);
      return NextResponse.json({ message: '评论提交成功(内存)', id });
    } catch (e) {
      return NextResponse.json(
        { error: '添加评论失败，请稍后再试' },
        { status: 500 }
      );
    }
  }
}

// PUT 请求处理函数 - 点赞/踩评论（支持无MongoDB时的内存降级）
export async function PUT(request: Request) {
  try {
    const { id, action } = await request.json();
    
    // 验证必填字段
    if (!id || !action || !['like', 'dislike'].includes(action)) {
      return NextResponse.json(
        { error: '无效的请求参数' },
        { status: 400 }
      );
    }

    // 无MongoDB时，直接更新内存
    if (!process.env.MONGODB_URI) {
      const stringId = String(id);
      const comment = comments.find(
        c => String(c.id) === stringId || String(c._id) === stringId
      );
      if (!comment) {
        return NextResponse.json(
          { error: '找不到该评论' },
          { status: 404 }
        );
      }
      if (action === 'like') {
        comment.likes = (comment.likes || 0) + 1;
      } else {
        comment.dislikes = (comment.dislikes || 0) + 1;
      }
      return NextResponse.json({
        message: `${action === 'like' ? '点赞' : '踩'}操作成功(内存)`,
        comment: formatComment(comment)
      });
    }
    
    // 连接到MongoDB
    const client = await clientPromise;
    const db = client.db('crazy-cattle');
    const commentsCollection = db.collection('comments');
    
    // 准备更新条件
    let commentId;
    try {
      commentId = new ObjectId(id);
    } catch (error) {
      // 如果ID格式不是ObjectId，尝试按字符串ID查找
      const comment = await commentsCollection.findOne({ id: id });
      if (!comment) {
        return NextResponse.json(
          { error: '找不到该评论' },
          { status: 404 }
        );
      }
      commentId = comment._id;
    }
    
    // 更新字段
    const updateField = action === 'like' ? 'likes' : 'dislikes';
    
    // 更新评论
    const result = await commentsCollection.updateOne(
      { _id: commentId },
      { $inc: { [updateField]: 1 } }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: '找不到该评论' },
        { status: 404 }
      );
    }
    
    // 获取更新后的评论
    const updatedComment = await commentsCollection.findOne({ _id: commentId });
    
    // 返回成功响应
    return NextResponse.json({
      message: `${action === 'like' ? '点赞' : '踩'}操作成功`,
      comment: {
        ...updatedComment,
        id: updatedComment?._id.toString()
      }
    });
  } catch (error) {
    console.error('更新评论失败，降级为内存:', error);
    // 降级：尝试更新内存
    try {
      const { id, action } = await request.json();
      const stringId = String(id);
      const comment = comments.find(
        c => String(c.id) === stringId || String(c._id) === stringId
      );
      if (!comment) {
        return NextResponse.json(
          { error: '找不到该评论' },
          { status: 404 }
        );
      }
      if (action === 'like') {
        comment.likes = (comment.likes || 0) + 1;
      } else {
        comment.dislikes = (comment.dislikes || 0) + 1;
      }
      return NextResponse.json({
        message: `${action === 'like' ? '点赞' : '踩'}操作成功(内存)`,
        comment: formatComment(comment)
      });
    } catch (e) {
      return NextResponse.json(
        { error: '更新评论失败，请稍后再试' },
        { status: 500 }
      );
    }
  }
}

// 通用查找评论函数，依次在各处查找
async function findComment(id: string): Promise<Comment | null> {
  // 1. 转换为字符串，确保一致比较
  id = String(id);
  console.log('查找评论ID:', id);
  
  // 2. 先在内存数组中查找
  const memoryComment = comments.find(c => 
    String(c.id) === id || 
    String(c._id) === id
  );
  
  if (memoryComment) {
    console.log('在内存数组中找到评论:', memoryComment);
    return memoryComment;
  }
  
  // 3. 如果内存中没有，尝试在数据库中查找
  try {
    const commentsCollection = await ensureCommentsCollection();
    
    // 3.1 尝试用ID字段查找
    let dbComment = await commentsCollection.findOne({ 
      $or: [
        { id: id },
        { id: String(id) }
      ]
    });
    
    // 3.2 尝试用_id字段查找（MongoDB的ObjectId）
    if (!dbComment) {
      try {
        const objectId = new ObjectId(id);
        dbComment = await commentsCollection.findOne({ _id: objectId });
        if (dbComment) {
          console.log('用ObjectId找到评论:', dbComment);
        }
      } catch (error) {
        console.log('ID不是有效的ObjectId:', id);
      }
    }

    // 3.3 格式化并返回找到的评论
    if (dbComment) {
      const formattedComment = formatComment(dbComment);
      // 同步到内存中，确保下次可以直接从内存获取
      const existsInMemory = comments.some(c => 
        String(c.id) === String(formattedComment.id) || 
        String(c._id) === String(formattedComment._id)
      );
      
      if (!existsInMemory) {
        comments.push(formattedComment);
        console.log('将找到的评论同步到内存:', formattedComment);
      }
      
      return formattedComment;
    }
  } catch (error) {
    console.error('查询数据库失败:', error);
  }
  
  console.log('未找到评论:', id);
  return null;
}

// 更新评论点赞/踩
async function updateCommentVote(comment: Comment, action: 'like' | 'dislike'): Promise<Comment> {
  // 1. 更新内存中的评论
  if (action === 'like') {
    comment.likes = (comment.likes || 0) + 1;
  } else if (action === 'dislike') {
    comment.dislikes = (comment.dislikes || 0) + 1;
  }
  
  // 2. 尝试更新数据库中的评论
  try {
    const commentsCollection = await ensureCommentsCollection();
    const updateField = action === 'like' ? 'likes' : 'dislikes';
    
    // 创建查询条件，同时支持id和_id查询
    let query: any = { $or: [] };
    
    // 添加id查询
    if (comment.id) {
      query.$or.push({ id: String(comment.id) });
    }
    
    // 添加_id查询 - 字符串形式
    if (comment._id && typeof comment._id === 'string') {
      query.$or.push({ _id: String(comment._id) });
      
      // 尝试将字符串转换为ObjectId查询
      try {
        const objectId = new ObjectId(String(comment._id));
        query.$or.push({ _id: objectId });
      } catch (error) {
        // 忽略无效的ObjectId
      }
    }
    // ObjectId形式
    else if (comment._id) {
      query.$or.push({ _id: comment._id });
    }
    
    console.log('尝试更新数据库中的评论:', query);
    const updateResult = await commentsCollection.updateOne(
      query,
      { $inc: { [updateField]: 1 } }
    );
    
    console.log('数据库更新结果:', updateResult);
  } catch (error) {
    console.error('更新数据库中的评论失败:', error);
    // 即使数据库更新失败，我们仍然返回更新后的内存评论
  }
  
  return comment;
}