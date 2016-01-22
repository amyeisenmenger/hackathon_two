class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.searchLocation = this.searchLocation.bind(this);
    this.toggleShowRandom = this.toggleShowRandom.bind(this);
    this.randomRestaurant = this.randomRestaurant.bind(this);
    this.showAllRestaurants = this.showAllRestaurants.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.showLocation = this.showLocation.bind(this);
    this.state = {restaurants: [], showRandom: false};
  }
  searchLocation(e, latitude, longitude){
    if(e)
      e.preventDefault();
    let location;
    if(this.refs.search.value.length)
      location = this.refs.search.value;
    else
      location = latitude + ", " + longitude
    $.ajax({
      url: '/search',
      type: 'GET',
      dataType: 'JSON',
      data: { location: location }
    }).success( data => {
      this.refs.search.value = null;
      this.setState({ restaurants: data.restaurants });
    });
  }
  toggleShowRandom(){
    this.setState({ showRandom: !this.state.showRandom});
  }
  randomRestaurant(){

    let restaurant = this.state.restaurants[Math.floor(Math.random()*this.state.restaurants.length - 1 )];
    let pricelevel = "$".repeat(restaurant.priceLevel)
    let address = `http:\/\/maps.google.com/?q=${restaurant.lat},${restaurant.lng}`;
    let open = restaurant.openingHours.open_now ? "Open Now" : "Closed";
    return(<div>
            <h1 className='center white-text'>Restaurant Finder</h1>
            <div className='row'>
              <div className='card col s12 m6 offset-m3 z-depth-3'>
                <div className='card-content'>
                  <form onSubmit={this.search}>
                    <input className='center' type='text' placeholder='Enter Your Location' ref='search' />
                    <div className='center'>
                      <button type='submit' className='btn waves-effect waves-light'>Search</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <h2 className='center white-text'>Your Random Pick</h2>
            <div className='center'>
              <h5 className='orange-text darken-2'>{restaurant.name}</h5>
              <div className='white-text'>{restaurant.address}</div>
              <div className='white-text center'>Rating: {restaurant.rating}</div>
              <div className='white-text center'>Price Level: {pricelevel}</div>
              <div className='white-text center'>{open}</div>
              <div className='center'><a className='white-text' href={address}><i className='material-icons'>add_location
</i></a></div>
            </div>
            <br />
            <div className='center'>
              <button className='btn waves-effect waves-light' onClick={this.toggleShowRandom}>Back</button>
            </div>
           </div>);
  }
  showLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    this.searchLocation(null, latitude, longitude);
  }
  getLocation(e) {
    e.preventDefault();
    if(navigator.geolocation){
       // timeout at 60000 milliseconds (60 seconds)
       let options = {timeout:60000};
       navigator.geolocation.getCurrentPosition(this.showLocation);
    } else {
       alert("Sorry, browser does not support geolocation!");
    }
  }
  showAllRestaurants(){
    let restaurants = this.state.restaurants.map( restaurant => {
      return(<Restaurant key={`restaurant-${restaurant.id}`} {...restaurant} />);
    });
    let ifRestaurants = this.state.restaurants.length > 0 ? (
            <div>
            <div className='row center'>
              <button className='btn waves-effect waves-light' onClick={this.toggleShowRandom}>Choose Random</button>
            </div>
            <h2 className='center white-text'>Restaurants</h2>
            </div>) : '';
    return(<div>
            <h1 className='center white-text'>Restaurant Finder</h1>
            <div className='row'>
              <div className='card col s12 m6 offset-m3 z-depth-3'>
                <div className='card-content'>
                  <form onSubmit={this.searchLocation}>
                    <input className='center' autoFocus={true} type='text' placeholder='Enter Your Location' ref='search' />
                    <div className='center'>
                      <button type='submit' className='btn waves-effect waves-light'>Search</button>
                      <button onClick={this.getLocation} className='btn waves-effect waves-light'>Get Location</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
              {ifRestaurants}
              <div className='row'>
                <div className='col s12 m6 offset-m3'>
                  {restaurants}
                </div>
              </div>
           </div>);
  }
  render(){
    if(this.state.showRandom){
      return this.randomRestaurant();
    } else {
      return this.showAllRestaurants();
    }
  }

}