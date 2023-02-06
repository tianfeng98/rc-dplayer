import RcDPlayer from "@/index";
import styles from "./app.module.less";

const testResources = ["/test.mp4", "/hls/index.m3u8", "test.flv"];
function App() {
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
          />
        </div>
      ))}
    </div>
  );
}

export default App;
