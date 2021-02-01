import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSiteComponent } from './post-site.component';

describe('PostSiteComponent', () => {
  let component: PostSiteComponent;
  let fixture: ComponentFixture<PostSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostSiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
