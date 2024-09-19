import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoalquilerComponent } from './nuevoalquiler.component';

describe('NuevoalquilerComponent', () => {
  let component: NuevoalquilerComponent;
  let fixture: ComponentFixture<NuevoalquilerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoalquilerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoalquilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
