import React, { useState, useEffect, useContext } from "react";
import { Chart } from "react-google-charts";
import { TimeContext } from "../../contexts/TimeContext";





export function Gauge() {
  const { processos, start, time } = useContext(TimeContext)
  const [data, setData] = useState(getData);
  const options = {
    width: 400,
    height: 120,
    redFrom: 90,
    redTo: 100,
    yellowFrom: 75,
    yellowTo: 90,
    minorTicks: 3,
  };

  function getMemoryUse() {
    let memoryUser = 0
    if (start) {
      memoryUser = Math.floor(processos.length * 10);
    }
    return memoryUser
  }
  function getCPUUser() {
    let valueUserCpu = 0
    if (start) {
      valueUserCpu = Math.floor((100 - ((time / 1000) * 100)) * 1);
    } if (start && time == 1000) {
      valueUserCpu = 10
    }
    return valueUserCpu
  }
  function getRandomNumber() {
    return Math.floor(90);
  }

  function getData() {
    return [
      ["Label", "Value"],
      ["Memory", getMemoryUse()],
      ["CPU", getCPUUser()],
      ["Network", getRandomNumber()],
    ];
  }

  useEffect(() => {
    const id = setInterval(() => {
      setData(getData());
    }, time);

    return () => {
      clearInterval(id);
    };
  }, [getData, getRandomNumber, time]);

  return (
    <Chart
      className="flex justify-center"
      chartType="Gauge"
      width="100%"
      height="100px"
      data={data}
      options={options}
    />

  );
}
