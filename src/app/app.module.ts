import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { TrainerComponent } from './trainer/trainer.component';
import { AdminComponent } from './admin/admin.component';
import { ItemsComponent } from './items/items.component';
import { MovesComponent } from './moves/moves.component';
import { TradeComponent } from './trade/trade.component';
import { AppRoutingModule } from './app-routing.module';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { authInterceptorProviders } from './interceptors/auth.interceptor';
import { StorageComponent } from './storage/storage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/modules/material/material.module';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShopComponent } from './shop/shop.component';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    TrainerComponent,
    AdminComponent,
    ItemsComponent,
    MovesComponent,
    TradeComponent,
    NavComponent,
    HomeComponent,
    LoginComponent,
    StorageComponent,
    RegisterComponent,
    FooterComponent,
    RegisterComponent,
    FooterComponent,
    DashboardComponent,
    ShopComponent,
    StorageComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    //authInterceptorProviders turn it on later
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
