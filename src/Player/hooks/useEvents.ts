import { useMemoizedFn } from "ahooks";
import DPlayer from "dplayer";
import { HTMLAttributes } from "react";
import { DPlayerEvents } from "../enum";

export interface DPlayerEventsProps {
  onScreenshot?: (blobUrl: string) => void;
  onThumbnailsShow?: () => void;
  onThumbnailsHide?: () => void;
  onDanmakuShow?: () => void;
  onDanmakuHide?: () => void;
  onDanmakuClear?: () => void;
  onDanmakuLoaded?: () => void;
  onDanmakuSend?: () => void;
  onDanmakuOpacity?: () => void;
  onContextmenuShow?: () => void;
  onContextmenuHide?: () => void;
  onNoticeShow?: () => void;
  onNoticeHide?: () => void;
  onQualityStart?: () => void;
  onQualityEnd?: () => void;
  onDestroy?: () => void;
  onFullscreen?: () => void;
  onFullscreenCancel?: () => void;
  onSubtitleShow?: () => void;
  onSubtitleHide?: () => void;
  onSubtitleChange?: () => void;
}

export interface UserEventsProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onLoad">,
    DPlayerEventsProps {}

const useEvents = (props: UserEventsProps) => {
  const registerEvent = (
    dp: DPlayer,
    eventName: DPlayerEvents,
    handler?: any
  ) => {
    handler && dp.on(eventName, handler);
  };
  return useMemoizedFn((dp: DPlayer) => {
    // 视频事件
    registerEvent(dp, DPlayerEvents.abort, props.onAbort);
    registerEvent(dp, DPlayerEvents.canplay, props.onCanPlay);
    registerEvent(dp, DPlayerEvents.canplaythrough, props.onCanPlayThrough);
    registerEvent(dp, DPlayerEvents.durationchange, props.onDurationChange);
    registerEvent(dp, DPlayerEvents.emptied, props.onEmptied);
    registerEvent(dp, DPlayerEvents.ended, props.onEnded);
    registerEvent(dp, DPlayerEvents.error, props.onError);
    registerEvent(dp, DPlayerEvents.loadeddata, props.onLoadedData);
    registerEvent(dp, DPlayerEvents.loadedmetadata, props.onLoadedMetadata);
    registerEvent(dp, DPlayerEvents.loadstart, props.onLoadStart);
    registerEvent(dp, DPlayerEvents.pause, props.onPause);
    registerEvent(dp, DPlayerEvents.play, props.onPlay);
    registerEvent(dp, DPlayerEvents.playing, props.onPlaying);
    registerEvent(dp, DPlayerEvents.progress, props.onProgress);
    registerEvent(dp, DPlayerEvents.ratechange, props.onRateChange);
    registerEvent(dp, DPlayerEvents.seeked, props.onSeeked);
    registerEvent(dp, DPlayerEvents.seeking, props.onSeeking);
    registerEvent(dp, DPlayerEvents.stalled, props.onStalled);
    registerEvent(dp, DPlayerEvents.suspend, props.onSuspend);
    registerEvent(dp, DPlayerEvents.timeupdate, props.onTimeUpdate);
    registerEvent(dp, DPlayerEvents.volumechange, props.onVolumeChange);
    registerEvent(dp, DPlayerEvents.waiting, props.onWaiting);
    registerEvent(dp, DPlayerEvents.resize, props.onResize);

    // DPlayer事件
    registerEvent(dp, DPlayerEvents.screenshot, props.onScreenshot);
    registerEvent(dp, DPlayerEvents.thumbnails_show, props.onThumbnailsShow);
    registerEvent(dp, DPlayerEvents.thumbnails_hide, props.onThumbnailsHide);
    registerEvent(dp, DPlayerEvents.danmaku_show, props.onDanmakuShow);
    registerEvent(dp, DPlayerEvents.danmaku_hide, props.onDanmakuHide);
    registerEvent(dp, DPlayerEvents.danmaku_clear, props.onDanmakuClear);
    registerEvent(dp, DPlayerEvents.danmaku_loaded, props.onDanmakuLoaded);
    registerEvent(dp, DPlayerEvents.danmaku_send, props.onDanmakuSend);
    registerEvent(dp, DPlayerEvents.danmaku_opacity, props.onDanmakuOpacity);
    registerEvent(dp, DPlayerEvents.contextmenu_show, props.onContextmenuShow);
    registerEvent(dp, DPlayerEvents.contextmenu_hide, props.onContextmenuHide);
    registerEvent(dp, DPlayerEvents.notice_show, props.onNoticeShow);
    registerEvent(dp, DPlayerEvents.notice_hide, props.onNoticeHide);
    registerEvent(dp, DPlayerEvents.quality_start, props.onQualityStart);
    registerEvent(dp, DPlayerEvents.quality_end, props.onQualityEnd);
    registerEvent(dp, DPlayerEvents.destroy, props.onDestroy);
    registerEvent(dp, DPlayerEvents.fullscreen, props.onFullscreen);
    registerEvent(
      dp,
      DPlayerEvents.fullscreen_cancel,
      props.onFullscreenCancel
    );
    registerEvent(dp, DPlayerEvents.subtitle_show, props.onSubtitleShow);
    registerEvent(dp, DPlayerEvents.subtitle_hide, props.onSubtitleHide);
    registerEvent(dp, DPlayerEvents.subtitle_change, props.onSubtitleChange);
  });
};

export default useEvents;
