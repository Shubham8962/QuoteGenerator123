import React, { useState, useEffect } from "react";
import "./App.css";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [quote, setQuote] = useState("Today is MY Day");
  const [author, setAuthor] = useState("S");
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   fetchRandomQuote();
  // }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchRandomQuote();
    }, 1000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  let fetchRandomQuote = () => {
    fetch("http://api.quotable.io/random")
      .then((res) => res.json())
      .then((quote) => {
        setQuote(quote.content);
        setAuthor(quote.author);
        toast.success("Quote successfully retrieved!");
      })
      .catch((err) => {
        toast.error(`Eror: ${err.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <div className="quote">
        <h2>{quote}</h2>
        <h6>-{author}-</h6>
      </div>
      <br />
      <button className="btn" onClick={fetchRandomQuote} disabled={loading}>
        {loading ? "Generating" : "Generate New Quote"}
      </button>
      {loading && <div className="loader"></div>}
      <ToastContainer />;
    </div>
  );
}

export default App;
