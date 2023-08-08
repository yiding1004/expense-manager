import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { provideAnimations } from '@angular/platform-browser/animations';

import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { ExpenseComponent } from './expense/expense.component';
import { NewUserComponent } from './user/new-user/new-user.component';
import { NewExpenseComponent } from './expense/new-expense/new-expense.component';
import { ExpenseFormComponent } from './expense/expense-form/expense-form.component';
import { CompanyExpensesComponent } from './company-expenses/company-expenses.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserFormComponent,
    ExpenseComponent,
    NewUserComponent,
    NewExpenseComponent,
    ExpenseFormComponent,
    CompanyExpensesComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatTabsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [provideAnimations()],
  bootstrap: [AppComponent],
})
export class AppModule {}
