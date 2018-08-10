import { MessageService } from './services/MessageService';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DragulaModule } from 'ng2-dragula';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
 
import { AppComponent } from './app.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { DashboardComponentComponent } from './dashboard-component/dashboard-component.component';

import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { AppRoutingModule } from './app-routing-module';
import { ClassModelComponentComponent } from './class-model-component/class-model-component.component';
import { ClassTemplateComponentComponent } from './class-model-dashboard/class-template-component/class-template-component.component';
import { ClassContentComponentComponent } from './class-model-dashboard/class-template-component/class-content-component/class-content-component.component';
import { ClassInfoComponentComponent } from './class-model-dashboard/class-template-component/class-info-component/class-info-component.component';
import { UtilityService} from './services/utility.service';
import { HttpService} from './services/httpservice/http.service';
import { ClassModelDashboardComponent } from './class-model-dashboard/class-model-dashboard.component';
import { ClassTemplateService} from './class-model-dashboard/class-template-component/class-template.service';
import { SubClassModelComponent } from './class-model-dashboard/class-template-component/sub-class-model/sub-class-model.component';
import { SubClassComponent } from './class-model-dashboard/class-template-component/sub-class/sub-class.component';
import { SubClassDependanciesComponent } from './class-model-dashboard/class-template-component/sub-class-dependancies/sub-class-dependancies.component';
import { SubClassAttributeComponent } from './class-model-dashboard/class-template-component/sub-class-attribute/sub-class-attribute.component';
import { SubClassTriggerActionComponent } from './class-model-dashboard/class-template-component/sub-class-trigger-action/sub-class-trigger-action.component';
import { SubClassRelationComponent } from './class-model-dashboard/class-template-component/sub-class-relation/sub-class-relation.component';
import { SubClassTriggerActionPropertiesComponent } from './class-model-dashboard/class-template-component/sub-class-trigger-action-properties/sub-class-trigger-action-properties.component';
import { SubClassAttributePropertiesComponent } from './class-model-dashboard/class-template-component/sub-class-attribute-properties/sub-class-attribute-properties.component';
import { SubClassRelationPropertiesComponent } from './class-model-dashboard/class-template-component/sub-class-relation-properties/sub-class-relation-properties.component';
import { FileSelectComponent } from './file-select/file-select.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponentComponent,
    DashboardComponentComponent,
    ErrorPageComponent,
    LoginComponentComponent,
    ClassModelComponentComponent,
    ClassTemplateComponentComponent,
    ClassContentComponentComponent,
    ClassInfoComponentComponent,
    ClassModelDashboardComponent,
    SubClassModelComponent,
    SubClassComponent,
    SubClassDependanciesComponent,
    SubClassAttributeComponent,
    SubClassTriggerActionComponent,
    SubClassRelationComponent,
    SubClassTriggerActionPropertiesComponent,
    SubClassAttributePropertiesComponent,
    SubClassRelationPropertiesComponent,
    FileSelectComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    DragulaModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    })
  ],
  providers: [MessageService,UtilityService,HttpService,ClassTemplateComponentComponent,ClassTemplateService,ClassModelComponentComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
