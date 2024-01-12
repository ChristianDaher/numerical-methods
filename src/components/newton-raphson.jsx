import { parse, derivative } from "mathjs";
import { formatNumber } from "../helpers";

const NewtonRaphson = ({ equation, x0, iterations }) => {
  const f = parse(equation);
  const fPrime = derivative(f, "x");

  let results = [];
  for (let i = 0; i < iterations; i++) {
    const fx0 = f.evaluate({ x: x0 });
    const fPrimex0 = fPrime.evaluate({ x: x0 });
    let x = x0 - fx0 / fPrimex0;
    let relativeError = i > 0 ? Math.abs((x - x0) / x) * 100 : 0;
    results.push({
      iteration: i + 1,
      x0,
      fx0,
      fPrimex0,
      x,
      relativeError,
    });
    x0 = x;
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
              &epsilon;<sub>x<sub>0</sub></sub>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {results.map((result, index) => (
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
                {formatNumber(result.relativeError)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewtonRaphson;
