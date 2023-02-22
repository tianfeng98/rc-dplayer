import { useMemoizedFn, useUnmount, useUpdate } from "ahooks";
import classnames from "classnames";
import type { DPlayerOptions } from "dplayer";
import DPlayer from "dplayer";
import prefixClassnames from "prefix-classnames";
import type { HTMLAttributes, Ref } from "react";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import type { CustomController } from "./CustomControllersPortal";
import { CustomControllers } from "./CustomControllersPortal";
import { MseType } from "./enum";
import type { UserEventsProps } from "./hooks/useEvents";
import useEvents from "./hooks/useEvents";
import "./index.less";
import { getMSE } from "./mediaConfig";
import { ext2MseType } from "./utils";

export * from "./enum";
export * from "./utils";

export { default as DPlayer } from "dplayer";

const prefixCls = prefixClassnames(GLOBAL_PREFIX);

export interface PlayerRef {
  /**
   * Load/Reload player
   * @param {string} url
   * @returns {}
   */
  load: (url?: string, mseType?: MseType) => DPlayer | undefined;
}

export interface DPlayerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onLoad">,
    UserEventsProps {
  src?: string;
  mseType?: MseType;

  /**
   * When a play source exists, it is automatically loaded
   */
  autoLoad?: boolean;
  options?: Partial<Omit<DPlayerOptions, "video">> & {
    video?: Partial<DPlayerOptions["video"]>;
  };

  /**
   * Custom controller
   */
  customControllers?: CustomController[];
  onLoad?: (dp: DPlayer) => void;
}

const Player = (
  {
    src,
    mseType,
    options = {},
    autoLoad = true,
    customControllers = [],
    className,
    onLoad,
    ...divProps
  }: DPlayerProps,
  ref: Ref<PlayerRef>
) => {
  const dom = useRef<HTMLDivElement>(null);
  const dp = useRef<DPlayer>();
  const mse = useRef<any>(null);
  const update = useUpdate();

  const handleDestroy = () => {
    dp.current?.destroy();
    mse.current?.destroy?.();
  };

  const listenEvent = useEvents(divProps);

  const handleLoad = useMemoizedFn((url = src, _mseType = mseType) => {
    if (!url) return;
    let mt: MseType;
    if (_mseType) {
      mt = _mseType;
    } else {
      const ext = url.split(".").at(-1);
      mt = ext2MseType(ext);
    }
    const mseConfig = getMSE(mt, mse);
    if (dp.current) {
      handleDestroy();
    }
    const { video, ...otherOptions } = options;
    dp.current = new DPlayer({
      container: dom.current,
      video: {
        url,
        ...mseConfig,
        ...video,
      },
      ...otherOptions,
    }) as DPlayer;
    listenEvent(dp.current);
    update();
    onLoad?.(dp.current);
    return dp.current;
  });

  useImperativeHandle(ref, () => ({
    load: handleLoad,
  }));

  useEffect(() => {
    if (autoLoad && src) {
      handleLoad(src);
    }
  }, [autoLoad, src]);

  useUnmount(() => {
    handleDestroy();
  });

  return (
    <>
      <div ref={dom} className={classnames(prefixCls(), className)} />
      <CustomControllers dom={dom} customControllers={customControllers} />
    </>
  );
};

export default forwardRef(Player);
