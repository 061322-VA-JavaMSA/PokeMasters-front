import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonComponent } from './pokemon/pokemon.component';
import { TrainerComponent } from './trainer/trainer.component';
import { MovesComponent } from './moves/moves.component';
import { AdminComponent } from './admin/admin.component';
import { ItemsComponent } from './items/items.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TradeComponent } from './trade/trade.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'trainer', component: TrainerComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'moves', component: MovesComponent },
  { path: 'pokemon', component: PokemonComponent },
  { path: 'trade', component: TradeComponent },
  { path: 'items', component: ItemsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }