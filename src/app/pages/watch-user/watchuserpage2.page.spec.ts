import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WatchUserPage } from './watch-user.page';

describe('Watchuserpage2Page', () => {
  let component: WatchUserPage;
  let fixture: ComponentFixture<WatchUserPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
