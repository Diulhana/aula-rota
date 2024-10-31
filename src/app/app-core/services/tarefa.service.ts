import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  private listaDeTarefas: String[] =[];

  constructor() { }

  addtarefa(tarefa: string){
    this.listaDeTarefas.push(tarefa);
    console.log("TAREFAS ADICIONADAS", this.listaDeTarefas);
  }
}