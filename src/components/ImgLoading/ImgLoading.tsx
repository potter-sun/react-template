import clsx from 'clsx';
import { ReactNode, useMemo, useState } from 'react';
import './ImgLoading.less';
import loadingImage from './loading.png';

interface ImgLoadingProps {
  src: string;
  loading?: ReactNode;
  className?: string;
  key?: string;
}

export default function ImgLoading({ src, className, loading, key }: ImgLoadingProps) {
  const [isLoad, setLoad] = useState<boolean>();
  const defaultLoadingWrapper = useMemo(() => {
    return <img src={loadingImage} className="loading-image-default" />;
  }, []);
  return (
    <div className={clsx('img-loading-wrapper', className)}>
      <img
        className={clsx('hide-image', isLoad && 'show-image')}
        src={src}
        onLoad={(e) => {
          setLoad(true);
        }}
        onError={(e) => {
          console.log(e, 'error');
        }}
      />
      {!isLoad && (
        <div className="flex-center loading-image-default-wrapper">{loading ? loading : defaultLoadingWrapper}</div>
      )}
    </div>
  );
}
