import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultPaneComponent } from './result-pane.component';

describe('ResultPaneComponent', () => {
  let component: ResultPaneComponent;
  let fixture: ComponentFixture<ResultPaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultPaneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
