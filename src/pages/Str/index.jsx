import { useEffect, useState } from "react";
import { useContext } from "react";
import { TimeContext } from "../../contexts/TimeContext";
export function Str() {
  const { start, handleRemoveProcess, processos, time } =
    useContext(TimeContext);
  const [deleteProcessPrimeiro, setDeleteProcessPrimeiro] = useState(false);

  let remindsHeightProcess;

  useEffect(() => {
    const min = processos.reduce(function (prev, current) {
      return prev.tamanho < current.tamanho ? prev : current;
    });
    const minTam = min.tamanho;
    const index = processos.findIndex((x) => x.tamanho === minTam);

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

  return <footer>STF</footer>;
}
