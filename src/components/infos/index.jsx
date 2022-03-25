import "./styles.scss";

export const Infos = () => {
  return (
    <div className="info">
      <img src={require("./../../assets/mask.png")} alt="mask" />
      <h2>
        Para obter um valor aproximo da taxa de contagio pra os próximos dias,
        digite da caixa de texto acima um valor superior a 0 e um valor menor ou
        igual a 30 para obter os dados.
      </h2>
    </div>
  );
};
