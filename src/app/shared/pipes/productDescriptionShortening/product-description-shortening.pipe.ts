import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productDescriptionShortening'
})
export class ProductDescriptionShorteningPipe implements PipeTransform {

  transform(productDescription: string, ...args: unknown[]): string {
    return productDescription.length > 50 
      ? productDescription.substring(0, 50) + '...' 
      : productDescription;
  }
  

}
