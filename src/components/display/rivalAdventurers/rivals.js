import "./rivals.scss";

import React, { Component } from "react";

import Display from "../display";
import OneColumnDisplay from "../columns/oneColumn";
import TwoColumnDisplay from "../columns/twoColumns";
import Utils from "../../utils";

export default class RivalAdventurersDisplay extends Component {
  updateDisplay(display) {
    if (this.props.state.display === display) {
      this.props.stateHandler({ display: null });
    } else {
      this.props.stateHandler({ display: display });
    }
  }

  render() {
    const { party } = this.props;
    console.log(party);

    if (!party) {
      return (
        <section className="rival__rules">
          <h2>Rival Adventuring Parties</h2>
          <p>
            The following generator is designed to create rival parties that can be used in{" "}
            <strong>rumor tables</strong> or as <strong>encounters</strong> in the wilderness or
            dungeons.
          </p>
          <p>
            Encounter tables occasionally feature parties of NPC adventurers who are out seeking
            their own fortunes. A referee may also include a rival party to provide time pressure or
            a direct challenge the player characters. Rival adventuring parties enhance the game
            world by adding realism and creating a more dynamic environment. They also establish
            treasure and experience points (XP) as limited resources.
          </p>
        </section>
      );
    } else {
      const { partyName, partySize, charactersArray } = party;

      return (
        <Display classes="hirelings">
          <h1 className={`displayLayout__header`}>
            {partyName} ({partySize})
          </h1>
          <TwoColumnDisplay>
            {charactersArray
              .sort((a, b) => b.level - a.level)
              .map((mook, i) => {
                const {
                  name: { name, surname },
                  charClass,
                  level,
                  hp,
                  sex,
                  alignment,
                  armor,
                  weapons,
                  quirk,
                  descriptor,
                  treasure,
                  magicItems
                } = mook;

                return (
                  <li key={name + charClass + i} name={name} className="infoTable__row">
                    <h2 className="subHead">
                      {name} {surname}
                    </h2>
                    <TwoColumnDisplay>
                      <li className="infoTable__row">
                        <span className="info__label">{sex === "male" ? "Male" : "Female"}</span>
                      </li>
                      <li className="infoTable__row">
                        <span className="info__label">Lvl {level} </span>
                        <span className="info__value">{charClass}</span>
                      </li>

                      <li className="infoTable__row">
                        <span className="info__label">Descriptor</span>
                        <span className="info__value">{descriptor}</span>
                      </li>

                      <li className="infoTable__row">
                        <span className="info__label">AL </span>
                        <span className="info__value">{Utils.firstLetterUppercase(alignment)}</span>
                      </li>
                      <li className="infoTable__row">
                        <span className="info__label">HP </span>
                        <span className="info__value">{hp}</span>
                      </li>

                      <li className="infoTable__row">
                        <span className="info__label">Quirk</span>
                        <span className="info__value">{quirk}</span>
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
                        <span className="info__label">Treasure</span>
                        <span className="info__value">{Utils.numberWithCommas(treasure)} gp</span>
                      </li>

                      {magicItems.length > 0 && (
                        <li className="infoTable__row">
                          <span className="info__label">Magic Item(s)</span>
                          <span className="info__value magicItems">
                            {magicItems.map((mi) => mi).join(", ")}
                          </span>
                        </li>
                      )}
                    </OneColumnDisplay>
                  </li>
                );
              })}
          </TwoColumnDisplay>
        </Display>
      );
    }
  }
}
