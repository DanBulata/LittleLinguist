import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameResultCardComponent } from './game-result-card.component';

describe('GameResultCardComponent', () => {
  let component: GameResultCardComponent;
  let fixture: ComponentFixture<GameResultCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameResultCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameResultCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
