import { useState } from "react";
import dayjs from "dayjs";
import "./styles.scss";
import { Table } from "../table/index";
import { Infos } from "../infos";
import { mockCases, resetArray } from "../../services/mockCases";

export const Form = () => {
  const worldPopulation = 8000000000;
  const vaccinated = 5000000000;
  const totalCases = 500000000;
  const [days, setDays] = useState(null);
  const [prevCases, setPrevCases] = useState([]);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [possible, setPossible] = useState(
    worldPopulation - vaccinated - totalCases
  );

  let infectionRate = (
    possible /
    (mockCases.slice(-7).reduce((pre, cur) => pre + cur.cases, 0) / 7) /
    100000
  ).toFixed(5);

  const upDown = () => {
    const twoDaysAgo = Math.round(
      mockCases.slice(-2).reduce((pre, cur) => pre + cur.cases, 0) / 2
    );
    const fourDaysAgo = Math.round(
      mockCases.slice(-4, -2).reduce((pre, cur) => pre + cur.cases, 0) / 2
    );
    if (twoDaysAgo > fourDaysAgo) {
      let newCases = Math.round(twoDaysAgo * (1 + Number(infectionRate)));
      setPossible(possible - newCases);
      return newCases;
    }
    let newCases = Math.round(twoDaysAgo * (1 - Number(infectionRate)));
    setPossible(possible - newCases);
    return newCases;
  };

  const predict = (days) => {
    if (days < 1 || days > 30) {
      return setError("O valor de dias deve ser superior 0 e menor que 30");
    }
    const data = [];
    for (let item = 1; item <= days; item++) {
      let cases = upDown();
      let day = dayjs()
        .add(item - 1, "Days")
        .format("DD/MM/YYYY");
      let newCases = { day, cases };
      data.push(newCases);
      mockCases.push(newCases);
    }
    setError("");
    setPrevCases(data);
    setDays("");
    resetArray();
  };

  return (
    <div className="container-form">
      <h1 data-testid="container-form">
        Previsão de casos de COVID-19 para os próximos dias
      </h1>
      <form>
        <label>
          <input
            data-testid="content-input"
            min={1}
            max={30}
            type="number"
            required
            value={days}
            onChange={(e) => setDays(e.target.value)}
            placeholder="Digite a quantidade de dias..."
          />
          <span>{error}</span>
        </label>
        <button
          className="complexRadius"
          type="submit"
          onClick={(e) => {
            predict(days);
            e.preventDefault();
          }}
        >
          Calcular
        </button>
      </form>
      {prevCases.length !== 0 ? (
        <>
          <button onClick={() => setShow(!show)}>Gráficos</button>
          <Table prevCases={prevCases} show={show} setShow={setShow} />
        </>
      ) : (
        <Infos />
      )}
    </div>
  );
};
