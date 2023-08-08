import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExpenseDataService } from 'src/app/expense-data.service';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: User,
    private dialogRef: MatDialogRef<UserFormComponent>,
    private formBuilder: FormBuilder,
    private expenseDataService: ExpenseDataService
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: new FormControl(this.user.firstName, [Validators.required]),
      lastName: new FormControl(this.user.lastName, [Validators.required]),
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  updateUser(user: User) {
    let newUser: User = {
      firstName: this.userForm.get('firstName')?.value,
      lastName: this.userForm.get('lastName')?.value,
      employeeId: this.user.employeeId,
      totalExpense: this.user.totalExpense,
    };
    if (
      newUser.firstName != user.firstName ||
      newUser.lastName != user.lastName
    ) {
      this.expenseDataService.updateUserName(user, newUser);
    }
    this.closeDialog();
  }
}
