import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyExpensesComponent } from './company-expenses.component';

describe('CompanyExpensesComponent', () => {
  let component: CompanyExpensesComponent;
  let fixture: ComponentFixture<CompanyExpensesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyExpensesComponent]
    });
    fixture = TestBed.createComponent(CompanyExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
