# 🗓️ Scheduling Module (Node.js + TypeScript)

Um módulo de agendamento de tarefas orientado a objetos, feito com Node.js + TypeScript.  
Ideal para rodar jobs periódicos ou em horários fixos com logs, retries e relatórios!

## ✍️ Criando e editando tasks!

1. Acesse `src/index.ts`
2. Crie uma nova instância de uma task (algumas já estarão lá de exemplo)

```js
const helloTask = new Task("hello-task", {
  interval: 5000,
  retryLimit: 2,
  execute: async () => {
    console.log("🧠 Executando tarefa: Hello Task!");
  },
  fallback: () => {
    console.log("🔥 Executando fallback da tarefa!");
  }
});
```

3. Certifique-se que de registar a task dentro do `scheduler`
```js
scheduler.registerTask(helloTask);
```


## 📦 Instalação e uso

```bash
git clone https://github.com/franciscobressa/scheduling-module.git
cd scheduling-module
npm install
npm run start
```


## 📃 Relatório (JSON)
Dentro do diretório `/reports` estará o arquivo `executions.json` que estará sendo atualizado em tempo real com os logs.

## 📐 Abordagem de Design e Funcionamento

### 🧱 Componentes principais

    Task

        Representa uma unidade de trabalho.

        Cada task possui:

            Um identificador único (taskId)

            Uma função principal (execute())

            Um intervalo (interval) ou horário fixo (fixedTime)

            Número máximo de tentativas (retryLimit)

            Um fallback (função opcional chamada em caso de falha total)

    Scheduler

        Responsável por orquestrar a execução de múltiplas tarefas.

        Suporta tarefas periódicas (via setInterval) e tarefas em horário fixo (checagem a cada minuto).

        Controla os ciclos de execução, retries e fallback automaticamente.

    ExecutionReport

        Registra o histórico das execuções das tarefas.

        Os logs são armazenados em memória e também persistidos em reports/executions.json.

    Logger

        Centraliza e padroniza os logs no console para facilitar o entendimento.

### ⚙️ Como funciona

    O usuário instancia e registra múltiplas Task no Scheduler.

    O método scheduler.start() inicia o monitoramento de todas as tarefas.

    A cada execução:

        Um log de início é emitido

        A tarefa é executada

        Em caso de erro:

            São feitas novas tentativas até o limite (retryLimit)

            Se continuar falhando, o fallback é acionado (se houver)

        Um log de fim é registrado, junto com o status

        A execução é registrada em ExecutionReport e salva no JSON
