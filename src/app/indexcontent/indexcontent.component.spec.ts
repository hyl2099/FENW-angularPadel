import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexcontentComponent } from './indexcontent.component';

describe('IndexcontentComponent', () => {
  let component: IndexcontentComponent;
  let fixture: ComponentFixture<IndexcontentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexcontentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
