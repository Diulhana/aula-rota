import { Component, OnInit } from '@angular/core';
import {TarefaService} from "../../app-core/services/tarefa.service";
import {Tarefa} from "../../app-core/model/tarefa";

declare var $: any;

@Component({
  selector: 'app-visualizar-tarefas',
  templateUrl: './visualizar-tarefas.component.html',
  styleUrls: ['./visualizar-tarefas.component.css']
})
export class VisualizarTarefasComponent implements OnInit {

  i: number =0;

  tarefas: Tarefa [] = [];

  constructor(private tarefaService: TarefaService) {
    this.tarefas= tarefaService.populartabela();

  }

  ngOnInit(): void {
  }

  addTarefa(){
    this.tarefaService.addtarefa("TAREFA" + this.i);
    this.i ++;
  }

  openModal(){
    $('#add-tarefa').modal('show');
  }

  closeModal(){
    $('#add-tarefa').modal('hide');
  }

}
