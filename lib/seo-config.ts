// SEO配置文件

// 获取基础URL - 生产环境应使用实际域名
export const getBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_BASE_URL || 'https://crazycattle3dx.com';
};

// 为页面创建规范URL
export const createCanonicalUrl = (path: string): string => {
  const baseUrl = getBaseUrl();
  // 确保路径以/开头，并移除末尾的/（除非路径只有一个/）
  const normalizedPath = path === '/' 
    ? '/' 
    : path.startsWith('/') 
      ? path.endsWith('/') 
        ? path.slice(0, -1) 
        : path
      : `/${path}`;
  
  return `${baseUrl}${normalizedPath}`;
};

// 默认SEO设置
export const defaultSeoConfig = {
  title: "Crazy Cattle 3D - 刺激的牧场模拟游戏 | 免费3D农场冒险",
  description: "体验Crazy Cattle 3D的刺激冒险，一款创新的3D农场模拟游戏。驾驭您的牛群，探索广阔世界，与朋友一起建造农场帝国！超逼真图形和物理效果，多样化游戏场景。免费下载，支持多平台，无需注册即可开始您的农场之旅。",
  keywords: "Crazy Cattle 3D, 3D农场游戏, 农场模拟, 模拟游戏, 牛群管理, 在线游戏",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  canonical: getBaseUrl(),
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: getBaseUrl(),
    site_name: 'Crazy Cattle 3D',
    title: 'Crazy Cattle 3D - 刺激的牧场模拟游戏 | 免费3D农场冒险',
    description: '体验Crazy Cattle 3D的刺激冒险，一款创新的3D农场模拟游戏。驾驭牛群，探索世界，与朋友一起建造农场帝国！超逼真图形，免费下载，支持多平台。',
    images: [
      {
        url: `${getBaseUrl()}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Crazy Cattle 3D游戏',
      }
    ],
  },
  twitter: {
    handle: '@CrazyCattle3D',
    site: '@CrazyCattle3D',
    cardType: 'summary_large_image',
    title: 'Crazy Cattle 3D - 刺激的牧场模拟游戏 | 免费3D农场冒险',
  },
}; 