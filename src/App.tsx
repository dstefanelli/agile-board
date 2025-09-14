import "./App.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <div className="min-h-full">
        <NavBar />
        <Header />
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"></div>
        </main>
      </div>
    </>
  );
}

export default App;
