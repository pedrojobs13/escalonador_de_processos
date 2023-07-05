import { createContext } from "react";
import { useEffect, useState } from "react";

export const TimeContext = createContext();

export function TimeContextProvider({ children }) {
  let remindsTime;
  const [time, setTime] = useState(1000);
  const [isPrioritiesTrue, setIsTicketTrue] = useState(false);
  const [isLotteryIsTrue, setIsLotteryIsTrue] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [getPrioridade, setGetPrioridade] = useState(Calcprioridade());
  const [getNewPrioridade, setGetNewPrioridade] = useState(Calcprioridade());
  const [isFairShareTrue, setIsFairShareTrue] = useState(false)
  const ticketValue = {
    4: 30,
    3: 15,
    2: 8,
    1: 3,
  }
  const [processos, setProcessos] = useState([
    {
      id: 1,
      tamanho: Math.floor(Math.random() * (100 - 5 + 1)) + 5,
      prioridade: getPrioridade,
      ticket: ticketValue[getPrioridade],
    },
    {
      id: 2,
      tamanho: Math.floor(Math.random() * (100 - 5 + 1)) + 5,
      prioridade: getNewPrioridade,
      ticket: ticketValue[getNewPrioridade],
    },
    {
      id: 3,
      tamanho: Math.floor(Math.random() * (100 - 5 + 1)) + 5,
      prioridade: getPrioridade,
      ticket: ticketValue[getPrioridade],
    },
    {
      id: 4,
      tamanho: Math.floor(Math.random() * (100 - 5 + 1)) + 5,
      prioridade: getNewPrioridade,
      ticket: ticketValue[getNewPrioridade],
    },
  ]); // 1 a 4
  const [newProcessos, setNewProcessos] = useState([
    {
      id: 1,
      tamanho: Math.floor(Math.random() * (100 - 5 + 1)) + 5,
      prioridade: getPrioridade,
      ticket: ticketValue[getPrioridade],
    },
    {
      id: 2,
      tamanho: Math.floor(Math.random() * (100 - 5 + 1)) + 5,
      prioridade: getNewPrioridade,
      ticket: ticketValue[getNewPrioridade],
    },
    {
      id: 3,
      tamanho: Math.floor(Math.random() * (100 - 5 + 1)) + 5,
      prioridade: getPrioridade,
      ticket: ticketValue[getPrioridade],
    },
    {
      id: 4,
      tamanho: Math.floor(Math.random() * (100 - 5 + 1)) + 5,
      prioridade: getNewPrioridade,
      ticket: ticketValue[getNewPrioridade],
    },
  ]); // 1 a 4

  const [start, setStart] = useState(false);

  const status = false;

  function handleCreateNewCycle() {
    setStart(true);
  }
  function handlePauseNewCycle() {
    setStart(false);
  }
  useEffect(() => {
    if (start) {
      remindsTime = setInterval(() => {
        setSeconds(seconds + 1);
        if (seconds == 59) {
          setMinutes(minutes + 1);
          setSeconds(0);
        }
        handleAddProcess();
      }, 1000);
    }
    return () => clearInterval(remindsTime);
  }, [start, minutes, seconds, remindsTime, status]);

  function handleAddTime() {
    setTime((time) => time + 100);
  }
  function handleRemoveTime() {
    setTime((time) => time - 100);
  }
  function handleRestartProcesso() {
    setTime(1000);
    setProcessos([
      {
        id: 1,
        tamanho: Math.floor(Math.random() * (100 - 5 + 1)) + 5,
        prioridade: getPrioridade,
        ticket: ticketValue[getPrioridade],
      },
      {
        id: 2,
        tamanho: Math.floor(Math.random() * (100 - 5 + 1)) + 5,
        prioridade: getNewPrioridade,
        ticket: ticketValue[getNewPrioridade],
      },
      {
        id: 3,
        tamanho: Math.floor(Math.random() * (100 - 5 + 1)) + 5,
        prioridade: getPrioridade,
        ticket: ticketValue[getPrioridade],
      },
      {
        id: 4,
        tamanho: Math.floor(Math.random() * (100 - 5 + 1)) + 5,
        prioridade: getNewPrioridade,
        ticket: ticketValue[getNewPrioridade],
      },
    ]);
    setMinutes(0);
    setSeconds(0);
    setStart(false);
    clearInterval(remindsTime);
  }

  function handleRemoveProcess(processoToDelete) {
    const processWithoutDeletedOne = processos.filter((processo) => {
      return processo.id !== processoToDelete;
    });

    setProcessos(processWithoutDeletedOne);
  }
  function handleAddProcess() {
    var processIdDuplicate = processos.map(function (item) {
      return item.id;
    });
    var isDuplicate = processIdDuplicate.some(function (item, idx) {
      return processIdDuplicate.indexOf(item) != idx;
    });


    if (processos.length < 10 && !isDuplicate && !isFairShareTrue) {
      setGetPrioridade(Calcprioridade())
      const newProcess = {
        id: processos.findLast((element) => element.id).id + 1,
        tamanho: Math.floor(Math.random() * (100 - 5 + 1)) + 5,
        prioridade: getPrioridade,
        ticket: ticketValue[getPrioridade],
      };
      setProcessos((state) => [...state, newProcess]);
    }

    // número aletório pra caso de merda -> Math.floor(Math.random() * 65536);

    //sempre lembrar de clousore
  }
  function Calcprioridade() {
    return Math.floor(Math.random() * (4 - 1 + 1)) + 1
  }

  return (
    <TimeContext.Provider
      value={{
        handleCreateNewCycle,
        handlePauseNewCycle,
        handleRestartProcesso,
        handleAddTime,
        handleRemoveTime,
        minutes,
        processos,
        seconds,
        start,
        handleRemoveProcess,
        time,
        isTicketTrue: isPrioritiesTrue,
        setIsTicketTrue,
        isLotteryIsTrue,
        setIsLotteryIsTrue,
        setIsFairShareTrue,
        isFairShareTrue,
        newProcessos
      }}
    >
      {children}
    </TimeContext.Provider>
  );
}
