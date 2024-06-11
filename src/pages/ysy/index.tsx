import React from "react";
import useStyles from "./styles";
import EZUIKit from "ezuikit-js";
export type YsyProps = {};

const Ysy: React.FC<YsyProps> = (props) => {
  const { styles } = useStyles();

  React.useEffect(() => {
    new EZUIKit.EZUIKitPlayer({
      id: "video-container", // 视频容器ID
      accessToken:
        "at.3x8s6h2h6p43gice98yfv3hm7ufv9ud3-231pseo9fb-1luef4x-zmuqbfqav",
      url: "ezopen://open.ys7.com/G65720799/1.hd.live",
      template: "security",
      width: 800,
      height: 800,
    });
  }, []);

  return (
    <div className={styles.Ysy}>
      <video id="video-container" style={{ width: 600, height: 600 }}></video>
    </div>
  );
};

export default Ysy;
