import "./App.css";
import "@particle-network/connectkit/dist/index.css";
import "./styles/main.scss";
import Panel from "./components/Panel/Panel";

function App() {
  return (
    <div className="w-full h-full">
      <Panel />
      {/* <TxStatusDialog /> */}
    </div>
  );
}

export default App;
