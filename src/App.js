import FrontPage from "./views/FrontPage";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <div className="App h-screen">
      <div className="bg-slate-200">
        <NavigationBar />
        <FrontPage />
      </div>
    </div>
  );
}

export default App;
