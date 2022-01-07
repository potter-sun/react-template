import { Button, Card } from 'antd';
import ImgLoading from 'components/ImgLoading';
import './ItemsCard.less';
export default function ItemsCard() {
  return (
    <Card
      className="items-card-wrapper"
      cover={
        <ImgLoading
          src={
            'https://lh3.googleusercontent.com/JudZm9_Rltz2jCPP2-bqQallCgQZCEGI1ml5xNs7ET9FofXSlGbDbCkmwSmBguXCcv3PlBX7awfmC2VRCtRd72yYV1PdLjiovnxSaw=w600'
          }
          className="items-card-img-wrapper"
        />
      }
      hoverable
      bordered>
      <div>
        <div className="flex-between-center items-title">
          <div className="title items-user-name">Influence A Bored Ape</div>
          <div className="title items-price-title">Price</div>
        </div>
        <div className="flex-between-center items-title">
          <span className="value numbering">UI-2323</span>
          <span className="value price usd">1.22</span>
        </div>

        <div className="items-price">
          <div className="items-last-price">
            <span className="text">Last</span>
            <span className="price usd">1.22</span>
          </div>
        </div>
      </div>
      <div className="items-card-action">
        <Button type="default">Buy Now</Button>
      </div>
    </Card>
  );
}
