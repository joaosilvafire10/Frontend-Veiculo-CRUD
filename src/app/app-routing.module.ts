import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VeiculoListComponent } from './veiculos/components/veiculo-list/veiculo-list.component';
import { VeiculoFormComponent } from './veiculos/components/veiculo-form/veiculo-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'veiculos', pathMatch: 'full' },
  { path: 'veiculos', component: VeiculoListComponent },
  { path: 'veiculos/new', component: VeiculoFormComponent },
  { path: 'veiculos/edit/:id', component: VeiculoFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
