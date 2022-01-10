import clsx from 'clsx';
import './index.less';
import loading from './itemsLoading.png';

interface LoadingProps {
  className?: string;
}
export default function Loading({ className }: LoadingProps) {
  return (
    <div className={clsx('flex-center', 'items-loading', className)}>
      <img src={loading} />
    </div>
  );
}
