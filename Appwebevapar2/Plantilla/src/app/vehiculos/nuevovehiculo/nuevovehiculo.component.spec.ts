import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevovehiculoComponent } from './nuevovehiculo.component';

describe('NuevovehiculoComponent', () => {
  let component: NuevovehiculoComponent;
  let fixture: ComponentFixture<NuevovehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevovehiculoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevovehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
