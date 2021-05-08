# Introducere

API reprezinta acronimul in limba engleza pentru Application Programming Interface, adica interfata de programare a unei aplicatii. O librarie API poate fi privita ca un set de functii puse la dispozitia programatorilor in sensul efectuarii unor anumite operatiuni sau sarcini. De exemplu, exista API-uri ce permit programatorilor sa introduca in aplicatiile pe care le dezvolta facilitati de recunoastere faciala. Programatorul respectiv nu trebuie sa cunoasca in detaliu mecanismele ce stau in spatele recunoasterii faciale. El trebuie doar sa stie cum sa utilizeze corect functiile puse la dispozitie prin API-ul respectiv. Un API este o colectie de functii continute in librarii statice sau dinamice, ce pot fi folosite la un moment dat intr-o aplicatie pentru a efectua diverse sarcini.

Proiectul curent a fost realizat prin [Angular CLI](https://github.com/angular/angular-cli) versiunea 11.2.12.

# Descriere problema

Aplicatia curenta are ca scop prezentarea calitatii aerului din imprejurimile aeroporturilor, precum si observarea aeroporturilor cu un grad ridicat de poluare. Calitatea aerului este direct influentata de factorii poluanti din zona in care aceasta se masoara, prin urmare, aplicatie curent are ca scop observarea celor mai poluate aeroporturi.

# Descriere API-uri folosite 
## Descriere API Airport info

Primul API folosit genereaza informatii referitoare la aeroporturi, oferind acces la cea mai complexa baza de date care contine date precum adresa, numar de telefon, website etc.
Datele mentionate se obtin prin intermediul codurilor IATA si ICAO. Codurile ICAO sunt folosite in controlul traficului aerian si in operarile liniilor aeriene, cum ar fi planificarea zborurilor. Codurile IATA sunt folosite de catre companiile aeriene in orarele zborurilor, rezervari si operatiile legate de bagaje. 
Datele intoarse prin intermediul acestui API pot fi observate in exemplul de mai jos.

## Decriere API Air Quality

Cel de-al doilea API returneaza informatii privind calitatea aerului dintr-o anumita locatie prin pasarea coordonatelor locatiei de interes. In aplicatia noastra, aceste date sunt returnate prin apelarea primului API si folosite mai departe in apelarea celui de-al doilea API al carui exemplu de raspuns poate fi regasit mai jus in cadrul documentatiei.

# Flux de date

## Exemple Request/ Response
#### Request API Air info
const request = require('request');

const options = {
  method: 'GET',
  url: 'https://airport-info.p.rapidapi.com/airport',
  qs: {icao: 'LROP', iata: 'OTP'},
  headers: {
    'x-rapidapi-key': 'e5f604f9d8mshc83eaff98f9edf6p17343fjsn9b08384ae1d9',
    'x-rapidapi-host': 'airport-info.p.rapidapi.com',
    useQueryString: true
  }
};

request(options, function (error, response, body) {
	if (error) throw new Error(error);

	console.log(body);
});

#### Response API Air info
{18 items
"id":5702
"iata":"OTP"
"icao":"LROP"
"name":"Henri Coandă International Airport"
"location":"Bucharest, Romania"
"street_number":"224E"
"street":"Calea Bucureştilor"
"city":"Otopeni"
"county":""
"state":"Județul Ilfov"
"country_iso":"RO"
"country":"Romania"
"postal_code":"75150"
"phone":"+40 21 204 1000"
"latitude":44.570732
"longitude":26.084412
"uct":180
"website":"http://www.bucharestairports.ro/otp"
}

#### Request API Air Quality
const request = require('request');

const options = {
  method: 'GET',
  url: 'https://air-quality.p.rapidapi.com/history/airquality',
  qs: {lon: '-78.638', lat: '35.779'},
  headers: {
    'x-rapidapi-key': 'e5f604f9d8mshc83eaff98f9edf6p17343fjsn9b08384ae1d9',
    'x-rapidapi-host': 'air-quality.p.rapidapi.com',
    useQueryString: true
  }
};

request(options, function (error, response, body) {
	if (error) throw new Error(error);

	console.log(body);
});

#### Response API Air Quality
{
"data":[
0:{
"aqi":52.4
"pm10":16.4616
"pm25":9.1418
"o3":105.979
"timestamp_local":"2021-05-08T15:00:00"
"so2":1.78441
"no2":3.40416
"timestamp_utc":"2021-05-08T19:00:00"
"datetime":"2021-05-08:19"
"co":237.744
"ts":1620500400
}
]
"city_name":"Raleigh"
"lon":-78.64
"timezone":"America/New_York"
"lat":35.78
"country_code":"US"
"state_code":"NC"
}
## Metode HTTP
Metoda HTTP folosita in cadrul aplicatiei este HTTP REST GET.

## Link accesare aplicatie
http://trip-forecast.s3-website.eu-central-1.amazonaws.com/

