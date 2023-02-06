import Flv from 'flv.js';
import Hls from 'hls.js';
import type { MutableRefObject } from 'react';
import { MseType } from './enum';

export const getMSE = (mseType: MseType, mseRef: MutableRefObject<any>) => {
  const mediaConfig = {
    [MseType.hls]: {
      type: 'customHls',
      customType: {
        customHls: function (video: HTMLVideoElement) {
          const hls = new Hls();
          hls.loadSource(video.src);
          hls.attachMedia(video);
          mseRef.current = hls;
        },
      },
    },
    [MseType.flv]: {
      type: 'customFlv',
      customType: {
        customFlv: function (video: HTMLVideoElement) {
          const flvPlayer = Flv.createPlayer({
            type: 'flv',
            url: video.src,
          });
          flvPlayer.attachMediaElement(video);
          flvPlayer.load();
          mseRef.current = flvPlayer;
        },
      },
    },
    [MseType.default]: {},
  };
  return mediaConfig[mseType];
};
