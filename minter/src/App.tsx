import { useLayoutEffect, useState } from "react";

// import "./App.css";
import "@particle-network/connectkit/dist/index.css";
import { Helmet } from "react-helmet";
import Panel from "@/components/Panel/Panel";
import { checkIsPhone } from "@/utils/global";
// import Banner from "./components/BannerPhone/Banner";

function App() {
  const [bannerPhone, setBannerPhone] = useState<JSX.Element | null>(null);

  const getBannerForPhone = async () => {
    const module = await import("./components/BannerPhone/Banner");
    setBannerPhone(<module.default />);
  };

  // useLayoutEffect(() => {
  //   if (checkIsPhone()) {
  //     getBannerForPhone();
  //   }
  // }, []);

  return (
    <div>
      <Helmet>
        <title>Zaraban Minter</title>
        <meta property="og:title" content="mint wallet with email" />
        <meta
          property="og:image"
          content="https://cryptologos.cc/logos/chainlink-link-logo.png?v=029"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="a demo dapp for minting token on goerli chain"
        />
        <meta
          property="og:url"
          content="minter-demo.vercel.app"
          data-react-helmet="true"
        />
        <meta
          name="description"
          content="a demo project for showing how to mint tokens with email address"
          data-react-helmet="true"
        />
      </Helmet>
      <div className="w-full h-full">
        <Panel />
        {checkIsPhone() && bannerPhone}
      </div>
    </div>
  );
}

export default App;
