import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// import "./index.css";
import "./styles/main.scss";
import { ModalProvider } from "@particle-network/connectkit";
import { EthereumGoerli } from "@particle-network/chains";
import { evmWallets } from "@particle-network/connectors";
import { AuthType } from "@particle-network/auth-core";
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
        authTypes: [AuthType.email],
        promptSettingConfig: {
          promptPaymentPasswordSettingWhenSign: 1,
          promptMasterPasswordSettingWhenLogin: 1,
        },
        connectors: [
          ...evmWallets({ projectId: wcProjectId ?? "", showQrModal: true }),
        ],
      }}
      theme={"dark"}
      language={"en"} //optional：localize, default en
      walletSort={["Particle Auth", "Wallet"]} //optional：walelt order
    >
      <App />
    </ModalProvider>
  </React.StrictMode>
);
