import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ActionSequence } from 'protractor';
import {Router} from '@angular/router'

@Component({
  selector: 'app-allskills',
  templateUrl: './allskills.component.html',
  styleUrls: ['./allskills.component.css']
})
export class AllskillsComponent implements OnInit {

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

 console.log(this.itemArray)


   }

  ngOnInit() {
  }
    
  moreInfo($key){
 
 this.router.navigate(['details/'+$key])
  }
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