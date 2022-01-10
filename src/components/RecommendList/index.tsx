import { Button, Carousel, Col, Row } from 'antd';
import clsx from 'clsx';
import ItemsCard from 'components/ItemsCard';
import { useMobile } from 'contexts/useStore/hooks';
import { useRecommendList } from 'hooks/useRecommendList';
import useWindowWidth from 'hooks/useWindowWidth';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParam } from 'react-use';

import './style.less';
export default function RecommendList() {
  const windowWidth = useWindowWidth();
  const isMobile = useMobile();
  const navigate = useNavigate();
  const collection = useSearchParam('collection');
  const list = useRecommendList();

  const column = useMemo(() => (windowWidth < 1328 ? 3 : 4), [windowWidth]);

  const renderList = useMemo(() => list.slice(0, column), [column, list]);

  const onViewCollection = () => {
    navigate(`/explore-items/${collection}`);
  };

  console.log(windowWidth);

  return (
    <div className={clsx('recommend-panel radius-12 bg-dark', isMobile && 'mobile-recommend-panel')}>
      <Row gutter={isMobile ? 0 : [24, 24]}>
        <Col span={24} className="weight-500 flex-between-center font-18 text-light">
          <p>More From This Collection</p>
          {isMobile || (
            <Button type="primary" onClick={onViewCollection}>
              View Collection
            </Button>
          )}
        </Col>
        {isMobile ? (
          <Col span={24} className="hidden">
            <Carousel dots={{ className: 'dot' }}>
              {renderList.map((item) => (
                <ItemsCard key={item} />
              ))}
            </Carousel>
          </Col>
        ) : (
          renderList.map((item) => {
            return (
              <Col key={item} span={24 / column}>
                <ItemsCard />
              </Col>
            );
          })
        )}
        {isMobile && (
          <Col span={24} className="btn-wrap">
            <Button type="primary" onClick={onViewCollection}>
              View Collection
            </Button>
          </Col>
        )}
      </Row>
    </div>
  );
}
