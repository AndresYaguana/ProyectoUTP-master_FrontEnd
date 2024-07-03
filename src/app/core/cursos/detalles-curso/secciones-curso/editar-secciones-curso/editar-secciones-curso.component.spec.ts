import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarSeccionesCursoComponent } from './editar-secciones-curso.component';

describe('EditarSeccionesCursoComponent', () => {
  let component: EditarSeccionesCursoComponent;
  let fixture: ComponentFixture<EditarSeccionesCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarSeccionesCursoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarSeccionesCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
