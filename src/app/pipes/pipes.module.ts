import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PipePipe } from "./pipe.pipe";
import { PipesPipe } from "./pipes.pipe";

@NgModule({
    declarations: [PipePipe, PipesPipe],
    imports: [
        CommonModule
    ],
    exports: [
        PipePipe,
        PipesPipe
    ]
})
export class PipesModule{}