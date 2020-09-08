import React, { Component } from "react";

export default class NobleDisplay extends Component {
  render() {
    const {
      // nobles,
      nobles: {
        name: { displayName },
        // name: { name, displayName },
        race,
        occupation,
      },
      // city: {
      // population: {
      // importantPeople: { noblePeopleArray },
      // },
      // },
      index,
      // sendToPersonEntry,
    } = this.props;

    return (
      <li
        name={displayName}
        key={displayName + index}
        className='infoTable__row names pointer'
        // onClick={() => {
        //   sendToPersonEntry(nobles, displayName, noblePeopleArray);
        // }}
      >
        <span className='info__label capitalize'>{occupation} </span>
        <span className='info__value'>{displayName}</span>{" "}
        <small className='info__label gray'>({race})</small>
      </li>
    );
  }
}
