import { useState } from 'react';
import { Separator } from '../separator/separator';

interface FormProps {
  encontrado: number;
  onPeriodoChange: (periodo: string) => void;
  onFilterSubmit: () => void;
  onClearFilter: () => void;
}

export function Form({ encontrado, onPeriodoChange, onFilterSubmit, onClearFilter }: FormProps) {
  const [periodo, setPeriodo] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedPeriod = event.target.value;
    setPeriodo(selectedPeriod);
    onPeriodoChange(selectedPeriod); // Atualize o estado do período no componente pai
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onFilterSubmit(); // Chame a função de filtro quando o formulário for enviado
  };

  const handleClear = () => {
    setPeriodo('');
    onClearFilter(); // Limpe o filtro
  };

  return (
    <div className="pt-10">
      <span className="flex items-center gap-2">
        <img src="./assets/icon-hour.png" className="h-5" />
        Horário
      </span>
      <p className="py-5 text-2xl pm text-zinc-700">Qual período quer treinar?</p>
      <Separator />

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col pt-5 space-y-4">
          <div className="flex justify-between">
            <label>
              <input type="radio" name="periodo" value="manha" checked={periodo === 'manha'} onChange={handleChange} />
              Manhã
            </label>
            <p>06:00 às 12:00</p>
          </div>
          <Separator />
          <div className="flex justify-between">
            <label>
              <input type="radio" name="periodo" value="tarde" checked={periodo === 'tarde'} onChange={handleChange} />
              Tarde
            </label>
            <p>12:01 às 18:00</p>
          </div>
          <Separator />

          <div className="flex justify-between">
            <label>
              <input type="radio" name="periodo" value="noite" checked={periodo === 'noite'} onChange={handleChange} />
              Noite
            </label>
            <p>18:01 às 23:00</p>
          </div>
          <Separator />
        </div>
        <div className="flex justify-between pt-10">
          <label className="flex gap-2">
            <input type="checkbox" value="closed" />
            Exibir unidades fechadas
          </label>
          <p>Resultados encontrados: {encontrado}</p>
        </div>
        <div className="flex items-center justify-center gap-2 pt-10">
          <button type="submit" className="py-4 bg-yellow-400 w-80">
            Encontrar unidade
          </button>
          <button type="button" className="py-4 bg-transparent border-2 border-gray-300 w-80" onClick={handleClear}>
            Limpar
          </button>
        </div>
      </form>
    </div>
  );
}
