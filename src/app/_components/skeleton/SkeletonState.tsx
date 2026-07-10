export default function SkeletonState() {
  return (
    <div className="flex flex-col w-full">
      <div className="w-3/5 h-8 bg-gray-default animate-pulse rounded"></div>
      <div className="mbs-4 w-2/5 h-12 bg-gray-default animate-pulse rounded"></div>
      <div className="h-4 mbs-3 w-1/2 bg-gray-default animate-pulse rounded"></div>
      <div className="h-12 mbs-4 w-full bg-gray-default animate-pulse rounded"></div>
      <div className="lg:h-30 lg:mbs-5 h-80 mbs-6 w-full bg-gray-default animate-pulse rounded"></div>
    </div>
  )
}