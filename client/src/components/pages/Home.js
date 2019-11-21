import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isEmpty } from '../utils/isEmpty';

import { generateScreenshot } from '../../actions/generate';

class Home extends Component {

  constructor(props){
    super(props);

    this.state = {
      url: ''
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e){
    e.preventDefault();
    const { url } = this.state;

    if(isEmpty(url)){
      alert('Missing URL!');
    }
    else{
      this.props.generateScreenshot(url);
    }
  }

  render() {
    const { url } = this.state;
    const { loading, gotScreenshot, screenshotPath } = this.props.generate;

    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-3 header-margin">
                <Link to={'/'}>
                  <img src="header.png" className="img-fluid p-4" alt="Screen Grab" />
                </Link>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-md-10">
                <form className="mt-4">
                  <div className="form-group text-left">
                    <input type="email" className="form-control" id="url" name="url" value={url} aria-describedby="emailHelp" placeholder="Example: www.google.com" onChange={this.onChange}/>
                    <small id="emailHelp" className="form-text text-muted">Provide the url of the site you would like to take a screentshot of (We wait 10 seconds afer loading to take the screenshot)</small>
                  </div>
                  {loading ? (
                    <button type="submit" disabled className="btn btn-primary primary-button">Loading</button>
                  ) : (
                    <button type="submit" className="btn btn-primary primary-button" onClick={this.onSubmit}>Grab Screen</button>
                  )}
                </form>
              </div>
            </div>

            {gotScreenshot ? (
              <div className="row justify-content-center">
                <div className="col-md-10 mt-4">
                  <img src={screenshotPath} className="img-fluid" alt="Responsive image" />
                </div>
              </div>
            ) : (
              null
            )}
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  generate: state.generate
});

export default connect(mapStateToProps, {
  generateScreenshot
})(Home);
