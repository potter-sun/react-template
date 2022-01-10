import { Card } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import clsx from 'clsx';
import { useMobile } from 'contexts/useStore/hooks';
import { Creator } from 'pages/Collection/Hooks/useCollections';
import { useNavigate } from 'react-router-dom';
import { collectionBadge } from '../../../../assets/images';
import './CollectionCard.less';

export type Collection = {
  option: {
    id: string;
    background: string;
    protocolName: string;
    creator: Creator;
    description: string;
  };
};

const TitlePanel = ({
  protocolName,
  hasBadge,
  creator,
}: {
  protocolName: string;
  hasBadge?: boolean;
  creator: Creator;
}) => {
  return (
    <div>
      <p className="collection-title">
        {protocolName}
        {hasBadge && <img className="badge" src={collectionBadge}></img>}
      </p>
      <p className="collection-creator">
        by<span className="creator">{creator.userName}</span>
      </p>
    </div>
  );
};

const { Meta } = Card;
export default function CollectionCard(data: Collection) {
  const isMobile = useMobile();
  const navigate = useNavigate();
  const { background, protocolName, creator, description, id } = data.option;
  return (
    <div
      className={clsx('collection-card', isMobile && 'mobile-collection-card')}
      onClick={() => navigate(`/explore-items/${id}`)}>
      <Card cover={<img alt="collectionImg" src={background} />}>
        <Meta
          avatar={creator.profileImage ? <img src={creator.profileImage} /> : <Avatar />}
          title={<TitlePanel protocolName={protocolName} hasBadge={true} creator={creator}></TitlePanel>}
          description={description}></Meta>
      </Card>
    </div>
  );
}
