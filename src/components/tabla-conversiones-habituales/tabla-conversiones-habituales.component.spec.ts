import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaConversionesHabitualesComponent } from './tabla-conversiones-habituales.component';

describe('TablaConversionesHabitualesComponent', () => {
  let component: TablaConversionesHabitualesComponent;
  let fixture: ComponentFixture<TablaConversionesHabitualesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaConversionesHabitualesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaConversionesHabitualesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
