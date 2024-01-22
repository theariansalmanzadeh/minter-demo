import { Button } from "primereact/button";
import { useConnect } from "@particle-network/auth-core-modal";
import { AiOutlineDisconnect } from "react-icons/ai";
import { useParticleConnect } from "@particle-network/connectkit";

function DisconnectBtn() {
  const { disconnect } = useConnect();
  const particleConnect = useParticleConnect();
  return (
    <Button
      className="self-stretch justify-center gap-2 mt-10 text-white bg-red-900"
      onClick={() => {
        disconnect();
        particleConnect.disconnect();
      }}
    >
      Disconnect
      <AiOutlineDisconnect size={24} />
    </Button>
  );
}

export default DisconnectBtn;
