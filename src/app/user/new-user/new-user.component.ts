import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ExpenseDataService } from 'src/app/expense-data.service';
import { CATEGORIES, Expense, User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {
  newUserForm!: FormGroup;
  categories = CATEGORIES;

  constructor(
    private formBuilder: FormBuilder,
    private expenseDataService: ExpenseDataService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.newUserForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      // category: new FormControl('', [Validators.required]),
      // description: new FormControl('', [Validators.required]),
      // cost: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(formDirective: FormGroupDirective) {
    let newUser: User = {
      employeeId: JSON.stringify(new Date()),
      firstName: this.newUserForm.get('firstName')?.value,
      lastName: this.newUserForm.get('lastName')?.value,
      // category: this.newUserForm.get('category')?.value,
      // description: this.newUserForm.get('description')?.value,
      // cost: +this.newUserForm.get('cost')?.value,
    };
    this.expenseDataService.addNewUser(newUser);
    this.newUserForm.reset();
    formDirective.resetForm();
    console.log(this.newUserForm);
  }
}
