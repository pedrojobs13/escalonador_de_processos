# Trabalho de Sistemas Operacionais - 2023/1

## Escalonamento de Processos

### FIFO (First-In, First-Out):
O algoritmo FIFO (First-In, First-Out) é uma das estratégias de escalonamento mais simples e amplamente utilizadas em sistemas operacionais. Nesse algoritmo, os processos são executados na ordem em que chegaram à fila de prontos. O primeiro processo a entrar na fila é o primeiro a ser executado, e assim por diante.

### Shortest Job First:
O algoritmo Shortest Job First (SJF), também conhecido como Shortest Job Next (SJN), é um algoritmo de escalonamento de processos que prioriza a execução dos processos com menor tempo de execução.

No escalonamento SJF, os processos são ordenados com base na duração estimada de sua execução, e o processo com o menor tempo de execução é selecionado para ser executado em primeiro lugar. Isso significa que, entre todos os processos disponíveis na fila de prontos, o processo com o menor tempo estimado de execução é escolhido para ocupar a CPU.

SJF preemptivo: Se um processo com um tempo de execução mais curto chega à fila de prontos durante a execução de um processo, o processo atual é interrompido e o novo processo com menor tempo de execução é colocado em execução. Esse tipo de SJF permite a interrupção de processos em andamento.

SJF não preemptivo: Uma vez que um processo é selecionado para a execução, ele continua até ser concluído, mesmo que um processo com menor tempo de execução chegue à fila de prontos posteriormente. Nesse caso, o escalonamento SJF não preemptivo não permite a interrupção de processos em andamento.

### Shortest Remaining Time:
O algoritmo "Shortest Remaining Time" (SRT) é uma variação preemptiva do algoritmo "Shortest Job First" (SJF). O SRT seleciona o processo com o menor tempo de execução restante no momento da escolha.

No escalonamento SRT, quando um novo processo chega à fila de prontos, o algoritmo verifica se o tempo de execução restante desse processo é menor do que o tempo restante do processo atualmente em execução. Se for o caso, o processo em execução é interrompido e o novo processo com o menor tempo de execução restante é selecionado para ser executado.

### Escalonamento por Chaveamento Circular:
O escalonamento por chaveamento circular (também conhecido como Round-Robin) é um algoritmo de escalonamento de processos em um sistema operacional. Nesse algoritmo, cada processo recebe uma fatia de tempo para execução em uma ordem circular.

A principal vantagem do escalonamento por chaveamento circular é que ele garante uma distribuição justa do tempo de processamento entre os processos. Cada processo recebe uma fatia igual de tempo antes de ser colocado novamente no final da fila. Isso é especialmente útil em ambientes de multiprogramação, onde vários processos estão competindo pelo tempo de CPU.

### Escalonamento por Prioridades:
O escalonamento por prioridades (Scheduling by Priorities) é um algoritmo de escalonamentode processos em sistemas operacionais, onde cada processo é atribuído a uma prioridade específica. O processo com a maior prioridade é selecionado para execução primeiro.

O funcionamento básico do escalonamento por prioridades é o seguinte:

1. Cada processo recebe uma prioridade no momento de sua criação ou entrada no sistema.
2. O escalonador seleciona o processo com a maior prioridade para execução.
3. O processo é executado até que seja concluído ou até que sua prioridade seja ultrapassada por outro processo com uma prioridade mais alta.
4. Se um novo processo com prioridade mais alta chegar ao sistema, ele pode interromper o processo em execução e assumir a CPU.
5. Esse processo continua até que todos os processos tenham sido executados.

### Escalonamento Garantido:
O escalonamento garantido (Guaranteed Scheduling) é um tipo de escalonamento de processos que visa fornecer garantias de tempo de execução para determinados processos ou tarefas em sistemas operacionais em tempo real.

A ideia básica por trás do escalonamento garantido é assegurar que processos críticos ou tarefas com requisitos temporais específicos sejam concluídos dentro de prazos definidos, independentemente do comportamento dos demais processos do sistema. Isso é crucial em sistemas operacionais em tempo real, onde a perda de prazos pode ter consequências graves, como falhas em sistemas de controle, sistemas de segurança ou sistemas embarcados.

### Escalonamento por Loteria:
O escalonamento por loteria (Lottery Scheduling) é um algoritmo de escalonamento de processos em sistemas operacionais que utiliza conceitos de loteria para atribuir recursos computacionais, como tempo de CPU, aos processos.

O escalonamento por loteria é baseado em um sistema de sorteio, onde cada processo recebe bilhetes proporcionais à sua prioridade ou quota de recursos. Em seguida, um sorteio é realizado para determinar qual processo será selecionado para executar. Quanto mais bilhetes um processo tiver, maior será a probabilidade de ser escolhido.

### Fração Justa:
O escalonamento "fair-share" refere-se a uma abordagem em que os recursos do sistema, como CPU, memória, largura de banda de rede, entre outros, são alocados entre os usuários ou grupos de forma proporcional à sua "fração justa" ou "quota" de recursos. Isso é feito para garantir que cada usuário ou grupo receba uma parcela equitativa dos recursos disponíveis, de acordo com uma política predefinida.

Em outras palavras, o escalonamento "fair-share" procura evitar que um usuário ou grupo monopolize os recursos do sistema, garantindo que todos tenham acesso justo aos recursos de acordo com sua parcela alocada.

## Projeto em React:
Para instalar o projeto, certifique-se de ter o Node.js instalado em seu computador, juntamente com o npm ou o yarn. Em seguida, siga as etapas abaixo:

1. Para instalar o Yarn, execute o seguinte comando:
npm install --global yarn

2. Para instalar as dependências do projeto (node_modules), execute um dos seguintes comandos dentro do projeto baixado:
npm install ou yarn install

3. Para executar o projeto emmodo de desenvolvimento, utilize um dos seguintes comandos:
npm run dev ou yarn run dev


4. Após a execução bem-sucedida, você poderá acessar o projeto em seu ambiente local.

## Dependências:

As dependências do projeto estão listadas abaixo:

```json
"dependencies": {
"phosphor-react": "^1.4.1",
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-google-charts": "^4.0.0",
"react-router-dom": "^6.11.2"
},
"devDependencies": {
"@types/react": "^18.0.28",
"@types/react-dom": "^18.0.11",
"@vitejs/plugin-react": "^4.0.0",
"autoprefixer": "^10.4.14",
"postcss": "^8.4.23",
"prettier-plugin-tailwindcss": "^0.3.0",
"tailwindcss": "^3.3.2",
"vite": "^4.3.2"
}

