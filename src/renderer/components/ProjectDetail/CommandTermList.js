import React, { Component, PropTypes } from 'react';
import Button from 'antd/lib/button';
import i18n from 'i18n';

import CommandModal from './CommandModal';

class CommandTermList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  startCmd(type) {
    const { dispatch, name } = this.props;
    dispatch({
      type: 'task/execCustomCmd',
      payload: { type, name }
    });
  }

  stopCmd(type) {
    const { dispatch, name } = this.props;
    dispatch({
      type: 'task/stopCustomCmd',
      payload: { type, name }
    });
  }

  removeCmd(cmd) {
    this.props.dispatch({
      type: 'task/removeSingleCommand',
      payload: {
        cmd
      }
    });
  }

  changeLogType(logType) {
    this.props.dispatch({
      type: 'task/changeStatus',
      payload: {
        logType
      }
    });
  }

  showModal() {
    this.setState({ showModal: true });
  }

  hideModal() {
    this.setState({ showModal: false });
  }

  render() {
    const { commands, dispatch } = this.props;
    console.log(commands)

    const modalProps = {
      showModal: this.state.showModal,
      hideModal: this.hideModal.bind(this),
      dispatch,
      commands
    };

    return (
      <div className="cmd-sider">
        <h3>{i18n('cmd.sider.title')}</h3>
        <Button
          icon="plus"
          type="primary"
          shape="circle"
          size="small"
          className="add-cmd-btn"
          onClick={() => this.showModal()}
        />
        {
          commands.map(({ name, running }) => (
            <div className="cmd-item" key={name} onClick={() => this.changeLogType(name)}>
              {name}
              <i className="iconfont icon-close-o" onClick={() => this.removeCmd(name)} />
              { running
                ? <i className="iconfont icon-stop" onClick={() => this.stopCmd(name)} />
                : <i className="iconfont icon-play" onClick={() => this.startCmd(name)} />
              }
            </div>
          ))
        }
        <CommandModal {...modalProps} />
      </div>
    );
  }
}

CommandTermList.propTypes = {
  name: PropTypes.string.isRequired,
  commands: PropTypes.array.isRequired,
  // commands: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default CommandTermList;
