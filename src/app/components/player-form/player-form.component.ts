import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Player } from '../../services/player.service';

@Component({
  selector: 'app-player-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.scss']
})
export class PlayerFormComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<Player>();

  @Input() player: Player = {
    player_name: '',
    school: '',
    grad_year: '',
    position: '',
    season: '',
    roster_url: '',
    targeted: 0, // Default value for targeted
  };

  stages: { key: keyof Player; label: string; dateKey: keyof Player }[] = [
    { key: 'contacted', label: 'Contacted', dateKey: 'contacted_date' },
    { key: 'call', label: 'Phone Call', dateKey: 'call_date' },
    { key: 'offer', label: 'Offer', dateKey: 'offer_date' },
    { key: 'visit', label: 'Campus Visit', dateKey: 'visit_date' }
  ];

  getField<T extends keyof Player>(key: T): Player[T] {
    return this.player[key];
  }

  setField<T extends keyof Player>(key: T, value: Player[T]) {
    this.player[key] = value;
  }

  handleCheckboxChange(event: Event, key: keyof Player): void {
    const input = event.target as HTMLInputElement;
    this.setField(key, input.checked);
  }

  handleDateChange(event: Event, key: keyof Player): void {
    const input = event.target as HTMLInputElement;
    this.setField(key, input.value);
  }

  onSubmit(): void {
    this.save.emit(this.player);
  }
}
