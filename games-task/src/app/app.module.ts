import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { GameItemComponent } from './components/game-item/game-item.component';
import { FilterButtonComponent } from './components/filters/filter-button/filter-button.component';
import { FilterDropdownComponent } from './components/filters/filter-dropdown/filter-dropdown.component';
import { FilterInputComponent } from './components/filters/filter-input/filter-input.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FilterLabelDropdownComponent } from './components/filters/filter-label-dropdown/filter-label-dropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    GameItemComponent,
    FilterButtonComponent,
    FilterDropdownComponent,
    FilterInputComponent,
    FilterLabelDropdownComponent,
    HomeComponent,
    HeaderComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
