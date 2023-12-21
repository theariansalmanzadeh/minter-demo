import { useMemo } from "react";
import {
  TabView,
  TabPanel,
  TabViewPassThroughMethodOptions,
} from "primereact/tabview";
import Profile from "../Profile/Profile";
import Form from "../Form/Form.tsx";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineToken } from "react-icons/md";
import {
  ConnectButton,
  useParticleProvider,
} from "@particle-network/connectkit";
import { useAccount } from "@particle-network/connectkit";
import { useEthereum } from "@particle-network/auth-core-modal";
import { isEVMProvider } from "@particle-network/connectors";
import { contractAddress } from "../../assets/content/content.ts";
import contAbi from "../../assets/data/tokenMinterAbi.json";
import { ethers } from "ethers";

function Panel() {
  const account = useAccount();
  const { provider: authProvider, address } = useEthereum();
  const particleProvider = useParticleProvider();
  console.log(authProvider);

  const provider = useMemo(() => {
    if (particleProvider === undefined) return;
    if (isEVMProvider(particleProvider))
      return new ethers.providers.Web3Provider(particleProvider);
  }, [particleProvider]);
  const signer = useMemo(() => {
    if (!provider) return;

    return provider.getSigner();
  }, [provider]);
  const contract = useMemo(
    () => new ethers.Contract(contractAddress, contAbi, signer),
    [signer]
  );

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {(account === "" || account === undefined) && address === null ? (
        <ConnectButton />
      ) : (
        <TabView
          className="border-2 rounded-md overflow-hidden border-primary w-4/5 md:w-3/5 lg:w-1/2 shadow-md shadow-primary"
          pt={{
            nav: {
              className:
                "flex justify-between items-center hover:text-white bg-secondary",
            },
            panelContainer: { className: "h-[22rem] bg-white" },
          }}
        >
          <TabPanel
            header="Profile"
            pt={{
              root: { className: "px-2" },
              header: ({
                parent,
              }: {
                parent: TabViewPassThroughMethodOptions;
              }) => ({
                className: `${
                  parent.state.activeIndex === 0 && "bg-white h-full"
                }`,
              }),
              headerTitle: { className: "text-primary py-4" },
            }}
            rightIcon={<FaRegUser className="ml-2 text-primary" />}
          >
            <Profile contract={contract} provider={provider} />
          </TabPanel>
          <TabPanel
            pt={{
              root: { className: "px-2" },
              header: ({
                parent,
              }: {
                parent: TabViewPassThroughMethodOptions;
              }) => ({
                className: `${
                  parent.state.activeIndex === 1 && "bg-white h-full"
                }`,
              }),
              headerTitle: { className: "text-primary py-4" },
            }}
            header="Mint and send"
            rightIcon={<MdOutlineToken className="ml-2 text-primary" />}
          >
            <Form contract={contract} />
          </TabPanel>
        </TabView>
      )}
    </div>
  );
}

export default Panel;
