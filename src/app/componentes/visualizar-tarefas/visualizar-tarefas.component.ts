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

    this.formularioTarefa = this.fb.group({
      tituloTarefa: ['', Validators.required],
      dataInicioTarefa: ['', Validators.required],
      dataConclusaoTarefa: ['', Validators.required],
      statusTarefa: ['', Validators.required],
      descricaoTarefa: ['', Validators.required],
      id: [0]
    });
  }

  ngOnInit(): void {
  }

  listarTarefas(){
    this.tarefaService.buscarTarefa().then(resposta => {
      this.tarefas = resposta;
    });

  }

  openModal(){
    $('#modal-tarefa').modal('show');
  }

  closeModal(){
    $('#modal-tarefa').modal('hide');
  }

  salvarTarefa(){
    if(this.formularioTarefa.valid){ //Verifica se as condiçoes sao verdadeiras e estão corretas, se n, esse if vai barrar
      const novaTarefa: Tarefa = new Tarefa(
        this.formularioTarefa.value.tituloTarefa,
          this.formularioTarefa.value.dataInicioTarefa,
          this.formularioTarefa.value.dataConclusaoTarefa,
          this.formularioTarefa.value.statusTarefa,
          this.formularioTarefa.value.descricaoTarefa);

      this.tarefaService.adicionartarefa(novaTarefa).then(resposta => {
        if (resposta > 0) {
          swal.fire('sucesso', 'Tarefa Salva com Sucesso!', 'success');
          this.formularioTarefa.reset;
          this.listarTarefas();
          this.closeModal();
        }
      }).catch(error => {
        swal.fire('Não foi dessa vez', 'não foi possivel salvar a tarefa', 'warning');
      })
    }else{
      this.marcarTodosComoClicado();
      Swal.fire('Cuidado', 'Alguns campos não estão corretos', 'warning');
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

  submitform(){
    if(this.formularioTarefa.value.id > 0){
      //chamar o metodo de editar
      this.editarFormTarefa
    }else{
      this.salvarTarefa();
    }
  }

  excluirTarefa(id:number){
    swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
    }).then(value => {
      if (value.isConfirmed) {
        this.tarefaService.removerTarefa(id).then(resposta => {
          swal.fire('sucesso', 'tarefa deletada com sucesso', 'success');
          this.listarTarefas();
        })
      }
    }).catch(error => {
      swal.fire('ERRO', 'A tarefa não pode ser deletada', 'error');
    })
  }

  carregarDadosTarefa(tarefaEditar: Tarefa){
    this.form.patchValue({
      tituloTarefa: tarefaEditar.titulo,
      dataInicioTarefa: tarefaEditar.dataInicio,
      dataConclusaoTarefa: tarefaEditar.dataConclusao,
      statusTarefa: tare
    })
  }

}
