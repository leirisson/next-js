'use client'

import { useCallback, useEffect, useState } from 'react'
import type { RegistroPonto } from '@/interfaces/RegistroPonto'


const meses = [
  { value: '01', label: 'Janeiro' },
  { value: '02', label: 'Fevereiro' },
  { value: '03', label: 'Março' },
  { value: '04', label: 'Abril' },
  { value: '05', label: 'Maio' },
  { value: '06', label: 'Junho' },
  { value: '07', label: 'Julho' },
  { value: '08', label: 'Agosto' },
  { value: '09', label: 'Setembro' },
  { value: '10', label: 'Outubro' },
  { value: '11', label: 'Novembro' },
  { value: '12', label: 'Dezembro' },
]

export function TabelaDePontos() {
  const [dados, setDados] = useState<RegistroPonto[]>([])
  const [mes, setMes] = useState('01')
  const [ano, setAno] = useState('2025')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Função para buscar registros com useCallback para evitar re-renders desnecessários
  const buscarRegistros = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
        // http://localhost:3333/api/v1/espelho/resgatar-espelho-diario-mes/65717422253/01-2025
      const response = await fetch(
        `http://localhost:3333/api/v1/espelho/resgatar-espelho-diario-mes/65717422253/${mes}-${ano}`,
      )

      // Verificar se a resposta é válida
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`)
      }

      // Verificar se o conteúdo é JSON
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Resposta não é um JSON válido')
      }

      const result = await response.json()
      console.log('Dados recebidos:', result.data)

      // Verificar se os dados existem na estrutura esperada
      if (result) {
        setDados(result.data)
      } else {
        console.warn('Estrutura de dados inesperada:', result)
        setDados([])
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
      console.error('Erro ao buscar dados:', error)
      setError(`Falha ao carregar dados: ${errorMessage}`)
      setDados([])
    } finally {
      setLoading(false)
    }
  }, [mes, ano]) // Dependências corretas: buscarRegistros será recriada apenas se mes ou ano mudarem

  // useEffect para chamar buscarRegistros sempre que ela mudar (devido a mes ou ano)
  useEffect(() => {
    buscarRegistros()
  }, [buscarRegistros])

  // Função para justificar ponto
  const justificarPonto = useCallback((dia: string) => {
    const justificativa = prompt(`Justificando ponto da data: ${dia}`)
    const justificativaFinal = justificativa || 'Justificativa não informada'
    alert(`Justificativa: ${justificativaFinal}`)
  }, []) // Sem dependências, pois não usa estados do componente

  // Componente JSX
  return (
    <div className="space-y-6">
      {/* Filtro por mês e ano */}
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="label">
            <span className="label-text">Mês</span>
          </label>
          <select
            value={mes}
            onChange={(e) => setMes(e.target.value)}
            className="select select-bordered"
            disabled={loading}
          >
            {meses.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">
            <span className="label-text">Ano</span>
          </label>
          <input
            type="number"
            value={ano}
            onChange={(e) => setAno(e.target.value)}
            className="input input-bordered w-28"
            disabled={loading}
          />
        </div>

        <div>
          <button
            onClick={buscarRegistros}
            className={`btn btn-primary ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Carregando...' : 'Buscar'}
          </button>
        </div>
      </div>

      {/* Exibição de erro */}
      {error && (
        <div className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Tabela */}
      <div className="overflow-x-auto bg-base-100 rounded-xl shadow-lg p-4">
        <table className="table table-zebra w-full">
          <thead className="bg-primary text-white">
            <tr>
              <th>Dia</th>
              <th>1ª Entrada</th>
              <th>1ª Saída</th>
              <th>2ª Entrada</th>
              <th>2ª Saída</th>
              <th>Crédito</th>
              <th>Débito</th>
              <th>Normais</th>
              <th>Extras</th>
              <th>Trabalhadas</th>
              <th>Saldo</th>
              <th>Obs</th>
              <th>Status</th>
              <th>Motivo</th>
            </tr>
          </thead>

          <tbody>
            {dados.map((item, index) => (
              <tr key={`${item.diaDoMes}-${index}`} className="hover">
                <td>{item.diaDoMes}</td>
                <td>{item.primeiraEntrada || '—'}</td>
                <td>{item.primeiraSaida || '—'}</td>
                <td>{item.segundaEntrada || '—'}</td>
                <td>{item.segundaSaida || '—'}</td>
                <td>{item.credito}</td>
                <td>{item.debito}</td>
                <td>{item.horasNormais}</td>
                <td>{item.horasExtras}</td>
                <td>{item.horasTrabalhadas}</td>
                <td
                  className={`font-semibold ${
                     String(item.saldo).includes('-') ? 'text-red-500' : 'text-green-500'
                  }`}
                >
                  {item.saldo}
                </td>
                <td className="italic text-sm text-gray-500">{item.observacoes}</td>
                <td>
                  <span
                    className={`badge ${
                      item.status === 'Presente'
                        ? 'badge-success'
                        : item.status === 'Ausente'
                          ? 'badge-error'
                          : 'badge-warning'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td>
                  {item.motivoReajuste ? (
                    <span className="text-sm">{item.motivoReajuste}</span>
                  ) : (
                    <button
                      onClick={() => justificarPonto(item.diaDoMes)}
                      className="btn btn-xs btn-outline btn-primary"
                    >
                      Justificar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Estados da tabela */}
        {loading && (
          <div className="flex items-center justify-center h-40">
            <div className="loading loading-spinner loading-lg"></div>
            <p className="ml-4 text-gray-500">Carregando dados...</p>
          </div>
        )}

        {!loading && dados.length === 0 && !error && (
          <div className="flex items-center justify-center h-40">
            <p className="text-gray-500">Nenhum registro encontrado.</p>
          </div>
        )}
      </div>
    </div>
  )
}