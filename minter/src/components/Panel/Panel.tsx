import {
  TabView,
  TabPanel,
  TabViewPassThroughMethodOptions,
} from "primereact/tabview";
import Profile from "../Profile/Profile";
import Form from "../Form/Form.tsx";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineToken } from "react-icons/md";
import { ConnectButton } from "@particle-network/connectkit";
import { useAccount } from "@particle-network/connectkit";
import useWeb3 from "@/hooks/useWeb3.tsx";

function Panel() {
  const account = useAccount();
  const { provider, address, contract } = useWeb3();
  console.log(contract);

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      {(account === "" || account === undefined) && address === null ? (
        <ConnectButton />
      ) : (
        <TabView
          className="w-4/5 overflow-hidden border-2 rounded-md shadow-md border-primary md:w-3/5 lg:w-1/2 shadow-primary"
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
