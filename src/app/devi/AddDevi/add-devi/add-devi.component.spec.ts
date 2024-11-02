import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeviComponent } from './add-devi.component';

describe('AddDeviComponent', () => {
  let component: AddDeviComponent;
  let fixture: ComponentFixture<AddDeviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDeviComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDeviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
