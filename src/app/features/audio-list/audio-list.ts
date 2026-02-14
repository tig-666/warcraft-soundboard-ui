import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from '../../core/models/character.model';
import { AudioPlayerService } from '../../core/services/audio-player';

@Component({
  selector: 'app-audio-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audio-list.html',
  styleUrl: './audio-list.css'
})
export class AudioListComponent {

  private player = inject(AudioPlayerService);
  currentPlayingId: string | null = null;


  @Input() character: Character | null = null;

playAudio(audio: any) {
  this.currentPlayingId = audio.id;
  this.player.play(audio.file);
}

}
