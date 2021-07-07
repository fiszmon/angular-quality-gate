import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SightAddEditComponent } from './sight-add-edit.component';

describe('SightAddEditComponent', () => {
  let component: SightAddEditComponent;
  let fixture: ComponentFixture<SightAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SightAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SightAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
