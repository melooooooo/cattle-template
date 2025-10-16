// SEO配置文件

// 获取基础URL - 生产环境应使用实际域名
export const getBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_BASE_URL || 'https://thetoothfae.com';
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
  title: "The Tooth Fae - Magical Tooth Fairy Adventure Game",
  description: "Experience the enchanting world of The Tooth Fae, a delightful fairy adventure game. Collect lost teeth from sleeping children, navigate magical dreamscapes, and spread joy around the world! Family-friendly gameplay with charming characters and whimsical worlds. Play for free in your browser or download now!",
  keywords: "The Tooth Fae, tooth fairy game, fairy adventure, family game, children's game, magical game, online game",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  canonical: getBaseUrl(),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: getBaseUrl(),
    site_name: 'The Tooth Fae',
    title: 'The Tooth Fae - Magical Tooth Fairy Adventure Game',
    description: 'Experience the enchanting world of The Tooth Fae, a delightful fairy adventure game. Collect lost teeth from sleeping children, navigate magical dreamscapes, and spread joy around the world! Family-friendly gameplay with charming characters and whimsical worlds. Play for free in your browser or download now!',
    images: [
      {
        url: `${getBaseUrl()}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'The Tooth Fae Game',
      }
    ],
  },
  twitter: {
    handle: '@TheToothFae',
    site: '@TheToothFae',
    cardType: 'summary_large_image',
    title: 'The Tooth Fae - Magical Tooth Fairy Adventure Game',
  },
}; 