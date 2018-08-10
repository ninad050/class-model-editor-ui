import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { DashboardComponentComponent } from './dashboard-component/dashboard-component.component';
import { ClassModelComponentComponent } from './class-model-component/class-model-component.component';
import { ClassTemplateComponentComponent } from './class-model-dashboard/class-template-component/class-template-component.component';
import { ClassModelDashboardComponent } from './class-model-dashboard/class-model-dashboard.component';


import {SubClassComponent} from './class-model-dashboard/class-template-component/sub-class/sub-class.component';
import {SubClassModelComponent} from './class-model-dashboard/class-template-component/sub-class-model/sub-class-model.component';
import {SubClassDependanciesComponent} from './class-model-dashboard/class-template-component/sub-class-dependancies/sub-class-dependancies.component';
import {SubClassAttributeComponent} from './class-model-dashboard/class-template-component/sub-class-attribute/sub-class-attribute.component';
import {SubClassAttributePropertiesComponent} from './class-model-dashboard/class-template-component/sub-class-attribute-properties/sub-class-attribute-properties.component';

import {SubClassRelationComponent} from './class-model-dashboard/class-template-component/sub-class-relation/sub-class-relation.component';
import {SubClassRelationPropertiesComponent} from './class-model-dashboard/class-template-component/sub-class-relation-properties/sub-class-relation-properties.component';

import {SubClassTriggerActionComponent} from './class-model-dashboard/class-template-component/sub-class-trigger-action/sub-class-trigger-action.component';
import {SubClassTriggerActionPropertiesComponent} from './class-model-dashboard/class-template-component/sub-class-trigger-action-properties/sub-class-trigger-action-properties.component';
import {FileSelectComponent} from './file-select/file-select.component'

const appRoutes: Routes = [
  { path: '', 
    component: DashboardComponentComponent,
    children: [
     {
       path: '', 
       component: ClassModelComponentComponent       
     },    
    ]
  },
   { 
   path: 'dashboard', 
   component: DashboardComponentComponent,
   children: [ 
     {
       path: 'classModel', 
       component: ClassModelComponentComponent       
     },
     { 
       path: 'classModelDashboard', component: ClassModelDashboardComponent,
         children:[
         {
           path: 'classTemplate',          
           component: ClassTemplateComponentComponent,
           children:[
            {
              path:'sub-class-model',
              outlet:"subtabs",
              component:SubClassModelComponent
            },
            {
              path:'sub-class',
              outlet:"subtabs",
              component:SubClassComponent
            },
            {
              path:'sub-class-atrribute',
              outlet:"subtabs",
              component:SubClassAttributeComponent
            },
             {
              path:'sub-class-atrribute-properties',
              outlet:"subtabs",
              component:SubClassAttributePropertiesComponent
            },
            {
              path:'sub-class-dependancies',
              outlet:"subtabs",
              component:SubClassDependanciesComponent
            },
            {
              path:'sub-class-relation',
              outlet:"subtabs",
              component:SubClassRelationComponent
            },{
              path:'sub-class-relation-properties',
              outlet:"subtabs",
              component:SubClassRelationPropertiesComponent
            },
            {
              path:'sub-class-trigger-action',
              outlet:"subtabs",
              component:SubClassTriggerActionComponent
            },
            {
              path:'sub-class-trigger-action-properties',
              outlet:"subtabs",
              component:SubClassTriggerActionPropertiesComponent
            }
           ]
          
         }    
      ]
     },
    ] }
  ,
  // { path: 'not-found', component: PageNotFoundComponent },
  //wild card routes
  // { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
  // { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, {useHash: true})
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
