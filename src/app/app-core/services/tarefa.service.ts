import { Injectable } from '@angular/core';
import {Tarefa} from "../model/tarefa";
import Dexie from "dexie";

@Injectable({
  providedIn: 'root'
})

export class TarefaService extends Dexie {
  private listaDeTarefas: String[] = [];

  private tarefasTeste: Tarefa[] = [];

  tarefasDB: Dexie.Table<Tarefa, number>;
  constructor() {
    super('TarefaDB');
    this.version(1).stores({
      tarefas: '++id, titulo, dataInicio, status, descricao',
    });

    this.tarefasDB = this.table('tarefas');
  }

  async adicionartarefa(tarefa: Tarefa): Promise<number>{
    return await this.tarefasDB.add(tarefa);
  }

  async buscarTarefa():Promise<Tarefa[]>{
    return await this.tarefasDB.toArray();
  }

  async removerTarefa(id: number): Promise<void>{ //se n retornar nada é pq deu certo
    return await this.tarefasDB.delete(id);
  }

  async atualizarTarefa(id: number, tarefa: Tarefa): Promise<number>{ //apenas vai atualizar os dados e mandar os novos
    return await this.tarefasDB.update(id, tarefa);
  }
}
