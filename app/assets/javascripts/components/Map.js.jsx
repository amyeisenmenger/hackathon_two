class Map extends React.Component{
  constructor(props){
    super(props);
  }

  createMap(){
    return(<script type='text/javascript'>
      handler = Gmaps.build('Google');
                  handler.buildMap({ provider: {}, internal: {id: 'map'}}, function(){
                    markers = handler.addMarkers([
                    {
                      "lat": 40,
                      "lng": -111,
                      "picture": {
                        "url": "http://people.mozilla.com/~faaborg/files/shiretoko/firefoxIcon/firefox-32.png",
                        "width":  32,
                        "height": 32
                      },
                      "infowindow": "hello!"
                    }
                  ]);
                handler.bounds.extendWith(markers);
                handler.fitMapToBounds();
              }); 
      </script>) 
  }

  render(){
    let divStyle = { 
      width: '800px'
    };

    let mapStyle = {
      width: '800px',
      height: '400px'
    }
    return(<div>
              <div dangerouslySetInnerHTML={{__html: this.createMap()}} />
            <div style={divStyle}>
              <div id="map" style={mapStyle}></div>
            </div>
          </div>);
    }
}
