import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places.service';
import { NavController } from '@ionic/angular';
import { Place } from '../../place.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  place: Place;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }
      this.place = this.placesService.getPlace(paramMap.get('placeId'));
      this.form = new FormGroup({
        title: new FormControl(null, {
          updateOn: 'blur',
          validators: [Validators.required]
        }),
        description: new FormControl(null,{
          updateOn: 'blur',
          validators: [Validators.required, Validators.maxLength(180)]
        })
        // price: new FormControl(null,{
        //   updateOn: 'blur',
        //   validators: [Validators.required, Validators.min(1)]
        // }),
        // dateFrom: new FormControl(null, {
        //   updateOn: 'blur',
        //   validators: [Validators.required]
        // }),
        // dateTo : new FormControl(null, {
        //   updateOn: 'blur',
        //   validators: [Validators.required]
        // })
      }); 
    });
  }

  onEditOffer(){
    console.log(this.form);
  }

}
