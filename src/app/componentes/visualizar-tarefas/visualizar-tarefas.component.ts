import { Component, OnInit } from '@angular/core';
import {TarefaService} from "../../app-core/services/tarefa.service";
import {Tarefa} from "../../app-core/model/tarefa";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

declare var $: any;

import swal from 'sweetalert2';
import Swal from "sweetalert2";

@Component({
  selector: 'app-visualizar-tarefas',
  templateUrl: './visualizar-tarefas.component.html',
  styleUrls: ['./visualizar-tarefas.component.css']
})
export class VisualizarTarefasComponent implements OnInit {

  i: number =0;

  tarefas: Tarefa [] = [];

  formularioTarefa: FormGroup;

  constructor(private tarefaService: TarefaService, private fb: FormBuilder) {

    this.tarefas= tarefaService.populartabela();
    this.formularioTarefa = this.fb.group({
      tituloTarefa: ['', Validators.required],
      dataInicioTarefa: ['', Validators.required],
      dataConclusaoTarefa: ['', Validators.required],
      statusTarefa: ['', Validators.required],
      descricaoTarefa: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  addTarefa(){
    this.tarefaService.addtarefa("TAREFA" + this.i);
    this.i ++;
  }

  openModal(){
    $('#modal-tarefa').modal('show');
  }

  closeModal(){
    $('#modal-tarefa').modal('hide');
  }

  salvarTarefa(){
    if(this.formularioTarefa.valid){ //Verifica se as condiçoes dsao verdadeiras e estão corretas, se n, esse if vai barrar
      console.log("DADOS SALVOS COM SUCESSO", this.formularioTarefa.value);

      let deuCerto = true;
      if(deuCerto){
        swal.fire('Sucesso', 'Tarefa salva com sucesso!', 'success');
        this.formularioTarefa.reset();
      } else {
        swal.fire('Não foi dessa vez', 'Não foi possível salvar a tarefa', 'error')
      }

    }else{
      console.log("CAMPOS INVALIDOS ENVCONTRADOS");
      this.marcarTodosComoClicado();
      Swal.fire('Cuidado', 'Alguns campos não estão corretos', 'error');
    }
  }

  //pega o campo do formulario retorna se tem alguma coisa escrita, se foi tocado e se está válido.
  isCampoValido(inputNome: string): boolean{ //para ele ser generico e pegar qualquer campo
    const campo: any = this.formularioTarefa.get(inputNome); //Busca o campo pelo nome
    return campo && campo.touched && campo.invalid;
  }

  //interagimos o campo com for e indicamso que este foi tocado
  marcarTodosComoClicado(){
    this.formularioTarefa.markAllAsTouched();
  }

}
