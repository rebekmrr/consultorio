import { Component, OnInit } from '@angular/core';
import { Consulta } from 'src/app/model/Consulta';
import {Especialidade} from "../../model/Especialidade";
import {Medico} from "../../model/Medico";
import {MedicoService} from "../../services/medico.service";
import {Paciente} from "../../model/Paciente";
import {PacienteService} from "../../services/paciente.service";
import {ConsultasService} from "../../services/consultas.service";
import {DatePipe, formatDate} from "@angular/common";
import {MAT_DATE_FORMATS} from "@angular/material/core";
import {MensagensService} from "../../services/mensagens.service";


@Component({
  selector: 'app-cadastrar-consulta',
  templateUrl: './cadastrar-consulta.component.html',
  styleUrls: ['./cadastrar-consulta.component.scss']
})
export class CadastrarConsultaComponent implements OnInit {
  consulta: Consulta = new Consulta();
  conditionalOperator = Array<Medico>();
  medicos = Array<Medico>();
  pacientes = Array<Paciente>();
  listaMedicos: any
  listaPacientes: any
  constructor(private MedicoService: MedicoService, private  PacienteService: PacienteService,
              private ConsultaService: ConsultasService, private mensagemService: MensagensService) { }

  ngOnInit(): void {
  this.listaMedicos = this.MedicoService.listar().subscribe(
    p => this.medicos = p
  )
    this.listaPacientes = this.PacienteService.listar().subscribe(
      p => this.pacientes = p
    )
  }
salvar(): void{
  this.ConsultaService.inserir(this.consulta).subscribe(consulta => console.log(consulta))
  this.consulta = new Consulta();
  this.mensagemService.success('Consulta salva com Sucesso!');
}


}
