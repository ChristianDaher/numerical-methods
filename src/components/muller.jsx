import { parse } from "mathjs";
import { formatNumber } from "../helpers";

const Muller = ({ equation, x0, x1, x2, iterations }) => {
  let results = [];
  let f;
  try {
    f = parse(equation);
  } catch (e) {
    results.push("Invalid equation");
  }

  if (f !== undefined) {
    for (let i = 0; i < iterations; i++) {
      const fx0 = f.evaluate({ x: x0 });
      const fx1 = f.evaluate({ x: x1 });
      const fx2 = f.evaluate({ x: x2 });
      const h1 = x1 - x0;
      const h2 = x2 - x1;
      const d1 = (fx1 - fx0) / h1;
      const d2 = (fx2 - fx1) / h2;
      const a = (d2 - d1) / (h2 + h1);
      const b = a * h2 + d2;
      const c = fx2;
      const radical = Math.sqrt(b * b - 4 * a * c);
      const denominator = b < 0 ? b - radical : b + radical;
      const x = x2 - (2 * c) / denominator;
      let relativeError = i > 0 ? Math.abs((x - x0) / x) * 100 : null;
      results.push({
        iteration: i + 1,
        x0,
        fx0,
        x1,
        fx1,
        x2,
        fx2,
        h1,
        h2,
        d1,
        d2,
        a,
        b,
        c,
        x,
        relativeError,
      });
      x0 = x1;
      x1 = x2;
      x2 = x;
      if (isNaN(fx0)) {
        results.push("f(x0) is NaN");
        break;
      } else if (isNaN(fx1)) {
        results.push("f(x1) is NaN");
        break;
      } else if (isNaN(fx2)) {
        results.push("f(x2) is NaN");
        break;
      } else if (h1 === 0) {
        results.push("h1 is 0");
        break;
      } else if (h2 === 0) {
        results.push("h2 is 0");
        break;
      } else if (h2 + h1 === 0) {
        results.push("h2 + h1 is 0");
        break;
      } else if (denominator === 0) {
        results.push("denominator is 0");
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
              x<sub>1</sub>
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-blue-500 tracking-wider">
              f(x<sub>1</sub>)
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-blue-500 tracking-wider">
              x<sub>2</sub>
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-blue-500 tracking-wider">
              f(x<sub>2</sub>)
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-blue-500 tracking-wider">
              h1
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-blue-500 tracking-wider">
              h2
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-blue-500 tracking-wider">
              d1
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-blue-500 tracking-wider">
              d2
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-blue-500 tracking-wider">
              a
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-blue-500 tracking-wider">
              b
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-blue-500 tracking-wider">
              c
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
                  {formatNumber(result.x1)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatNumber(result.fx1)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatNumber(result.x2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatNumber(result.fx2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatNumber(result.h1)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatNumber(result.h2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatNumber(result.d1)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatNumber(result.d2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatNumber(result.a)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatNumber(result.b)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatNumber(result.c)}
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
export default Muller;
