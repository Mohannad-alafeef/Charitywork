import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from "../shared/shared.module";
import { CreateCharityComponent } from './create-charity/create-charity.component';


@NgModule({
    declarations: [
        DashboardComponent,
        CreateCharityComponent
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        SharedModule
    ]
})
export class UserModule { }
