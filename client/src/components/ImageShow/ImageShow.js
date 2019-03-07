import React from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';

import { fetchImageBoxes } from '../../actions';
import './ImageShow.css';

class ImageShow extends React.Component {
  constructor(props) {
    super(props);

    this.imageRef = React.createRef();
  }

  // componentDidUpdate() {
  //   // if (this.imageRef.current) {
  //   console.log('image height ' + this.imageRef.current.clientHeight);
  //   console.log('image width ' + this.imageRef.current.clientWidth);
  //   this.props.updateImageSize(
  //     this.imageRef.current.clientHeight,
  //     this.imageRef.current.clientWidth
  //   );
  //   // }
  //   // this.imageRef.current.addEventListener(
  //   //   'change',
  //   //   this.props.updateImageSize(
  //   //     this.imageRef.current.clientHeight,
  //   //     this.imageRef.current.clientWidth
  //   //   )
  //   // );
  // }

  onLoad = () => {
    // console.log(this.imageRef);
    // console.log('image height ' + this.imageRef.current.clientHeight);
    // console.log('image width ' + this.imageRef.current.clientWidth);
    this.props.fetchImageBoxes(
      this.imageRef.current.clientHeight,
      this.imageRef.current.clientWidth
    );
  };

  renderSquares = () => {
    return this.props.boxes.map(box => {
      return (
        <div
          key={shortid.generate()}
          className="bounding-box"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol
          }}
        />
      );
    });
  };

  content = () => {
    if (!this.props.imageURL) {
      return null;
    } else {
      return (
        <div className="card">
          <img
            id="thatimage"
            ref={this.imageRef}
            className="card-img"
            src={this.props.imageURL}
            alt=""
            onLoad={this.onLoad}
          />
          {this.renderSquares()}
        </div>
      );
    }
  };

  render() {
    return (
      <div id="imageshow" className="pb-5">
        <div className="container">
          <div className="row">
            <div className="col m-auto">{this.content()}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { imageURL: state.imageURL, boxes: state.boxes };
};

export default connect(
  mapStateToProps,
  { fetchImageBoxes }
)(ImageShow);
