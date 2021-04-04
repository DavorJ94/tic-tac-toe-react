import "./App.css";
import React, { useState, useEffect } from "react";
import firstStateExists from "./checkCurrentState";
import checkCurrentElementCount from "./checkCurrentElements";
import checkIfOverGame from "./checkIfOver";
import buttonStateXandO from "./buttonStateXandO";
import logoImg from "./tictactoelogo.gif";

function App() {
  const INITIAL_STATE = {
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
  };
  const [allElements, setAllElements] = useState(INITIAL_STATE);
  const [xElements, setXElements] = useState([]);
  const [oElements, setOElements] = useState([]);
  const [currentElement, setCurrentElement] = useState("X");
  const [buttonState, setButtonState] = useState([]);
  const [winner, setWinner] = useState("");
  const [addButtonState, setAddButtonState] = useState(true);

  useEffect(() => {
    if (firstStateExists(allElements) && addButtonState) {
      setButtonState((prevState) => [...prevState, allElements]);
    }
    const [over, winnerElement] = checkIfOverGame(xElements, oElements);
    if (over) setWinner(winnerElement);
    else setWinner("");
  }, [allElements, addButtonState, oElements, xElements]);

  const handleFieldClick = (e) => {
    const [over, winnerElement] = checkIfOverGame(xElements, oElements);
    if (!over) {
      setAddButtonState(true);
      setWinner("");
      const currentElementCount = checkCurrentElementCount(allElements);
      if (currentElementCount !== -1)
        setButtonState((prevState) =>
          prevState.slice(0, currentElementCount + 1)
        );
      else setButtonState(() => []);
      const currentIndex = e.target.getAttribute("name");
      if (!Object.values(allElements)[currentIndex]) {
        setAllElements((prevElements) => ({
          ...prevElements,
          [currentIndex]: currentElement,
        }));

        if (currentElement === "X") {
          setXElements((prevElements) => [
            ...prevElements,
            parseInt(currentIndex),
          ]);
          setCurrentElement(() => "O");
        } else {
          setOElements((prevElements) => [
            ...prevElements,
            parseInt(currentIndex),
          ]);
          setCurrentElement(() => "X");
        }
      }
    } else setWinner(winnerElement);
  };

  const allFields = Object.values(allElements).map((field, index) => {
    // eslint-disable-next-line
    const [over, winnerElement, includedElements] = checkIfOverGame(
      xElements,
      oElements
    );
    return (
      <div
        className={
          over && includedElements.includes(index)
            ? "field winningField"
            : "field"
        }
        name={index}
        key={index}
        onClick={handleFieldClick}
      >
        {field}
      </div>
    );
  });

  const handleReset = () => {
    setAllElements(INITIAL_STATE);
    setCurrentElement("X");
    setWinner("");
    const [modifiedXElements, modifiedOElements] = buttonStateXandO(
      xElements,
      oElements,
      INITIAL_STATE
    );
    setXElements(() => modifiedXElements);
    setOElements(() => modifiedOElements);
  };

  const handleButtonClick = (e) => {
    setAddButtonState(false);
    const currentIndex = e.target.getAttribute("name");
    setAllElements(() => buttonState[currentIndex]);
    const setXOrO = currentIndex % 2;
    if (setXOrO === 1) setCurrentElement("X");
    else setCurrentElement("O");
    const [modifiedXElements, modifiedOElements] = buttonStateXandO(
      xElements,
      oElements,
      buttonState[currentIndex]
    );
    setXElements(() => modifiedXElements);
    setOElements(() => modifiedOElements);
  };

  return (
    <div className="App">
      <img className="logo-image" src={logoImg} alt="tic-tac-toe logo" />
      {winner ? (
        <p className="message winnerMessage">Winner: {winner}</p>
      ) : (
        <p className="message nextPlayerMessage">
          Next player: {currentElement}
        </p>
      )}
      <div className="btnTableContainer">
        <div className="table">{allFields}</div>
        <div className="buttonContainer">
          <button className="buttonTime" name="reset" onClick={handleReset}>
            Game start
          </button>
          {buttonState.map((buttonData, index) => {
            return (
              <button
                className="buttonTime"
                name={index}
                key={index}
                data-state={buttonData}
                onClick={handleButtonClick}
              >
                Move #{index + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
