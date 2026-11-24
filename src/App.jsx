import "./App.css";
import { Analytics } from "@vercel/analytics/react"
import Form from "./components/Form";

function App() {
  return (
    <>
      <header>
        <div className="brand">
          <img className="logo" src="/gps.png" alt="GPS logo" />
          <div>
            <h1>Project Front Page Generator</h1>
            <p className="tagline">Clean, ready-to-print project boilerplates</p>
          </div>
        </div>
      </header>
      <main>
        <Form />
      </main>
      <Analytics />
    </>
  );
}

export default App;
