import { useEffect, useState } from "react";
import { useContext } from "react";
import { TimeContext } from "../../contexts/TimeContext";
export function Sjf() {
  const { start, handleRemoveProcess, processos, time, setIsTicketTrue, setIsFairShareTrue } =
    useContext(TimeContext);

  const [deleteProcessPrimeiro, setDeleteProcessPrimeiro] = useState(false);
  const [letTheFirstIndex, setLetTheFirstIndex] = useState(true);
  const [startIndex, setStartIndex] = useState();
  let remindsHeightProcess;
  useEffect(() => {
    setIsTicketTrue(false);
    setIsFairShareTrue(false)
  }, []);

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
      setDeleteProcessPrimeiro(false);
    }
  }, [deleteProcessPrimeiro]);

  useEffect(() => {
    if (!deleteProcessPrimeiro) {
      const min = processos.reduce(function (prev, current) {
        return prev.tamanho < current.tamanho ? prev : current;
      });
      const minTam = min.tamanho;
      const index = processos.findIndex((x) => x.tamanho === minTam);
      setStartIndex(index);
    }
  }, [deleteProcessPrimeiro]);

  return <footer className="flex p-2 px-8 space-y-4 flex-col items-center">
    <h2 className="text-3xl	">Shortest Job First</h2>
    <p className="text-justify text-xl">
      O algoritmo Shortest Job First (SJF), também conhecido como Shortest Job Next (SJN), é um algoritmo de escalonamento de processos que prioriza a execução dos processos com menor tempo de execução.
    </p>
    <p className="text-justify text-xl">
      No escalonamento SJF, os processos são ordenados com base na duração estimada de sua execução, e o processo com o menor tempo de execução é selecionado para ser executado em primeiro lugar. Isso significa que, entre todos os processos disponíveis na fila de prontos, o processo com o menor tempo estimado de execução é escolhido para ocupar a CPU.
    </p>
    <p className="text-justify text-xl">
      <span className="text-sky-400/100">SJF preemptivo:</span> Se um processo com um tempo de execução mais curto chega à fila de prontos durante a execução de um processo, o processo atual é interrompido e o novo processo com menor tempo de execução é colocado em execução. Esse tipo de SJF permite a interrupção de processos em andamento.
    </p>
    <p className="text-justify text-xl">
      <span className="text-sky-400/100">SJF não preemptivo:</span> Uma vez que um processo é selecionado para a execução, ele continua até ser concluído, mesmo que um processo com menor tempo de execução chegue à fila de prontos posteriormente. Nesse caso, o escalonamento SJF não preemptivo não permite a interrupção de processos em andamento.
    </p>
  </footer>;
}
