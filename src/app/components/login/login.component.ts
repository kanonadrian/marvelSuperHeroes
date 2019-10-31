import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = 'login';
  email = "";
  password = "";
  emailRegister = "";
  passwordRegister = "";

  constructor(public authenticationService: AuthenticationService,
    private router: Router){

  }
  ngOnInit(){
    if(this.authenticationService.GetIdentity()){
      this.router.navigate(['superheroes']);
    }else{
      this.router.navigate(['login']);
    }
  }

  signUp() {
    this.authenticationService.SignUp(this.emailRegister, this.passwordRegister)
    .then(res => {
        this.email = this.emailRegister;
        this.password = this.passwordRegister;
        this.emailRegister = "";
        this.passwordRegister = "";
        alert('Successfully signed up, please login!');
      
      })
      .catch(error => {
        alert(error.message);
      });
  }
  signIn() {
    console.log(this.email, this.password);
    this.authenticationService.SignIn(this.email, this.password).then(res => {
      localStorage.setItem('identity', JSON.stringify(res));
      this.router.navigate(['superheroes']);
    })
    .catch(error => {
      alert(error.message);
    });
  }
  signOut() {
    localStorage.removeItem('identity');
    this.authenticationService.SignOut();
    this.router.navigate(['login']);
  }

}
