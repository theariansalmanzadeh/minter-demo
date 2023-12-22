# About the Project

a simple web3 project based on blockchain called Zarban Minter for Minting and sending Token on the Goerli blockchain.
in this Project user should first connect or generate a wallet using Particle network after that user can first see the details of the wallet and mint and send tokens on goerli blockchain.

notice that, Due to the simplicity of the Project no state managment library is used in this Porject.

## Documentation

for starting this Porject developer needs a partcile Network ID clien ID and App ID. you can obtain these in the link below.

also, if you like to integrate you project with WalletConnect, you also need a walletConnect ID (obtain in thelink below)
after getting the IDs.create a .env file and place the IDs in it.
there are imported and used in the `main.tsx` file as below.

[Particle dashboard](https://dashboard.particle.network)

[WalletConnect dashboard](https://docs.particle.network/developers/connect-service/sdks/web)

the app is using the Partcile Network Connect service intgrated with Ethers.js version 5
check the Documentation below.

[Particle docs](https://dashboard.particle.network)

tailwindCss : color pallet is integrated in the `tailwind.confing.ts` file. users can change the color codes from the file

## Tech and Libraries involved

**Client:** React Vite , Typescript, Ethers.js , Particle network , Sass , TailwindCSS, PrimeReact , react-icons

## Usage/Examples

```javascript
import { ModalProvider } from "@particle-network/connectkit";
import { AuthType } from "@particle-network/auth-core";
import { EthereumGoerli } from "@particle-network/chains";
import { evmWallets } from "@particle-network/connectors";

<ModalProvider
      options={{
        projectId: import.meta.env.VITE_PORJECT_ID ?? "",
        clientKey: import.meta.env.VITE_CLIENT_KEY ?? "",
        appId: import.meta.env.VITE_APP_ID ?? "",
        chains: [EthereumGoerli],//used chains

        wallet: {
          visible: false, //incase you want a embedded wallet in your project
          customStyle: {
            supportChains: [EthereumGoerli],//used chains
          },
        },
        fiatCoin: "USD",
        authTypes: [
          AuthType.email,
          AuthType.facebook,
          AuthType.github,
          AuthType.apple,
          AuthType.phone,
          AuthType.discord,
        ],

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
      walletSort={["Particle Auth", "Wallet"]} //optional：walelt order
    >
      <App />
    </ModalProvider>
}
```

after that run the server with npm run dev in the terminal of the porject root.

## Run Locally

Clone the project

```bash
  git clone https://github.com/theariansalmanzadeh/minter-demo.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

server port :8080
