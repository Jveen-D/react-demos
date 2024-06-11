import React from "react";
import useStyles from "./styles";
import { WebGLRenderer, PerspectiveCamera, Scene, Color, FogExp2 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Object3DNode, extend } from "@react-three/fiber";
import { LumaSplatsThree, LumaSplatsSemantics } from "@lumaai/luma-web";
import file from "@/assets/mp4/WeChat_20240611162924.mp4";

type LumaProps = {};

const Luma: React.FC<LumaProps> = (props) => {
  const { styles } = useStyles();
  React.useEffect(() => {
    const canvas = document.querySelector("canvas");

    const renderer = new WebGLRenderer({
      canvas: canvas,
      antialias: false,
    });

    renderer.setSize(window.innerWidth, window.innerHeight, false);

    const scene = new Scene();

    const camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 2;

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    const splat = new LumaSplatsThree({
      source:
        "https://lumalabs.ai/capture/822bac8d-70d6-404e-aaae-f89f46672c67",
      loadingAnimationEnabled: false,
    });
    scene.add(splat);
    // 背景去除
    // splat.semanticsMask = LumaSplatsSemantics.FOREGROUND;

    // 雾化
    // scene.fog = new FogExp2(new Color(0xe0e1ff).convertLinearToSRGB(), 0.15);
    // scene.background = scene.fog.color;

    // 场景照明
    splat.onLoad = () => {
      splat.captureCubemap(renderer).then((capturedTexture) => {
        scene.environment = capturedTexture;
        scene.background = capturedTexture;
        scene.backgroundBlurriness = 0.9;
      });
    };

    splat.setShaderHooks({
      vertexShaderHooks: {
        additionalUniforms: {
          time_s: ["float", 500000000000000000],
        },

        getSplatTransform: /*glsl*/ `
          (vec3 position, uint layersBitmask) {
            // sin wave on x-axis
            float x = 0.;
            float z = 0.;
            float y = sin(position.x * 1.0 + time_s) * 0.1;
            return mat4(
              1., 0., 0., 0,
              0., 1., 0., 0,
              0., 0., 1., 0,
              x,  y,  z, 1.
            );
          }
        `,
      },
    });

    renderer.setAnimationLoop(() => {
      controls.update();
      renderer.render(scene, camera);
    });
  }, []);

  const handleUpload = () => {
    const requestOptions = {
      method: "PUT",
      body: file,
      redirect: "follow",
    };

    fetch(
      "https://storage.googleapis.com/ai_lumalabs-captures/test_6f0bc3c2-5af3-4c62-97e4-f76b18f0c07a.mov?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=web-assets%40exemplary-fiber-316308.iam.gserviceaccount.com%2F20240611%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240611T090046Z&X-Goog-Expires=485954&X-Goog-SignedHeaders=host&X-Goog-Signature=478f98e41fab0d6f904f5a4b81d28355058c474b230b13ac8b80571b266c007d1ede1707e6e764c9cf5a0e5bd0aaa66d4e04370023db6b2d35fad2d198c7525c88465561d47fb0652985165ecff09efec40dd58f57a7e9d33ead87821c66001ddb2ab02049ce5d7f971514f372555e7ba490c0382d34b037e8f1575675f56684cd5d7421671d1984777eee1a6006209c47ffdcacd6b25bd77896c3c66cb9fd33cef1275c3a0c34911426536112d6c34b756b14de74cc7ee0261d425bcda6551313d26740d3cb96bfaa0f72d3164d1a8627fbfb965cd9b7c362b721216d57586022143195e4189e5ce7b4a5d9f05666178ddaf8e6f1b2e97bca6a951e6e83f2f9",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
  return (
    <div className={styles.Luma}>
      <button onClick={() => handleUpload()}>upload</button>
      <canvas />
    </div>
  );
};

export default Luma;
