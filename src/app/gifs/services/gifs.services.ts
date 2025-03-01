import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gifs.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs';
import { GiphyItem } from '../interfaces/giphy.interfaces';

@Injectable({providedIn: 'root'})
export class GifServices {

  constructor() {
    this.loadTrendingGifs();

  }

  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trandingloading = signal(true);

  historySearch = signal<Record<string, Gif[]>>({})

  historySearchKeys = computed(() => Object.keys(this.historySearch()))



  loadTrendingGifs(){
      this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: 20
        }

      }).subscribe((resp) => {
        const gifs = GifMapper.GiphyItemToGifArray(resp.data);
        this.trendingGifs.set(gifs);
        this.trandingloading.set(false);
        console.log(gifs)
      })
  }

searchGifs(query: string){

  return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
    params: {
      api_key: environment.giphyApiKey,
      limit: 20,
      q: query,
    }

  }).pipe(
    map(({data}) => GifMapper.GiphyItemToGifArray(data)),
    tap((items) => {
      this.historySearch.update((history) => ({
        ...history,
        [query.toLowerCase()]: items,
      }));
    })

  )
  // .subscribe((resp) => {
  //   const gifs = GifMapper.GiphyItemToGifArray(resp.data);

  //   console.log(gifs)
  // })
}

}
