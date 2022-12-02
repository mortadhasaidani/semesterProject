import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FormDogComponent} from './form-dog.component';

describe('FormDogComponent', () => {
  let component: FormDogComponent;
  let fixture: ComponentFixture<FormDogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormDogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormDogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
