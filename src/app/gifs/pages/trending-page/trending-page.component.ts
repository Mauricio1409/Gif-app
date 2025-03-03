import { AfterViewInit, Component, ElementRef, inject, viewChild } from '@angular/core';
import { GifServices } from '../../services/gifs.services';
import { ScrollStateServices } from 'src/app/shared/services/scroll-state.services';



@Component({
  selector: 'app-trending-page',
  // imports: [GifsListComponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent implements AfterViewInit{

  gifService = inject(GifServices);
  scrollStateServices = inject(ScrollStateServices)


  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv')

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollStateServices.trendingScrollState()
  }


  // Verificar que tamto scroll le queda
  onScroll(event : Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    // Scroll que lleva
    const scrollTop = scrollDiv.scrollTop;

    // Lo que el cliente ve en la pantalla
    const clientHeight = scrollDiv.clientHeight;

    // Tamaño total de la pagina
    const scrollHeight = scrollDiv.scrollHeight;

    const isAtBottom = (clientHeight + scrollTop + 300 ) > scrollHeight;
    // +300 para que le de tiempo a la pagina para que cargue

    this.scrollStateServices.trendingScrollState.set(scrollTop);

    if(isAtBottom){
      this.gifService.loadTrendingGifs();
    }

 }}
