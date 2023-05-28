import { useEffect, useState } from "react";
import { Fifo } from "./components/Fifo";
import { Plus, Minus, Play, Stop, Pause } from "phosphor-react";
export function App() {
  let remainsTime;
  const [time, setTime] = useState(0);

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const [processos, setProcessos] = useState([
    {
      id: 1,
      tamanho: Math.floor(Math.random() * (100 - 5 + 1)) + 5,
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
  const status = false;

  function handleCreateNewCycle() {
    setStart(true);
  }
  function handlePauseNewCycle() {
    setStart(false);
  }
  useEffect(() => {
    if (start) {
      remainsTime = setInterval(() => {
        setSeconds(seconds + 1);
        if (seconds == 59) {
          setMinutes(minutes + 1);
          setSeconds(0);
        }
      }, 1000);
    }
    return () => clearInterval(remainsTime);
  }, [start, minutes, seconds, remainsTime, status]);

  function handleAddTime() {
    setTime((time) => time + 1);
  }
  function handleRemoveTime() {
    if (time > 0) setTime((time) => time - 1);
  }

  function handleAddProcess() {
    if (processos.length < 10) {
      const newProcess = {
        id: processos.findLast((element) => element.id).id + 1,
        tamanho: Math.floor(Math.random() * (100 - 5 + 1)) + 5,
      };
      setProcessos((state) => [...state, newProcess]);

      //sempre lembrar de clousore
    }
  }

  function reduceHeightProcess(id) {
    const found = processos.find((process) => process.id == id);
    if (found.tamanho > 0) {
      found.tamanho--;
    }
    return found;
  }

  useEffect(() => {
    if (start && reduceHeightProcess(1).tamanho > 0) {
      setInterval(() => {
        //reduceHeightProcess(1);
        console.log("cuzil");
      }, 1000);
    }
    return () => clearInterval();
  }, [start, reduceHeightProcess]);

  function handleRemoveProcess(processoToDelete) {
    const processWithoutDeletedOne = processos.filter((processo) => {
      return processo.id !== processoToDelete;
    });
    setProcessos(processWithoutDeletedOne);
  }

  function handleRestartProcesso() {
    setTime(20);
    setProcessos(...processos);
    setMinutes(0);
    setSeconds(0);
    setStart(false);
    clearInterval(remainsTime);
  }

  return (
    <div className="h-screen bg-zinc-800 text-zinc-50">
      <main className=" flex w-full flex-col items-center  pt-4 text-2xl  ">
        Escalonador de Processos
        <div className="flex gap-5">
          <Play
            size={32}
            color="#dedede"
            weight="bold"
            className="cursor-pointer dark:md:hover:bg-[#1da1f2]"
            onClick={handleCreateNewCycle}
          />
          <Pause
            size={32}
            color="#dedede"
            weight="bold"
            className="cursor-pointer dark:md:hover:bg-[#1da1f2]"
            onClick={handlePauseNewCycle}
          />
          <Stop
            size={32}
            color="#dedede"
            weight="bold"
            className="cursor-pointer dark:md:hover:bg-[#1da1f2]"
            onClick={handleRestartProcesso}
          />
          <Plus
            size={32}
            color="#dedede"
            weight="bold"
            onClick={handleAddProcess}
            className="cursor-pointer dark:md:hover:bg-[#1da1f2]"
          />
          <Minus
            size={32}
            color="#dedede"
            weight="bold"
            //onClick={() => handleRemoveProcess(3)}
            className="cursor-pointer dark:md:hover:bg-[#1da1f2]"
          />
        </div>
        <div className="flex ">
          <span className="px-2">Tempo: </span>{" "}
          <span>{minutes < 10 ? `0${minutes}` : minutes}</span>:
          <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
          <div className="px-4">processos: {processos.length}</div>
        </div>
      </main>
      <Fifo
        adicionarTempo={time}
        removerTempo={handleRemoveTime}
        processos={processos}
      />
    </div>
  );
}

/*
O botão de mais vai ser para acelerar o processo com que diminui o tamanho do processo 
O botão de menos vai ser para diminuir o processo com que diminui o tamanho do processo 




setTimeout(() => {
  console.log("this is the first message"); ---> demora 5 segundos para chamar a função 
}, 5000);

// criar um intervalo 
const myInterval = setInterval(myTimer, 1000);
function myTimer() {
  processos.tamanho --
}

function myStop() {
  clearInterval(myInterval);
}
// criar um intervalo 

if(tamanho == 0){
  myStop();
  chamo a função de delete
}
*/
