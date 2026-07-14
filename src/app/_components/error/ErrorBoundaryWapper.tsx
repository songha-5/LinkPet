'use client'

import { ErrorBoundary } from "react-error-boundary";
import FetchErrorFallback from "./FetchErrorFallback";

interface ErrorBoundaryProps {
  children: React.ReactNode
}

export default function ErrorBoundaryWaper({ children }: ErrorBoundaryProps) {
  return (
    <ErrorBoundary FallbackComponent={FetchErrorFallback}>
      {children}
    </ErrorBoundary>
  )
}