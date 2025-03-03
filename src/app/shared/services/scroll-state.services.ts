import { Injectable, signal } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ScrollStateServices {

  trendingScrollState = signal(0);

}
