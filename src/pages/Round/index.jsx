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
  } = useContext(TimeContext);
  const [deleteProcessPrimeiro, setDeleteProcessPrimeiro] = useState(false);
  const [secondsRound, setSecondsRound] = useState(0);
  useEffect(() => {
    setIsTicketTrue(false);
  }, []);
  let remindsHeightProcess;
  let remindsTimeFromRound;

  console.log(processos);

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
        setSecondsRound(secondsRound + 1);
        processos[secondsRound].tamanho = processos[secondsRound].tamanho - 10;
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
  }, [start, secondsRound, remindsTimeFromRound]);

  useEffect(() => {
    if (deleteProcessPrimeiro) {
      const processoZero = processos.find((processo) => processo.tamanho <= 0);
      if (processoZero) {
        handleRemoveProcess(processoZero.id);
      }
      setDeleteProcessPrimeiro(false);
    }
  }, [deleteProcessPrimeiro]);

  return <footer>Round</footer>;
}
