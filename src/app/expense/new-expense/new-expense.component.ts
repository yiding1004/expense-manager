import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ExpenseDataService } from 'src/app/expense-data.service';
import { CATEGORIES, Expense, FullNameDetails } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-new-expense',
  templateUrl: './new-expense.component.html',
  styleUrls: ['./new-expense.component.scss'],
})
export class NewExpenseComponent implements OnDestroy {
  newExpenseForm!: FormGroup;
  fullNameDetails!: FullNameDetails[];
  categories = CATEGORIES;
  private subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private expenseDataService: ExpenseDataService
  ) {
    this.subscription = this.expenseDataService.expensesData$.subscribe(
      (expenses: Expense[]) => {
        this.fullNameDetails = this.expenseDataService.getAllFullNames(expenses);
        this.buildForm();
      }
    );
  }

  // ngOnInit(): void {
  //   this.buildForm();
  // }

  buildForm() {
    this.newExpenseForm = this.formBuilder.group({
      // fullNameDetails: new FormGroup({
      //   fullNames: new FormControl(''),
      //   employeeId: new FormControl('')
      // }),
      fullNameDetails: new FormControl(null, [Validators.required]),
      category: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      cost: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(formDirective: FormGroupDirective) {
    const fullNameDetails: FullNameDetails = this.newExpenseForm.get('fullNameDetails')?.value;
    console.log(fullNameDetails);
    const fullName = fullNameDetails.fullName;
    const newExpense: Expense = {
      id: this.expenseDataService.getExpensesLength() + 1,
      employeeId: fullNameDetails.employeeId,
      firstName: fullName.split(' ')[0],
      lastName: fullName.split(' ')[1],
      category: this.newExpenseForm.get('category')?.value,
      cost: this.newExpenseForm.get('cost')?.value,
      description: this.newExpenseForm.get('description')?.value,
    };
    this.expenseDataService.addNewExpense(newExpense);
    this.newExpenseForm.reset();
    formDirective.resetForm();
    console.log(this.newExpenseForm);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
