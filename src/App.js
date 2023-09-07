import "./App.css";
import React, { useState, useRef, useEffect } from "react";

function App() {
  const [dilutionLeft, setDilutionLeft] = useState(1);
  const [dilutionRight, setDilutionRight] = useState(1);
  const [ratio, setRatio] = useState();
  const [remainder, setRemainder] = useState();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "left") {
      setDilutionLeft(parseInt(value));
    } else {
      setDilutionRight(parseInt(value));
    }
  };

  useEffect(() => {
    calculateRatio(dilutionLeft, dilutionRight);
    displayResult();
  }, [dilutionLeft, dilutionRight]);

  const calculateRatio = (left, right) => {
    let ratio = ((1 / (left + right)) * 100).toFixed(2);
    let remainder = (100 - ratio).toFixed(2);
    if (!isNaN(ratio)) {
      setRemainder(remainder);
      setRatio(ratio);
    }
  };

  const displayResult = () => {};

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="border w-full h-1/5 border-black absolute bottom-0">
        <input
          name="left"
          type="text"
          className="h-full pr-1 text-right text-md select-text placeholder-slate-300"
          defaultValue="1"
          maxLength={4}
          onChange={handleChange}
        ></input>
        <span>:</span>
        <input
          name="right"
          type="text"
          className="h-full pr-1 text-left text-md select-text placeholder-slate-300"
          defaultValue="1"
          maxLength={4}
          onChange={handleChange}
        ></input>
      </div>
      <div>{ratio + "% " + remainder + "% "}</div>
    </div>
  );
}

export default App;
