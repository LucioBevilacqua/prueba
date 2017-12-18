import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



import { AppComponent } from './app.component';

//service
import { SalesService } from './services/sales.service';
import { VentaComponent } from './components/venta/venta.component';


@NgModule({
  declarations: [
    AppComponent,
    VentaComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    SalesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
