import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaRicettaComponent } from './crea-ricetta.component';

describe('CreaRicettaComponent', () => {
  let component: CreaRicettaComponent;
  let fixture: ComponentFixture<CreaRicettaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreaRicettaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreaRicettaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
