import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ModalController } from '@ionic/angular';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
//Import Component for the update function and the Modal controller to handle the component.
import { UpdaterecordComponent } from '../components/updaterecord/updaterecord.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public displayBookmark: boolean = false;

  constructor(public photoService: PhotoService, public alertController: AlertController,
    private firestore: AngularFirestore,
    private modalController: ModalController) { }

  addPhotoToGallery() {
    this.photoService.addNewToGallery(); 
  }

/*
  async presentAlert() {
    const alert = await this.alertController.create({
      message: 'This system has not been implemented yet.',
      buttons: ['OK']
    });
    await alert.present();
  }*/

  
  async presentBookmark() {
    const alert = await this.alertController.create({
      message: 'This has been added to your bookmarks.',
      buttons: ['OK']
    });
    await alert.present();
  }



  async presentReview() {
    const alert = await this.alertController.create({
      header: 'Review',
      inputs: [
        {
          name: 'restuarant',
          type: 'text',
          placeholder: 'Name of Restaurant'
        },
        {
          name: 'location',
          type: 'text',
          id: 'location',
          value: '',
          placeholder: 'Location'
        },
        // multiline input.
        {
          name: 'review',
          id: 'review',
          type: 'textarea',
          placeholder: 'Review'
        },
        // input date without min nor max
        {
          name: 'name5',
          type: 'date'
        },
        {
          name: 'name6',
          type: 'number',
          placeholder: 'Stars from 0 through 10',
          min: 0,
          max: 10
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Submit',
          handler: () => {
            console.log('Confirm Submit');
          }
        }
      ]
    });

    await alert.present();
  }


  


  doc: any;
  records: { id: string;  price: string; title:string; rest:string; location: string; review: string;
   // date: Date;
    stars: number}[];
  
  addrecord: { price: string; title:string; rest:string; location: string; review: string; 
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
          'title': title,
          'rest': rest,
          'location': location,
          'review': review,
          //'date': date,
          'stars': stars,
          'price': price,
      }
    });
    return await modal.present();
  }
  DeleteRecord(id){
    this.firestore.doc('/Records/'+id).delete()
  }

}