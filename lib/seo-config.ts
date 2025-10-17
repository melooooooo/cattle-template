// SEO配置文件

// 获取基础URL - 生产环境应使用实际域名
export const getBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_BASE_URL || 'https://thetoothfae.online';
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
  title: "The Tooth Fae - Nocturnal Tooth Heist Experience",
  description: "Descend into the horror-touched world of The Tooth Fae, a stealth extraction experience where every house hides a new nightmare. Harvest rare teeth, manage Lucidity, Pain, and Fear, and complete the Queen's macabre collection before the mortals wake.",
  keywords: "The Tooth Fae, horror game, stealth tooth fairy, dark fantasy, extraction game, Lucidity meter, indie horror",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  canonical: getBaseUrl(),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: getBaseUrl(),
    site_name: 'The Tooth Fae',
    title: 'The Tooth Fae - Nocturnal Tooth Heist Experience',
    description: 'Descend into the horror-touched world of The Tooth Fae. Plan heists, siphon teeth from restless sleepers, and survive the Queen’s collection trials in this dark fantasy extraction game.',
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
    title: 'The Tooth Fae - Nocturnal Tooth Heist Experience',
  },
}; 
