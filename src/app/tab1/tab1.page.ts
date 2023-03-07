import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ModalController } from '@ionic/angular';
//Import Component for the update function and the Modal controller to handle the component.
import { UpdaterecordComponent } from '../components/updaterecord/updaterecord.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit{
  public hideMessage: boolean = false;

  constructor(public alertController: AlertController, 
    private firestore: AngularFirestore,
    private modalController: ModalController) {}

  
  async presentAlert() {
    const alert = await this.alertController.create({
      message: 'The Review has been addedd to the Review tab.',
      buttons: ['OK']
      
    });
    await alert.present();
  }

  async hideMyMessage() {
    this.hideMessage =!this.hideMessage;
  }

  doc: any;
  records: { id: string; price: string; title:string; rest:string; location: string; review: string;
   // date: Date;
    stars: number}[];
  
  addrecord: {price: string; title:string; rest:string; location: string; review: string; 
    //date: Date; 
    stars: number};  


  ngOnInit(){
    this.addrecord = {price :'', title:'', rest:'',location:'', review:'', 
    //date:null, 
    stars:null}    
    this.firestore.collection('/Records/').snapshotChanges().subscribe(res=>{
      if(res){
        this.records = res.map(e=>{
          return{
            id: e.payload.doc.id,
            price: e.payload.doc.data()['price'],
            title:e.payload.doc.data()['title'],
            rest:e.payload.doc.data()['rest'],
            location: e.payload.doc.data()['location'],
            review: e.payload.doc.data()['review'],
            //date: e.payload.doc.data()['date'],
            stars: e.payload.doc.data()['stars'],
          }
        })   
      }  
    })
  }

  AddRecord(price, title, rest, location, review, 
    //date, 
    stars){
    let addrecord = {}
    addrecord['price'] = price
    addrecord['title'] = title
    addrecord['rest'] = rest
    addrecord['location'] = location
    addrecord['review'] = review
    //addrecord['date'] = date
    addrecord['stars'] = stars
    console.log(addrecord)
    this.firestore.collection('/Records/').add(addrecord).then(()=>{
      this.addrecord = {price :'', title:'', rest:'',location:'', review:'', 
      //date:null, 
      stars:null} 
    })
  }
  async UpdateRecord(id, price, title, rest, location, review, //date, 
    stars) {
    const modal = await this.modalController.create({
      component:  UpdaterecordComponent,
      componentProps: {          
          'id': id,
          'price': price,
          'title': title,
          'rest': rest,
          'location': location,
          'review': review,
          //'date': date,
          'stars': stars,
          
      }
    });
    return await modal.present();
  }
  DeleteRecord(id){
    this.firestore.doc('/Records/'+id).delete()
  }

}