import React, { Component } from "react";

class Tab extends Component {
  // static propTypes = {
  //   activeTab: PropTypes.string.isRequired,
  //   label: PropTypes.string.isRequired,
  //   onClick: PropTypes.func.isRequired,
  // };

  onClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  };

  render() {
    const {
      onClick,
      props: { activeTab, label },
    } = this;

    let className = "tabs__header";

    if (activeTab === label) {
      className = "tabs__header active";
    }

    return (
      <li className={className} onClick={onClick}>
        {label}
      </li>
    );
  }
}

export default Tab;
