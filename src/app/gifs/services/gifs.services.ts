import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gifs.interface';
import { GifMapper } from '../mapper/gif.mapper';

@Injectable({providedIn: 'root'})
export class GifServices {

  constructor() {
    this.loadTrendingGifs();

  }

  trendingGifs = signal<Gif[]>([]);
  trandingloading = signal(true);

  private http = inject(HttpClient);



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

}
