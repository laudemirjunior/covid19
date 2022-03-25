import { useState } from "react";
import dayjs from "dayjs";
import "./styles.scss";
import { mockCases } from "../../services/mockCases";

export const Form = () => {
  const [days, setDays] = useState();
  const [prevCases, setPrevCases] = useState([]);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  const worldPopulation = 8000000000;
  const vaccinated = 5000000000;
  const totalCases = 500000000;
  let possible = worldPopulation - vaccinated - totalCases;
  const exponentialRate = 0.0121;

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
      let newCases = Math.round(
        twoDaysAgo * (1 + Number(infectionRate) + exponentialRate)
      );
      possible -= newCases;
      return newCases;
    }
    let newCases = Math.round(
      twoDaysAgo * (1 - Number(infectionRate) - exponentialRate)
    );
    possible -= newCases;
    return newCases;
  };

  const predict = (days) => {
    if (days === 0 || !days || days > 30) {
      return setError("O valor de dias deve ser superior 0 e menor que 30");
    }
    const data = [];
    for (let item = 1; item <= days; item++) {
      const cases = upDown();
      var day = dayjs().add(item, "Days").format("DD/MM/YYYY");
      data.push({ day, cases });
      mockCases.push({ day, cases });
    }
    setError("");
    setPrevCases(data);
  };

  return (
    <div className="container-form">
      <h1>Previsão de casos para os próximos dias</h1>
      <form>
        <label>
          <input
            min="1"
            max="30"
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
      <button onClick={() => setShow(!show)}>Gráficos</button>
      {prevCases.length !== 0 ? (
        <>
          <table>
            <tr>
              <th>Dia</th>
              <th>Data</th>
              <th>Casos</th>
            </tr>
            {prevCases.map((item, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
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
          {show && (
            <div className="graphic">
              <button onClick={() => setShow(!show)}>Fechar</button>
              <div className="box">
                {prevCases.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="bar"
                      style={{
                        height: `${Number(item.cases) / 10000}px`,
                      }}
                    >
                      <h5>{item.day}</h5>
                      <h3>
                        {item.cases.toLocaleString("pt-BR", {
                          maximumFractionDigits: 2,
                        })}{" "}
                        casos
                      </h3>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="info">
          <img src={require("./../../assets/mask.png")} alt="mask" />
          <h2>
            Para obter um valor aproximo da taxa de contagio pra os próximos
            dias, digite da caixa de texto acima um valor superior a 0 e um
            valor menor ou igual a 30 para obter os dados.
          </h2>
        </div>
      )}
    </div>
  );
};
