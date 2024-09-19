// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard/default',
        pathMatch: 'full'
      },
      {
        path: 'dashboard/default',
        loadComponent: () => import('./demo/default/dashboard/dashboard.component').then((c) => c.DefaultComponent)
      },
      {
        path: 'typography',
        loadComponent: () => import('./demo/ui-component/typography/typography.component')
      },
      {
        path: 'color',
        loadComponent: () => import('./demo/ui-component/ui-color/ui-color.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/other/sample-page/sample-page.component')
      },
      {
        path: 'vehiculos',
        loadComponent: () => import('./vehiculos/vehiculos.component').then((m) => m.VehiculosComponent),
        
      },
      {
        path: 'nuevovehiculo',
        loadComponent: () => import('./vehiculos/nuevovehiculo/nuevovehiculo.component').then((m) => m.NuevovehiculoComponent),
        
      },
      {
        path: 'editarvehiculo/:vehiculo_id',
        loadComponent: () => import('./vehiculos/nuevovehiculo/nuevovehiculo.component').then((m) => m.NuevovehiculoComponent),
        
      },
      {
        path: 'clientes',
        loadComponent: () => import('./clientes/clientes.component').then((m) => m.ClientesComponent),
       
      },
      {
        path: 'nuevocliente',
        loadComponent: () => import('./clientes/nuevocliente/nuevocliente.component').then((m) => m.NuevoclienteComponent),
       
      },
      {
        path: 'editarcliente/:cliente_id',
        loadComponent: () => import('./clientes/nuevocliente/nuevocliente.component').then((m) => m.NuevoclienteComponent),
      
      },
      {
        path: 'alquileres',
        loadComponent: () => import('./alquileres/alquileres.component').then((m) => m.AlquileresComponent),
    
      },
      {
        path: 'nuevoalquiler',
        loadComponent: () =>
          import('./alquileres/nuevoalquiler/nuevoalquiler.component').then((m) => m.NuevoalquilerComponent),
        
      },
      {
        path: 'editaralquiler/:alquiler_id',
        loadComponent: () =>
          import('./alquileres/nuevoalquiler/nuevoalquiler.component').then((m) => m.NuevoalquilerComponent),
        
}
    ]
  
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./demo/authentication/login/login.component')
      },
      {
        path: 'register',
        loadComponent: () => import('./demo/authentication/register/register.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
