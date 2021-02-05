import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPostSiteComponent } from './new-post-site.component';

describe('NewPostSiteComponent', () => {
  let component: NewPostSiteComponent;
  let fixture: ComponentFixture<NewPostSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPostSiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPostSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
