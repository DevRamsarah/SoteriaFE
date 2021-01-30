import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// add imported modules here
const importedComponents = [
  MatSelectModule,
  MatAutocompleteModule,
  MatSortModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatGridListModule,
  MatButtonModule,
  MatTableModule,
  MatSlideToggleModule,
  MatToolbarModule,
  MatMenuModule
];

@NgModule({
  imports: [...importedComponents],
  exports: [...importedComponents],
})
export class CustomMaterialModule { }
