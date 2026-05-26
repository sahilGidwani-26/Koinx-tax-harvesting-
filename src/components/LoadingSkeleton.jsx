import React from "react";

function Skeleton({ className }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />
  );
}

export default function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {/* Disclaimer skeleton */}
      <Skeleton className="h-12 w-full" />

      {/* Cards skeleton */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 rounded-2xl border border-gray-200 p-5 space-y-3">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-8 w-40" />
        </div>
        <div className="flex-1 rounded-2xl bg-blue-100 p-5 space-y-3">
          <Skeleton className="h-5 w-32 bg-blue-200" />
          <Skeleton className="h-4 w-full bg-blue-200" />
          <Skeleton className="h-4 w-full bg-blue-200" />
          <Skeleton className="h-4 w-full bg-blue-200" />
          <Skeleton className="h-8 w-40 bg-blue-200" />
        </div>
      </div>

      {/* Table skeleton */}
      <div className="rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <Skeleton className="h-5 w-24" />
        </div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="px-5 py-4 border-b border-gray-50 flex items-center gap-4">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-7 w-7 rounded-full" />
            <Skeleton className="h-4 w-24" />
            <div className="ml-auto flex gap-6">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20 hidden sm:block" />
              <Skeleton className="h-4 w-20 hidden md:block" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
