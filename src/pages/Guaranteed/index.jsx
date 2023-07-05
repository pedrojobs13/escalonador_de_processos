import { useEffect, useState } from "react";
import { useContext } from "react";
import { TimeContext } from "../../contexts/TimeContext";

export function Guaranteed() {
  const {
    start,
    handleRemoveProcess,
    handleAddTime,
    handleRemoveTime,
    processos,
    time,
    setIsTicketTrue,
    setIsLotteryIsTrue,
    setIsFairShareTrue
  } = useContext(TimeContext);

  const [deleteProcessPrimeiro, setDeleteProcessPrimeiro] = useState(false);

  const [secondsRound, setSecondsRound] = useState(0);
  const prioridades = {
    4: 20,
    3: 15,
    2: 10,
    1: 5,
  };
  useEffect(() => {
    setIsTicketTrue(true);
    setIsLotteryIsTrue(false)
    setIsFairShareTrue(false)
  }, []);

  let remindsHeightProcess;
  let remindsTimeFromRound;


  useEffect(() => {
    if (start) {
      remindsHeightProcess = setInterval(() => {
        processos.forEach((process) => {
          if (process.tamanho <= 0) {
            setDeleteProcessPrimeiro(true);
          }
        });
      }, time);
    }
    return () => clearInterval(remindsHeightProcess);
  }, [
    start,
    remindsHeightProcess,
    setDeleteProcessPrimeiro,
    processos,
    handleRemoveTime,
    handleAddTime,
  ]);


  useEffect(() => {
    if (start) {
      remindsTimeFromRound = setInterval(() => {

        const prioridade = processos[secondsRound]?.prioridade;
        const valor = prioridades[prioridade];

        if (prioridade !== undefined) {
          processos[secondsRound].tamanho = processos[secondsRound].tamanho - valor;
        }

        setSecondsRound((prevSecondsRound) => prevSecondsRound + 1);

        if (secondsRound == 9) {
          setSecondsRound(0);
        }

        processos.forEach((process) => {
          if (process.tamanho <= 0) {
            setDeleteProcessPrimeiro(true);
          }
        });

      }, 1000);
    }
    return () => clearInterval(remindsTimeFromRound);
  }, [start, remindsTimeFromRound, processos, secondsRound, setDeleteProcessPrimeiro]);

  useEffect(() => {
    if (deleteProcessPrimeiro) {
      const processoZero = processos.find((processo) => processo.tamanho <= 0);
      if (processoZero) {
        handleRemoveProcess(processoZero.id);
      }
      setDeleteProcessPrimeiro(false);
      setSecondsRound((prevSecondsRound) => prevSecondsRound - 1)
    }
  }, [deleteProcessPrimeiro, setSecondsRound]);

  return <footer className="flex p-2 px-8 space-y-4 flex-col items-center">
    <h2 className="text-3xl	">Escalonamento Garantido</h2>
    <p className="text-justify text-xl">
      O escalonamento garantido (Guaranteed Scheduling) é um tipo de escalonamento de processos que visa fornecer garantias de tempo de execução para determinados processos ou tarefas em sistemas operacionais em tempo real.
    </p>
    <p className="text-justify text-xl">
      A ideia básica por trás do escalonamento garantido é assegurar que processos críticos ou tarefas com requisitos temporais específicos sejam concluídos dentro de prazos definidos, independentemente do comportamento dos demais processos do sistema. Isso é crucial em sistemas operacionais em tempo real, onde a perda de prazos pode ter consequências graves, como falhas em sistemas de controle, sistemas de segurança ou sistemas embarcados.
    </p>
  </footer>
}
