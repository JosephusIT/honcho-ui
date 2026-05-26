import React from 'react'

interface SkeletonProps {
  className?: string
  width?: string | number
  height?: string | number
  borderRadius?: string
}

export function Skeleton({ className = '', width, height, borderRadius }: SkeletonProps) {
  const style: React.CSSProperties = {
    width: width ?? '100%',
    height: height ?? '14px',
    borderRadius: borderRadius ?? 'var(--radius-md)',
  }
  return <div className={`skeleton ${className}`} style={style} />
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className="skeleton-text" width={i === lines - 1 ? '75%' : '100%'} />
      ))}
    </div>
  )
}
