import React from 'react';
import { connect } from 'react-redux';

import { updateImageURL, increaseRecords } from '../../actions';

class ImageLinkForm extends React.Component {
  state = { inputText: '' };

  onChange = event => {
    this.setState({ inputText: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.updateImageURL(this.state.inputText);
    if (this.props.localUserSignedIn) {
      this.props.increaseRecords(); //only increase records for local signed in users.
    }
  };

  render() {
    return (
      <div id="imagelink">
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto">
              <p className="lead text-white">
                This Magic Brain will detect faces in your pictures. Paste
                picture link and give it a try.
              </p>
              <form className="form-group" onSubmit={this.onSubmit}>
                <input
                  className="form-control form-control-lg m-3"
                  type="text"
                  name="imageURL"
                  placeholder="Image URL"
                  value={this.state.inputText}
                  onChange={this.onChange}
                />
                <button className="btn btn-danger" type="submit">
                  Detect
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { updateImageURL, increaseRecords }
)(ImageLinkForm);
