getInitialValues();
roomWeatherChanged();

var gaugeDht22Temp = new JustGage({
    id: "DHT22TempGauge",
    value: 22,
    min: 0,
    max: 60,
    title: "Teplota °C",
    relativeGaugeSize: true,
  });

  var gaugeDht22Humid = new JustGage({
    id: "DHT22HumidGauge",
    value: 60,
    min: 0,
    max: 100,
    title: "Vlhkost %",
    relativeGaugeSize: true,
  });

  var gaugeDht11Temp = new JustGage({
    id: "DHT11TempGauge",
    value: 22,
    min: 0,
    max: 60,
    title: "Teplota °C",
    relativeGaugeSize: true,
  });

  var gaugeDht11Humid = new JustGage({
    id: "DHT11HumidGauge",
    value: 60,
    min: 0,
    max: 100,
    title: "Vlhkost %",
    relativeGaugeSize: true,
  });

function getInitialValues(){
    return firebase.database().ref('/smarthome_object').once('value').then(function (snapshot) {
       var snapshotValue = snapshot.val();
       gaugeDht22Temp.refresh(snapshotValue.DHT22.temperature);
       gaugeDht22Humid.refresh(snapshotValue.DHT22.humidity);
       gaugeDht11Temp.refresh(snapshotValue.DHT11.temperature);
       gaugeDht11Humid.refresh(snapshotValue.DHT11.humidity);
      });
} 

function roomWeatherChanged(){
    var database  = firebase.database();
    var objectsRef  = database.ref('/smarthome_object');
    objectsRef.on('child_changed', (snapshot) => {
        var snapshotValue = snapshot.val();
        if (snapshot.key === "DHT11"){
            gaugeDht11Temp.refresh(snapshotValue.temperature);
            gaugeDht11Humid.refresh(snapshotValue.humidity);
        }
        if (snapshot.key === "DHT22"){
            gaugeDht22Temp.refresh(snapshotValue.temperature);
            gaugeDht22Humid.refresh(snapshotValue.humidity);
        }
   });
}