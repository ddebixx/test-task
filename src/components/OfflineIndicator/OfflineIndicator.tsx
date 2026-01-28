import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { twMerge } from 'tailwind-merge';

export const OfflineIndicator = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) {
    return null;
  }

  return (
    <div
      className={twMerge(
        'fixed top-0 left-0 right-0 z-50',
        'bg-yellow-500 dark:bg-yellow-600',
        'text-black dark:text-white',
        'px-4 py-2',
        'flex items-center justify-center gap-2',
        'text-sm font-medium',
        'shadow-lg'
      )}
    >
      <WifiOff className="w-4 h-4" />
      <span>You are offline. Using cached data.</span>
    </div>
  );
};
