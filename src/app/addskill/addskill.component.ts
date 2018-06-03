import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';




@Component({
  selector: 'app-addskill',
  templateUrl: './addskill.component.html',
  styleUrls: ['./addskill.component.css']
})
export class AddskillComponent implements OnInit {

  data={
    name:'',
    phone:'',
    skill:'',
    province:'',
    price:'',
    comments:'',
  }
  email:string='';
  uid:any;

  itemList:AngularFireList<any>

  constructor(private fire:AngularFireAuth,public db:AngularFireDatabase, public router:Router) {
    this.itemList=db.list('skills')

    let user= localStorage.getItem('email')
    this.email=user
    console.log(user)
    this.uid=localStorage.getItem('uid')
    console.log(this.uid)

    //  بدل استخدام لوكال استورج uid هذا الايعاز يجلب
    // this.fire.authState.subscribe(auth=>{
    //   if(auth){
    //     this.uid=auth.uid
    //     console.log('uid :' +this.uid)
    //   }
    // })

   }

  ngOnInit() {
    
    console.log(this.data.name)

  }
insertskill(){
  this.itemList.push({
    name:this.data.name,
    phone:this.data.phone,
    skill:this.data.skill,
    province:this.data.province,
    price:this.data.price,
    comments:this.data.comments,
    email:this.email,
    uid:this.uid
  })
  this.router.navigate(['/myskill'])

}
}
