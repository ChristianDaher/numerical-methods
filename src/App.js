import { useState } from "react";
import NewtonRaphson from "./components/newton-raphson.jsx";
import Muller from "./components/muller.jsx";

function App() {
  const methods = ["Newton Raphson", "Muller"];
  const [selectedMethod, setSelectedMethod] = useState(methods[0]);
  const [equation, setEquation] = useState("");
  const [x0, setx0] = useState(0);
  const [x1, setx1] = useState(0);
  const [x2, setx2] = useState(0);
  const [iterations, setIterations] = useState(3);
  const [showResult, setShowResult] = useState(false);

  function changeMethod(event) {
    setShowResult(false);
    setSelectedMethod(event.target.value);
  }

  function changeEquation(event) {
    setShowResult(false);
    setEquation(event.target.value);
  }

  function submit(event) {
    event.preventDefault();
    setShowResult(true);
  }

  return (
    <div className="App font-math min-h-screen bg-zinc-100 flex justify-center py-8">
      <div className="w-3/4 bg-white p-4 rounded-lg shadow-lg">
        <h1 className="text-center text-2xl text-blue-500 mb-8">
          NUMERICAL METHODS
        </h1>
        <div className="flex gap-8 justify-center items-center mb-4">
          <label htmlFor="method">Pick a method: </label>
          <select name="method" onChange={changeMethod}>
            {methods.map((method, index) => (
              <option key={index} value={method}>
                {index + 1}. {method}
              </option>
            ))}
          </select>
        </div>
        <p className="text-center text-gray-500">
          Calculating the root of the equation using the
          <span className="text-blue-500"> {selectedMethod} </span>method
        </p>
        <form
          onSubmit={submit}
          className="flex flex-col gap-6 my-4 w-3/4 mx-auto"
        >
          <div className="flex items-center gap-2">
            <label htmlFor="equation" className="basis-1/4">
              f(x) =
            </label>
            <input
              required
              autoFocus
              type="text"
              id="equation"
              className="border border-gray-300 rounded-lg p-2 basis-1/2"
              value={equation}
              onInput={changeEquation}
            />
          </div>
          {showResult}
          <div className="flex items-center gap-2">
            <label htmlFor="iterations" className="basis-1/4">
              Iterations :
            </label>
            <input
              required
              type="number"
              id="iterations"
              className="border border-gray-300 rounded-lg p-2 basis-1/2"
              value={iterations}
              min={1}
              max={10}
              onInput={(event) => setIterations(Number(event.target.value))}
            />
          </div>
          {selectedMethod === "Newton Raphson" && (
            <div className="flex items-center gap-2">
              <label htmlFor="x0" className="basis-1/4">
                x<sub>0</sub> :
              </label>
              <input
                required
                type="number"
                id="x0"
                className="border border-gray-300 rounded-lg p-2 basis-1/2"
                value={x0}
                onInput={(event) => setx0(Number(event.target.value))}
              />
            </div>
          )}
          {selectedMethod === "Muller" && (
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <label htmlFor="x0">
                  x<sub>0</sub> :{" "}
                </label>
                <input
                  required
                  type="number"
                  id="x0"
                  className="border border-gray-300 rounded-lg p-2"
                  value={x0}
                  onInput={(event) => setx0(Number(event.target.value))}
                />
              </div>
              <div className="flex items-center gap-4">
                <label htmlFor="x1">
                  x<sub>1</sub> :{" "}
                </label>
                <input
                  required
                  type="number"
                  id="x1"
                  className="border border-gray-300 rounded-lg p-2"
                  value={x1}
                  onInput={(event) => setx1(Number(event.target.value))}
                />
              </div>
              <div className="flex items-center gap-4">
                <label htmlFor="x2">
                  x<sub>2</sub> :{" "}
                </label>
                <input
                  required
                  type="number"
                  id="x2"
                  className="border border-gray-300 rounded-lg p-2"
                  value={x2}
                  onInput={(event) => setx2(Number(event.target.value))}
                />
              </div>
            </div>
          )}
          <button className="block mx-auto text-white bg-blue-500 px-6 py-2 rounded-lg hover:bg-blue-600 focus:bg-blue-600 transition">
            Solve
          </button>
        </form>
        {selectedMethod === "Newton Raphson" && (
          <p className="my-4 text-gray-500">
            x = x<sub>0</sub> - f(x<sub>0</sub>) / f'(x<sub>0</sub>)
          </p>
        )}
        {selectedMethod === "Muller" && (
          <div className="flex items-center gap-4 flex-wrap text-gray-500 my-4">
            <p>
              x<sub>3</sub> = x<sub>2</sub> + (-2c) / (b &#177; &#8730;(b
              <sup>2</sup>-4ac))
            </p>
            <span>||</span>
            <p>
              a = (&delta;<sub>2</sub> - &delta;<sub>1</sub>) / (h
              <sub>2</sub> - h<sub>1</sub>)
            </p>
            <span>||</span>
            <p>
              b = ah<sub>2</sub> + &delta;<sub>2</sub>
            </p>
            <span>||</span>
            <p>
              {" "}
              c = f(x<sub>2</sub>){" "}
            </p>
            <span>||</span>
            <p>
              h<sub>2</sub> = x<sub>2</sub> - x<sub>1</sub>
            </p>
            <span>||</span>
            <p>
              &delta;<sub>2</sub> = (f(x<sub>2</sub>) - f(x<sub>1</sub>)) / h
              <sub>2</sub>
            </p>
          </div>
        )}
        {showResult && selectedMethod === "Newton Raphson" && (
          <NewtonRaphson equation={equation} x0={x0} iterations={iterations} />
        )}

        {showResult && selectedMethod === "Muller" && (
          <Muller
            equation={equation}
            x0={x0}
            x1={x1}
            x2={x2}
            iterations={iterations}
          />
        )}
      </div>
    </div>
  );
}

export default App;
