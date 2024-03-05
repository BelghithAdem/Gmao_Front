import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailpreventiveComponent } from './detailpreventive.component';

describe('DetailpreventiveComponent', () => {
  let component: DetailpreventiveComponent;
  let fixture: ComponentFixture<DetailpreventiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailpreventiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailpreventiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
