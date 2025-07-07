'use client'

import Navbar from "@/components/Navbar";
import { TabelaDePontos } from "@/components/TabelaDePontos";

export default function EspelhoPonto() {
  return (
    <div>
      <Navbar />
      <main className="p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-primary">Espelho de Ponto</h1>
          <p className="text-base-content">
            Veja abaixo seus registros de ponto por período:
          </p>
        </div>

        {/* Nova Tabela com filtro */}
        <TabelaDePontos />
      </main>
    </div>
  );
}
