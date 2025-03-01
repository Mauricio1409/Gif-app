import { Gif } from '../interfaces/gifs.interface';
import { GiphyItem } from '../interfaces/giphy.interfaces';
export class GifMapper{
  static mapGiphyItemGif(giphyItem: GiphyItem): Gif{
    return {
      id: giphyItem.id,
      title: giphyItem.title,
      url: giphyItem.images.original.url
    }


  }

  static GiphyItemToGifArray(item: GiphyItem[]): Gif[]{
      return item.map(this.mapGiphyItemGif)
  }
}
