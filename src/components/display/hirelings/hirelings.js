import React, { Component } from "react";

import Display from "../display";
import OneColumnDisplay from "../columns/oneColumn.js";
import StatBlock from "../statBlock/statBlock";
import TwoColumnDisplay from "../columns/twoColumns.js";
import Utils from "../../utils";
import displayStyles from "../display.module.scss";
import styles from "./hirelings.module.scss";

export default class HirelingsDisplay extends Component {
  constructor(props) {
    super(props);
  }

  updateDisplay(display) {
    if (this.props.state.display === display) {
      this.props.stateHandler({ display: null });
    } else {
      this.props.stateHandler({ display: display });
    }
  }

  render() {
    const { hirelings, hirelings: { cost, roster } = {} } = this.props;

    if (!hirelings) {
      return (
        <section className={styles.rules}>
          <p>
            When seeking to <strong>hire sellswords</strong>, an adventuring group may visit known
            adventurer-friendly taverns, post notices, and distribute help-wanted pamphlets.
            Recruitment of this kind can only be attempted <strong>once per day</strong>. Recruiting
            sellswords in a <strong>village</strong> costs <strong>5 gp</strong>, while doing so in
            a <strong>town</strong> costs <strong>10 gp</strong>, and recruiting in a{" "}
            <strong>city</strong> costs <strong>15 gp</strong>.
          </p>
          <p>
            They may also enlist the services of a <strong>town crier</strong>. This increases the
            total cost to <strong>10 gold pieces</strong>.
          </p>
        </section>
      );
    } else {
      return (
        <Display>
          <h1 className={`displayLayout__header`}>Interested Parties</h1>
          <table className={styles.hirelingsTable} cellSpacing="0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Level</th>
                <th>Race</th>
                <th>HP</th>
                <th>Sex</th>
                <th>Weapon(s)</th>
                <th>Armor</th>
                <th>Alignment</th>
                <th>Background</th>
                <th>Possessions/Trait</th>
              </tr>
            </thead>
            <tbody>
              {roster.map((mook) => {
                const {
                  name,
                  race,
                  charClass,
                  level,
                  hp,
                  sex,
                  alignment,
                  armor,
                  weapons,
                  background,
                  possession,
                } = mook;
                return (
                  <tr key={`${name}-${charClass}-${race}`}>
                    <td>{name}</td>
                    <td>{charClass}</td>
                    <td className={styles.center}>{level}</td>
                    <td>{race}</td>
                    <td className={styles.center}>{hp}</td>
                    <td className={styles.center}>{sex}</td>
                    <td>{weapons}</td>
                    <td>{armor}</td>
                    <td>{alignment}</td>
                    <td>{background}</td>
                    <td>{possession}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <h3>Recruiting cost: {cost} gp</h3>
        </Display>
      );
    }
  }
}
