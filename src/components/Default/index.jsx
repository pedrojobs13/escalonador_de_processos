import { useContext} from "react";
import { Plus, Minus, Play, Stop, Pause } from "phosphor-react";
import { TimeContext } from "../../contexts/TimeContext";

export function Default() {
  const {
    handleCreateNewCycle,
    handlePauseNewCycle,
    handleRestartProcesso,
    handleAddTime,
    handleRemoveTime,
    minutes,
    processos,
    seconds,
  } = useContext(TimeContext);
  return (
    <div className="h-screen bg-zinc-800 text-zinc-50">
      <main className=" flex w-full flex-col items-center  pt-4 text-2xl">
        Escalonador de Processos
        <div className="flex gap-5">
          <Play
            size={32}
            color="#dedede"
            weight="bold"
            className="cursor-pointer dark:md:hover:bg-[#1da1f2]"
            onClick={handleCreateNewCycle}
          />
          <Pause
            size={32}
            color="#dedede"
            weight="bold"
            className="cursor-pointer dark:md:hover:bg-[#1da1f2]"
            onClick={handlePauseNewCycle}
          />
          <Stop
            size={32}
            color="#dedede"
            weight="bold"
            className="cursor-pointer dark:md:hover:bg-[#1da1f2]"
            onClick={handleRestartProcesso}
          />
          <Plus
            size={32}
            color="#dedede"
            weight="bold"
            onClick={handleAddTime}
            className="cursor-pointer dark:md:hover:bg-[#1da1f2]"
          />
          <Minus
            size={32}
            color="#dedede"
            weight="bold"
            onClick={handleRemoveTime}
            className="cursor-pointer dark:md:hover:bg-[#1da1f2]"
          />
        </div>
        <div className="flex ">
          <span className="px-2">Tempo: </span>{" "}
          <span>{minutes < 10 ? `0${minutes}` : minutes}</span>:
          <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
          <div className="px-4">processos: {processos.length}</div>
        </div>
      </main>

      <div className="mt-10 flex">
      {processos.map((processo) => {
        return (
          <div className="flex flex-col" key={processo.id}>
            <span className="text-center">{processo.id}</span>
            <section className="h-96 flex-row gap-5 px-10">
              <div className="h-full rounded-full bg-gray-200 dark:bg-gray-700 ">
                <div
                  className="rounded-full bg-[#1da1f2] px-3  leading-none"
                  style={{ height: `${processo.tamanho}%` }}
                >
                  <div className="p-0.5 pt-2.5 text-base font-semibold text-blue-100 ">
                    {processo.tamanho}
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
      })}
    </div>
    </div>
  );
}