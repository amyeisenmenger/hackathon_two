class Map extends React.Component{
  constructor(props){
    super(props);
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
