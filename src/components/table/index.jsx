import "./styles.scss";

export const Table = ({ prevCases, show, setShow }) => {
  return (
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
  );
};
