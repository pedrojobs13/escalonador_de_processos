import { useEffect, useState } from "react";
import { useContext } from "react";
import { TimeContext } from "../../contexts/TimeContext";

export function Priorities() {
  const { start,
    handleRemoveProcess,
    processos,
    time,
    setIsTicketTrue,
    setIsLotteryIsTrue,
    setIsFairShareTrue
  } = useContext(TimeContext);
  const [deleteProcessPrimeiro, setDeleteProcessPrimeiro] = useState(false);

  let remindsHeightProcess;
  useEffect(() => {
    setIsTicketTrue(true);
    setIsLotteryIsTrue(false);
    setIsFairShareTrue(false)
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

  return <footer className="flex p-2 px-8 space-y-4 flex-col items-center">
    <h2 className="text-3xl	">Escalonamento por Prioridades </h2>
    <p className="text-justify text-xl">
      O escalonamento por prioridades (Scheduling by Priorities) é um algoritmo de escalonamento de processos em sistemas operacionais, onde cada processo é atribuído a uma prioridade específica. O processo com a maior prioridade é selecionado para execução primeiro.
    </p>
    <p className="text-justify text-xl place-content-start">
      O funcionamento básico do escalonamento por prioridades é o seguinte:

    </p>
    <tbody className="flex flex-col gap-2 ">
      <tr>
        <td>1. Cada processo recebe uma prioridade no momento de sua criação ou entrada no sistema.</td>
        <td>2. O escalonador seleciona o processo com a maior prioridade para execução.</td>
        <td>
          3. O processo é executado até que seja concluído ou até que sua prioridade seja ultrapassada por outro processo com uma prioridade mais alta.
        </td>
        <td>
          4. Se um novo processo com prioridade mais alta chegar ao sistema, ele pode interromper o processo em execução e assumir a CPU.
        </td>
        <td>
          5. Esse processo continua até que todos os processos tenham sido executados.
        </td>
      </tr>
    </tbody>
  </footer>;;
}
