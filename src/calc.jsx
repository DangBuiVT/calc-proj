import React, { useState } from "react";
import "./calc.css";
import sqrt from "./assets/img/square-root-svgrepo-com.svg";
import backarr from "./assets/img/arrow-back-svgrepo-com.svg";

function Calculator() {
  const [displayOn, setDisplayOn] = useState(false);
  const [input, setInput] = useState("");
  const [prevText, setPrevText] = useState("");
  const [numText, setNumText] = useState("");
  const [memVal, setMemVal] = useState(0);
  const maxDigits = 13;

  const handleClick = (value) => {
    if (numText.length >= maxDigits) return;

    if (value === "0" || value === "00") {
      if (numText === "") return;
    }

    if (value === ".") {
      if (numText.includes(".")) return;
      if (numText === "") value = "0.";
    }
    if (value === "×") value = "*";
    else if (value === "÷") value = "/";

    setNumText((prev) => prev + value);
  };

  const stringEval = (expression) => {
    const fixedExpression = expression.replace(/×/g, "*").replace(/÷/g, "/");
    console.log(fixedExpression);
    return new Function(`return ${fixedExpression}`)();
  };

  return (
    <div className="bgr">
      <div className="display">
        <div className={`dsp-text ${!displayOn ? "isOff" : ""}`}>
          <div className={`mem-text ${memVal === 0 ? "noMem" : ""}`}>M</div>
          <div className="prev-calc">{prevText}</div>
          <div className="num-text">{numText || "0"}</div>
        </div>
      </div>
      <div className="on-off">
        <button onClick={() => setDisplayOn(false)} className="lil-btn">
          OFF
        </button>
        <button
          onClick={() => {
            setDisplayOn(true);
            setPrevText("");
            setNumText("");
          }}
          className="lil-btn"
        >
          ON/C
        </button>
      </div>
      <div className="btns">
        <div className="btn-row">
          <button
            onClick={() => setNumText(memVal.toString())}
            className="calc-btn"
          >
            MR
          </button>
          <button
            onClick={() => {
              setMemVal(memVal + Number(`${numText}`));
            }}
            className="calc-btn"
          >
            M+
          </button>
          <button
            onClick={() => {
              setMemVal(memVal - Number(`${numText}`));
            }}
            className="calc-btn"
          >
            M-
          </button>
          <button
            onClick={() => {
              const result = Math.sqrt(Number(numText));
              setNumText(result.toString());
              setPrevText(`√${numText}=${result.toString()}`);
            }}
            className="calc-btn"
          >
            <img src={sqrt} />
          </button>
          <button onClick={() => setNumText("")} className="calc-btn">
            CE
          </button>
        </div>
        <div className="btn-row">
          <button onClick={() => handleClick("7")} className="calc-btn">
            7
          </button>
          <button onClick={() => handleClick("8")} className="calc-btn">
            8
          </button>
          <button onClick={() => handleClick("9")} className="calc-btn">
            9
          </button>
          <button
            onClick={() =>
              setNumText(
                numText.charAt(0) === "-" ? numText.substring(1) : "-" + numText
              )
            }
            className="calc-btn"
          >
            +/-
          </button>
          <button
            onClick={() => setNumText(numText.slice(0, -1))}
            className="calc-btn"
          >
            <img src={backarr} />
          </button>
        </div>
        <div className="btn-row">
          <button onClick={() => handleClick("4")} className="calc-btn">
            4
          </button>
          <button onClick={() => handleClick("5")} className="calc-btn">
            5
          </button>
          <button onClick={() => handleClick("6")} className="calc-btn">
            6
          </button>
          <button
            onClick={() => {
              if (prevText !== "")
                setNumText((prevNumText) => {
                  const result = stringEval(prevText + prevNumText).toString();
                  setPrevText(result + "×");
                  return result;
                });
              setPrevText(numText + "×");
              setNumText("");
            }}
            className="calc-btn"
          >
            ×
          </button>
          <button
            onClick={() => {
              if (prevText !== "")
                setNumText((prevNumText) => {
                  const result = stringEval(prevText + prevNumText).toString();
                  setPrevText(result + "÷");
                  return result;
                });
              setPrevText(numText + "÷");
              setNumText("");
            }}
            className="calc-btn"
          >
            ÷
          </button>
        </div>
        <div className="btn-row">
          <button onClick={() => handleClick("1")} className="calc-btn">
            1
          </button>
          <button onClick={() => handleClick("2")} className="calc-btn">
            2
          </button>
          <button onClick={() => handleClick("3")} className="calc-btn">
            3
          </button>
          <button
            onClick={() => {
              if (prevText !== "")
                setNumText((prevNumText) => {
                  const result = stringEval(prevText + prevNumText).toString();
                  setPrevText(result + "+");
                  return result;
                });
              setPrevText(numText + "+");
              setNumText("");
            }}
            className="calc-btn"
          >
            +
          </button>
          <button
            onClick={() => {
              if (prevText !== "")
                setNumText((prevNumText) => {
                  const result = stringEval(prevText + prevNumText).toString();
                  setPrevText(result + "-");
                  return result;
                });
              setPrevText(numText + "-");
              setNumText("");
            }}
            className="calc-btn"
          >
            -
          </button>
        </div>
        <div className="btn-row">
          <button onClick={() => handleClick("0")} className="calc-btn">
            0
          </button>
          <button onClick={() => handleClick("00")} className="calc-btn">
            00
          </button>
          <button onClick={() => handleClick(".")} className="calc-btn">
            .
          </button>
          <button
            onClick={() => {
              const result = Number(numText) / 100;
              setNumText(result.toString());
              setPrevText(`${numText}%=${result.toString()}`);
            }}
            className="calc-btn"
          >
            %
          </button>
          <button
            onClick={() => {
              setNumText((prevNumText) => {
                if (
                  !isNaN(prevText + prevNumText) &&
                  (prevText + prevNumText).trim() !== ""
                )
                  return prevNumText;
                console.log(prevText + prevNumText);
                const result = stringEval(prevText + prevNumText).toString();
                setPrevText(prevText + prevNumText + "=" + result);
                return result;
              });
            }}
            className="calc-btn"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
