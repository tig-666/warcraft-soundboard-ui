import { Component, signal } from '@angular/core';
import { RaceListComponent } from './features/race-list/race-list';
import { CharacterListComponent } from './features/character-list/character-list';
import { CommonModule } from '@angular/common';
import { Character } from './core/models/character.model';
import { AudioListComponent } from './features/audio-list/audio-list';


@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RaceListComponent,
    CharacterListComponent,
    AudioListComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  selectedRace = signal<string | null>(null);
  selectedCharacter = signal<Character | null>(null);

  onRaceSelected(race: string) {
    this.selectedRace.set(race);
    this.selectedCharacter.set(null);
  }

  onCharacterSelected(character: Character) {
    this.selectedCharacter.set(character);
  }
}
