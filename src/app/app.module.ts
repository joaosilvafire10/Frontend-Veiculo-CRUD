import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VeiculoListComponent } from './veiculos/components/veiculo-list/veiculo-list.component';
import { VeiculoFormComponent } from './veiculos/components/veiculo-form/veiculo-form.component';

@NgModule({
  declarations: [
    AppComponent,
    VeiculoListComponent,
    VeiculoFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
