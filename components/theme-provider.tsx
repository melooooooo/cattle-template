'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)

  // 在客户端首次渲染后设置mounted为true
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // 如果组件尚未挂载，返回一个不带主题的版本
  // 这避免了服务器/客户端不匹配的问题
  if (!mounted) {
    return <>{children}</>
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
