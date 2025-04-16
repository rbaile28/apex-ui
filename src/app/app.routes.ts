import { Routes } from '@angular/router';
import { PlayerDetailComponent } from './components/player-detail/player-detail.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { TargetListComponent } from './components/target-list/target-list.component';


export const routes: Routes = [
  { path: '', component: PlayerListComponent },
  { path: 'players/:id', component: PlayerDetailComponent },
  { path: 'targets', component: TargetListComponent }
];
