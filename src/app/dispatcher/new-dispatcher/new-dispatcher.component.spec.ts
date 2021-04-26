import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDispatcherComponent } from './new-dispatcher.component';

describe('NewDispatcherComponent', () => {
  let component: NewDispatcherComponent;
  let fixture: ComponentFixture<NewDispatcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDispatcherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDispatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
