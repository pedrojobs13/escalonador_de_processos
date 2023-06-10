import { useEffect, useState } from "react";
import { useContext } from "react";
import { TimeContext } from "../../contexts/TimeContext"; export function Sjf() {
  const {
    start,
    handleRemoveProcess,
    processos,
    time,
  } = useContext(TimeContext);


  const [deleteProcessPrimeiro, setDeleteProcessPrimeiro] = useState(false);
  const [letTheFirstIndex, setLetTheFirstIndex] = useState(true);
  const [startIndex, setStartIndex] = useState()
  let remindsHeightProcess;
  console.log(startIndex)

  useEffect(() => {
    if (start) {
      remindsHeightProcess = setInterval(() => {
        processos[startIndex].tamanho--;
        setDeleteProcessPrimeiro(processos[startIndex].tamanho === 0);
      }, time);
    }

    return () => clearInterval(remindsHeightProcess);
  }, [start, time, processos, startIndex]);

  useEffect(() => {
    if (deleteProcessPrimeiro) {
      const processoZero = processos.find((processo) => processo.tamanho === 0);
      if (processoZero) {
        handleRemoveProcess(processoZero.id);
      }
      setDeleteProcessPrimeiro(false)
    }
  }, [deleteProcessPrimeiro]);


  useEffect(() => {
    if (!deleteProcessPrimeiro) {
      const min = processos.reduce(function (prev, current) {
        return prev.tamanho < current.tamanho ? prev : current;
      })
      const minTam = min.tamanho
      const index = processos.findIndex(x => x.tamanho === minTam)
      setStartIndex(index)
    }

  }, [deleteProcessPrimeiro])


  return <footer>sjf</footer>;
}