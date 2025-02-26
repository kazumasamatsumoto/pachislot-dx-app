import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CounterHistoryComponent } from './counter-history/counter-history.component';
import { IncomeAndExpenditureComponent } from './income-and-expenditure/income-and-expenditure.component';
import { Page3Component } from './page3/page3.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'counter-history', component: CounterHistoryComponent },
  { path: 'income-and-expenditure', component: IncomeAndExpenditureComponent },
  { path: 'page3', component: Page3Component },
];
