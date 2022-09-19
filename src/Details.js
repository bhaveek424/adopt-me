import { Component } from "react";
import { useParams } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundry from "./ErrorBoundry";

class Details extends Component {
  //cant use hooks with class comonents
  //constructor(props) {
  //super(props);

  //this.state = { loading: true };
  //}

  state = { loading: true }; //thanks to babel plugin this one line of code is equivalent to the above block

  // class components have "life-cycle" methods instead of useEffect
  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
    );
    const json = await res.json();

    this.setState(Object.assign({ loading: false }, json.pets[0])); // this code is equivalent to the below commented code

    /*this.setState({
      loading: false
    })

    this.setState(json.pets[0]) */
  }

  //only rule of class component is that it must have render function
  render() {
    if (this.state.loading) {
      return <h2>loading ...</h2>;
    }

    const { animal, breed, city, state, description, name, images } =
      this.state;

    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {city}, {state}
          </h2>
          <button>Adopt {name}</button>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

const WrappedDetails = () => {
  const params = useParams();
  return (
    <ErrorBoundry>
      <Details params={params} />;
    </ErrorBoundry>
  );
};
export default WrappedDetails;
