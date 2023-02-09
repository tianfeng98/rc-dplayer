import { DPlayerEvents, Player as RcDPlayer } from "@/index";
import { useThrottleFn } from "ahooks";
import { ChangeEvent } from "react";
import styles from "./app.module.less";

const testResources = ["/test.mp4", "/hls/index.m3u8", "test.flv"];
function App() {
  const { run: saveCurrent } = useThrottleFn(
    (url: string, currentTime: number) => {
      console.log("保存进度", currentTime);
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
  return (
    <div className={styles.wrapper}>
      {testResources.map((d) => (
        <div key={d} className={styles.item}>
          <span>{d}</span>
          <RcDPlayer
            src={d}
            options={{
              autoplay: true,
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
                saveCurrent(d, e.target.currentTime);
              }) as any);
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default App;
