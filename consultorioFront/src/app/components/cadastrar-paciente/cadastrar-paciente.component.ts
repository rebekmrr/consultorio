import { Component, OnInit } from '@angular/core';
import {Medico} from "../../model/Medico";
import {ActivatedRoute, Router} from "@angular/router";
import {Paciente} from "../../model/Paciente";
import {PacienteService} from "../../services/paciente.service";
import {MensagensService} from "../../services/mensagens.service";

@Component({
  selector: 'app-cadastrar-paciente',
  templateUrl: './cadastrar-paciente.component.html',
  styleUrls: ['./cadastrar-paciente.component.scss']
})
export class CadastrarPacienteComponent implements OnInit {
  paciente: Paciente = new Paciente();

  operacaoCadastro = true;

  constructor(private PacienteService: PacienteService, private rotaAtual: ActivatedRoute,
              private roteador: Router, private mensagemService: MensagensService) {
    this.paciente = new Paciente();
    if (this.rotaAtual.snapshot.paramMap.has('id')) {
      this.operacaoCadastro = false;
      const idParaEdicao = Number(this.rotaAtual.snapshot.paramMap.get('id'));
      this.PacienteService.pesquisarPorId(idParaEdicao).subscribe(
        usuarioRetornado => this.paciente = usuarioRetornado
      );
    }
  }

  ngOnInit(): void {
  }

  inserirPaciente(): void {

    if (this.paciente.id) {
      this.PacienteService.atualizar(this.paciente).subscribe(paciente => {
        this.mensagemService.success('Dados alterados com Sucesso!');
        this.roteador.navigate(['pacientes']);
      })

    } else {
      this.PacienteService.inserir(this.paciente).subscribe(paciente => {
        this.mensagemService.success('Paciente cadastrado com Sucesso!');
        this.roteador.navigate(['pacientes']);
      })
      this.paciente = new Paciente();

    }

  }
}
