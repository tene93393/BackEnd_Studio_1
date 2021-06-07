import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamSetupComponentComponent } from './param-setup-component.component';

describe('ParamSetupComponentComponent', () => {
  let component: ParamSetupComponentComponent;
  let fixture: ComponentFixture<ParamSetupComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParamSetupComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamSetupComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
