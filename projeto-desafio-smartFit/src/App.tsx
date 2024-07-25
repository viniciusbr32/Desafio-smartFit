import { useEffect, useState } from 'react';
import { CardsInformations } from './componentes/cardsInformations/CardsInformations';
import { Form } from './componentes/form/Form';
import { Header } from './componentes/Header/Header';
import { Separator } from './componentes/separator/separator';
import { api } from './lib/axios';
import DOMPurify from 'dompurify';

interface Schedule {
  weekdays: string;
  hour: string;
}

interface Gym {
  id: number;
  title: string;
  content: string;
  opened: boolean;
  mask: string;
  towel: string;
  fountain: string;
  locker_room: string;
  schedules?: Schedule[];
}

function App() {
  const [gymsDates, setGymsDates] = useState<Gym[]>([]);
  const [filteredGyms, setFilteredGyms] = useState<Gym[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('');
  const [isFiltering, setIsFiltering] = useState<boolean>(false); // Estado para controle do filtro

  useEffect(() => {
    api.get('/locations.json').then((response) => {
      setGymsDates(response.data.locations);
      setFilteredGyms(response.data.locations); // Exibe todas as unidades inicialmente
    });
  }, []);

  const dateRange: { [key: string]: [string, string] } = {
    manha: ['06:00', '12:00'],
    tarde: ['12:01', '18:00'],
    noite: ['18:01', '23:00'],
  };

  const isWithinPeriod = (hour: string, period: [string, string]): boolean => {
    const [start, end] = period;
    const [hourStart, hourEnd] = hour.split(' às ').map((time) => time.trim());

    if (hourStart <= end && hourEnd >= start) {
      return true;
    }
    return false;
  };

  const handlePeriodoChange = (periodo: string) => {
    setSelectedPeriod(periodo);
  };

  const handleFilterSubmit = () => {
    if (selectedPeriod) {
      const periodRange = dateRange[selectedPeriod];
      const filtered = gymsDates.filter(
        (gym) => gym.schedules && gym.schedules.some((schedule) => isWithinPeriod(schedule.hour, periodRange)),
      );
      setFilteredGyms(filtered);
    } else {
      setFilteredGyms(gymsDates);
    }
    setIsFiltering(true);
  };

  const handleClearFilter = () => {
    setFilteredGyms(gymsDates);
    setIsFiltering(false);
  };

  const maskImages: { [key: string]: string } = {
    required: '/assets/required-mask.png',
    recommended: '/assets/recommended-mask.png',
  };

  const towelImages: { [key: string]: string } = {
    required: '/assets/required-towel.png',
    recommended: '/assets/recommended-towel.png',
  };

  const fountainImages: { [key: string]: string } = {
    not_allowed: '/assets/forbidden-fountain.png',
    partial: '/assets/partial-fountain.png',
  };

  const lockerRoomImages: { [key: string]: string } = {
    allowed: '/assets/required-lockerroom.png',
    closed: '/assets/forbidden-lockerroom.png',
    partial: './assets/partial-lockerroom.png',
  };

  return (
    <>
      <Header />

      <main className="w-full max-w-5xl mx-auto">
        <div className="px-20 py-10">
          <h1 className="text-4xl font-semibold font-Inter text-zinc-800 ">
            REABERTURA <br />
            SMART FIT
          </h1>
          <div className="w-20 h-2 mt-4 bg-zinc-800" />
          <p className="text-base font-normal text-zinc-800 pt-9">
            O horário de funcionamento das nossas unidades está seguindo os decretos de cada município. Por isso,
            confira <br /> aqui se a sua unidade está aberta e as medidas de segurança que estamos seguindo.
          </p>
          <Form
            encontrado={filteredGyms.length}
            onPeriodoChange={handlePeriodoChange}
            onFilterSubmit={handleFilterSubmit}
            onClearFilter={handleClearFilter}
          />
          <CardsInformations />

          <div className="grid w-full grid-cols-3 gap-4 pt-10 ">
            {filteredGyms.length > 0 ? (
              filteredGyms.map((gym, index) => (
                <div key={index} className="px-5 py-5 bg-gray-200 rounded-md">
                  <div>
                    <span className={`text-${gym.opened ? 'green' : 'red'}-500`}>
                      {gym.opened ? 'Aberto' : 'Fechado'}
                    </span>
                    <p className="font-semibold">{gym.title}</p>
                    <div
                      className="text-sm text-gray-400"
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(gym.content) }}
                      style={{ wordBreak: 'break-word' }}
                    />
                    <Separator />
                    {gym.opened && (
                      <div className="flex items-center justify-between gap-2 pt-5">
                        <div className="w-10">
                          <img src={maskImages[gym.mask]} alt="Mask" />
                        </div>
                        <div className="w-10">
                          <img src={towelImages[gym.towel]} alt="Towel" />
                        </div>
                        <div className="w-10">
                          <img src={fountainImages[gym.fountain]} alt="Fountain" />
                        </div>
                        <div className="w-10">
                          <img src={lockerRoomImages[gym.locker_room]} alt="Locker Room" />
                        </div>
                      </div>
                    )}
                  </div>
                  {gym.schedules && gym.opened && gym.schedules.length > 0 ? (
                    gym.schedules.map((schedule, index) => (
                      <div key={index} className="pt-2">
                        <p className="font-semibold">{schedule.weekdays}</p>
                        <p>{schedule.hour}</p>
                      </div>
                    ))
                  ) : (
                    <p>Nenhum horário disponível</p>
                  )}
                </div>
              ))
            ) : (
              <p>carregando</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
