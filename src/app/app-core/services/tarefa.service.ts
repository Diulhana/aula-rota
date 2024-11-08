import { Injectable } from '@angular/core';
import {Tarefa} from "../model/tarefa";

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  private listaDeTarefas: String[] = [];

  private tarefasTeste: Tarefa[] = [];

  constructor() { }

  addtarefa(tarefa: string){
    this.listaDeTarefas.push(tarefa);
    console.log("TAREFAS ADICIONADAS", this.listaDeTarefas);
  }

  populartabela(): Tarefa[]{
    let t: Tarefa = new Tarefa('Estudar Angular', '07/12/2024', '20/12/2024', 'Essa tarefa destinada para estudar o framework Angular', 'NOVA', 0);

    let t2: Tarefa = new Tarefa('Estudar Bootstrap', '07/12/2024', '20/12/2024', 'Essa tarefa destinada para estudar o framework Bootstrap', 'Em andamento', 0);

    let t3: Tarefa = new Tarefa('Tarefa de teste para popular tabela', '07/12/2024', '20/12/2024', 'Essa tarefa destinada para testes', 'concluida', 0);

    this.tarefasTeste.push(t, t2, t3);
    return this.tarefasTeste;
  }
}
