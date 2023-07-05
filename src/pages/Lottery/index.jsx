import { useEffect, useState } from "react";
import { useContext } from "react";
import { TimeContext } from "../../contexts/TimeContext";

export function Lottery() {
  const {
    start,
    handleRemoveProcess,
    processos,
    time,
    setIsTicketTrue,
    setIsLotteryIsTrue,
    setIsFairShareTrue
  } = useContext(TimeContext);

  const [deleteProcessPrimeiro, setDeleteProcessPrimeiro] = useState(false);
  const [lottery, setLottery] = useState(0);
  let remindsHeightProcess;
  let max = 30;
  let min = 1;
  const [sortNumber, setSortNumber] = useState(Math.floor(Math.random() * (max - min) + min))
  let index;
  useEffect(() => {
    setIsTicketTrue(true);
    setIsLotteryIsTrue(true)
    setIsFairShareTrue(false)
  }, []);


  useEffect(() => {
    if (sortNumber >= 1 && sortNumber <= 3) {
      setLottery(1);
    } else if (sortNumber > 3 && sortNumber <= 8) {
      setLottery(2);
    } else if (sortNumber > 8 && sortNumber <= 15) {
      setLottery(3);
    } else if (sortNumber > 15 && sortNumber <= 30) {
      setLottery(4);
    }
  }, [sortNumber]);


  useEffect(() => {

    index = processos.findIndex((x) => x.prioridade === lottery);
    console.log("prioridade selecionada: " + lottery)
    console.log("numero sorteado: " + sortNumber)
    console.log("index do número sorteado: " + index)
    if (index == -1) {

      setSortNumber(Math.floor(Math.random() * (max - min) + min))
    }

    if (start) {
      remindsHeightProcess = setInterval(() => {

        if (index !== -1 && processos[index].hasOwnProperty("tamanho")) {
          processos[index].tamanho--;
          setDeleteProcessPrimeiro(processos[index].tamanho === 0);
        }
      }, time);
    }

    return () => clearInterval(remindsHeightProcess);
  }, [start, time, processos, lottery, index, setSortNumber, setLottery])


  useEffect(() => {
    if (deleteProcessPrimeiro) {
      const processoZero = processos.find((processo) => processo.tamanho === 0);
      if (processoZero) {
        handleRemoveProcess(processoZero.id);
      }
      setDeleteProcessPrimeiro(false);
      setSortNumber(Math.floor(Math.random() * (max - min) + min))
    }
  }, [deleteProcessPrimeiro]);

  return <footer className="flex p-2 px-8 space-y-4 flex-col items-center">
    <h2 className="text-3xl	">Escalonamento por Loteria</h2>
    <p className="text-justify text-xl">
      O escalonamento por loteria (Lottery Scheduling) é um algoritmo de escalonamento de processos em sistemas operacionais que utiliza conceitos de loteria para atribuir recursos computacionais, como tempo de CPU, aos processos.
    </p>
    <p className="text-justify text-xl">
      O escalonamento por loteria (Lottery Scheduling) é um algoritmo de escalonamento de processos em sistemas operacionais que utiliza conceitos de loteria para atribuir recursos computacionais, como tempo de CPU, aos processos.
    </p>
  </footer>;
}

/*
caso de algum problema jogo esse código

 const maxima = processos.reduce(function (prev, current) {
        return prev.prioridade > current.prioridade ? prev : current;
      });
      const maxPri = maxima.prioridade;

      index = processos.findIndex((x) => x.prioridade === maxPri);

*/