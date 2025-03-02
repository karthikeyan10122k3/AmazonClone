import { ProductDescriptionShorteningPipe } from './product-description-shortening.pipe';

describe('ProductDescriptionShorteningPipe', () => {
  it('create an instance', () => {
    const pipe = new ProductDescriptionShorteningPipe();
    expect(pipe).toBeTruthy();
  });
});
