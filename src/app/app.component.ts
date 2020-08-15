  import { Component, VERSION, OnInit } from '@angular/core';

  @Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.css' ]
  })
  export class AppComponent  {
    //public apikey:any = 'ff1bc4683fc7325e9c57e586c20cc03e';
    public name = 'Weather Widgets'
    public city:any = "";
    public image:any = "https://patch.com/img/cdn20/users/22926784/20171211/103530/styles/T800x600/public/processed_images/weatherforecast-partsun_1200x900-1513006408-5775.jpg"
    public gridCount:any = 8;
    public girdObj:any = {
      "city":'',
      "isEmpty": true,
      "isData": false,
      "image":this.image
    }
    public gridCol:any = [];
    public id:any;

    ngOnInit(){
      for(var i=0; i<=this.gridCount; i++){
        this.gridCol.push(JSON.parse(JSON.stringify(this.girdObj)));
      }   
     
    }

    public addsearch(i){
      console.log('this.gridCol',this.gridCol[i]);
      this.gridCol[i].isEmpty = false;     
      this.gridCol[i].isEdit = false;
      console.log('this.gridCol[ind]',this.gridCol[i]);          
    }

    public editWeather(d,i){
      //alert('hi')
      this.gridCol[i].isData = false;
      this.gridCol[i].isEmpty = false;
      this.gridCol[i].image = "https://patch.com/img/cdn20/users/22926784/20171211/103530/styles/T800x600/public/processed_images/weatherforecast-partsun_1200x900-1513006408-5775.jpg"
      this.gridCol[i].city = "";
      this.gridCol[i].isEdit = true;
      //clearInterval(this.gridCol[i]);
    }

    

    public getWeather(d,i){      
      let val = this.gridCol[i];
      let collection = this.gridCol;
      setInterval(function(){ 
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${d.city}&appid=ff1bc4683fc7325e9c57e586c20cc03e`)
      .then(response =>response.json())
      .then(data => {
          console.log(data);
          console.log('main',data.main);
          if(data.main != undefined){
          val['message'] = '';          
          let sunsetTime = new Date(data.sys.sunset * 1000);
          data.sunset_time = sunsetTime.toLocaleTimeString();
          let currentDate = new Date();
          data.isDay = (currentDate.getTime() < sunsetTime.getTime());
          data.temp_celcius = (data.main.temp - 273.15).toFixed(0);
          data.temp_min = (data.main.temp_min - 273.15).toFixed(0);
          data.temp_max = (data.main.temp_max - 273.15).toFixed(0);
          data.temp_feels_like = (data.main.feels_like - 273.15).toFixed(0);

          val['data']=data;
          val['maindata']=data.main;
          val['isData']= true;
          
          //setting images based on the weather/day        

          if(data.weather[0].main == 'Clear'){
            val.image = 'https://cdn3.vectorstock.com/i/1000x1000/26/22/outdoor-park-sunny-day-vector-23072622.jpg';
          }
          else if(data.weather[0].main == 'Clouds' || data.weather[0].main == 'Haze' || data.weather[0].main == 'Mist'){
            val.image = 'https://cdn2.vectorstock.com/i/1000x1000/02/21/autumn-landscape-of-cloudy-day-over-river-side-vector-24630221.jpg'
          }
          else if(data.weather[0].main == 'Rain' || data.weather[0].main == 'Thunderstorm'){
            val.image = 'https://cdn1.vectorstock.com/i/1000x1000/43/25/rainy-day-park-raining-public-park-rain-city-vector-23984325.jpg'
          }
          else{
            if(data.isDay){
              val.image = 'https://cdn3.vectorstock.com/i/1000x1000/26/22/outdoor-park-sunny-day-vector-23072622.jpg';
            } else{
              val.image = 'https://cdn5.vectorstock.com/i/1000x1000/14/54/a-hill-with-a-castle-vector-1431454.jpg';
            } 
          }

          //setting images based on the weather/day 

          localStorage.setItem("gridcollection", JSON.stringify(collection)); 
          console.log('gridcollection in localstorage', JSON.parse(localStorage.getItem("gridcollection")));

          }else{
            console.log("error message1",val['message'])
            val['message'] = data.message;
            console.log("error message2",val['message'])
          }

      });
      }, 10000);
      
    }
  }
