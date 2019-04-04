import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateMaterialComponent } from './create-material/create-material.component';
import { ViewMaterialComponent } from './view-material/view-material.component';
import { ViewSingleMaterialComponent } from './view-single-material/view-single-material.component';
import { FrontScreenComponent } from './front-screen/front-screen.component';
import { EditMaterialComponent } from './edit-material/edit-material.component';
const routes: Routes = [
    {
        path: 'creatematerial/:id',
        component: CreateMaterialComponent
    },
    {
        path: 'viewmaterial',
        component: ViewMaterialComponent
    },
    {
        path: 'viewsinglematerial/:id',
        component: ViewSingleMaterialComponent
    },
    {
        path: 'front',
        component: FrontScreenComponent
    },
    {
        path: 'editmaterial/:id',
        component: EditMaterialComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MaterialRoutingModule { }

