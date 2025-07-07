interface Props {
  dia: string;
  entrada: string;
  saidaAlmoco: string;
  retornoAlmoco: string;
  fim: string;
}

export default function CardRegistro({ dia, entrada, saidaAlmoco, retornoAlmoco, fim }: Props) {
  return (
    <div className="card bg-base-200 shadow-sm">
      <div className="card-body">
        <h3 className="card-title text-secondary">{dia}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
          <p><span className="font-semibold text-primary">Entrada:</span> {entrada}</p>
          <p><span className="font-semibold text-primary">Saída almoço:</span> {saidaAlmoco}</p>
          <p><span className="font-semibold text-primary">Retorno:</span> {retornoAlmoco}</p>
          <p><span className="font-semibold text-primary">Saída:</span> {fim}</p>
        </div>
      </div>
    </div>
  );
}
