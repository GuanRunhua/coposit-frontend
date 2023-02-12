import { IArtist } from '../../artists/interfaces/base/artist.interface';
import { IImage } from '../../artists/interfaces/base/image.interface';

export interface ITrack {
  name: string;
  playcount: string;
  listeners: string;
  url: string;
  streamable: string;
  artist: IArtist;
  image: IImage[];
  mbid?: string;
  '@attr': {
    rank: string;
  };
}
