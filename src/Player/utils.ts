import { MseType } from './enum';

export const ext2MseType = (ext: string) => {
  switch (ext) {
    case 'm3u8':
      return MseType.hls;
    case 'flv':
      return MseType.flv;
    default:
      return MseType.default;
  }
};
