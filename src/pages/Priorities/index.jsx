import { useEffect, useState } from "react";
import { useContext } from "react";
import { TimeContext } from "../../contexts/TimeContext";
export function Priorities() {
  const { start, handleRemoveProcess, processos, time, setIsTicketTrue } =
    useContext(TimeContext);
  const [deleteProcessPrimeiro, setDeleteProcessPrimeiro] = useState(false);

  let remindsHeightProcess;
  useEffect(() => {
    setIsTicketTrue(true);
  }, [])
  useEffect(() => {
    const max = processos.reduce(function (prev, current) {
      return prev.prioridade > current.prioridade ? prev : current;
    });
    const maxPri = max.prioridade;
    const index = processos.findIndex((x) => x.prioridade === maxPri);

    if (start) {
      remindsHeightProcess = setInterval(() => {
        processos[index].tamanho--;
        setDeleteProcessPrimeiro(processos[index].tamanho === 0);
      }, time);
    }

    return () => clearInterval(remindsHeightProcess);
  }, [start, time, processos]);

  useEffect(() => {
    if (deleteProcessPrimeiro) {
      const processoZero = processos.find((processo) => processo.tamanho === 0);
      if (processoZero) {
        handleRemoveProcess(processoZero.id);
      }
      setDeleteProcessPrimeiro(false);
    }
  }, [deleteProcessPrimeiro]);

  return <footer>Priorities</footer>;
}
