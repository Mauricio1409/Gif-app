import { Gif } from '../interfaces/gifs.interface';
import { GiphyItem } from '../interfaces/giphy.interfaces';
export class GifMapper{
  static mapGiphyItemGif(Items: GiphyItem): Gif{
    return {
      id: Items.id,
      title: Items.title,
      url: Items.images.original.url
    }


  }

  static GiphyItemToGifArray(item: GiphyItem[]): Gif[]{
      return item.map(this.mapGiphyItemGif)
  }
}
