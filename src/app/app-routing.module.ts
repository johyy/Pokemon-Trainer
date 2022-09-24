import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";
import { LandingPage } from "./pages/landing/landing.page";
import { PokemonCataloguePage } from "./pages/pokemon-catalogue/pokemon-catalogue.page";
import { TrainerPage } from "./pages/trainer/trainer.page";

const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "/landing"
    },
    {
        path: "landing",
        component: LandingPage
    },
    {
        path: "pokemon",
        component: PokemonCataloguePage,
        canActivate: [ AuthGuard ]
    },
    {
        path: "trainer",
        component: TrainerPage,
        canActivate: [ AuthGuard ]
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {

}