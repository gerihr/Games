import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  combineLatest,
  map,
  mergeMap,
  of,
  shareReplay,
} from 'rxjs';
import { IGame, IProvider } from './data.entity';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly BASE_URL = 'http://localhost:3000';
  public favorites$: Observable<string[]>;
  public popular$: Observable<string[]>;
  public providers$: Observable<IProvider[]>;
  public filteredGames$: Observable<IGame[]>;
  public allGames$: Observable<IGame[]>;

  public otherFilters: BehaviorSubject<string[]> = new BehaviorSubject(['000']);

  constructor(private http: HttpClient) {}
  getGames(): Observable<IGame[]> {
    if (!this.allGames$) {
      this.allGames$ = this.http.get(`${this.BASE_URL}/games`).pipe(
        mergeMap((res: any) => {
          return this.getProviders().pipe(
            map((providersResponse: IProvider[]) => {
              const providers = providersResponse;
              const games = res.map((game: IGame) => {
                const provider = providers.find(
                  (p: any) => p.id === game.provider
                );
                if (provider) {
                  return { ...game, providerName: provider.name };
                }
                return game;
              });
              return games;
            })
          );
        }),
        shareReplay(1),
        catchError((err) => of(err))
      );
    }

    return this.allGames$;
  }

  getAllGames(): Observable<IGame[]> {
    this.filteredGames$ = this.getGames();
    return this.filteredGames$;
  }

  getFilteredGames() {
    return this.filteredGames$;
  }

  getProviders(): Observable<IProvider[]> {
    if (!this.providers$) {
      this.providers$ = this.http
        .get<IProvider[]>(`${this.BASE_URL}/providers`)
        .pipe(shareReplay());
    }

    return this.providers$;
  }

  getPopular(): Observable<string[]> {
    if (!this.popular$) {
      this.popular$ = this.http
        .get<string[]>(`${this.BASE_URL}/popular`)
        .pipe(shareReplay());
    }

    return this.popular$;
  }

  getFavorites(): Observable<string[]> {
    if (!this.favorites$) {
      this.favorites$ = this.http
        .get<string[]>(`${this.BASE_URL}/favorites`)
        .pipe(shareReplay());
    }

    return this.favorites$;
  }
}
