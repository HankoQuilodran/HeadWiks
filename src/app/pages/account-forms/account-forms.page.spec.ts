import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountFormsPage } from './account-forms.page';

describe('AccountFormsPage', () => {
  let component: AccountFormsPage;
  let fixture: ComponentFixture<AccountFormsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountFormsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
