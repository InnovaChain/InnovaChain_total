import "./App.css";
import useScreenSize from "./hooks/useScreenSize";
import Router from "./router";

function App() {
  const size = useScreenSize();
  if (["sm", "md", "lg"].includes(size)) {
    return (
      <p className="text-white">
        The site will support mobile devices in the future.
      </p>
    );
  }
  return <Router />;
}

export default App;
