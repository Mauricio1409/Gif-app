import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gifs.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs';


const loadFromLocalStorage = () => {
  const  gifFromLocalStorage = localStorage.getItem('gifs') ?? '{}';
  const gifs = JSON.parse(gifFromLocalStorage)
  return gifs

}




@Injectable({providedIn: 'root'})
export class GifServices {

  constructor() {
    this.loadTrendingGifs();

  }

  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trandingloading = signal(false);
  trendingPage = signal(0);


  trendingGifsGroup = computed<Gif[][]>(() =>{
    const groups = [];
    for (let index = 0; index < this.trendingGifs().length; index+=3) {
      groups.push(this.trendingGifs().slice(index, index +3))

    }

    return groups
  })

  historySearch = signal<Record<string, Gif[]>>(loadFromLocalStorage())

  historySearchKeys = computed(() => Object.keys(this.historySearch()))

  saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.historySearch());
    localStorage.setItem('gifs', historyString);
  })



  loadTrendingGifs(){
    if(this.trandingloading()) return;

    this.trandingloading.set(true);


      this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: 20,
          offset: this.trendingPage() * 20
        }

      }).subscribe((resp) => {
        const gifs = GifMapper.GiphyItemToGifArray(resp.data);
        this.trendingGifs.update(currentGifs => [... currentGifs, ... gifs]);
        this.trendingPage.update(page => page +1)

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

  getHistoryGifs(query: string){
    return this.historySearch()[query] ?? [];
  }

}
