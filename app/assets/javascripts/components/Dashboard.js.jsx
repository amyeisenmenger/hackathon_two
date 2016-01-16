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
    return(<div>
            <h1>Restaurant Finder</h1>
            <form onSubmit={this.search}>
              <input type='text' placeholder='Enter Your Location' ref='search' />
            </form>
            <button onClick={this.toggleShowRandom}>Choose Random</button>
            <h3>Restaurant:</h3>
            <ul>
              {restaurant.name}
            </ul>
            <button onClick={this.toggleShowRandom}>Back</button>
           </div>);
  }
  showAllRestaurants(){
    let restaurants = this.state.restaurants.map( restaurant => {
      return(<Restaurant key={`restaurant-${restaurant.id}`} {...restaurant} />);
    });
    return(<div>
            <h1>Restaurant Finder</h1>
            <form onSubmit={this.search}>
              <input type='text' placeholder='Enter Your Location' ref='search' />
            </form>
            <button onClick={this.toggleShowRandom}>Choose Random</button>
            <h3>Restaurants:</h3>
            <ul>
              {restaurants}
            </ul>
              <Map />
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