import { useLayoutEffect, useState } from "react";
// import "./App.css";
import "@particle-network/connectkit/dist/index.css";

import Panel from "@/components/Panel/Panel";
import { checkIsPhone } from "@/utils/global";
// import Banner from "./components/BannerPhone/Banner";

function App() {
  const [bannerPhone, setBannerPhone] = useState<JSX.Element | null>(null);

  const getBannerForPhone = async () => {
    const module = await import("./components/BannerPhone/Banner");
    setBannerPhone(<module.default />);
  };

  useLayoutEffect(() => {
    if (checkIsPhone()) {
      getBannerForPhone();
    }
  }, []);

  return (
    <div className="w-full h-full">
      <Panel />
      {checkIsPhone() && bannerPhone}
    </div>
  );
}

export default App;
