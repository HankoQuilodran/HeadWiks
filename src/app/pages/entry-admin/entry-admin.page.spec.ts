import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntryAdminPage } from './entry-admin.page';

describe('EntryAdminPage', () => {
  let component: EntryAdminPage;
  let fixture: ComponentFixture<EntryAdminPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
