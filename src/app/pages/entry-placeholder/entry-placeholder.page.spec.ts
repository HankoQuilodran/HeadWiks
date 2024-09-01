import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntryPlaceholderPage } from './entry-placeholder.page';

describe('EntryPlaceholderPage', () => {
  let component: EntryPlaceholderPage;
  let fixture: ComponentFixture<EntryPlaceholderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryPlaceholderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
