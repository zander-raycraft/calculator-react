
import { useState, useEffect } from 'react'
import './App.css';
import { Helmet } from 'react-helmet'

function App() {
  
    /*Use State funtion [REACT HOOK]*/
    const [text, setText] = useState("");
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    function evaluate(){
      try {
        // eslint-disable-next-line no-eval
        const result = eval(text);
        //Checking to see if it is a decimal
        if(result % 1 === 0){
          setText(result.toString());
        }
        else {
          const decVal = result.toFixed(4);
          setText(decVal.toString());
        }
      } catch (error){
        setText("Error");
      }
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    function addNumber(numStr){
      if(text.length < 12){
        setText(text => 
          text.concat(numStr));
      }
    }

    function clearStr(event){
      setText("");
    }

    

    /*Function for determing what happens when you use the keys*/
    useEffect(() => {
      function keyLogger(event) {
        const key = event.key;
        switch (key) {
          case "0":
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
            addNumber(key);
            break;
          case ".":
            if (text === "" || /\d$/.test(text)) {
              addNumber(key);
            }
            break;
          case "+":
          case "-":
          case "*":
          case "/":
            if (text !== "" && /[0-9]$/.test(text)) {
              addNumber(key);
            }
            break;
          case "Enter":
            if (text !== "" && /[0-9]$/.test(text)) {
              evaluate();
            }
            break;
          default:
            break;
        }
      }
      document.addEventListener("keydown", keyLogger);
      return () => {
        document.removeEventListener("keydown", keyLogger);
      };
    }, [text, addNumber, evaluate]);


  return (

    <div className="App">
      <Helmet>
        <title>React Calculator</title>
      </Helmet>
      <body>
      <title>React Calculator</title>

        <div class="calc-container">
            {text&& <div class="text-container">
                <p> { text } </p>
            </div>}
            <div class="operation-container">
                <button onClick={() => addNumber("+") }>+</button>
                <button onClick={() => addNumber("-") }>-</button>
                <button onClick={() => addNumber("/") }>/</button>
                <button onClick={() => addNumber("*") }>*</button>
            </div>
            <div class="button-container">
                <button onClick={() => addNumber("1") }>1</button>
                <button onClick={() => addNumber("2") }>2</button>
                <button onClick={() => addNumber("3") }>3</button>
                <button onClick={() => addNumber("4") }>4</button>
                <button onClick={() => addNumber("5") }>5</button>
                <button onClick={() => addNumber("6") }>6</button>
                <button onClick={() => addNumber("7") }>7</button>
                <button onClick={() => addNumber("8") }>8</button>
                <button onClick={() => addNumber("9") }>9</button>
                <button onClick={() => addNumber("0") }>0</button>
                <button onClick={() => addNumber(".") }>.</button>
                <button onClick={ clearStr }>Clear</button>
                <button onClick={ evaluate }>=</button>
            </div>
        </div>

    </body>
    </div>
  );
}

export default App;
