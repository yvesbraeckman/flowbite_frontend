import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DevicesComponent } from './devices/devices.component';
import { LogsComponent } from './logs/logs.component';
import { SettingsComponent } from './settings/settings.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    {path: "dashboard", component: DashboardComponent},
    {path: "devices" ,component: DevicesComponent},
    {path: "logs", component: LogsComponent},
    {path: "settings", component: SettingsComponent},
    {path: "about", component: AboutComponent},
    {path: "", redirectTo: "about", pathMatch: "full" },
    {path: '**', component: NotFoundComponent }
];
