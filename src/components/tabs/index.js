import "../../styles/tabs.scss";

import React, { Component } from "react";

import Tab from "./tab";

export default class Tabs extends Component {
  constructor(props) {
    super(props);

    let children = null;
    if (Array.isArray(this.props.children)) {
      children = this.props.children.filter((e) => Boolean(e))[0].props.label;
    }

    this.state = {
      activeTab: children
    };
  }

  componentDidUpdate(prevProps) {
    // Check if the children props have changed
    if (this.props.children !== prevProps.children) {
      let activeTab = null;
      if (Array.isArray(this.props.children)) {
        activeTab = this.props.children.filter((e) => Boolean(e))[0].props.label;
      }

      this.setState({
        activeTab: activeTab
      });
    }
  }

  onClickTabItem = (tab) => {
    this.setState({ activeTab: tab });
  };

  render() {
    let {
      onClickTabItem,
      props: { children },
      state: { activeTab }
    } = this;

    if (Array.isArray(children)) {
      children = children.filter((e) => Boolean(e));
    }

    return (
      <div className="tabs">
        <ol className="tabs__headerGroup">
          {children.map((child) => {
            const { label } = child.props;

            return <Tab activeTab={activeTab} key={label} label={label} onClick={onClickTabItem} />;
          })}
        </ol>
        <div className="tabs__contentGroup">
          {children.map((child) => {
            if (child.props.label !== activeTab) return undefined;
            return child.props.children;
          })}
        </div>
      </div>
    );
  }
}
