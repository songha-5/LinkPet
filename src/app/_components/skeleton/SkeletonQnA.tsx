export default function SkeletonQnA() {
  return (
    <div className="flex flex-col gap-4">
      {[1, 2].map((item) => (
        <div key={item} className="w-full h-32 bg-gray-default rounded-lg animate-pulse"></div>
      ))}
    </div>
  )
}