import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService {

  private currentAudio: HTMLAudioElement | null = null;

  play(src: string) {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
    }

    this.currentAudio = new Audio(src);
    this.currentAudio.play();
  }

  stop() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
  }
}
