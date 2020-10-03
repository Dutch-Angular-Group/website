import { NgModule } from '@angular/core';

import { FooterComponent } from './footer.component';
import { SocialMediaModule } from "../social-media/social-media.module";

@NgModule({
    imports: [SocialMediaModule],
    exports: [FooterComponent],
    declarations: [FooterComponent],
    providers: [],
})
export class FooterModule { }
