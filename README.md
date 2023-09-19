# rc-dplayer

This is a wrapper of [DPlyer](https://github.com/DIYgod/DPlayer);

It contains `hls.js` and `flv.js`，you can play your video directly.

**As of version 1.0.0, the HLS protocol supports HEVC encoding.**

> Since Chrome 107 version supports HEVC hardware decoding function, this project upgrades hls.js and realizes HLS + HEVC video stream playback based on hardware decoding capability

## Install

### npm

```shell
npm install rc-dplayer
```

### pnpm

```shell
pnpm add rc-dplayer
```

## Examples

```tsx
import { Player as RcDPlayer } from "rc-dplayer";

const App = () => {
  return (
    <RcDPlayer
      src="/test.mp4"
      options={{
        autoplay: true,
      }}
      onLoad={(dp) => {
        console.log("DPlayer instance", dp);
      }}
      onError={(event) => {
        console.error("error", event);
      }}
    />
  );
};
```

## Props

| name              | type                  | description                                      | default         |
| ----------------- | --------------------- | ------------------------------------------------ | --------------- |
| src               | string                | Video source .                                   | -               |
| mseType           | MseType               | MSE type .                                       | MseType.default |
| autoLoad          | boolean               | Auto load video when it\`s true and `src` exits. | true            |
| options           | DPlayerOptions        | The other options of DPlayer .                   | -               |
| customControllers | CustomController[]    | Custom controller                                | -               |
| onLoad            | (dp: DPlayer) => void | Callback of player loaded                        | -               |

## Events

Support [HTML media events](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/abort_event) and [DPlayer events](https://dplayer.diygod.dev/zh/guide.html#%E4%BA%8B%E4%BB%B6%E7%BB%91%E5%AE%9A).

```ts
// React DPlayer Events
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
```

## Interface

```typescript
export enum MseType {
  hls = "m3u8",
  flv = "flv",
  default = "default",
}
```

```typescript
type ControllerPosition = "left" | "right";

export interface CustomController {
  key: Key;
  position: ControllerPosition;
  component: ReactNode;
  onClick?: (event: ReactMouseEvent<HTMLDivElement, MouseEvent>) => void;
}
```

## Ref methods

| name | type                                         | description              |
| ---- | -------------------------------------------- | ------------------------ |
| load | (url?: string, mseType?: MseType) => DPlayer | Load video by yourself . |

# License

`rc-dplayer` is released under the `MIT license`.
