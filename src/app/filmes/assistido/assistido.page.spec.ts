import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssistidoPage } from './assistido.page';

describe('AssistidoPage', () => {
  let component: AssistidoPage;
  let fixture: ComponentFixture<AssistidoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
