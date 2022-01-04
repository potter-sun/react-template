import { Tag } from 'antd';
import './BaseTag.less';
import { Close } from '../../assets/images';
import clsx from 'clsx';
import { useCallback, useState } from 'react';

export default function BaseTag({
  tagClose,
  children,
}: {
  children?: React.ReactNode;
  tagClose: (e: React.MouseEvent<HTMLElement>) => void;
}) {
  const [isClose, setClose] = useState<boolean>(false);
  const onCloseHandler = useCallback(
    (e) => {
      setClose(true);
      tagClose(e);
    },
    [tagClose],
  );
  return (
    <Tag
      className={clsx('base-tag-wrapper', !isClose && 'flex-between-center')}
      closeIcon={<Close />}
      closable
      onClose={onCloseHandler}>
      <span>{children ?? null}</span>
    </Tag>
  );
}
