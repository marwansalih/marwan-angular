import { auth } from 'firebase';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ActionSequence } from 'protractor';
import { Router } from '@angular/router';



@Component({
  selector: 'app-myskill',
  templateUrl: './myskill.component.html',
  styleUrls: ['./myskill.component.css']
})
export class MyskillComponent implements OnInit {

  itemList:AngularFireList<any>
  itemArray=[]

  data={
    name:'',
    phone:'',
    skill:'',
    province:'',
    price:'',
    comments:''
  }

    myUid:any;


  constructor(public db:AngularFireDatabase, public router:Router) {
 this.itemList=db.list('skills')

 this.itemList.snapshotChanges()
  .subscribe(actions=>{
          actions.forEach(action=>{
          let y = action.payload.toJSON()
          y['$key'] = action.key
          this.itemArray.push(y as ListItemClass)
          
})
 })
 
    this.myUid=localStorage.getItem('uid')
 console.log(this.itemArray)
   }

  ngOnInit() {
  }

  editForm($key){
for (let value of this.itemArray){
  if (value['$key']==$key) {
    console.log(value['$key'])
    this.data.name=value['name'];
    this.data.phone=value['phone'];
    this.data.skill=value['skill'];
    this.data.province=value['province'];
    this.data.price=value['price'];
    this.data.comments=value['comments'];

  } 
}
  }

  onEdite($key){
    this.data.name
    this.data.phone
    this.data.skill
    this.data.province
    this.data.price
    this.data.comments

    this.itemList.set($key,{
      name : this.data.name,
      phone : this.data.phone,
      skill : this.data.skill,
      province: this.data.province,
      price:this.data.price,
      comments:this.data.comments,
      uid:this.myUid
    })
      this.itemArray=[]

// console.log("key: " + $key , "name: " +  this.data.name , "phone: " +  this.data.phone, "skill: " +  this.data.skill, "province: " +  this.data.province, "price: " +  this.data.price)

}

  onDelete($key){
  this.itemList.remove($key) ;
  this.itemArray=[] }
}
export class ListItemClass{
  $key:string;
  name:string;
  phone:string;
  skill:string;
  province:string;
  price:string;
  comments:string
}
