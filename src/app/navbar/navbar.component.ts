import { Component, OnInit } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  itemList: AngularFireList<any>;
  user: Observable<firebase.User>;
  public isLoggedIn: Boolean = false;
  email = '';
  password = '';

  constructor(public db: AngularFireDatabase , private fire: AngularFireAuth , private router: Router) {
    this.itemList = db.list('users');


    let status = localStorage.getItem('isLoggedIn')
    console.log(status)

    if (status === 'true') {
      this.isLoggedIn = true;
    }else{
      this.isLoggedIn = false;
    }
   }



   myRegister() {
    this.fire.auth.createUserWithEmailAndPassword(this.email, this.password)
    .then(user => {
      this.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('email', this.fire.auth.currentUser.email );
  
      this.fire.authState.subscribe(auth => {
        if (auth) {
          localStorage.setItem('uid', auth.uid );
  this.itemList.push({
    email: this.email ,
    uid : auth.uid,
    name : 'user'  ,
    phone :  '0770' ,
    age : '' ,
    address :  '' ,
    city :  '' ,
    job : '',
  
    image: ''
  });
        }
      });
  
      this.router.navigate(['home']);
    }).catch( error => {
      console.error(error);
    });
  }
  

  myLogin() {
    this.fire.auth.signInWithEmailAndPassword(this.email, this.password)
    .then(user => {
      this.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('email', this.fire.auth.currentUser.email );

      this.fire.authState.subscribe(auth => {
        if (auth) {
  localStorage.setItem('uid', auth.uid );

        }
      });
    this.router.navigate(['/home']);
    }).catch(error => {
      console.error(error);
    });
  }



  ngOnInit() {
  }

  logout(){
    this.fire.auth.signOut();
    this.isLoggedIn = false;
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.setItem('email', '' );
    localStorage.setItem('uid', '' );

    this.router.navigate(['/home']);
}
}
