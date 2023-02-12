import { IImage } from './image.interface';

export interface IArtist {
  name: string;
  listeners: string;
  mbid: string;
  url: string;
  streamable: string;
  image: IImage[];
}
