import parrot from "../assets/parrot.png";

export default function ResultPage({ translation, reset }) {
  return (
    <div className="card">
      <div className="header">
        <img src={parrot} alt="Parrot" className="parrot" />

        <div className="header-text">
          <h1>PollyGlot</h1>
          <p>Perfect Translation Every Time</p>
        </div>
      </div>

      <label>Original text 👇</label>

      <div className="result-box">{translation.original}</div>

      <label>Your translation 👇</label>

      <div className="result-box">{translation.translated}</div>

      <button onClick={reset}>Start Over</button>
    </div>
  );
}
