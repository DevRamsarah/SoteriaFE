import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGuardComponent } from './new-guard.component';

describe('NewGuardComponent', () => {
  let component: NewGuardComponent;
  let fixture: ComponentFixture<NewGuardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewGuardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGuardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
