import NightElfCheck from './NightElfCheck';
import AelfBridgeCheck from '../AelfBridge/AelfBridgeCheck';
import { isMobile } from 'react-device-detect';
if (process.env.NODE_ENV === 'development' && isMobile) {
  import('vconsole')?.then((VConsole) => {
    new VConsole.default();
  });
}
export const NightElf = isMobile ? AelfBridgeCheck : NightElfCheck;
