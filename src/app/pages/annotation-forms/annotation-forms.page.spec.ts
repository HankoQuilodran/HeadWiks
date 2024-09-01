import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnnotationFormsPage } from './annotation-forms.page';

describe('AnnotationFormsPage', () => {
  let component: AnnotationFormsPage;
  let fixture: ComponentFixture<AnnotationFormsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotationFormsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
