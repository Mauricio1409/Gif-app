import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifServices } from '../../../services/gifs.services';

interface menuOptions{
  icon: string;
  label: string;
  subLabel: string;
  route: string
}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuOptionsComponent {

  GifServices = inject(GifServices);

  menuOptios : menuOptions[] = [{
    icon: "fa-solid fa-chart-line",
    label: "Trending",
    subLabel: "Gif Populares",
    route: "/dashboard/trending"
  },
  {

    icon: "fa-solid fa-magnifying-glass",
    label: "Buscador",
    subLabel: "Buscar Gif",
    route: "/dashboard/search"
  },



]

}
