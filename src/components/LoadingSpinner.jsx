const LoadingSpinner = ({ size = 'md', text = '', fullScreen = false }) => {
  const sizes = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
    xl: 'w-16 h-16 border-4',
  };

  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div className={`${sizes[size]} rounded-full border-primary-200 border-t-primary-600 animate-spin dark:border-dark-600 dark:border-t-primary-400`} />
      {text && <p className="text-sm text-dark-500 dark:text-dark-400 font-medium">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-50 dark:bg-dark-950">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full border-4 border-primary-200 border-t-primary-600 animate-spin dark:border-dark-700 dark:border-t-primary-400 mx-auto mb-4" />
          <p className="text-dark-600 dark:text-dark-400 font-medium">{text || 'Loading...'}</p>
          <p className="text-dark-400 dark:text-dark-500 text-sm mt-1">Nexus AI Dashboard</p>
        </div>
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
