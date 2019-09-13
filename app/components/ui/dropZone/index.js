// Core
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

// Components
import { IoIosCloseCircle } from 'react-icons/io';

// Instruments
import { config } from 'config';
import styles from './styles.css';

export default class FileInput extends Component {
  state = {
    maxNumberFiles: config.dropZoneConfig.maxNumberFiles,
    maxSize: config.dropZoneConfig.maxSize,
    files: this.props.files,
    maxNumberFilesError: false,
  };

  _handleDrop = dropFiles => {
    const { maxNumberFiles, files } = this.state;

    const filenames = [];
    const stateFiles = this.state.files;

    if (files.length < maxNumberFiles && dropFiles.length <= maxNumberFiles) {
      stateFiles.forEach(file => {
        filenames.push(file.name);
      });

      dropFiles.forEach(item => {
        if (filenames.indexOf(item.name) + 1) {
          stateFiles.splice(filenames.indexOf(item.name), 1);
        }

        stateFiles.push(item);
      });

      this.setState(
        () => ({
          files: stateFiles,
          maxNumberFilesError: false,
        }),
        () => {
          this.props._mergeState('order', { files: this.state.files });
        },
      );
    } else {
      this.setState({ maxNumberFilesError: true });
    }
  };

  _handleRemoveFile = index => {
    const { files, maxNumberFilesError } = this.state;

    files.splice(index, 1);

    this.setState({ files });

    if (maxNumberFilesError) this.setState({ maxNumberFilesError: false });
  };

  render() {
    const { maxNumberFilesError, maxNumberFiles, files, maxSize } = this.state;

    return (
      <Dropzone multiple maxSize={maxSize} onDrop={this._handleDrop}>
        {({ getRootProps, getInputProps, isDragActive, rejectedFiles }) => (
          <section className={styles.container}>
            <span className={styles.title}>Attach files</span>
            <div
              className={`${styles.dropzone} ${
                isDragActive ? styles.active : ''
              }`}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {!isDragActive && 'Click here or drop a file to upload'}
              {isDragActive && "Drop it like it's hot!"}
              {rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize && (
                <span className={styles.errorMessage}>File is too large</span>
              )}
              {maxNumberFilesError && (
                <span className={styles.errorMessage}>
                  {`only ${maxNumberFiles} files allowed`}!
                </span>
              )}
            </div>
            {files.length > 0 ? (
              <aside>
                <ul className={styles.downloadedFiles}>
                  {files.map((file, index) => (
                    <li key={file.name}>
                      {file.path} - {file.size} bytes
                      <IoIosCloseCircle
                        onClick={() => this._handleRemoveFile(index)}
                        className={styles.removeBtn}
                      />
                    </li>
                  ))}
                </ul>
              </aside>
            ) : (
              ''
            )}
          </section>
        )}
      </Dropzone>
    );
  }
}
