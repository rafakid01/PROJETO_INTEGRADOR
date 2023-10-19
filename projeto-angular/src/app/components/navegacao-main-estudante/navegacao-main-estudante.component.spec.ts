import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavegacaoMainEstudanteComponent } from './navegacao-main-estudante.component';

describe('NavegacaoMainEstudanteComponent', () => {
  let component: NavegacaoMainEstudanteComponent;
  let fixture: ComponentFixture<NavegacaoMainEstudanteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavegacaoMainEstudanteComponent]
    });
    fixture = TestBed.createComponent(NavegacaoMainEstudanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
