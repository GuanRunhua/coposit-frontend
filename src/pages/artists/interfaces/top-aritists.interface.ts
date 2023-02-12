import { IArtist } from './base/artist.interface';
import { IAttr } from './base/attr.interface';

export interface ITopartists {
  artist: IArtist[];
  '@attr': IAttr;
}
