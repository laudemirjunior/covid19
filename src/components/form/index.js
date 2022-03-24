import { useState } from "react";
import { mockCases } from "../../services/mockCases";

export const Form = () => {
  const [days, setDays] = useState(0);

  const predict = (days) => {
    const data = [];
    for (let i = 1; i <= days; i++) {
      const cases =
        mockCases.slice(-7).reduce((pre, cur) => pre + cur.cases, 0) / 7;
      const day = new Date();
      data.push({ cases, day });
      mockCases.push({ cases, day });
    }
    return data;
  };

  return (
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
  );
};
