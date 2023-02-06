import { useCreation, useMemoizedFn, useUnmount, useUpdate } from "ahooks";
import classnames from "classnames";
import type { DPlayerOptions } from "dplayer";
import DPlayer, { DPlayerEvents } from "dplayer";
import type {
  HTMLAttributes,
  Key,
  MouseEvent as ReactMouseEvent,
  PropsWithChildren,
  ReactNode,
  Ref,
} from "react";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import type { MseType } from "./enum";
import "./index.less";
import { getMSE } from "./mediaConfig";
import { ext2MseType } from "./utils";

export * from "./enum";
export * from "./utils";

const prefixCls = (className?: string) =>
  ["rc-dplayer", className].filter((d) => d).join("-");

export interface PlayerRef {
  /**
   * Load/Reload player
   * @param {string} url
   * @returns {}
   */
  load: (url?: string, mseType?: MseType) => DPlayer | undefined;
}

export const initRef: PlayerRef = {
  load: () => undefined,
};

type ControllerPosition = "left" | "right";

export interface CustomControllersProps extends PropsWithChildren<any> {
  position: ControllerPosition;
}

export const CustomControllersPortal = ({
  position,
  children,
}: CustomControllersProps) => {
  if (children) {
    const iconsDom = document
      .querySelector(`.${prefixCls()}`)
      ?.querySelector(`.dplayer-icons-${position}`);
    if (iconsDom) {
      return createPortal(children, iconsDom);
    }
    return null;
  }
  return null;
};

export interface CustomController {
  key: Key;
  position: ControllerPosition;
  component: ReactNode;
  onClick?: (event: ReactMouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export interface DPlayerProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;

  mseType?: MseType;

  /**
   * When a play source exists, it is automatically loaded
   */
  autoLoad?: boolean;
  options?: Partial<DPlayerOptions>;

  /**
   * Custom controller
   */
  customControllers?: CustomController[];

  /**
   * DPlayer Events
   */
  onEnded?: () => void;
  onError?: () => void;
}

const Player = (
  {
    src,
    mseType,
    options,
    autoLoad = true,
    customControllers = [],
    className,
    onEnded,
    onError,
    ...divProps
  }: DPlayerProps,
  ref: Ref<PlayerRef>
) => {
  const dom = useRef<HTMLDivElement>(null);
  const dp = useRef<DPlayer>();
  const mse = useRef<any>(null);
  const update = useUpdate();

  const [customLeftControllers, customRightControllers] = useCreation(
    () => [
      customControllers.filter((d) => d.position === "left"),
      customControllers.filter((d) => d.position === "right"),
    ],
    [customControllers]
  );

  const handleDestroy = () => {
    dp.current?.destroy();
    mse.current?.destroy?.();
  };

  const listenEvent = () => {
    if (dp.current) {
      onEnded && dp.current.on(DPlayerEvents.ended, onEnded);
      onError && dp.current.on(DPlayerEvents.error, onError);
    }
  };

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
    dp.current = new DPlayer({
      container: dom.current,
      video: {
        url,
        ...mseConfig,
      },
      ...options,
    });
    listenEvent();
    update();
    return dp.current;
  });

  useImperativeHandle(ref, () => ({
    load: handleLoad,
  }));

  useEffect(() => {
    if (autoLoad) {
      handleLoad(src);
    }
  }, [autoLoad, src]);

  useUnmount(() => {
    handleDestroy();
  });

  const renderCustomControllers = useMemoizedFn(
    (controllers: CustomController[]) =>
      controllers.map(({ key, component, onClick }) => (
        <div className="dplayer-icon" key={key} onClick={onClick}>
          <span
            className={classnames(
              "dplayer-icon-content",
              `${prefixCls("controller")}`
            )}
          >
            {component}
          </span>
        </div>
      ))
  );

  return (
    <>
      <div
        ref={dom}
        className={classnames(prefixCls(), className)}
        {...divProps}
      />
      <>
        <CustomControllersPortal position="left">
          {renderCustomControllers(customLeftControllers)}
        </CustomControllersPortal>
        <CustomControllersPortal position="right">
          {renderCustomControllers(customRightControllers)}
        </CustomControllersPortal>
      </>
    </>
  );
};

export default forwardRef(Player);
