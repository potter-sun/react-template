import clsx from 'clsx';
import { useMobile } from 'contexts/useStore/hooks';
import './index.less';

export default function DetailCard(options: {
  creator: string;
  description: string;
  address: string;
  id: any;
  standard: string;
  chain: string;
}) {
  const isMobile = useMobile();
  const { creator, description, address, id, standard, chain } = options;
  return (
    <div className={clsx('detail-card bg-dark radius-12', isMobile && 'mobile-detail-card')}>
      <div className="part">
        <h3 className="title font-18 weight-500">Description</h3>
        <p>
          <span>
            Created by <span className="creator color-blue3">{creator}</span>
          </span>
        </p>
        <p>{description}</p>
      </div>
      <div className="part font-18 weight-500">
        <h3 className="title">Details</h3>
        <p>
          <span>Contract Address</span>
          <span className="color-blue3">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        </p>
        <p>
          <span>Token ID</span>
          <span>{id}</span>
        </p>
        <p>
          <span>Token Standard</span>
          <span>{standard}</span>
        </p>
        <p>
          <span>Blockchain</span>
          <span>{chain}</span>
        </p>
      </div>
    </div>
  );
}
