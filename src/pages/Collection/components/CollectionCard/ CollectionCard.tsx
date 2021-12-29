import { Card } from 'antd';
import { collectionBadge } from '../../../../assets/images';
import './CollectionCard.less';

export type Collection = {
  option: {
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
  console.log('>>>', data);

  const { background, avatar, title, creator, description } = data.option;
  return (
    <div className="collection-card">
      <Card cover={<img alt="collectionImg" src={background} />}>
        <Meta
          avatar={<img src={avatar}></img>}
          title={<TitlePanel title={title} hasBadge={true} creator={creator}></TitlePanel>}
          description={description}></Meta>
      </Card>
    </div>
  );
}
