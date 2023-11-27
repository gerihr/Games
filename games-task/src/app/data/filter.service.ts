import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { DataService } from './data.service';
import { IGame } from './data.entity';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  public buttonFilter = new BehaviorSubject<string>('All');
  private providerFilter = new BehaviorSubject<string>('');
  private genreFilter = new BehaviorSubject('');
  private inputFilter = new BehaviorSubject<string>('');

  constructor(private dataService: DataService) {}

  setButtonFilter(value) {
    this.buttonFilter.next(value);
    this.buttonFiltered();
    this.setProviderFilter('');
    this.setGenreFilter('');
  }

  getButtonFilter() {
    return this.buttonFilter;
  }

  setProviderFilter(value) {
    this.providerFilter.next(value);
    this.newFilter();
  }

  getProviderFilter() {
    return this.providerFilter;
  }

  setGenreFilter(value) {
    this.genreFilter.next(value);
    this.newFilter();
  }

  getGenreFilter() {
    return this.genreFilter;
  }
  setInputFilter(value) {
    this.inputFilter.next(value);
  }

  getInputFilter() {
    return this.inputFilter;
  }

  buttonFiltered() {
    let newfiltered$ = combineLatest([
      this.dataService.allGames$,
      this.dataService.favorites$,
      this.dataService.popular$,
      this.dataService.otherFilters,
      this.buttonFilter,
    ]).pipe(
      map(
        ([allGames, favoriteGameIds, popularGamesIds, otherId, buttonFilter]) =>
          allGames.filter((game) => {
            if (buttonFilter == 'Favorites') {
              return favoriteGameIds.includes(game.id);
            } else if (buttonFilter == 'Popular') {
              return popularGamesIds.includes(game.id);
            } else if (buttonFilter == 'All') {
              return true;
            } else {
              return otherId.includes(game.id);
            }
          })
      )
    );

    this.dataService.filteredGames$ = newfiltered$;
  }

  newFilter() {
    let newfiltered$ = combineLatest([
      this.genreFilter,
      this.providerFilter,
      this.dataService.filteredGames$,
    ]).pipe(
      map(([genreFilter, providerFilter, buttonsFiltered]) =>
        buttonsFiltered.filter((game) => {
          return (
            (genreFilter !== '' ? game.genre == genreFilter : true) &&
            (providerFilter !== '' ? game.providerName == providerFilter : true)
          );
        })
      )
    );

    this.dataService.filteredGames$ = newfiltered$;
  }

  filterByInput(value: string) {
    let lowerCaseValue = value.toLocaleLowerCase();
    let newfiltered$ = this.dataService.allGames$.pipe(
      map((games) =>
        games.filter(
          (game) =>
            game.title.toLowerCase().includes(lowerCaseValue) ||
            game.providerName?.toLowerCase().includes(lowerCaseValue) ||
            game.genre.toLowerCase().includes(lowerCaseValue)
        )
      )
    );

    this.dataService.filteredGames$ = newfiltered$;
  }
}
