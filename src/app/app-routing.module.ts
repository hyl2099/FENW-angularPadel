import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {IndexcontentComponent} from './indexcontent/indexcontent.component';
import {ServiciosComponent} from './servicios/servicios.component';
import {InstalacionesComponent} from './instalaciones/instalaciones.component';
import {ReservasComponent} from './reservas/reservas.component';
import {RegistroComponent} from './registro/registro.component';
import {MenuComponent} from './menu/menu.component';

const routes: Routes = [
  {path: '', component: IndexcontentComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'inicio', component: IndexcontentComponent},
  {path: 'servicios', component: ServiciosComponent},
  {path: 'instalaciones', component: InstalacionesComponent},
  {path: 'reservas', component: ReservasComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
