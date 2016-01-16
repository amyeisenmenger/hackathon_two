class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.search = this.search.bind(this);
    this.toggleShowRandom = this.toggleShowRandom.bind(this);
    this.randomRestaurant = this.randomRestaurant.bind(this);
    this.showAllRestaurants = this.showAllRestaurants.bind(this);
    this.state = {restaurants: [], showRandom: false};
  }
  search(e){
    e.preventDefault();
    $.ajax({
      url: '/search',
      type: 'GET',
      dataType: 'JSON',
      data: { location: this.refs.search.value }
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
            </div>
            <br />
            <div className='center'>
              <button className='btn waves-effect waves-light' onClick={this.toggleShowRandom}>Back</button>
            </div>
           </div>);
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
                  <form onSubmit={this.search}>
                    <input className='center' autoFocus={true} type='text' placeholder='Enter Your Location' ref='search' />
                    <div className='center'>
                      <button type='submit' className='btn waves-effect waves-light'>Search</button>
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