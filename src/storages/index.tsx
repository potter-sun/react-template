const { REACT_APP_PREFIX } = process.env;
const prefix = REACT_APP_PREFIX;
export default {
  userChainId: `${prefix}-user-chain-id`,
  contractsFileDescriptorBase64: 'contracts-file-descriptor-base64',
};
