class Restaurant extends React.Component{
  constructor(props){
    super(props);
    this.toggleRestaurant = this.toggleRestaurant.bind(this);
    this.longRestaurant = this.longRestaurant.bind(this);
    this.shortRestaurant = this.shortRestaurant.bind(this);
    this.state = {showRestaurant: false}
  }
  toggleRestaurant(){
    this.setState({showRestaurant: !this.state.showRestaurant });
  }
  longRestaurant() {
    let address = `http:\/\/maps.google.com/?q=${this.props.lat},${this.props.lng}`;
    let pricelevel = "$".repeat(this.props.priceLevel)
    let open = this.props.openingHours.open_now ? "Open Now" : "Closed";
      return(<div onClick={this.toggleRestaurant}>
              <h5 className='center orange-text darken-2'>{this.props.name}</h5>
              <div className='center white-text'>{this.props.address}</div>
              <div className='white-text center'>Rating: {this.props.rating}</div>
              <div className='white-text center'>Price Level: {pricelevel}</div>
              <div className='white-text center'>{open}</div>
              <div className='center'>
                <a className='white-text' href={address}><i className='material-icons'>add_location
</i></a>
              </div>
              <hr />
             </div>);
  }
  shortRestaurant(){
    let address = `http:\/\/maps.google.com/?q=${this.props.lat},${this.props.lng}`;
    return(<div>
              <div onClick={this.toggleRestaurant}>
              <h5 className='center orange-text darken-2'>{this.props.name}</h5>
              <p className='center white-text'>{this.props.address}</p><div className='center'><a className='white-text' href={address}><i className='material-icons'>add_location
</i></a></div>
              <hr />
              </div>
           </div>);
  }
  render() {
    if(this.state.showRestaurant) {
      return this.longRestaurant();
    } else {
    return this.shortRestaurant();
    }
  }
}