import { useEffect, useState } from "react";
import { useContext } from "react";
import { TimeContext } from "../../contexts/TimeContext";

export function Fifo() {
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
  let remindsHeightProcess;
  useEffect(() => {
    setIsTicketTrue(false);
    setIsFairShareTrue(false)
  }, []);

  useEffect(() => {
    if (start) {
      remindsHeightProcess = setInterval(() => {
        processos[0].tamanho--;

        processos.forEach((process) => {
          if (process.tamanho == 0) {
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
    if (deleteProcessPrimeiro) {
      const processoZero = processos.find((processo) => processo.tamanho === 0);
      if (processoZero) {
        handleRemoveProcess(processoZero.id);
      }
      setDeleteProcessPrimeiro(false);
    }
  }, [deleteProcessPrimeiro]);

  return (
    <footer className="flex p-2 px-8 space-y-4 flex-col items-center">
      <h2 className="text-3xl	"> FIFO (First-In, First-Out) </h2>
      <p className="text-justify text-xl">
        O algoritmo FIFO (First-In, First-Out) é uma das estratégias de escalonamento mais simples e amplamente utilizadas em sistemas operacionais. Nesse algoritmo, os processos são executados na ordem em que chegaram à fila de prontos. O primeiro processo a entrar na fila é o primeiro a ser executado, e assim por diante.
      </p>
    </footer>
  );
}
