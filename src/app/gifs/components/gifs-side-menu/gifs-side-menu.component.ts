import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SideMenuHeaderComponent } from './side-menu-header/side-menu-header.component';
import { SideMenuOptionsComponent } from './side-menu-options/side-menu-options.component';

@Component({
  selector: 'app-gifs-side-menu',
  imports: [SideMenuHeaderComponent, SideMenuOptionsComponent],
  templateUrl: './gifs-side-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifsSideMenuComponent { }
