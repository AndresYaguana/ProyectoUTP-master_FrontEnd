import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarSeccionesCursoComponent } from './agregar-secciones-curso.component';

describe('AgregarSeccionesCursoComponent', () => {
  let component: AgregarSeccionesCursoComponent;
  let fixture: ComponentFixture<AgregarSeccionesCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarSeccionesCursoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarSeccionesCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
