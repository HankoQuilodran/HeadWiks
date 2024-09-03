import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntryPreviewPage } from './entry-preview.page';

describe('EntryPreviewPage', () => {
  let component: EntryPreviewPage;
  let fixture: ComponentFixture<EntryPreviewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryPreviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
