import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlayerService, Player } from '../../services/player.service';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';


@Component({
  standalone: true,
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
  imports: [CommonModule, FormsModule, RouterModule] // ← this is required
})

export class PlayerListComponent implements OnInit {
  players: Player[] = [];

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.loadPlayers();
  }

  loadPlayers(): void {
    this.playerService.getPlayers(this.filters).subscribe(data => {
      this.players = data;
    });
  }
  

  filters = {
    school: '',
    grad_year: '',
    position: '',
    season: '',
    player_name: ''
  };
  

applyFilters(): void {
  console.log('Filters applied:', this.filters);

  this.playerService.getPlayers(this.filters).subscribe(data => {
    this.players = data;
  });
}

fetchPlayers() {
  this.playerService.getPlayers(this.filters).subscribe(players => {
    this.players = players;
  });
}


toggleTarget(player: Player) {
  const updatedPlayer = {
    ...player,
    targeted: player.targeted === 1 ? 0 : 1
  };

  this.playerService.updatePlayer(updatedPlayer.id!, updatedPlayer).subscribe(() => {
    player.targeted = updatedPlayer.targeted;
  });
}

  clearFilters(): void {
    this.filters = {
      school: '',
      grad_year: '',
      position: '',
      season: '',
      player_name: ''
    };
    
    this.loadPlayers();
  }
}
