import { Component } from '@angular/core';
import { GLOBAL } from '../../services/global';
import { ConfigService } from '../../services/user.service';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-superheroes-detail',
  templateUrl: './superheroes_detail.component.html',
  styleUrls: ['./superheroes_detail.component.css'],
  providers: [ConfigService,AuthenticationService]
})
export class SuperHeroesDetailComponent {
  title = 'superheroes-detail';
  id: string;
  name: string;
  thumbnail: string;
  description: string;
  public identity;
  public userEmail;

  constructor(
    private rutaActiva: ActivatedRoute,
    private _configService: ConfigService,
    public authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(){
    if(this.authenticationService.GetIdentity()){
      this.identity = this.authenticationService.GetIdentity();
      this.userEmail = this.identity.user.email;
      this.id = this.rutaActiva.snapshot.params.id;
      this._configService.getCharacterId(this.id).subscribe((data)=>{

        var result = data.data.results[0];
        this.name = result.name;
        this.thumbnail = result.thumbnail.path + '.' + result.thumbnail.extension;
        this.description = (result.description)?result.description:'Sin descripción';
        
      },(err)=>{
        this.router.navigate(['superheroes']);
      });
    }else{
      this.router.navigate(['login']);
    }

    
  }
}