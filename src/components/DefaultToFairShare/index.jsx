import { useContext } from "react";
import { Plus, Minus, Play, Stop, Pause, ArrowLeft } from "phosphor-react";
import { TimeContextToFairShare } from "../../contexts/TimeContextToFairShare";
import { NavLink } from "react-router-dom";
import { GaugeToFairShare } from "../GaugeToFairShare";

export function DefaultToFairShare() {
  const {
    handleCreateNewCycle,
    handlePauseNewCycle,
    handleRestartProcesso,
    handleAddTime,
    handleRemoveTime,
    minutes,
    processos,
    seconds,
    isPrioritiesTrue,
  } = useContext(TimeContextToFairShare);

  return (
    <>
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

        <div className="flex">
          <span className="px-2">Tempo: </span>{" "}
          <span>{minutes < 10 ? `0${minutes}` : minutes}</span>:
          <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
          <div className="px-4">processos: {processos.length}</div>
        </div>
      </main>
      <GaugeToFairShare />
      <div className="mt-10 flex">

        {processos.map((processo) => {
          const isMultiploDeDois = processo.id % 2 === 0;
          const corFundo = isMultiploDeDois ? 'bg-red-500' : 'bg-[#1da1f2]';

          return (
            <div className="flex flex-col" key={processo.id}>
              {isPrioritiesTrue ? (
                <p className={`"divide-x border-2 ml-1 border-[#065086] text-center text-red-600 pr-1`}>
                  {processo.prioridade}
                </p>
              ) : (
                ""
              )}

              <span className="text-center">{processo.id}</span>
              <section className="h-96 flex-row gap-5 px-10">
                <div className="h-full rounded-full bg-gray-200 dark:bg-gray-700 ">

                  <div
                    className={`rounded-full ${corFundo} px-3  leading-none`}
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


        <div className="flex flex-col">
          <span className="text-base">
            <ArrowLeft
              size={28}
              color="#1da1f2"
              weight="light"
              className="mx-3 inline"
            />
            Ordem de prioridade
          </span>
        </div>
      </div >
      <nav className="mt-6 flex justify-center gap-3">
        <NavLink
          to="/"
          title="Fifo"
          className={({ isActive }) =>
            isActive ? "transform rounded-md bg-[#ce0707] px-11 py-3 text-white shadow-lg outline-none transition-transform focus:ring-4 " :
              "transform rounded-md bg-[#1da1f2] px-11 py-3 text-white shadow-lg outline-none transition-transform focus:ring-4 "
          }
        >
          Fifo
        </NavLink>
        <NavLink
          to="/Sjf"
          title="SJF"
          className={({ isActive }) =>
            isActive ? "transform rounded-md bg-[#ce0707] px-11 py-3 text-white shadow-lg outline-none transition-transform focus:ring-4 " :
              "transform rounded-md bg-[#1da1f2] px-11 py-3 text-white shadow-lg outline-none transition-transform focus:ring-4 "
          }
        >
          SJF
        </NavLink>
        <NavLink
          to="/str"
          title="STR"
          className={({ isActive }) =>
            isActive ? "transform rounded-md bg-[#ce0707] px-11 py-3 text-white shadow-lg outline-none transition-transform focus:ring-4 " :
              "transform rounded-md bg-[#1da1f2] px-11 py-3 text-white shadow-lg outline-none transition-transform focus:ring-4 "
          }
        >
          STR
        </NavLink>
        <NavLink
          to="/round"
          title="Round"
          className={({ isActive }) =>
            isActive ? "transform rounded-md bg-[#ce0707] px-11 py-3 text-white shadow-lg outline-none transition-transform focus:ring-4 " :
              "transform rounded-md bg-[#1da1f2] px-11 py-3 text-white shadow-lg outline-none transition-transform focus:ring-4 "
          }
        >
          Round
        </NavLink>
        <NavLink
          to="/priorities"
          title="Priorities"
          className={({ isActive }) =>
            isActive ? "transform rounded-md bg-[#ce0707] px-11 py-3 text-white shadow-lg outline-none transition-transform focus:ring-4 " :
              "transform rounded-md bg-[#1da1f2] px-11 py-3 text-white shadow-lg outline-none transition-transform focus:ring-4 "
          }
        >
          Priorities
        </NavLink>
        <NavLink
          to="/guaranteed"
          title="Guaranteed"
          className={({ isActive }) =>
            isActive ? "transform rounded-md bg-[#ce0707] px-11 py-3 text-white shadow-lg outline-none transition-transform focus:ring-4 " :
              "transform rounded-md bg-[#1da1f2] px-11 py-3 text-white shadow-lg outline-none transition-transform focus:ring-4 "
          }
        >
          Guaranteed
        </NavLink>
        <NavLink
          to="/lottery"
          title="Lottery"
          className={({ isActive }) =>
            isActive ? "transform rounded-md bg-[#ce0707] px-11 py-3 text-white shadow-lg outline-none transition-transform focus:ring-4 " :
              "transform rounded-md bg-[#1da1f2] px-11 py-3 text-white shadow-lg outline-none transition-transform focus:ring-4 "
          }
        >
          Lottery
        </NavLink>
        <NavLink
          to="/fairshare"
          title="FairShare"
          className={({ isActive }) =>
            isActive ? "transform rounded-md bg-[#ce0707] px-11 py-3 text-white shadow-lg outline-none transition-transform focus:ring-4 " :
              "transform rounded-md bg-[#1da1f2] px-11 py-3 text-white shadow-lg outline-none transition-transform focus:ring-4 "
          }
        >
          FairShare
        </NavLink>
      </nav>
    </>
  );
}
