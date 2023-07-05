import { useEffect, useState } from "react";
import { useContext } from "react";
import { TimeContext } from "../../contexts/TimeContext";

export function FairShare() {
  const {
    start,
    handleRemoveProcess,
    handleAddTime,
    handleRemoveTime,
    processos,
    time,
    setIsTicketTrue,
    setIsLotteryIsTrue,
    setIsFairShareTrue
  } = useContext(TimeContext);

  const [deleteProcessPrimeiro, setDeleteProcessPrimeiro] = useState(false);

  const [secondsRound, setSecondsRound] = useState(0);
  const prioridades = {
    4: 20,
    3: 15,
    2: 10,
    1: 5,
  };
  useEffect(() => {
    setIsTicketTrue(true);
    setIsLotteryIsTrue(false)
    setIsFairShareTrue(true)
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
      remindsTimeFromRound = setInterval(() => {

        const prioridade = processos[secondsRound]?.prioridade;
        const valor = prioridades[prioridade];

        if (prioridade !== undefined) {
          processos[secondsRound].tamanho = processos[secondsRound].tamanho - valor;
        }

        setSecondsRound((prevSecondsRound) => prevSecondsRound + 1);

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
  }, [start, remindsTimeFromRound, processos, secondsRound, setDeleteProcessPrimeiro]);

  useEffect(() => {
    if (deleteProcessPrimeiro) {
      const processoZero = processos.find((processo) => processo.tamanho <= 0);
      if (processoZero) {
        handleRemoveProcess(processoZero.id);
      }
      setDeleteProcessPrimeiro(false);
      setSecondsRound((prevSecondsRound) => prevSecondsRound - 1)
    }
  }, [deleteProcessPrimeiro, setSecondsRound]);

  return <footer className="flex p-2 px-8 space-y-4 flex-col items-center">
    <h2 className="text-3xl	">Fração Justa</h2>
    <p className="text-justify text-xl">
      O escalonamento "fair-share" refere-se a uma abordagem em que os recursos do sistema (como CPU, memória, largura de banda de rede, entre outros) são alocados entre os usuários ou grupos de forma proporcional à sua "fração justa" ou "quota" de recursos. Isso é feito para garantir que cada usuário ou grupo receba uma parcela equitativa dos recursos disponíveis, de acordo com uma política predefinida.
    </p>
    <p className="text-justify text-xl">
      Em outras palavras, o escalonamento "fair-share" procura evitar que um usuário ou grupo monopolize os recursos do sistema, garantindo que todos tenham acesso justo aos recursos de acordo com sua parcela alocada.
    </p>


  </footer >;
}
