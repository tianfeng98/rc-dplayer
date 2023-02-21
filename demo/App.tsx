import { DPlayerEvents, Player as RcDPlayer } from "@/index";
import { useThrottleFn } from "ahooks";
import { ChangeEvent, useRef, useState } from "react";
import styles from "./app.module.less";

function App() {
  const [testResources, setTestResources] = useState([
    // "/test.mp4",
    "/404",
    "/hls/index.m3u8",
    "test.flv",
  ]);
  const { run: saveCurrent } = useThrottleFn(
    (url: string, currentTime: number) => {
      localStorage.setItem(
        url,
        JSON.stringify({
          currentTime,
        })
      );
    },
    {
      wait: 1000,
    }
  );

  const hasDestroyed = useRef(false);
  const handleClose = (u: string) => {
    setTestResources((origin) => origin.filter((d) => d !== u));
  };

  return (
    <div className={styles.wrapper}>
      {testResources.map((d) => (
        <div key={d} className={styles.item}>
          <div>
            <span>{d}</span>{" "}
            <button
              onClick={() => {
                handleClose(d);
              }}
            >
              close
            </button>
          </div>
          <RcDPlayer
            src={d}
            options={{
              autoplay: true,
            }}
            customControllers={[
              {
                key: "aa",
                component: <span>aaa</span>,
                position: "left",
              },
            ]}
            onError={(e) => {
              console.log("**** error", e);
            }}
            onLoad={(dp) => {
              // 读取视频播放进度
              const localData = localStorage.getItem(d);
              if (localData) {
                try {
                  const { currentTime } = JSON.parse(localData);
                  currentTime && dp.seek(currentTime);
                } catch (e) {
                  console.log("解析视频本地信息失败");
                }
              }
              // 保存播放进度
              dp.on(DPlayerEvents.timeupdate, ((
                e: ChangeEvent<HTMLVideoElement>
              ) => {
                if (!hasDestroyed.current) {
                  saveCurrent(d, e.target.currentTime);
                }
              }) as any);
              dp.on(DPlayerEvents.destroy, () => {
                hasDestroyed.current = true;
              });
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default App;
