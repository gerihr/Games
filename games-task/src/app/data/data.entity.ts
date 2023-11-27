export interface IGame {
  title: string;
  id: string;
  provider: string;
  image: string;
  genre: 'slot' | 'rulet' | 'blackjack' | 'poker';
  providerName?: string;
}

export interface IProvider {
  id: string;
  name: string;
  logo: string;
}
