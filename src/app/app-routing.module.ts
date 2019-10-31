import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuperHeroesComponent } from "./components/superheroes/superheroes.component"
import { SuperHeroesDetailComponent } from "./components/superheroes_detail/superheroes_detail.component"
import { LoginComponent } from "./components/login/login.component"


const routes: Routes = [
  {
    path: "", component: LoginComponent
  },
  {
    path: "", redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: "superheroes", component: SuperHeroesComponent
  },
  {
    path: "superheroes-detail/:id", component: SuperHeroesDetailComponent
  },
  {
    path: "login", component: LoginComponent
  },
  {
    path: "**", component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
