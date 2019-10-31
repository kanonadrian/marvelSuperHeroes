import { Component } from '@angular/core';
import { GLOBAL } from '../../services/global';
import { ConfigService } from '../../services/user.service';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-superheroes',
  templateUrl: './superheroes.component.html',
  styleUrls: ['./superheroes.component.css'],
  providers: [ConfigService,AuthenticationService]
})
export class SuperHeroesComponent {
  public title: String;
  public allCharacters: Observable<any>;
  public identity;
  public userEmail;
  constructor(
    private _configService: ConfigService,
    public authenticationService: AuthenticationService,
    private router: Router
  ){
   this.title = 'superheroes';
  }
  
  ngOnInit(){
    if(this.authenticationService.GetIdentity()){
      this.identity = this.authenticationService.GetIdentity();
      this.userEmail = this.identity.user.email;
      this.getCharacters();
    }else{
      this.router.navigate(['login']);
    }

  }

  getCharacters(){
    this._configService.getAllCharacters().subscribe((data)=>{
      var result = data.data.results;
      this.allCharacters = result;
    });
  }
  
  signOut() {
    localStorage.removeItem('identity');
    this.authenticationService.SignOut();
    this.router.navigate(['login']);
  }
}
