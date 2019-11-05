// Core
import React, { Component } from 'react';
import { FaFile } from 'react-icons/fa';

// Components
import { withProfile } from 'components/HOC/withProfile';
import { FileDropZone } from 'components/ui/export';
import { Preloader } from 'components/common/export';

// Instruments
import OrderAPI from 'api/orders/OrderAPI';
import { uploadFiles } from 'instruments/export';
import { GetOrderFilesRequest } from 'api/orders/requests';

// Styles
import styles from './styles.css';
import grid from 'theme/grid.css';

@withProfile
export class FilesTab extends Component {
  state = {
    files: [],
    isUploadingFile: false,
  };

  _getOrdersFiles = () => {
    const { order } = this.props;

    if (Object.keys(order).length !== 0) {
      new OrderAPI().getOrderFiles(new GetOrderFilesRequest(order)).then(data => {
        this.setState({
          files: data.files,
          isUploadingFile: false,
        });
      });
    }
  };

  componentDidMount() {
    this._getOrdersFiles();
  }

  componentDidUpdate(prevProps) {
    const {
      _setDefaultOrderValues,
      state: {
        order: {
          files,
        },
      },
      order
    } = this.props;

    if (order !== prevProps.order) {
      this._getOrdersFiles();
    }

    if (files !== prevProps.state.order.files) {
      if (files.length > 0) {

        this.setState({ isUploadingFile: true });

        uploadFiles(files, order).then(() => {
          this._getOrdersFiles();
          _setDefaultOrderValues();
        });
      }
    }
  }

  render() {
    const { files, isUploadingFile } = this.state;

    const supportFiles = null;

    const userFileJSX = files.map((file, index) =>
      <div key={index} className={styles.fileItem}>
        <FaFile/>
        <div className={grid.col}>
          <span className={styles.text}>{file}</span>
          <span className={styles.text}>size</span>
        </div>
      </div>);

    return (
      <div className={styles.filesContainer}>
        <div className={styles.col}>
          <span className={styles.title}>Uploads:</span>
          {supportFiles
            ? <p>this is support files</p>
            : <p>not files yet</p>}
        </div>
        <div className={styles.col}>
          <span className={styles.title}>Your files:</span>
          <FileDropZone cabinetDropZoneClass={true}/>
          <div className={styles.reverseCol}>
            {userFileJSX}
            {isUploadingFile && <div className={`${styles.preloader} ${styles.fileItem}`}>
              <Preloader/>
            </div>}
          </div>
        </div>
      </div>
    );
  }
}
