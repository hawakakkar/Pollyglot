import { useState } from "react";
import TranslatorForm from "./components/TranslatorForm";
import ResultPage from "./components/ResultPage";
import "./App.css";

function App() {
  const [translation, setTranslation] = useState(null);

  return (
    <div className="app">
      {!translation ? (
        <TranslatorForm setTranslation={setTranslation} />
      ) : (
        <ResultPage
          translation={translation}
          reset={() => setTranslation(null)}
        />
      )}
    </div>
  );
}

export default App;
