import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaIngredientiComponent } from './lista-ingredienti.component';

describe('ListaIngredientiComponent', () => {
  let component: ListaIngredientiComponent;
  let fixture: ComponentFixture<ListaIngredientiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaIngredientiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaIngredientiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
