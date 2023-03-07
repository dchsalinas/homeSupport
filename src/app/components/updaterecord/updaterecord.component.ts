import { Component, OnInit, Input } from '@angular/core';

//Import AngularFirestore to make Queries.
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-updaterecord',
  templateUrl: './updaterecord.component.html',
  styleUrls: ['./updaterecord.component.scss'],
})
export class UpdaterecordComponent implements OnInit {
  @Input() id: string;
  @Input() price: string;
  @Input() title: string;
  @Input() rest: string;
  @Input() location: string; 
  @Input() review: string;
  @Input() stars: number;
  //@Input() date: date;

  constructor(
    private firestore: AngularFirestore,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    
  }

  UpdateRecord(price, title, rest, location, review, 
    //date, 
    stars){
    let updaterecord = {}
    updaterecord['price'] = price,
    updaterecord['title'] = title,
    updaterecord['rest'] = rest,
    updaterecord['location'] = location,
    updaterecord['review'] = review,
    //updaterecord['date'] = date,
    updaterecord['stars'] = stars,
    this.firestore.doc('/Records/'+this.id).update(updaterecord).then(()=>{
      this.modalController.dismiss()
    })
  }
  
  CloseModal(){
    this.modalController.dismiss()
  }

}