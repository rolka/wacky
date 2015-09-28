(function() {
  'use strict';

  $.ajax({
    url: 'http://sheetsu.com/apis/c3f9b3d6'
  }).done(function(sheetsu) {
    $.ajax({
      url: 'https://graph.facebook.com/v2.4/wacky.barbersoho?fields=about,cover,hours,general_info,phone,emails,location,price_range,photos.type(uploaded).fields(images.limit(1)).limit(5)&access_token=CAACEdEose0cBADeZBtAuAqfsXn1txLi7KYTuiZAjdnItxDRyrgrowqAAnBlNDJLda8I01hC8sFpE2dZBK0C5yKJlW2kc4AH4hpE9ZAW9eDNtTuAJkUWhIkN0SZBokryNKAxsZCsgHJmsfEbJFVZAsHxeUuWE38WdN6ZAuSTe8lz6JIJPhCgFMTD5kO4iUCsRYzgIPExAbo9kPjMPpoHh7KKK',
    }).done(function(data) {
      $('.content').html(Wacky.templates.content(mergeData(data, sheetsu)));
      mapInit(data.location.latitude, data.location.longitude);
    });
  });

  function mergeData(data, sheetsu) {
    // may do some data manipulation here
    data.whosin = sheetsu.result.map(function(row) {
      row.working = row.working === 'Yes' ? true : false;
      return row;
    });

    return data;
  }

  function mapInit(lat, lon) {
    var mapCanvas = document.getElementById('map');

    var latLon = new google.maps.LatLng(lat, lon);

    var mapOptions = {
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: latLon,
      styles: [{
        'featureType':'water',
        'elementType':'geometry',
        'stylers':[{
          'color':'#e9e9e9'
        },{
          'lightness':17
        }]
      },{
        'featureType':'landscape',
        'elementType':'geometry',
        'stylers':[{
          'color':'#f5f5f5'
        },{
          'lightness':20
        }]
      },{
        'featureType':'road.highway',
        'elementType':'geometry.fill',
        'stylers':[{
          'color':'#ffffff'
        },{
          'lightness':17
        }]
      },{
        'featureType':'road.highway',
        'elementType':'geometry.stroke',
        'stylers':[{
          'color':'#ffffff'
        },{
          'lightness':29
        },{
          'weight':0.2
        }]
      },{
        'featureType':'road.arterial',
        'elementType':'geometry',
        'stylers':[{
          'color':'#ffffff'
        },{
          'lightness':18
        }]
      },{
        'featureType':'road.local',
        'elementType':'geometry',
        'stylers':[{
          'color':'#ffffff'
        },{
          'lightness':16
        }]
      },{
        'featureType':'poi',
        'elementType':'geometry',
        'stylers':[{
          'color':'#f5f5f5'
        },{
          'lightness':21
        }]
      },{
        'featureType':'poi.park',
        'elementType':'geometry',
        'stylers':[{
          'color':'#dedede'
        },{
          'lightness':21
        }]
      },{
        'elementType':'labels.text.stroke',
        'stylers':[{
          'visibility':'on'
        },{
          'color':'#ffffff'
        },{
          'lightness':16
        }]
      },{
        'elementType':'labels.text.fill',
        'stylers':[{
          'saturation':36
        },{
          'color':'#333333'
        },{
          'lightness':40
        }]
      },{
        'elementType':'labels.icon',
        'stylers':[{
          'visibility':'off'
        }]
      },{
        'featureType':'transit',
        'elementType':'geometry',
        'stylers':[{
          'color':'#f2f2f2'
        },{
          'lightness':19
        }]
      },{
        'featureType':'administrative',
        'elementType':'geometry.fill',
        'stylers':[{
          'color':'#fefefe'
        },{
          'lightness':20
        }]
      },{
        'featureType':'administrative',
        'elementType':'geometry.stroke',
        'stylers':[{
          'color':'#fefefe'
        },{
          'lightness':17
        },{
          'weight':1.2
        }]
      }]
    };

    var map = new google.maps.Map(mapCanvas, mapOptions);

    new google.maps.Marker({
      map: map,
      position: latLon,
      icon: '../images/pin.png'
    });
  }

})();
