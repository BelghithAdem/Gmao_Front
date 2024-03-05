import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifpreventiveComponent } from './modifpreventive.component';

describe('ModifpreventiveComponent', () => {
  let component: ModifpreventiveComponent;
  let fixture: ComponentFixture<ModifpreventiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifpreventiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifpreventiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
