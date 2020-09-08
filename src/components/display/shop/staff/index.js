import React, { Component } from "react";
// import Utils from "../../../utils";

export default class StaffDisplay extends Component {
  render() {
    const { shop } = this.props;

    return shop.staff.map((person, i) => {
      const {
        name: { displayName },
        occupation,
        race,
      } = person;
      return (
        <li
          name={displayName}
          key={displayName + i}
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
    });
  }
}
