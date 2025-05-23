import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

// 在服务器启动时预先生成ZIP文件
async function generateZipFile(platform: string) {
  try {
    const zip = new JSZip();
    const downloadsDir = path.join(process.cwd(), 'public', 'downloads');
    const outputPath = path.join(downloadsDir, `CrazyCattle3D-${platform}.zip`);
    
    // 添加README文件
    const readmeContent = `这是Crazy Cattle 3D游戏的${platform}版本, 感谢您的下载！\n\n游戏说明：\n- 这是一个物理引擎驱动的游戏\n- 使用WASD控制移动\n- 使用鼠标控制视角\n- 目标是成为最后幸存的绵羊`;
    zip.file('README.txt', readmeContent);
    
    // 添加假的游戏文件
    zip.file('game.exe', 'This is a placeholder for the game executable');
    zip.file('config.json', JSON.stringify({ platform, version: '1.0.0' }, null, 2));
    
    // 创建assets目录并添加文件
    const assets = zip.folder('assets');
    if (assets !== null) {
      assets.file('icon.png', 'Placeholder for icon data');
    }
    
    // 生成ZIP文件
    const zipContent = await zip.generateAsync({ type: 'nodebuffer' });
    
    // 确保目录存在
    if (!fs.existsSync(downloadsDir)) {
      fs.mkdirSync(downloadsDir, { recursive: true });
    }
    
    // 写入文件
    fs.writeFileSync(outputPath, zipContent);
    
    console.log(`Generated ZIP file for ${platform} platform`);
    return true;
  } catch (error) {
    console.error(`Error generating ZIP file for ${platform}:`, error);
    return false;
  }
}

// 为每个平台生成ZIP文件
const platforms = ['windows', 'macos', 'linux'];
platforms.forEach(platform => {
  generateZipFile(platform);
});

// 定义游戏下载信息
const downloadLinks = {
  windows: {
    url: 'https://download.example.com/crazycattle/windows/CrazyCattle3D-Win-v1.0.zip',
    filename: 'CrazyCattle3D-Win-v1.0.zip'
  },
  macos: {
    url: 'https://download.example.com/crazycattle/macos/CrazyCattle3D-Mac-v1.0.dmg',
    filename: 'CrazyCattle3D-Mac-v1.0.dmg'
  },
  linux: {
    url: 'https://download.example.com/crazycattle/linux/CrazyCattle3D-Linux-v1.0.tar.gz',
    filename: 'CrazyCattle3D-Linux-v1.0.tar.gz'
  }
};

export async function GET(request: Request) {
  try {
    // 获取请求参数
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get('platform')?.toLowerCase() || '';
    
    // 验证平台参数
    if (!platform || !['windows', 'macos', 'linux'].includes(platform)) {
      return NextResponse.json(
        { error: '无效的平台参数，必须是windows、macos或linux' },
        { status: 400 }
      );
    }
    
    // 获取下载信息
    const downloadInfo = downloadLinks[platform as keyof typeof downloadLinks];
    
    if (!downloadInfo) {
      return NextResponse.json(
        { error: '请求的平台不支持下载' },
        { status: 404 }
      );
    }
    
    // 返回下载链接和文件名
    return NextResponse.json(downloadInfo);
  } catch (error) {
    console.error('处理下载请求时发生错误:', error);
    return NextResponse.json(
      { error: '处理请求时发生错误，请稍后再试' },
      { status: 500 }
    );
  }
} 