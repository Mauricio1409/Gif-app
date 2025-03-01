import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { GifsListComponent } from '../../components/gifs-list/gifs-list.component';
import { GifServices } from '../../services/gifs.services';
import { Gif } from '../../interfaces/gifs.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifsListComponent],
  templateUrl: './search-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchPageComponent {

  GifsServices = inject(GifServices)
  gifs = signal<Gif[]>([])



  onSearch(query: string){
    this.GifsServices.searchGifs(query).subscribe((resp) => {
        this.gifs.set(resp)
    })
  }
}
