import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntryFormsPage } from './entry-forms.page';

describe('EntryFormsPage', () => {
  let component: EntryFormsPage;
  let fixture: ComponentFixture<EntryFormsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryFormsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
