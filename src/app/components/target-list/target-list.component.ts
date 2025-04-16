import { Component, OnInit } from '@angular/core';
import { PlayerService, Player } from '../../services/player.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-target-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './target-list.component.html',
  styleUrls: ['./target-list.component.scss']
})
export class TargetListComponent implements OnInit {
  players: Player[] = [];
  editingField: { [id: number]: string } = {};

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.playerService.getPlayers().subscribe(players => {
      // Only include targeted players
      this.players = players.filter(p => p['targeted']);
    });
  }

  untargetPlayer(player: Player): void {
    const updated = { ...player, targeted: 0 };
    this.playerService.updatePlayer(player.id!, updated).subscribe(() => {
      this.players = this.players.filter(p => p.id !== player.id);
    });
  }

  setEditing(id: number, field: string): void {
    this.editingField[id] = field;
  }

  saveInline(player: Player) {
    const updated = { ...player };
    this.playerService.updatePlayer(player.id!, updated).subscribe(() => {
      this.editingField[player.id!] = null;
    });
  }
  

  encodeSearchQuery(name: string, school: string): string {
    return encodeURIComponent(`${name} ${school}`);
  }

  getRowColor(level: number | null | undefined): string {
    console.log(level)
    if (level == null) return '';
    if (level >= 0 && level <= 3) return 'bg-red-900';
    if (level >= 4 && level <= 6) return 'bg-yellow-900';
    if (level >= 7 && level <= 9) return 'bg-green-900';
    if (level === 10) return 'bg-yellow-700';
    return '';
  }
  

  getSearchLink(player: Player, platform: 'instagram' | 'twitter' | 'google'): string {
    const name = player.player_name?.replace(/\s+/g, '') ?? '';
    const fullName = `${player.player_name} ${player.school}`.trim();
  
    switch (platform) {
      case 'instagram':
        return `https://www.instagram.com/${encodeURIComponent(name)}`;
      case 'twitter':
        return `https://twitter.com/search?q=${encodeURIComponent(fullName)}`;
      case 'google':
        return `https://www.google.com/search?q=site:twitter.com+OR+site:instagram.com+${encodeURIComponent(fullName)}`;
      default:
        return '#';
    }
  }
  
}
