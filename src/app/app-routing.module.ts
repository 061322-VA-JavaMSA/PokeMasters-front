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
import { StorageComponent } from './storage/storage.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { ShopComponent } from './shop/shop.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'trainer', component: TrainerComponent},
  { path: 'admin', component: AdminComponent },
  { path: 'moves', component: MovesComponent },
  { path: 'storage', component: StorageComponent },
  { path: 'pokemon', component: PokemonComponent },
  { path: 'trade', component: TradeComponent },
  { path: 'items', component: ItemsComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'shop', component: ShopComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
