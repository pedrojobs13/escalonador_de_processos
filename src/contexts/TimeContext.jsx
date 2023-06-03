import { createContext } from "react";
import { useContext, useEffect, useState } from "react";

export const TimeContext = createContext();

export function TimeContextProvider({ children }) {
  let remindsTime;
  const [time, setTime] = useState(1000);

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const [processos, setProcessos] = useState([
    {
      id: 1,
      tamanho: 2,
    },
    {
      id: 2,
      tamanho: Math.floor(Math.random() * (100 - 5 + 1)) + 5,
    },
    {
      id: 3,
      tamanho: Math.floor(Math.random() * (100 - 5 + 1)) + 5,
    },
  ]); // 1 a 4
  const [start, setStart] = useState(false);
  const [accessProcess, setAccessProcess] = useState("FIFO");
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
        tamanho: 2,
      },
      {
        id: 2,
        tamanho: Math.floor(Math.random() * (100 - 5 + 1)) + 5,
      },
      {
        id: 3,
        tamanho: Math.floor(Math.random() * (100 - 5 + 1)) + 5,
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
    if (processos.length < 10) {
      const newProcess = {
        id: processos.findLast((element) => element.id).id + 1,
        tamanho: Math.floor(Math.random() * (100 - 5 + 1)) + 5,
      };
      setProcessos((state) => [...state, newProcess]);
    }
    //sempre lembrar de clousore
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
        time
      }}
    >
      {children}
    </TimeContext.Provider>
  );
}
