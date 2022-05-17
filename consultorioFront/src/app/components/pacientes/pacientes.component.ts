import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Paciente} from "../../model/Paciente";
import {PacienteService} from "../../services/paciente.service";

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit {

  pacientes = Array<Paciente>();

  displayedColumns: string[] = [
    'nome', 'dataDeNascimento', 'cpf', 'telefone', 'email', 'sexo', 'endereco', 'opções'];

  constructor(private PacienteService: PacienteService, private roteador: Router) {

  }

  ngOnInit(): void {
    this.PacienteService.listar().subscribe(

      p => this.pacientes = p

    )
    console.log(this.pacientes);

  }

  editar(paciente: Paciente): void {

    this.roteador.navigate(['pacientes/cadastrar', paciente.id])

  }

  remover(paciente: Paciente) : void{

    this.PacienteService.remover(Number(paciente.id)).subscribe(
      resposta => {
        const indexUsuarioParaRemover = this.pacientes.findIndex(u => u.id === paciente.id)

        if(indexUsuarioParaRemover > -1) {

          this.pacientes.splice(indexUsuarioParaRemover, 1)
          this.ngOnInit()


        }

      }

    )

  }

}
