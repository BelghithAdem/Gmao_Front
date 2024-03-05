import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatepreventiveComponent } from './createpreventive.component';

describe('CreatepreventiveComponent', () => {
  let component: CreatepreventiveComponent;
  let fixture: ComponentFixture<CreatepreventiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatepreventiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatepreventiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
