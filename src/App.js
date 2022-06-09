import FrontPage from "./views/FrontPage";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <div className="App">
      <div className="bg-slate-200 h-screen">
        <NavigationBar />
        <FrontPage/>
      </div>
    </div>
  );
}

export default App;
