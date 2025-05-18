import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiretorPage } from './diretor.page';

describe('DiretorPage', () => {
  let component: DiretorPage;
  let fixture: ComponentFixture<DiretorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DiretorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
