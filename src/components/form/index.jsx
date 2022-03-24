import { useState } from "react";
import dayjs from "dayjs";
import "./styles.scss";

export const Form = () => {
  const [days, setDays] = useState(0);
  const [prevCases, setPrevCases] = useState([]);

  const mockCases = [
    {
      day: "20/03/2024",
      cases: 1023616,
    },
    {
      day: "21/03/2024",
      cases: 1379315,
    },
    {
      day: "22/03/2024",
      cases: 1998171,
    },
    {
      day: "23/03/2024",
      cases: 1643842,
    },
  ];

  const upDown = () => {
    const twoDaysAgo = Math.round(
      mockCases.slice(-2).reduce((pre, cur) => pre + cur.cases, 0) / 2
    );
    const fourDaysAgo = Math.round(
      mockCases.slice(-4, -2).reduce((pre, cur) => pre + cur.cases, 0) / 2
    );
    console.log(twoDaysAgo);
    if (twoDaysAgo > fourDaysAgo) {
      return Math.round(twoDaysAgo * 1.02);
    }
    return Math.round(twoDaysAgo * 0.98);
  };

  const predict = (days) => {
    const data = [];
    for (let item = 1; item <= days; item++) {
      const cases = upDown();
      var day = dayjs().add(item, "Days").format("DD/MM/YYYY");
      data.push({ cases, day });
      mockCases.push({ cases, day });
    }
    setPrevCases(data);
  };

  return (
    <div className="container-form">
      <h1>Previsão de casos para os próximos dias</h1>
      <form>
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />
        <button
          type="submit"
          onClick={(e) => {
            predict(days);
            e.preventDefault();
          }}
        >
          Click
        </button>
      </form>
      <table>
        <tr>
          <th></th>
          <th>Dia</th>
          <th>Casos</th>
        </tr>
        {prevCases.map((item, index) => {
          return (
            <tr>
              <td>{index}</td>
              <td>{item.day}</td>
              <td>
                {item.cases.toLocaleString("pt-BR", {
                  maximumFractionDigits: 2,
                })}
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};
