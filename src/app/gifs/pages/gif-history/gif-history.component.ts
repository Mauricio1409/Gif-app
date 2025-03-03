import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop'
import { map } from 'rxjs';
import { GifServices } from '../../services/gifs.services';
import { GifsListComponent } from '../../components/gifs-list/gifs-list.component';

@Component({
  selector: 'app-gif-history',
  imports: [GifsListComponent],
  templateUrl: './gif-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GifHistoryComponent {

  gifServices = inject(GifServices)

  query = toSignal(inject(ActivatedRoute).params.pipe(
    map(params => params['query']),
  )
);

gifsByKey = computed(() => this.gifServices.getHistoryGifs(this.query()));

}
