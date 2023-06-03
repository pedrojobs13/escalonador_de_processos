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
  } = useContext(TimeContext);
  const [deleteProcessPrimeiro, setDeleteProcessPrimeiro] = useState(false);
  let remindsHeightProcess;

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

  return <footer>FIFO</footer>;
}
