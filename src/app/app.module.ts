import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ListDogsComponent} from './componenets/list-dogs/list-dogs.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CategoryMenuComponent} from './componenets/category-menu/category-menu.component';
import {SearchComponent} from './componenets/search/search.component';
import {FormDogComponent} from './componenets/form-dog/form-dog.component';
import {ReactiveFormsModule} from "@angular/forms";
import {DogDetailsComponent} from './componenets/dog-details/dog-details.component';
import {LoginComponent} from './componenets/login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'detail/:id', component: DogDetailsComponent},
  {path: 'update/:id', component: FormDogComponent},
  {path: 'dogs/add', component: FormDogComponent},
  {path: 'dogs/:name', component: ListDogsComponent},
  {path: 'category/:id', component: ListDogsComponent},
  {path: 'dogs', component: ListDogsComponent},
  {path: '', redirectTo: '/dogs', pathMatch: 'full'},
  {path: '**', redirectTo: '/dogs', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    ListDogsComponent,
    CategoryMenuComponent,
    SearchComponent,
    FormDogComponent,
    DogDetailsComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
