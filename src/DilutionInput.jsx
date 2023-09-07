import React, { useState, useRef } from "react";

export default function DilutionInput() {
  const [dilutionLeft, setDilutionLeft] = useState(1);
  const [dilutionRight, setDilutionRight] = useState(1);


    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "left") {
            setDilutionLeft(value);
            console.log(dilutionLeft);
        } else {
            setDilutionRight(value);
            console.log(dilutionRight)
        }
    };

  return (
    <div className="border w-fit border-black">
      <input
        name="left"
        className="w-12 p-1 text-right select-text placeholder-slate-300"
        placeholder="1"
        maxLength={4}
        onChange={handleChange}
      ></input>
      <span>:</span>
      <input
        name="right"
        className=" w-12 p-1 text-left placeholder-slate-300"
        placeholder="1"
        maxLength={4}
        onChange={handleChange}
      ></input>
    </div>
  );
}
