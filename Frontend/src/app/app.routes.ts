import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ClientComponent } from './components/client/client.component';
import { ProductComponent } from './components/product/product.component';
import { ProductosComponent } from './components/product-list/product-list.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { DetailListComponent } from './components/detail-list/detail-list.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/:id', component: LoginComponent },
  { path: 'update', component: LoginComponent },
  { path: 'principal', component: PrincipalComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'client', component: ClientComponent },
  { path: 'product', component: ProductComponent },
  { path: 'product-list', component: ProductosComponent },
  { path: 'invoice', component: InvoiceComponent },
  { path: 'invoice-list', component: InvoiceListComponent },
  { path: 'detail-list/:num_factura', component: DetailListComponent },
];
