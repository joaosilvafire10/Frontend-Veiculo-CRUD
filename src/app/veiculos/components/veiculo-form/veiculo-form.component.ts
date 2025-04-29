import { Component } from '@angular/core';

@Component({
  selector: 'app-veiculo-form',
  templateUrl: './veiculo-form.component.html',
  standalone: false,
  styleUrls: ['./veiculo-form.component.scss']
})
export class VeiculoFormComponent {
  veiculos = [
    { modelo: 'Civic', marca: 'Honda', ano: 2020, cor: 'Preto' },
    { modelo: 'Corolla', marca: 'Toyota', ano: 2021, cor: 'Branco' },
    { modelo: 'Gol', marca: 'Volkswagen', ano: 2018, cor: 'Vermelho' },
    { modelo: 'Onix', marca: 'Chevrolet', ano: 2019, cor: 'Prata' }
  ];
}
