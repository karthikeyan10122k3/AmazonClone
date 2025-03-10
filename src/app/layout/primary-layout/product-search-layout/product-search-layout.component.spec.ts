import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSearchLayoutComponent } from './product-search-layout.component';

describe('ProductSearchLayoutComponent', () => {
  let component: ProductSearchLayoutComponent;
  let fixture: ComponentFixture<ProductSearchLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSearchLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSearchLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
