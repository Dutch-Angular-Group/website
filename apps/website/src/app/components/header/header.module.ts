import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderComponent } from './header.component';

@NgModule({
    imports: [CommonModule],
    exports: [HeaderComponent],
    declarations: [HeaderComponent],
    providers: [],
})
export class HeaderModule { }
