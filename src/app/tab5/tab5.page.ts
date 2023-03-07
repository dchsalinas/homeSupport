import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss']
})
export class Tab5Page implements OnInit  
{

  constructor(public alertController: AlertController,  private navCtrl: NavController,
    private authService: AuthenticateService) {}

  async presentAlert() {
    const alert = await this.alertController.create({
      message: 'For help, please email xxxxx@xxx.edu or call 555-555-5555.',
      buttons: ['OK']
    });
    

    await alert.present();
  }

  userEmail: string;
  ngOnInit() {

    this.authService.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.userEmail = res.email;
      } else {
        this.navCtrl.navigateBack('/login');
      }
    }, err => {
      console.log('err', err);
    })

  }

  logout() {
    this.authService.logoutUser()
      .then(res => {
        console.log(res);
        this.navCtrl.navigateBack('');
      })
      .catch(error => {
        console.log(error);
      })
  }
}
