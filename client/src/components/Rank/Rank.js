import React from 'react';
import { connect } from 'react-redux';

import { fetchCurrentUser } from '../../actions';

class Rank extends React.Component {
  componentDidMount() {
    this.props.fetchCurrentUser();
  }

  render() {
    if (this.props.localUserSignedIn) {
      return (
        <div id="rank" className="mb-3">
          <div className="container">
            <div className="row">
              <div className="col">
                <h2 className="text-white">
                  Hi {this.props.name}, you have tried {this.props.records}{' '}
                  times...
                </h2>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  return {
    localUserSignedIn: state.auth.localUserSignedIn,
    records: state.auth.localUser.records,
    name: state.auth.localUser.name
  };
};

export default connect(
  mapStateToProps,
  { fetchCurrentUser }
)(Rank);
