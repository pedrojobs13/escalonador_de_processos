export function Fifo({ adicionarTempo, removerTempo, processos }) {
  
  return (
    <div className="mt-10 flex">
     
      {processos.map((processo) => {
        return (
          <div className="flex flex-col" key={processo.id}>
            <span className="text-center">{processo.id}</span>
            <section className=" h-96 flex-row gap-5 px-10">
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
  );
}
