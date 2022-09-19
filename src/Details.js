import { Component } from "react";
import { useParams } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundry from "./ErrorBoundry";
import Modal from "./Modal";
import ThemeContext from "./ThemeContext";

class Details extends Component {
  //cant use hooks with class comonents
  //constructor(props) {
  //super(props);

  //this.state = { loading: true };
  //}

  state = { loading: true, showModal: false }; //thanks to babel plugin this one line of code is equivalent to the above block

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

    const { animal, breed, city, state, description, name, images, showModal } =
      this.state;

    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {city}, {state}
          </h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name} ?</h1>
                <a href="https://bit.ly/pet-adopt">Yes</a>
                <button onClick={this.toggleModal}>No</button>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

const WrappedDetails = () => {
  const params = useParams();
  // const [theme] = useContext(ThemeContext); the easy way. and pass it in Details
  return (
    <ErrorBoundry>
      <Details params={params} />; {/* pass theme object here */}
    </ErrorBoundry>
  );
};
export default WrappedDetails;
