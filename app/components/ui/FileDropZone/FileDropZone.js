// Core
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

// Components
import { withProfile } from 'components/HOC/withProfile';
import { IoIosCloseCircle, IoMdCloudUpload } from 'react-icons/io';

// Styles
import styles from './styles.css';

@withProfile
export class FileDropZone extends Component {
  state = {
    maxNumberFilesError: false,
    emptyFileError: false,
  };

  _handleDrop = dropFiles => {
    const {
      _mergeState,
      state: {
        order: { files },
        uploadRequirements: { max_number_files: maxNumberFiles },
      },
    } = this.props;

    const filenames = [];
    const isContainEmptyFile = dropFiles.some(file => file.size !== 0);
    let filesArr = [...files];

    if (filesArr.length < maxNumberFiles && dropFiles.length <= maxNumberFiles) {
      filesArr.forEach(file => {
        filenames.push(file.name);
      });

      dropFiles.forEach(item => {
        if (filenames.indexOf(item.name) !== -1) {
          filesArr = filesArr.filter(file => file.name !== filenames[filenames.indexOf(item.name)]);
        }
      });

      _mergeState({ order: { files: [...dropFiles.filter(file => file.size !== 0), ...filesArr] } });

      this.setState({
        maxNumberFilesError: false,
        emptyFileError: !!!isContainEmptyFile,
      });
    } else {
      this.setState({ maxNumberFilesError: true });
    }
  };

  _handleRemoveFile = removingIndex => {
    const { maxNumberFilesError } = this.state;
    const { state, _mergeState } = this.props;

    _mergeState({ order:{ files: state.order.files.filter((file, index) => removingIndex !== index)} });

    if (maxNumberFilesError) this.setState({ maxNumberFilesError: false });
  };

  render() {
    const { maxNumberFilesError, emptyFileError } = this.state;
    const {
      cabinetDropZoneClass,
      state: {
        order: { files },
        uploadRequirements: {
          max_number_files: maxNumberFiles,
          max_file_size_kb,
          allowed_file_types,
        },
      },
    } = this.props;

    // convert kb to bytes
    const maxSize = +max_file_size_kb * 1024;

    return (
      <Dropzone
        multiple
        accept={allowed_file_types}
        maxSize={maxSize} // bytes
        onDrop={this._handleDrop}
      >
        {({ getRootProps, getInputProps, isDragActive, rejectedFiles, isDragReject }) => (
          <section className={`${styles.container} ${cabinetDropZoneClass ? styles.cabinetDropZoneClass : ''}`}>
            <span className='itemTitle'>Attach files</span>
            <div
              className={`${styles.dropzone} ${
                isDragActive ? styles.active : ''
                }`}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {!isDragActive && <span><IoMdCloudUpload className={styles.cloudIcon}/>Drop files here or click</span>}
              {isDragActive && !isDragReject && 'Drop it like it\'s hot!'}
              {rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize && (
                <span className={styles.errorMessage}>File is too large</span>
              )}
              {isDragReject && 'File type not allowed, sorry!'}
              {maxNumberFilesError && (
                <span className={styles.errorMessage}>
                  {`only ${maxNumberFiles} files allowed`}!
                </span>
              )}
              {emptyFileError && <span className={styles.errorMessage}>file is empty!</span>}
            </div>
            {files.length > 0 && (
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
            )}
          </section>
        )}
      </Dropzone>
    );
  }
}
