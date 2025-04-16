import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Player, PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-player-detail',
  standalone: true,
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class PlayerDetailComponent implements OnInit {
  player: Player | null = null;
  loading = true;
  editingField: string | null = null;

  fields = [
    { key: 'player_name', label: 'Name' },
    { key: 'school', label: 'School' },
    { key: 'grad_year', label: 'Class' },
    { key: 'position', label: 'Position' },
    { key: 'season', label: 'Season' },
    { key: 'phone', label: 'Phone' },
    { key: 'twitter', label: 'Twitter' },
    { key: 'instagram', label: 'Instagram' },
    { key: 'notes', label: 'Notes' },
    { key: 'club_team', label: 'Club Team' },
    { key: 'gpa', label: 'GPA' },
    { key: 'hudl', label: 'Hudl Link' },
    { key: 'maxpreps', label: 'MaxPreps Link' },
    { key: 'ncsa', label: 'NCSA Link' },
    { key: 'interest_ours', label: 'Our Interest Level (0-10)' },
    { key: 'interest_theirs', label: 'Their Interest Level (0-10)' },
    { key: 'contacted_date', label: 'Contacted Date', type: 'date' },
    { key: 'call_date', label: 'Phone Call Date', type: 'date' },
    { key: 'offer_date', label: 'Offer Date', type: 'date' },
    { key: 'visit_date', label: 'Visit Date', type: 'date' }
  ];
  

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.playerService.getPlayer(id).subscribe(player => {
      this.player = player;
      this.loading = false;
    });
  }

  editField(field: string) {
    this.editingField = field;
  }
  
  saveField(field: string) {
    if (this.player) {
      const updated = { ...this.player };
      this.playerService.updatePlayer(this.player.id!, updated).subscribe(() => {
        this.editingField = null;
      });
    }
  }
  
}
