import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioService } from '../../core/services/audio';

@Component({
  selector: 'app-race-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './race-list.html',
  styleUrl: './race-list.css'
})
export class RaceListComponent {

  private audioService = inject(AudioService);

  races = signal<string[]>([]);
  selectedRace = signal<string | null>(null);

  @Output() raceSelected = new EventEmitter<string>();

  ngOnInit() {
    this.audioService.getRaceList().subscribe(races => {
      this.races.set(races);
    });
  }

  selectRace(race: string) {
    this.selectedRace.set(race);
    this.raceSelected.emit(race);
  }
}
