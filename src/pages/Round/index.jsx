import { useEffect, useState } from "react";
import { useContext } from "react";
import { TimeContext } from "../../contexts/TimeContext";

export function Round() {
  const {
    start,
    handleRemoveProcess,
    handleAddTime,
    handleRemoveTime,
    processos,
    time,
    setIsTicketTrue,
    setIsFairShareTrue
  } = useContext(TimeContext);
  const [deleteProcessPrimeiro, setDeleteProcessPrimeiro] = useState(false);
  const [secondsRound, setSecondsRound] = useState(0);
  useEffect(() => {
    setIsTicketTrue(false);
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
      let isDeleteProcessPrimeiro = deleteProcessPrimeiro;

      remindsTimeFromRound = setInterval(() => {

        if (!isDeleteProcessPrimeiro) {
          setSecondsRound((prevTime) => prevTime + 1);
        }

        if (processos[secondsRound]) {
          if (processos[secondsRound].tamanho === undefined) {
            setSecondsRound(0);
          } else {
            processos[secondsRound].tamanho = processos[secondsRound].tamanho - 10;
          }
        }

        if (secondsRound === 9) {
          setSecondsRound(0);
        }

        processos.forEach((process) => {
          if (process.tamanho <= 0) {
            isDeleteProcessPrimeiro = true;
          }
        });

        if (isDeleteProcessPrimeiro) {
          setDeleteProcessPrimeiro(true);
        }
      }, 1000);
    }
    return () => clearInterval(remindsTimeFromRound);
  }, [start, secondsRound, remindsTimeFromRound, setSecondsRound, processos, deleteProcessPrimeiro]);

  useEffect(() => {
    if (deleteProcessPrimeiro) {
      const processoZero = processos.find((processo) => processo.tamanho <= 0);
      if (processoZero) {
        handleRemoveProcess(processoZero.id);
        setSecondsRound((prevTime) => prevTime - 1);
      }
      setDeleteProcessPrimeiro(false);
    }
  }, [deleteProcessPrimeiro, processos, handleRemoveProcess]);


  return <footer className="flex p-2 px-8 space-y-4 flex-col items-center">
    <h2 className="text-3xl	">Escalonamento por Chaveamento Circular</h2>
    <p className="text-justify text-xl">
      O escalonamento por chaveamento circular (também conhecido como Round-Robin) é um algoritmo de escalonamento de processos em um sistema operacional. Nesse algoritmo, cada processo recebe uma fatia de tempo para execução em uma ordem circular.
    </p>
    <p className="text-justify text-xl">
      A principal vantagem do escalonamento por chaveamento circular é que ele garante uma distribuição justa do tempo de processamento entre os processos. Cada processo recebe uma fatia igual de tempo antes de ser colocado novamente no final da fila. Isso é especialmente útil em ambientes de multiprogramação, onde vários processos estão competindo pelo tempo de CPU.
    </p>
  </footer>;
}
