import { Row, Col, Upload, message, Tooltip, Input, Button, Form } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Dragger from 'antd/lib/upload/Dragger';
import { Photo, WarningMark } from 'assets/images';
import clsx from 'clsx';
import { useMobile } from 'contexts/useStore/hooks';
import { useState } from 'react';
import { useActiveWeb3React } from 'hooks/web3';
import Copy from 'components/Copy';

import './style.less';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const navigate = useNavigate();
  const { account } = useActiveWeb3React();
  const isMobile = useMobile();
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [username, setUsername] = useState<{
    value: string;
    validateStatus?: ValidateStatus;
    errorMsg?: string | null;
  }>({ value: '' });

  type ValidateStatus = Parameters<typeof Form.Item>[0]['validateStatus'];

  const beforeUpload = (file: { type: string; size: number }) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt100M = file.size / 1024 / 1024 < 100;
    if (!isLt100M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt100M;
  };
  function getBase64(img: Blob, callback: { (imageUrl: any): any; (arg0: string | ArrayBuffer | null): any }) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setUploading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
        setUploading(false);
      });
    }
  };

  const props = {
    name: 'banner',
    multiple: false,
    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info: any) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e: { dataTransfer: { files: any } }) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const validateUsername = (string: string): { validateStatus: ValidateStatus; errorMsg: string | null } => {
    if (/^[A-Za-z0-9]+$/.test(string) && string.length > 0) {
      return {
        validateStatus: 'success',
        errorMsg: null,
      };
    }
    return {
      validateStatus: 'error',
      errorMsg: 'error',
    };
  };

  const onUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;

    setUsername({ ...validateUsername(value), value });
  };

  const uploadButton = uploading ? <LoadingOutlined /> : <Photo width={96} hanging={96} />;

  return (
    <div className={clsx('settings', isMobile && 'mobile-settings')}>
      <div className="main-container">
        <h1 className="settings-main-title weight-600">Profile Settings</h1>
        <Form className="settings-wrap" name="userInfo">
          <Row gutter={[isMobile ? 0 : 72, isMobile ? 24 : 40]}>
            <Col>
              <p className="settings-sub-title">
                ProFile Image{' '}
                <Tooltip
                  overlay="Recommended 350px x 350px
                  Max size: 100MB">
                  <WarningMark />
                </Tooltip>
              </p>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}>
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload>
            </Col>
            <Col span={isMobile ? 24 : 16}>
              <p className="settings-sub-title">
                Profile Banner{' '}
                <Tooltip
                  overlay="Recommended 1400px x 400px
                  Max size: 100MB">
                  <WarningMark />
                </Tooltip>
              </p>
              <Dragger className="banner-upload radius-12" {...props} />
            </Col>
            <Col span={24}>
              <p className="settings-sub-title">
                Username<span className="require">*</span>
              </p>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: 'Username is required.' },
                  { max: 15, message: 'Invalid username. Must be less than 15 characters.' },
                  { pattern: /^[A-Za-z0-9]+$/, message: 'Invalid username. Can only contain letters, numbers.' },
                ]}>
                <Input
                  className={clsx('username-input border radius-12', 'font-16')}
                  showCount
                  value={username.value}
                  onChange={onUsernameChange}
                  minLength={1}
                  maxLength={15}
                  type="text"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <p className="settings-sub-title">Wallet Address</p>
              <p className={clsx('wallet-address border radius-12')}>
                {account}
                <Copy className="copy-btn" toCopy={account || ''} />
              </p>
            </Col>
            <Col className="settings-btn-wrap">
              <Row gutter={isMobile ? 14 : 16}>
                <Col>
                  <Button
                    disabled={Boolean(username.errorMsg)}
                    type="primary"
                    className={clsx('save-btn settings-btn', 'font-16')}>
                    Save
                  </Button>
                </Col>
                <Col>
                  <Button
                    type="default"
                    className={clsx('settings-btn', 'font-16')}
                    onClick={() => {
                      navigate(-1);
                    }}>
                    Preview
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}
