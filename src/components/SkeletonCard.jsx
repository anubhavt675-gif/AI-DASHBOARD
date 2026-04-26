const SkeletonCard = ({ type = 'task', count = 3 }) => {
  const pulse = 'animate-pulse bg-dark-200 dark:bg-dark-700 rounded';

  const TaskSkeleton = () => (
    <div className="card space-y-3">
      <div className="flex items-center justify-between">
        <div className={`${pulse} h-4 w-2/3`} />
        <div className={`${pulse} h-6 w-16 rounded-lg`} />
      </div>
      <div className={`${pulse} h-3 w-full`} />
      <div className={`${pulse} h-3 w-4/5`} />
      <div className="flex gap-2 pt-1">
        <div className={`${pulse} h-5 w-20 rounded-lg`} />
        <div className={`${pulse} h-5 w-16 rounded-lg`} />
      </div>
    </div>
  );

  const NoteSkeleton = () => (
    <div className="card space-y-3">
      <div className={`${pulse} h-4 w-1/2`} />
      <div className={`${pulse} h-3 w-full`} />
      <div className={`${pulse} h-3 w-full`} />
      <div className={`${pulse} h-3 w-3/4`} />
      <div className="flex gap-2 pt-2">
        <div className={`${pulse} h-5 w-16 rounded-full`} />
        <div className={`${pulse} h-5 w-20 rounded-full`} />
      </div>
    </div>
  );

  const StatSkeleton = () => (
    <div className="card space-y-4">
      <div className="flex justify-between">
        <div className="space-y-2">
          <div className={`${pulse} h-3 w-24`} />
          <div className={`${pulse} h-8 w-16`} />
        </div>
        <div className={`${pulse} h-12 w-12 rounded-xl`} />
      </div>
      <div className={`${pulse} h-2 w-full rounded-full`} />
    </div>
  );

  const types = { task: TaskSkeleton, note: NoteSkeleton, stat: StatSkeleton };
  const SkeletonComponent = types[type] || TaskSkeleton;

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonComponent key={i} />
      ))}
    </>
  );
};

export default SkeletonCard;
