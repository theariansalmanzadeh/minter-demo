import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ModalProvider } from "@particle-network/connectkit";
import { AuthType } from "@particle-network/auth-core";
import { EthereumGoerli } from "@particle-network/chains";
import { evmWallets } from "@particle-network/connectors";
const wcProjectId = import.meta.env.VITE_WC_PORJECT_ID;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ModalProvider
      options={{
        projectId: import.meta.env.VITE_PORJECT_ID ?? "",
        clientKey: import.meta.env.VITE_CLIENT_KEY ?? "",
        appId: import.meta.env.VITE_APP_ID ?? "",
        chains: [EthereumGoerli],

        wallet: {
          visible: false,
          customStyle: {
            supportChains: [EthereumGoerli],
          },
        },
        fiatCoin: "USD",
        authTypes: [],

        promptSettingConfig: {
          //optional: particle security account config
          //prompt set payment password. 0: None, 1: Once(default), 2: Always
          promptPaymentPasswordSettingWhenSign: 1,
          //prompt set master password. 0: None(default), 1: Once, 2: Always
          promptMasterPasswordSettingWhenLogin: 1,
        },
        connectors: [
          ...evmWallets({ projectId: wcProjectId ?? "", showQrModal: true }),
        ],
      }}
      theme={"dark"}
      language={"en"} //optional：localize, default en
      walletSort={["Wallet"]} //optional：walelt order
    >
      <App />
    </ModalProvider>
  </React.StrictMode>
);
