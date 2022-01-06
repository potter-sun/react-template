import { Button, Card } from 'antd';
import './ItemsCard.less';
export default function ItemsCard() {
  return (
    <Card
      className="items-card-wrapper"
      cover={
        <img
          className="card-cover"
          src="https://lh3.googleusercontent.com/n0LTMZAIpzH5wgBJbvuKRbWLVubC1FPgxiUfbhsNYsYwD5jFz5oLqZLuahcPjpX6Thls1uQTLBT7xQN6Ydq9y2ZsEvGS2vXtjbePUw=w600"
        />
      }
      bordered
      hoverable>
      <div className="flex-between-center">
        <div className="item-title">
          <div className="title items-user-name">Influence A Bored Ape</div>
          <div className="value numbering">UI-2323</div>
        </div>
        <div className="items-price">
          <div className=" title items-price-title">Price</div>
          <div className="value price usd">1.22</div>
        </div>
      </div>
      <div className="items-card-action">
        <Button type="default">Buy Now</Button>
      </div>
    </Card>
  );
}
