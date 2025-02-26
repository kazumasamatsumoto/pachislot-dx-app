import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterHistoryComponent } from './counter-history/counter-history.component';

const routes: Routes = [{ path: '', component: CounterHistoryComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
