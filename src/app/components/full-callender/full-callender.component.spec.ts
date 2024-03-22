import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullCallenderComponent } from './full-callender.component';

describe('FullCallenderComponent', () => {
  let component: FullCallenderComponent;
  let fixture: ComponentFixture<FullCallenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullCallenderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullCallenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
