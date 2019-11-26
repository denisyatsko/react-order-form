// Core
import React, { Component } from 'react';
import { FaFile } from 'react-icons/fa';

// Components
import { withProfile } from 'components/HOC/withProfile';
import { FileDropZone } from 'components/ui/export';
import { Preloader } from 'components/common/export';

// Instruments
import { config } from 'config';
import OrderAPI from 'api/orders/OrderAPI';
import { uploadFiles } from 'instruments/export';
import { GetOrderFilesRequest, GetFileDownloadTokenRequest } from 'api/orders/requests';

// Styles
import styles from './styles.css';

@withProfile
export class FilesTab extends Component {
  state = {
    files: undefined,
    isUploadingFile: false,
  };

  _downloadFile = (id) => {
    const { order } = this.props;

    new OrderAPI().getFileDownloadToken(new GetFileDownloadTokenRequest({
      ...order,
      file_id: id,
    })).then(data => {
      const link = document.createElement('a');

      link.href = `${config.apiURL.downloadFile}?file_access_token=${data.access_token}`;
      link.setAttribute('target', '_blank');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    });
  };

  _getOrdersFiles = () => {
    const { order } = this.props;

    if (Object.keys(order).length !== 0) {
      new OrderAPI().getOrderFiles(new GetOrderFilesRequest(order)).then(data => {
        this.setState({
          files: data.results,
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
      state: {
        order: {
          files,
        },
      },
      order,
      _setDefaultOrderValues,
    } = this.props;

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
    const { order, handlerSetActiveTab } = this.props;
    const { files, isUploadingFile } = this.state;

    const supportFiles = null;

    const userFileJSX = files && files.map(({ name, id }) =>
      <li
        key={id} className={styles.fileItem}
        onClick={() => this._downloadFile(id)}
      >
        <FaFile/>
        <span className={styles.text}>{name}</span>
      </li>);

    return (
      <div className={styles.filesContainer}>
        <div className={styles.col}>
          <span className={styles.title}>Uploads:</span>
          {supportFiles
            ? <p>this is support files</p>
            : <p>not files yet</p>}
          {+order.status === 7 && // delivered status
          <div>
            <button
              type='button'
              className={`btn btn--primary`}
              onClick={() => handlerSetActiveTab('tab4')}
            >Accept order
            </button>
            <button
              type='button'
              className={`btn btn--primary`}
              onClick={() => handlerSetActiveTab('tab5')}
            >Request revision
            </button>
            <button
              type='button'
              className={`btn btn--primary`}
              onClick={() => handlerSetActiveTab('tab6')}
            >Request refund
            </button>
          </div>}
        </div>
        <div className={styles.col}>
          <span className={styles.title}>Your files:</span>
          <FileDropZone cabinetDropZoneClass={true}/>
          <ul className={styles.reverseCol}>
            {!!!userFileJSX
              ? <Preloader size={30}/>
              : userFileJSX.length !== 0
                ? userFileJSX
                : userFileJSX.length === 0 && <p style={{ margin: '0' }}>not files yet</p>}
            {isUploadingFile &&
            <div className={styles.fileItem}>
              <Preloader size={30}/>
            </div>}
          </ul>
        </div>
      </div>
    );
  }
}
