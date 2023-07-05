import { useEffect, useState } from "react";
import { useContext } from "react";
import { TimeContext } from "../../contexts/TimeContext";
export function Str() {
  const { start, handleRemoveProcess, processos, time, setIsTicketTrue, setIsFairShareTrue } =
    useContext(TimeContext);
  const [deleteProcessPrimeiro, setDeleteProcessPrimeiro] = useState(false);

  let remindsHeightProcess;
  useEffect(() => {
    setIsTicketTrue(false);
    setIsFairShareTrue(false)
  }, []);
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

  return <footer className="flex p-2 px-8 space-y-4 flex-col items-center">
    <h2 className="text-3xl	">Shortest Remaining Time</h2>
    <p className="text-justify text-xl">
      O algoritmo "Shortest Remaining Time" (SRT) é uma variação preemptiva do algoritmo "Shortest Job First" (SJF). O SRT seleciona o processo com o menor tempo de execução restante no momento da escolha.
    </p>
    <p className="text-justify text-xl">
      No escalonamento SRT, quando um novo processo chega à fila de prontos, o algoritmo verifica se o tempo de execução restante desse processo é menor do que o tempo restante do processo atualmente em execução. Se for o caso, o processo em execução é interrompido e o novo processo com o menor tempo de execução restante é selecionado para ser executado.
    </p>
    <p className="text-justify text-xl">
      Em resumo, o algoritmo "Shortest Remaining Time" (SRT) é uma variação preemptiva do algoritmo SJF, onde o processo com o menor tempo de execução restante é escolhido para ser executado. Ele visa minimizar o tempo de resposta e de espera, priorizando os processos com menor tempo restante.
    </p>
  </footer>;
}
