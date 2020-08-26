import React, { Component } from "react";

import styles from "./nobles.module.scss";

export default class NobleDisplay extends Component {
  render() {
    const {
      nobles,
      nobles: {
        name: { name, displayName },
        race,
        occupation,
      },
      city: {
        population: {
          importantPeople: { noblePeopleArray },
        },
      },
      index,
      sendToPersonEntry,
    } = this.props;

    return (
      <li
        name={displayName}
        key={displayName + index}
        className="infoTableRow names pointer"
        // onClick={() => {
        //   sendToPersonEntry(nobles, displayName, noblePeopleArray);
        // }}
      >
        <span className={`${styles.label} capitalize`}>{occupation} </span>
        <span className={styles.value}>
          {displayName} <small>({race})</small>
        </span>
      </li>
    );
  }
}
