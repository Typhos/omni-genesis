import "./hirelings.scss";

import React, { Component } from "react";

import Display from "../display";
import OneColumnDisplay from "../columns/oneColumn";
import TwoColumnDisplay from "../columns/twoColumns";

export default class HirelingsDisplay extends Component {
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
        <section className="hirelings__rules">
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
        <Display classes="hirelings">
          <h1 className={`displayLayout__header`}>Interested Parties</h1>
          <TwoColumnDisplay>
            {roster
              .sort((a, b) => b.level - a.level)
              .map((mook, i) => {
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
                  goal,
                  descriptor,
                } = mook;

                const getAlignment = (AL) => {
                  switch (AL) {
                    case "Law":
                      return "Lawful";
                    case "Chaos":
                      return "Chaotic";
                    default:
                      return "Neutral";
                  }
                };

                return (
                  <li key={name + charClass + i} name={name} className="infoTable__row">
                    <h2 className="subHead">{name}</h2>
                    <TwoColumnDisplay>
                      <li className="infoTable__row">
                        <span className="info__label">{sex === "M" ? "Male" : "Female"}</span>
                      </li>
                      <li className="infoTable__row">
                        <span className="info__label">Lvl {level} </span>
                        <span className="info__value">{race !== "Human" ? race : charClass}</span>
                      </li>
                      <li className="infoTable__row">
                        <span className="info__label">HP </span>
                        <span className="info__value">{hp}</span>
                      </li>
                      <li className="infoTable__row">
                        <span className="info__label">AL </span>
                        <span className="info__value">{getAlignment(alignment)}</span>
                      </li>
                    </TwoColumnDisplay>
                    <OneColumnDisplay>
                      <li className="infoTable__row">
                        <span className="info__label">Weapons</span>
                        <span className="info__value">{weapons}</span>
                      </li>

                      <li className="infoTable__row">
                        <span className="info__label">Armor</span>
                        <span className="info__value">{armor}</span>
                      </li>

                      <li className="infoTable__row">
                        <span className="info__label">Descriptor</span>
                        <span className="info__value">{descriptor}</span>
                      </li>

                      <li className="infoTable__row">
                        <span className="info__label">Background</span>
                        <span className="info__value">{background}</span>
                      </li>

                      <li className="infoTable__row">
                        <span className="info__label">Goal</span>
                        <span className="info__value">{goal}</span>
                      </li>
                    </OneColumnDisplay>
                  </li>
                );
              })}
          </TwoColumnDisplay>

          {/* <table className="hirelingsTable" cellSpacing="0">
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
              {roster
                .sort((a, b) => b.level - a.level)
                .map((mook) => {
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
                      <td className="center">{level}</td>
                      <td>{race}</td>
                      <td className="center">{hp}</td>
                      <td className="center">{sex}</td>
                      <td>{weapons}</td>
                      <td>{armor}</td>
                      <td>{alignment}</td>
                      <td>{background}</td>
                      <td>{possession}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table> */}
          <h3>Recruiting cost: {cost} gp</h3>
        </Display>
      );
    }
  }
}
