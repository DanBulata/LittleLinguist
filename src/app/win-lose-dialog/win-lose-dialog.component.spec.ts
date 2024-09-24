import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WinLoseDialogComponent } from './win-lose-dialog.component';

describe('WinLoseDialogComponent', () => {
  let component: WinLoseDialogComponent;
  let fixture: ComponentFixture<WinLoseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WinLoseDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WinLoseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
