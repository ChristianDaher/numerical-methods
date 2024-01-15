import { parse, derivative } from "mathjs";
import { formatNumber } from "../helpers";

const NewtonRaphson = ({ equation, x0, iterations }) => {
  let results = [];
  let f;
  let fPrime;
  try {
    f = parse(equation);
    fPrime = derivative(f, "x");
  } catch (e) {
    results.push("Invalid equation");
  }

  if (f !== undefined && fPrime !== undefined) {
    for (let i = 0; i < iterations; i++) {
      const fx0 = f.evaluate({ x: x0 });
      const fPrimex0 = fPrime.evaluate({ x: x0 });
      let x = x0 - fx0 / fPrimex0;
      let relativeError = i > 0 ? Math.abs((x - x0) / x) * 100 : null;
      results.push({
        iteration: i + 1,
        x0,
        fx0,
        fPrimex0,
        x,
        relativeError,
      });
      x0 = x;
      if (isNaN(fx0)) {
        results.push("f(x0) is NaN");
        break;
      } else if (isNaN(fPrimex0)) {
        results.push("f'(x0) is NaN");
        break;
      } else if (fPrimex0 === 0) {
        results.push("f'(x0) is 0");
        break;
      } else if (isNaN(x)) {
        results.push("x is NaN");
        break;
      }
    }
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-blue-500 tracking-wider">
              Iteration
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-blue-500 tracking-wider">
              x<sub>0</sub>
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-blue-500 tracking-wider">
              f(x<sub>0</sub>)
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-blue-500 tracking-wider">
              f'(x<sub>0</sub>)
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-blue-500 tracking-wider">
              x
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-blue-500 tracking-wider">
              &epsilon;
              <sub>
                x<sub>0</sub>
              </sub>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {results.map((result, index) =>
            typeof result === "string" ? (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-red-500">
                  {result}
                </td>
              </tr>
            ) : (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {result.iteration}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatNumber(result.x0)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatNumber(result.fx0)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatNumber(result.fPrimex0)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatNumber(result.x)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {result.relativeError
                    ? `${formatNumber(result.relativeError)}%`
                    : "NaN"}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default NewtonRaphson;
