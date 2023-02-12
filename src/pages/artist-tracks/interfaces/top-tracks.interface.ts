import { IAttr } from '../../artists/interfaces/base/attr.interface';
import { ITrack } from './track.interface';

export interface ITopTracks {
  track: ITrack[];
  '@attr': IAttr;
}
