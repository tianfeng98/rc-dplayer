# rc-dplayer

This is a wrapper of [DPlyer](https://github.com/DIYgod/DPlayer);

It contains `hls.js` and `flv.js`，you can play your video directly.

## Install

### npm

```shell
npm install rc-dplayer
```

### pnpm

```shell
pnpm install rc-dplayer
```

## Examples

```tsx
import { Player as RcDPlayer } from "@/index";

const App = () => {
  return (
    <RcDPlayer
      src="/test.mp4"
      options={{
        autoplay: true,
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
| onEnded           | () => void            | `Ended` event of DPlayer .                       | -               |
| onError           | () => void            | `Error` event of DPlayer .                       | -               |

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
