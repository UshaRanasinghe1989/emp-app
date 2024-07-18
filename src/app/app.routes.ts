import { Routes } from '@angular/router';
import { ManageEmpComponent } from './pages/manage-emp/manage-emp.component';
import { ViewAllEmpComponent } from './pages/view-all-emp/view-all-emp.component';

export const routes: Routes = [
    {
        path: "add-employee",
        component: ManageEmpComponent
    },
    {
        path: "view-all-employee",
        component: ViewAllEmpComponent
    }
];
