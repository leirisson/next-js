import imgTrf1 from '@/assets/img-trf1.webp'
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="w-full max-w-4xl bg-base-200 rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden">

        {/* Lado da Imagem */}
        <div className="w-full md:w-1/2 bg-base-300 flex items-center justify-center p-8">
          <Image src={imgTrf1}
            alt="Logo"
            className="max-w-xs  w-full h-full object-contain" 
          />

        </div>

        {/* Lado do Formulário */}
        <div className="w-full  md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-primary text-center mb-6">
            Acesso ao Sistema
          </h2>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-secondary">Matrícula</span>
            </label>
            <input
              type="text"
              placeholder="Digite sua matrícula"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text text-secondary">Senha</span>
            </label>
            <input
              type="password"
              placeholder="Digite sua senha"
              className="input input-bordered w-full"
            />
          </div>

          <button className="btn btn-primary w-full">Entrar</button>
        </div>

      </div>
    </div>
  );
}
