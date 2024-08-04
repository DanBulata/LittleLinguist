import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCategoryDialogComponent } from './select-category-dialog.component';

describe('SelectCategoryDialogComponent', () => {
  let component: SelectCategoryDialogComponent;
  let fixture: ComponentFixture<SelectCategoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectCategoryDialogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SelectCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
