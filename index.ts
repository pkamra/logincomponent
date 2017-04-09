import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './src/reusablelogin.component';
import { LoginDirective } from './src/reusablelogin.directive';
import { LoginPipe } from './src/reusablelogin.pipe';
import { LoginService } from './src/reusablelogin.service';

export * from './src/reusablelogin.component';
export * from './src/reusablelogin.directive';
export * from './src/reusablelogin.pipe';
export * from './src/reusablelogin.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoginComponent,
    LoginDirective,
    LoginPipe
  ],
  exports: [
    LoginComponent,
    LoginDirective,
    LoginPipe
  ]
})
export class LoginModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LoginModule,
      providers: [LoginService]
    };
  }
}
