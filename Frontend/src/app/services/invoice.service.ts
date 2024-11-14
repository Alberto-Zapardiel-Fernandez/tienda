import { ClientInterface } from '../interfaces/client.interface';
import { ProductInterface } from '../interfaces/product-interface';

export class InvoiceService {
  generateInvoice(
    client: ClientInterface,
    products: ProductInterface[]
  ): any { //Invoice
    // Implement invoice generation logic
    // Return the generated invoice object
  }
}
