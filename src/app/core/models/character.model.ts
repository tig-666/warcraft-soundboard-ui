import { Audio } from './audio.model';

export interface Character {
  name: string;
  image: string;
  audios: Audio[];
}