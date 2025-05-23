import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

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
    content: 'Really fun game! Love the physics and sheep mechanics!',
    date: '3 weeks ago',
    likes: 4,
    dislikes: 4
  },
  {
    id: '2',
    _id: '2',
    name: 'mick',
    email: 'mick@example.com',
    content: 'Amazing game of sheep! Love the crazy animations. 10/10 would play again.',
    date: '1 week ago',
    likes: 6,
    dislikes: 3
  },
  {
    id: '3',
    _id: '3',
    name: 'marry',
    email: 'marry@example.com',
    content: 'very amazing game',
    date: '1 month ago',
    likes: 8,
    dislikes: 1
  }
];

// Initial comment data, only imported on first use
const initialComments: Comment[] = [
  {
    name: 'Jack',
    email: 'jack@example.com',
    content: 'Really fun game! Love the physics and sheep mechanics!',
    date: '3 weeks ago',
    likes: 4,
    dislikes: 4
  },
  {
    name: 'mick',
    email: 'mick@example.com',
    content: 'Amazing game of sheep! Love the crazy animations. 10/10 would play again.',
    date: '1 week ago',
    likes: 6,
    dislikes: 3
  },
  {
    name: 'marry',
    email: 'marry@example.com',
    content: 'very amazing game',
    date: '1 month ago',
    likes: 8,
    dislikes: 1
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
      await commentsCollection.insertMany(initialComments);
      console.log('Initial comment data added');
    }
    
    return commentsCollection;
  } catch (error) {
    console.error('Error preparing comments collection:', error);
    throw error;
  }
}

// GET 请求处理函数 - 获取评论列表
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sortBy = searchParams.get('sortBy') || 'latest';
  
  try {
    // 连接到MongoDB
    const client = await clientPromise;
    const db = client.db('crazy-cattle');
    const commentsCollection = db.collection('comments');
    
    // 定义排序条件
    let sortOptions = {};
    
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
    const comments = await commentsCollection
      .find({})
      .sort(sortOptions)
      .toArray();
      
    // 格式化日期
    const formattedComments = comments.map(comment => {
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
    console.error('获取评论失败:', error);
    return NextResponse.json(
      { error: '获取评论失败，请稍后再试' },
      { status: 500 }
    );
  }
}

// POST 请求处理函数 - 添加新评论
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
    console.error('添加评论失败:', error);
    return NextResponse.json(
      { error: '添加评论失败，请稍后再试' },
      { status: 500 }
    );
  }
}

// PUT 请求处理函数 - 点赞/踩评论
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
    console.error('更新评论失败:', error);
    return NextResponse.json(
      { error: '更新评论失败，请稍后再试' },
      { status: 500 }
    );
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