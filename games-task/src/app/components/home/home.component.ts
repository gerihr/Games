import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  gamesData$: any;
  constructor(public dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getAllGames();
    this.dataService.getFavorites();
    this.dataService.getPopular();
  }

  resetFilters() {
    this.dataService.getAllGames();
  }
}
