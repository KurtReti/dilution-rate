import "./App.css";
import React, { useState, useRef, useEffect } from "react";

function App() {
  const [dilutionLeft, setDilutionLeft] = useState(1);
  const [dilutionRight, setDilutionRight] = useState(1);
  const [ratio, setRatio] = useState();
  const [remainder, setRemainder] = useState();
  const [height, setHeight] = useState(0);
  const [height2, setHeight2] = useState(0);
  const ref = useRef(null);
  const ref2 = useRef(null);
  const [solutionVolume, setSolutionVolume] = useState(0);
  const [waterVolume, setWaterVolume] = useState(0);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "left") {
    } else {
      setDilutionRight(parseInt(value));
    }
  };

  useEffect(() => {
    calculateRatio(dilutionLeft, dilutionRight);
  }, [dilutionLeft, dilutionRight]);

  useEffect(()  => {
    handleVolume()
  }, [ratio, remainder])
    
  const handleHeight = (height) => {
    setHeight(height);
    ref.current.style.height = height + "%";
  };

  const handleHeight2 = (height) => {
    setHeight2(height);
    ref2.current.style.height = height + "%";
  };

  const calculateRatio = (left, right) => {
    let ratio = ((1 / (left + right)) * 100).toFixed(2);
    let remainder = (100 - ratio).toFixed(2);
    if (!isNaN(ratio)) {
      setRemainder(remainder);
      setRatio(ratio);
      handleHeight(ratio);
      handleHeight2(remainder);
    }
  };

  const handleVolume = () => {
    let volume = document.getElementsByName("volume")[0].value;
    let solutionVolumeNew = (volume * ratio) / 100;
    let waterVolumeNew = (volume * remainder) / 100;
    setSolutionVolume(solutionVolumeNew);
    setWaterVolume(waterVolumeNew);
  };
  return (
    <div className="w-screen h-screen flex flex-col-reverse justify-center items-center font-mono">
      <div className="h-full w-full flex flex-col items-center rounded-md">
        <div
          className="w-full text-center bg-sky-200 relative flex items-center justify-center"
          ref={ref2}
        >
          <div>
            <h1>Water</h1>
            <h1>{height2 + "%"}</h1>
            {waterVolume}ml
          </div>
        </div>
        <div
          className="w-full text-center bg-green-400 relative flex items-center justify-center"
          ref={ref}
        >
          <div>
            <h1>Solution</h1>
            <h1>{height + "%"}</h1>
            {solutionVolume}ml
          </div>
        </div>
      </div>
      <div className="border w-full h-fit border-none flex flex-row items-center justify-center p-4">
        <div className="w-1/2 flex flex-col justify-center text-center items-center">
          <h1 className="w-1/2 h-fit text-xl pb-4">Solution</h1>
          <input
            name="left"
            type="text"
            className="h-full w-1/2 text-2xl  pr-1 text-center border-b-2 border-black text-md select-text placeholder-slate-300"
            defaultValue="1"
            maxLength={4}
            onChange={handleChange}
            disabled={true}
          ></input>
        </div>
        <span className="text-2xl">:</span>
        <div className="w-1/2 flex flex-col justify-center text-center items-center">
          <h1 className="w-1/2 h-fit text-xl pb-4">Water</h1>
          <input
            name="right"
            type="text"
            className="h-full w-1/2 text-2xl pr-1 text-center border-b-2 border-black text-md select-text placeholder-slate-300"
            defaultValue="1"
            maxLength={4}
            onChange={handleChange}
          ></input>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center">
        <h3>Volume: </h3>
        <input
          className="mx-1 w-16 px-2 border-b border-black"
          name="volume"
          type="text"
          onChange={handleVolume}
          defaultValue="1000"
          maxLength={5}
        ></input>
        <p>ml</p>
      </div>
      <h1 className="p-4 font-bold text-lg">Dilution Rate Visual Calculator</h1>
    </div>
  );
}

export default App;
