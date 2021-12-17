import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import { HttpClientModule, HttpHeaders } from '@angular/common/http';

import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatListModule,
    MatInputModule,
    MatCardModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  folderNames: [string];

  constructor(private http: HttpClient) {
    this.getJenkisFirstLvlJobs();
  }

  getJenkisFirstLvlJobs() {
    this.http
      .get<any>('/jenkins/api/json', {
        headers: new HttpHeaders({
          Authorization:
            'Basic am9iX3J1bm5lcjoxMWI2MjYzY2Y5NmEzY2Y0NTA4ZmMwNzBjOWZlMWIzNTI1',
        }),
      })
      .subscribe(
        (i) =>
          (this.folderNames = i.jobs
            .map((s) => s.name)
            .filter((s) => s.includes('builds')))
      );
  }

  getJenkisSecondLvlJobs() {
    Promise.all(
      this.folderNames.map((i) =>
        this.http
          .get<any>('/jenkins/job/${i}/api/json ', {
            headers: new HttpHeaders({
              Authorization:
                'Basic am9iX3J1bm5lcjoxMWI2MjYzY2Y5NmEzY2Y0NTA4ZmMwNzBjOWZlMWIzNTI1',
            }),
          })
          .subscribe((i) => i)
      )
    );
  }
}
