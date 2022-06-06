import React, { Component } from "react";

import OneColumnDisplay from "../../columns/oneColumn";
import TwoColumnDisplay from "../../columns/twoColumns";

export default class GovernmentTabsDisplay extends Component {
  render() {
    const {
      government: {
        rulerCount,
        govRulers,
        govLegitimacy,
        govControl,
        govStrife,
        govEvent,
        govCrisis,
        cultureArray,
      },
    } = this.props;

    return (
      <OneColumnDisplay>
        <li className={`infoTable__row`}>
          <span className="info__label">Ruling Elite</span>{" "}
          <span className="info__value">
            {govRulers} ({rulerCount} Head{rulerCount > 1 ? "s" : ""} of State)
          </span>
        </li>
        <li className={`infoTable__row`}>
          <span className="info__label">Claim to Legitimacy</span>{" "}
          <span className="info__value">{govLegitimacy}</span>
        </li>
        <li className={`infoTable__row`}>
          <span className="info__label">Method(s) of Control</span>{" "}
          <span className="info__value">{govControl}</span>
        </li>
        <li className={`infoTable__row`}>
          <span className="info__label">Internal Strife</span>{" "}
          <span className="info__value">{govStrife}</span>
        </li>
        <li className={`infoTable__row`}>
          <span className="info__label">Governmental Crisis</span>{" "}
          <span className="info__value">{govCrisis}</span>
        </li>
        <li className={`infoTable__row`}>
          <span className="info__label">Recent Historical Event</span>{" "}
          <span className="info__value">{govEvent}</span>
        </li>

        <h4 className="tabs__sectionHeading">Cultural Tags</h4>
        <TwoColumnDisplay>
          {cultureArray.map((tag) => (
            <li className={`infoTable__row`}>{tag}</li>
          ))}
        </TwoColumnDisplay>
      </OneColumnDisplay>
    );
  }
}
