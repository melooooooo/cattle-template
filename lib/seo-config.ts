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
  title: "Crazy Cattle 3D - Exciting Farm Simulation Game",
  description: "Experience the thrilling adventure of Crazy Cattle 3D, an innovative 3D farm simulation game. Manage your herd of cattle, explore vast worlds, and build a farming empire with friends! Enjoy realistic graphics and physics, diverse gameplay scenarios. Download for free, multi-platform support, and start your farming journey without registration.",
  keywords: "Crazy Cattle 3D, 3D farm game, farm simulation, simulation game, cattle management, online game",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  canonical: getBaseUrl(),
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: getBaseUrl(),
    site_name: 'Crazy Cattle 3D',
    title: 'Crazy Cattle 3D - Exciting Farm Simulation Game',
    description: 'Experience the thrilling adventure of Crazy Cattle 3D, an innovative 3D farm simulation game. Manage your herd of cattle, explore vast worlds, and build a farming empire with friends! Enjoy realistic graphics and physics, diverse gameplay scenarios. Download for free, multi-platform support, and start your farming journey without registration.',
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
    title: 'Crazy Cattle 3D - Exciting Farm Simulation Game',
  },
}; 