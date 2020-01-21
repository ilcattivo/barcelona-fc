import React, { Component } from 'react';
import firebase from 'firebase';
import Fileuploader from 'react-firebase-file-uploader';
import { CircularProgress } from '@material-ui/core';

class FileUploader extends Component {
  state = {
    filename: '',
    isUploading: false,
    progress: 0,
    fileURL: ''
  };

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

  handleProgress = progress => this.setState({ progress });

  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = filename => {
    this.setState({ filename, progress: 100, isUploading: false });
    this.props.setFileName(filename);
    firebase
      .storage()
      .ref(this.props.dir)
      .child(filename)
      .getDownloadURL()
      .then(fileURL => this.props.setFileURL(fileURL));
  };

  render() {
    return (
      <div>
        {this.state.isUploading && (
          <CircularProgress
            variant='determinate'
            value={this.state.progress}
            style={{ marginRight: 30 }}
          />
        )}
        <label
          style={{
            backgroundColor: '#154284',
            color: 'white',
            padding: 10,
            borderRadius: 4,
            cursor: 'pointer'
          }}>
          Select player avatar
          <Fileuploader
            hidden
            accept='image/*'
            name='avatar'
            randomizeFilename
            storageRef={firebase.storage().ref(this.props.dir)}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
        </label>
      </div>
    );
  }
}

export default FileUploader;
