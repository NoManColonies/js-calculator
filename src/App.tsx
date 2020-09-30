import React, { useState, useCallback, useEffect } from "react";
import Styled from "styled-components";
import CalcButton from "./components/CalcButton";
import "./styles.css";

const CalcFrame = Styled.div`
background-color: #e0e5ec;
box-shadow: -7px -7px 20px 0px #fff9,
                -4px -4px 5px 0px #fff9,
                7px 7px 20px 0px #0002,
                4px 4px 5px 0px #0001;

border-radius: 10px;
width: fit-content;
display: grid;
grid-template-columns: repeat(4, 1fr);
grid-column-gap: 1rem;
grid-row-gap: 1rem;
padding: 0.5rem;
`;

const TextDisplay = Styled.p`
grid-column: 1 / span 4;
background-color: #cfcfcf;
box-shadow: 4px 4px 6px 0 rgba(255,255,255,.5),
                    -4px -4px 6px 0 rgba(116, 125, 136, .2),
                    inset -4px -4px 6px 0 rgba(255,255,255,.5),
                    inset 4px 4px 6px 0 rgba(116, 125, 136, .3);
border-radius: 10px;
    height: 2em;
    font-size: 36px;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    padding-right: 1rem;
    margin: 1rem 0;
    position: relative;

`;

function App() {
  const buttonMapping = [
    ["AC", "+/-", "%", "/"],
    ["1", "2", "3", "*"],
    ["4", "5", "6", "-"],
    ["7", "8", "9", "+"],
    ["0", ".", "=", "C"],
  ];

  const [currentVal, setCurrentVal] = useState(0);
  const [nextVal, setNextVal] = useState(0);
  const [operator, setOperator] = useState("");
  const [isMarkedForResult, setIsMarkedForResult] = useState(false);
  const [result, setResult] = useState(0);
  const [isMarkedForInverse, setIsMarkedForInverse] = useState(false);
  const [isMarkedForFloat, setIsMarkedForFloat] = useState(false);

  const setVal = useCallback(
    (e) => {
      isMarkedForResult && setIsMarkedForResult(false);

      if (!isMarkedForFloat) {
        operator === ""
          ? setCurrentVal(parseInt(currentVal + e.target.value))
          : setNextVal(parseInt(nextVal + e.target.value));
      } else {
        operator === ""
          ? setCurrentVal(
              currentVal +
                parseInt(e.target.value) /
                  Math.pow(
                    10,
                    currentVal.toString().split(".")[1]
                      ? currentVal.toString().split(".")[1].length + 1
                      : 1
                  )
            )
          : setNextVal(
              nextVal +
                parseInt(e.target.value) /
                  Math.pow(
                    10,
                    nextVal.toString().split(".")[1]
                      ? nextVal.toString().split(".")[1].length + 1
                      : 1
                  )
            );
      }
    },
    [currentVal, nextVal, operator, isMarkedForResult, isMarkedForFloat]
  );

  const calculate = useCallback(
    (operator) => {
      if (isMarkedForInverse) {
        setNextVal(nextVal * -1);
        setIsMarkedForInverse(false);
      }
      switch (operator) {
        case "+":
          setResult(currentVal + nextVal);
          break;
        case "-":
          setResult(currentVal - nextVal);
          break;
        case "*":
          setResult(currentVal * nextVal);
          break;
        case "/":
          setResult(currentVal / nextVal);
          break;
        case "%":
          setResult(currentVal % nextVal);
          break;
        default:
      }
    },
    [currentVal, nextVal, isMarkedForInverse]
  );

  const setOpt = useCallback(
    (e) => {
      switch (e.target.value) {
        case "AC":
          setCurrentVal(0);
          setNextVal(0);
          setIsMarkedForResult(false);
          setIsMarkedForInverse(false);
          setIsMarkedForFloat(false);
          setResult(0);
          setOperator("");
          break;
        case "=":
          calculate(operator);
          setIsMarkedForResult(true);
          setCurrentVal(0);
          setNextVal(0);
          setOperator("");
          setIsMarkedForFloat(false);
          break;
        case "+/-":
          setIsMarkedForInverse(true);
          break;
        case ".":
          setIsMarkedForFloat(true);
          break;
        case "C":
          operator === "" ? setCurrentVal(0) : setNextVal(0);
          setIsMarkedForFloat(false);
          setIsMarkedForInverse(false);
          break;
        default:
          if (operator !== "") {
            calculate(operator);
            setIsMarkedForResult(true);
            setCurrentVal(result);
            setNextVal(0);
          }
          if (isMarkedForResult) {
            setCurrentVal(result);
            setNextVal(0);
          }
          if (isMarkedForInverse) {
            setCurrentVal(currentVal * -1);
            setIsMarkedForInverse(false);
          }
          setOperator(e.target.value);
          setIsMarkedForFloat(false);
      }
    },
    [
      currentVal,
      operator,
      isMarkedForInverse,
      isMarkedForResult,
      result,
      calculate,
    ]
  );

  useEffect(() => {
    console.log(currentVal, nextVal, result);
  });

  return (
    <CalcFrame>
      <TextDisplay>
        {Math.abs(
          isMarkedForResult ? result : operator !== "" ? nextVal : currentVal
        )}
      </TextDisplay>
      {buttonMapping.map((row, rowIndex) =>
        row.map((column, columnIndex) => (
          <CalcButton
            children={column}
            onClick={Number.isNaN(parseInt(column)) ? setOpt : setVal}
            value={column}
            column={columnIndex++}
            row={rowIndex++}
          />
        ))
      )}
    </CalcFrame>
  );
}

export default App;
