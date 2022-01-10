import { Button, Col, Modal, Row, Tooltip } from 'antd';
import { ELF, USDT, WarningMark } from 'assets/images';

import './style.less';

export type art = { collection: string; name: string; token: string; price: number; convertPrice: number };

export default function BuyModal(options: {
  visible: boolean;
  onClose: React.MouseEventHandler<HTMLElement>;
  onConfirm: React.MouseEventHandler<HTMLElement>;
  artList: art[];
}) {
  const { visible, onClose, onConfirm, artList } = options;

  let totalPrice = 0;
  let convertTotalPrice = 0;

  artList.forEach((item) => {
    totalPrice += item.price;
    convertTotalPrice += item.convertPrice;
  });

  return (
    <Modal
      className="buy-modal"
      footer={
        <Button type="primary" className="confirm-btn font-16 line-24 padding-16" onClick={onConfirm}>
          Confirm Checkout
        </Button>
      }
      onCancel={onClose}
      title="Complete checkout"
      visible={visible}>
      <Row className="content-header font-18 weight-500">
        <Col span={14}>Item</Col>
        <Col span={10}>Subtotal</Col>
      </Row>
      <Row className="content-body" gutter={[0, 24]}>
        {artList.map((item) => {
          return (
            <>
              <Col className="flex" span={14}>
                <img className="radius-8 art" src="http://localhost:3000/mock/images/monkey.png" alt="nft" />
                <div className="info weight-500">
                  <p className="text-blue font-16 line-24">{item.collection}</p>
                  <p className="font-20 line-30">{item.name}</p>
                  <p className="font-12 text-gray line-18 mt-16 flex royalties">
                    Royalties: 5%
                    <Tooltip title="The creator of this collection will receive 10% of the sale total from future sales of this item">
                      <WarningMark />
                    </Tooltip>
                  </p>
                </div>
              </Col>
              <Col className="part-price flex-col" span={10}>
                <p className="line-24 flex-center">
                  <img className="item-token" src={item.token === 'elf' ? ELF : USDT} alt="token" />
                  <span className="weight-600 font-16 line-24">{item.price}</span>
                </p>
                <span className="text-gray line-18 font-12 mt-2">${item.convertPrice}</span>
              </Col>
            </>
          );
        })}
      </Row>
      <Row className="content-bottom">
        <Col span={14} className="font-18 weight-500">
          <span className="line-27 font-24">Total</span>
        </Col>
        <Col span={10}>
          <p className="total-price flex">
            <img src={ELF} alt="token" />
            <span className="ml-6 font-24 weight-600 line-36 color-blue2">{totalPrice}</span>
          </p>
          <p className="line-24 text-gray font-16">${convertTotalPrice}</p>
        </Col>
      </Row>
    </Modal>
  );
}
