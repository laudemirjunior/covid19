import { useState } from "react";

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

  const dateNow = () => {
    let date = new Date(),
      day = date.getDate().toString().padStart(2, "0"),
      month = (date.getMonth() + 1).toString().padStart(2, "0"),
      year = date.getFullYear();
    return `${Number(day)}/${month}/${year}`;
  };

  const upDown = () => {
    const twoDaysAgo = Math.round(
      mockCases.slice(-1).reduce((pre, cur) => pre + cur.cases, 0)
    );
    const fourDaysAgo = Math.round(
      mockCases.slice(-2, -1).reduce((pre, cur) => pre + cur.cases, 0)
    );
    console.log(twoDaysAgo);
    if (twoDaysAgo > fourDaysAgo) {
      return Math.round(twoDaysAgo * 1.015);
    }
    return Math.round(twoDaysAgo * 0.995);
  };

  const predict = (days) => {
    const data = [];
    for (let item = 1; item <= days; item++) {
      const cases = upDown();
      const day = dateNow();
      data.push({ cases, day });
      mockCases.push({ cases, day });
    }
    setPrevCases(data);
  };

  return (
    <div>
      <div>
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />
        <button
          type="submit"
          onClick={() => {
            predict(days);
          }}
        >
          Click
        </button>
      </div>
      <div>
        {prevCases.map((item, index) => {
          return (
            <table>
              <td>{String(item.day)}</td>
              <td>{item.cases}</td>
            </table>
          );
        })}
      </div>
    </div>
  );
};
