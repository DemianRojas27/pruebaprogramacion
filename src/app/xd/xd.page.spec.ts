import { ComponentFixture, TestBed } from '@angular/core/testing';
import { XdPage } from './xd.page';

describe('XdPage', () => {
  let component: XdPage;
  let fixture: ComponentFixture<XdPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(XdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
