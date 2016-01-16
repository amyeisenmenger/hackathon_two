class Restaurant extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(<div>
            <li>
              {this.props.name}
            </li>
           </div>);
  }
}