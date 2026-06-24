import { useState } from "react";
import parrot from "../assets/parrot.png";

export default function TranslatorForm({ setTranslation }) {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("French");
  const [loading, setLoading] = useState(false);

  async function handleTranslate(e) {
    e.preventDefault();

    if (!text.trim()) {
      alert("Please enter text");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://pollyglot-worker.hawaakakkar.workers.dev/api/translate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text,
            language,
          }),
        },
      );

      const data = await response.json();

      setTranslation({
        original: text,
        translated: data.translation || "No translation available",
      });
    } catch (error) {
      console.error(error);
      alert("Translation failed");
    }

    setLoading(false);
  }

  return (
    <div className="card">
      <div className="header">
        <img src={parrot} alt="Parrot" className="parrot" />

        <div className="header-text">
          <h1>PollyGlot</h1>
          <p>Perfect Translation Every Time</p>
        </div>
      </div>

      <form onSubmit={handleTranslate}>
        <label>Text to translate 👇</label>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="How are you?"
        />

        <label>Select language 👇</label>

        <div className="radio-group">
          <label className="language-line">
            <input
              type="radio"
              name="language"
              checked={language === "French"}
              onChange={() => setLanguage("French")}
            />
            <span>French</span>
            <img
              src="https://flagcdn.com/w40/fr.png"
              alt="French"
              className="flag"
            />
          </label>

          <label className="language-line">
            <input
              type="radio"
              name="language"
              checked={language === "Spanish"}
              onChange={() => setLanguage("Spanish")}
            />
            <span>Spanish</span>
            <img
              src="https://flagcdn.com/w40/es.png"
              alt="Spanish"
              className="flag"
            />
          </label>

          <label className="language-line">
            <input
              type="radio"
              name="language"
              checked={language === "Japanese"}
              onChange={() => setLanguage("Japanese")}
            />
            <span>Japanese</span>
            <img
              src="https://flagcdn.com/w40/jp.png"
              alt="Japanese"
              className="flag"
            />
          </label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Translating..." : "Translate"}
        </button>
      </form>
    </div>
  );
}
