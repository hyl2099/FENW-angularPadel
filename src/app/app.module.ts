import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { BannerComponent } from './banner/banner.component';
import { IndexcontentComponent } from './indexcontent/indexcontent.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { InstalacionesComponent } from './instalaciones/instalaciones.component';
import { ReservasComponent } from './reservas/reservas.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MenuComponent,
    BannerComponent,
    IndexcontentComponent,
    ServiciosComponent,
    InstalacionesComponent,
    ReservasComponent,
    RegistroComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
