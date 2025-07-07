import Navbar from "@/components/Navbar";

export default function Dashboard() {
  return (
    <div>
      <Navbar />
      <main className="p-6">
        <h1 className="text-2xl font-bold text-primary mb-4">Olá, Leirisson 👋</h1>
        <p className="text-base-content mb-6">
          Aqui está o resumo do seu ponto da semana:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1 - Horas Trabalhadas */}
          <div className="card bg-base-200 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-secondary">Horas Trabalhadas</h2>
              <p className="text-4xl font-bold text-primary">38h 30min</p>
              <p className="text-sm text-base-content">Período: 01/07 a 05/07</p>
            </div>
          </div>

          {/* Card 2 - Horas Extras */}
          <div className="card bg-base-200 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-secondary">Horas Extras</h2>
              <p className="text-4xl font-bold text-primary">4h 15min</p>
              <p className="text-sm text-base-content">Aprovadas pelo gestor</p>
            </div>
          </div>

          {/* Card 3 - Faltas */}
          <div className="card bg-base-200 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-secondary">Faltas</h2>
              <p className="text-4xl font-bold text-error">1 dia</p>
              <p className="text-sm text-base-content">Sem justificativa</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
