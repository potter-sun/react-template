import { Button } from 'antd';
import { Clock, ELF, USDT } from 'assets/images';
import clsx from 'clsx';
import { useMobile } from 'contexts/useStore/hooks';

import './style.less';

export default function BuyCard(options: {
  token: string;
  price: number;
  convertPrice: number;
  endTime: string;
  onBuyNow: React.MouseEventHandler<HTMLElement>;
}) {
  const isMobile = useMobile();
  const { token, price, convertPrice, endTime, onBuyNow } = options;

  const usdFormat = (value: number) => {
    return value.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
  };

  return (
    <div className={clsx('buy-card bg-dark flex-col radius-12', isMobile && 'mobile-buy-card')}>
      <div className="time-panel flex bg-nav radius-12">
        <Clock width={isMobile ? 16 : 24} />
        <span className={clsx('text-gray', isMobile ? 'font-14' : 'font-18')}>Sale ends {endTime}</span>
      </div>
      <div className="price-panel flex-between-center">
        <div className="left-part">
          <p className="current-price text-light font-18 weight-500">Current Price</p>
          <p className="price-number flex">
            <img src={token === 'elf' ? ELF : USDT} alt="token" />
            <span className="price-margin text-light weight-600">{price.toFixed(2)}</span>
            <span className="color-text3 font-16">(${usdFormat(convertPrice)})</span>
          </p>
        </div>
        <Button className="buy-btn font-16 weight-600" type="primary" onClick={onBuyNow}>
          Buy Now
        </Button>
      </div>
    </div>
  );
}
