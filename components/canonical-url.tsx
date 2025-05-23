import { usePathname } from 'next/navigation';
import Head from 'next/head';

interface CanonicalProps {
  // 可选的自定义路径，如果未提供则使用当前URL路径
  path?: string;
}

/**
 * 规范URL组件
 * 在每个页面添加规范URL标签，帮助搜索引擎识别首选URL
 * 使用方式: <CanonicalUrl /> 或 <CanonicalUrl path="/custom-path" />
 */
export default function CanonicalUrl({ path }: CanonicalProps) {
  const pathname = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://crazy-cattle3d.org';
  
  // 使用提供的路径或当前路径
  const canonicalPath = path || pathname;
  // 构建完整的规范URL
  const canonicalUrl = `${baseUrl}${canonicalPath}`;

  return (
    <Head>
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  );
} 