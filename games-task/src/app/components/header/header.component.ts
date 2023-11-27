import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { IGame, IProvider } from 'src/app/data/data.entity';
import { DataService } from 'src/app/data/data.service';
import { FilterService } from 'src/app/data/filter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  genreFilter: string[] = ['slot', 'rulet', 'blackjack', 'poker'];
  providers$: Observable<IProvider[]>;
  games$: Observable<IGame[]>;

  dropdownFilter: string[] = [
    'Bonus AI',
    'New',
    'PP Jackpot',
    '1.000.000 Euro Cash',
  ];

  buttonFilters: string[] = ['All', 'Favorites', 'Popular', '20% Cash Back'];

  filterValue: string = '';
  isDesktop$: Subscription;

  constructor(
    public dataService: DataService,
    public filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.providers$ = this.dataService.getProviders();
    this.games$ = this.dataService.getGames();
  }

  getValue() {
    return this.buttonFilters.concat(this.dropdownFilter);
  }

  onFilterChange(value: string) {
    this.filterService.filterByInput(value);
  }
}
