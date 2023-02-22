import { useCreation, useMemoizedFn } from "ahooks";
import classnames from "classnames";
import prefixClassnames from "prefix-classnames";
import type {
  Key,
  MouseEvent as ReactMouseEvent,
  PropsWithChildren,
  ReactNode,
  RefObject,
} from "react";
import { createPortal } from "react-dom";

const prefixCls = prefixClassnames(GLOBAL_PREFIX);

type ControllerPosition = "left" | "right";

export interface CustomControllersPortalProps extends PropsWithChildren<any> {
  position: ControllerPosition;
  playerDom?: HTMLElement | null;
}

export interface CustomController {
  key: Key;
  position: ControllerPosition;
  component: ReactNode;
  onClick?: (event: ReactMouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const CustomControllersPortal = ({
  position,
  children,
  playerDom,
}: CustomControllersPortalProps) => {
  if (children) {
    const iconsDom = (playerDom || document.body)?.querySelector(
      `.dplayer-icons-${position}`
    );
    if (iconsDom) {
      return createPortal(children, iconsDom);
    }
    return null;
  }
  return null;
};

export interface CustomControllersProps {
  customControllers: CustomController[];
  dom: RefObject<any>;
}

export const CustomControllers = ({
  customControllers,
  dom,
}: CustomControllersProps) => {
  const [customLeftControllers, customRightControllers] = useCreation(
    () => [
      customControllers.filter((d) => d.position === "left"),
      customControllers.filter((d) => d.position === "right"),
    ],
    [customControllers]
  );

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
      <CustomControllersPortal position="left" playerDom={dom.current}>
        {renderCustomControllers(customLeftControllers)}
      </CustomControllersPortal>
      <CustomControllersPortal position="right" playerDom={dom.current}>
        {renderCustomControllers(customRightControllers)}
      </CustomControllersPortal>
    </>
  );
};
