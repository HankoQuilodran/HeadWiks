import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormsModule } from '@angular/forms';
import { EntryPreviewPage } from './entry-preview.page';
import { CommonModule } from '@angular/common';

describe('EntryPreviewPage', () => {
  let component: EntryPreviewPage;
  let fixture: ComponentFixture<EntryPreviewPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntryPreviewPage],
      imports: [IonicModule.forRoot(), FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(EntryPreviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
