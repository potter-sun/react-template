import { Card } from 'antd';
import clsx from 'clsx';
import { useMobile } from 'contexts/useStore/hooks';
import { useNavigate } from 'react-router-dom';
import { collectionBadge } from '../../../../assets/images';
import './CollectionCard.less';

export type Collection = {
  option: {
    id: string;
    background: string;
    avatar: string | undefined;
    title: string;
    creator: string;
    description: string;
  };
};

const TitlePanel = ({ title, hasBadge, creator }: { title: string; hasBadge?: boolean; creator: string }) => {
  return (
    <div>
      <p className="collection-title">
        {title}
        {hasBadge && <img className="badge" src={collectionBadge}></img>}
      </p>
      <p className="collection-creator">
        by<span className="creator">{creator}</span>
      </p>
    </div>
  );
};

const { Meta } = Card;
export default function CollectionCard(data: Collection) {
  const isMobile = useMobile();
  const navigate = useNavigate();
  const { background, avatar, title, creator, description, id } = data.option;
  return (
    <div
      className={clsx('collection-card', isMobile && 'mobile-collection-card')}
      onClick={() => navigate(`/explore-items/${id}`)}>
      <Card cover={<img alt="collectionImg" src={background} />}>
        <Meta
          avatar={<img src={avatar}></img>}
          title={<TitlePanel title={title} hasBadge={true} creator={creator}></TitlePanel>}
          description={description}></Meta>
      </Card>
    </div>
  );
}
