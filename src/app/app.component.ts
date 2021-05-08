import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import axios from "axios";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'trip-forecast';
  checkoutForm = this.formBuilder.group({
    airportNames: ''
  });
  public location = '';
  public airportName = '';
  public website = '';
  public address = '';
  public phone = '';
  public isVisible = false;
  public pm10 = '';
  public pm25 = '';
  public o3 = '';
  public no3 = '';
  public so2 = '';
  public co = '';
  public aqi = '';
 


  constructor(private formBuilder: FormBuilder, private FormsModule: FormsModule, private ReactiveFormsModule: ReactiveFormsModule) {
  }

  ngOnInit(): void {
    }
  ngAfterViewInit(): void {

  }

  

  async onSubmit(): Promise<void> {
    // Process checkout data here
    console.warn('Your order has been submitted', this.checkoutForm.value);

    var str = this.checkoutForm.get('airportNames').value;
    console.log(str);
    var iataStr = str.split(",")[0];
    var icaoStr = str.split(",")[1];
    const config = {
      params: { icao: icaoStr, iata: iataStr },
      headers: {
        'x-rapidapi-key': 'efd3cf999dmsh203fbbf76869119p16e689jsnba056d7944e8',
        'x-rapidapi-host': 'airport-info.p.rapidapi.com'
      }
    };

    const response = await axios.get('https://airport-info.p.rapidapi.com/airport', config);
    console.log(response.data);
    this.location = response.data.location;
    this.airportName = response.data.name;
    this.website = response.data.website;
    this.address = response.data.street + ", " + response.data.street_number + ", " + response.data.city + ", " + response.data.state
    this.phone = response.data.phone;

    const configWeather = {
      params: { lon: response.data.longitude, lat: response.data.latitude },
      headers: {
        'x-rapidapi-key': '8168a03d9cmsh7f4fbdba80b28cbp144272jsnb25f87e20dbc',
        'x-rapidapi-host': 'air-quality.p.rapidapi.com'
      }
    };

    const response2 = await axios.get('https://air-quality.p.rapidapi.com/history/airquality', configWeather);
    console.log(response2.data);
    this.aqi = response2.data.data[0].aqi;
    this.co = response2.data.data[0].co;
    this.pm10 = response2.data.data[0].pm10;
    this.pm25 = response2.data.data[0].pm25;
    this.o3 = response2.data.data[0].o3;
    this.so2 = response2.data.data[0].so2;

    this.isVisible = true;
    // this.checkoutForm.reset();
  }

}

