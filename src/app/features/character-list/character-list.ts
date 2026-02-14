import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  signal,
  effect
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioService } from '../../core/services/audio';
import { Race } from '../../core/models/race.model';
import { Character } from '../../core/models/character.model';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-list.html',
  styleUrl: './character-list.css'
})
export class CharacterListComponent {

  private audioService = inject(AudioService);

  @Input() raceName: string | null = null;
  @Output() characterSelected = new EventEmitter<Character>();

  characters = signal<Character[]>([]);
  selectedCharacter = signal<Character | null>(null);

  ngOnChanges() {
    if (!this.raceName) return;

    this.audioService.getRace(this.raceName).subscribe((race: Race) => {
      this.characters.set(race.characters);
      this.selectedCharacter.set(null);
    });
  }

  selectCharacter(character: Character) {
    this.selectedCharacter.set(character);
    this.characterSelected.emit(character);
  }
}
