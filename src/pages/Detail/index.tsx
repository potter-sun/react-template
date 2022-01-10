import { Button, Col, Row } from 'antd';
import clsx from 'clsx';
import BuyCard from 'components/BuyCard';
import DetailCard from 'components/DetailCard';
import PriceHistory from 'components/PriceHistory';
import RecommendList from 'components/RecommendList';
import { useMobile } from 'contexts/useStore/hooks';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BuyModal, { art } from './BuyModal';

import './style.less';
export default function Detail() {
  const isMobile = useMobile();
  const navigate = useNavigate();
  const params = useParams();

  const [buyModalVisible, setBuyModalVisible] = useState(false);
  const [artList, setArtList] = useState<art[]>([]);

  const [creator, setCreator] = useState('Influence');

  const { type } = params;

  if (type !== 'buy' && type !== 'sell') {
    navigate(-1);
  }

  const handleBuyNow = () => {
    setArtList([
      {
        collection: 'DeHorizon',
        name: 'DeVerse Metamers piece A',
        token: 'elf',
        price: 2.989,
        convertPrice: 2.98,
      },
      {
        collection: 'DeHorizon',
        name: 'DeVerse Metamers piece A',
        token: 'elf',
        price: 2.989,
        convertPrice: 2.98,
      },
    ]);
    setBuyModalVisible(true);
  };

  const handleBuyConfirm = () => {
    setBuyModalVisible(false);
  };

  const Picture = (options: { url: any }) => {
    const url = options.url;
    return <img className="picture radius-12" src={url} />;
  };

  const Creator = (options: { creator: any }) => {
    const creator = options.creator;
    return <p className={clsx('color-text2 weight-500 creator', isMobile ? 'font-16' : 'font-20')}>{creator}</p>;
  };

  const Title = (options: { title: any }) => {
    const title = options.title;
    return <p className="title color-text1 weight-600">{title}</p>;
  };

  const Owner = (options: { owner: string }) => {
    const owner = options.owner;
    return (
      <p className={clsx('owner text-gray weight-500', isMobile ? 'font-14' : 'font-16')}>
        Owned by <span className="text-blue">{owner}</span>
      </p>
    );
  };

  const ExchangeBtnPanel = () => {
    return (
      <div className="exchange-btn-panel">
        <Button type="primary" className="padding-16 font-16">
          Sell
        </Button>
        <Button type="default" className="padding-16 font-16">
          Transfer
        </Button>
      </div>
    );
  };

  return (
    <div className={clsx('detail', isMobile && 'mobile-detail')}>
      {type === 'buy' && (
        <BuyModal
          artList={artList}
          visible={buyModalVisible}
          onClose={() => setBuyModalVisible(false)}
          onConfirm={handleBuyConfirm}
        />
      )}
      {isMobile ? (
        <>
          <Creator creator={creator} />
          <Title title={'RV-46412 ‘INFLUENCE’'} />
          <Picture url={'http://localhost:3000/mock/images/monkey.png'} />
          <Owner owner={'travis85'} />
          {type === 'buy' ? (
            <BuyCard
              onBuyNow={handleBuyNow}
              token={'elf'}
              price={12}
              convertPrice={49801.44}
              endTime={'May 26, 2022 at 11:43pm CST'}
            />
          ) : (
            <ExchangeBtnPanel />
          )}
          <PriceHistory />
          <DetailCard
            creator={creator}
            description={'A small, exceptional, Cm-type osteoid'}
            address={'0x6e4c...b8ff'}
            id={129271}
            standard={'ERC-721'}
            chain={'Ethereum'}
          />
          <RecommendList />
        </>
      ) : (
        <Row className="top-panel" gutter={[40, 16]}>
          <Col span={8}>
            <Picture url="http://localhost:3000/mock/images/monkey.png" />
          </Col>
          <Col span={16} className="right-wrap">
            <Creator creator={creator} />
            <Title title="RV-46412 ‘INFLUENCE’" />
            <Owner owner="travis85" />
            {type === 'buy' ? (
              <BuyCard
                onBuyNow={handleBuyNow}
                token={'elf'}
                price={12}
                convertPrice={49801.44}
                endTime={'May 26, 2022 at 11:43pm CST'}
              />
            ) : (
              <ExchangeBtnPanel />
            )}
          </Col>
          <Col span={8}>
            <DetailCard
              creator={creator}
              description={'A small, exceptional, Cm-type osteoid'}
              address={'0x6e4c...b8ff'}
              id={129271}
              standard={'ERC-721'}
              chain={'Ethereum'}
            />
          </Col>
          <Col span={16}>
            <PriceHistory />
          </Col>
          <Col span={24}>
            <RecommendList />
          </Col>
        </Row>
      )}
    </div>
  );
}
