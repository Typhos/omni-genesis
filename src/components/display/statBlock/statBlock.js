import React, { Component } from "react";

import styles from "./statBlock.module.scss";

export default class dndStatBlock extends Component {
  render() {
    let person = this.props.person;
    let rndDmgArray = person.stats.atkDmg.damage.dice;
    let dmgDice =
      rndDmgArray[2] > 0
        ? `${rndDmgArray[0]}d${rndDmgArray[1]}+${rndDmgArray[2]}`
        : `${rndDmgArray[0]}d${rndDmgArray[1]}`;

    let scores = person.stats.coreStats.scores;
    let mods = person.stats.coreStats.mods;

    const senses = function () {
      for (let [key, value] of Object.entries(person.stats.perception.senses)) {
        return (
          <span className="info__value">
            {key} {value} ft.,
          </span>
        );
      }
    };

    const displayRace = person.subrace ? person.subrace.concat(" ", person.race) : person.race;

    return (
      <section className={styles.statsShell}>
        <div className={styles.statBlock}>
          <div className={styles.grouping}>
            <h3 className={styles.name}>{person.name.displayName}</h3>
            <button
              className={styles.copy}
              data-balloon-pos="left"
              aria-label="Copy Stat Block JSON to Clipboard"
              onClick={() => {
                navigator.clipboard.writeText(person.JSON);
              }}
            >
              <span role="img" aria-label="copy to clipboard">
                📋
              </span>
            </button>
            <p className={styles.typeAlignment}>
              {person.stats.size} Humanoid ({displayRace}), {person.alignment}
            </p>
          </div>
          <div className={styles.grouping}>
            <p>
              <span className="info__label">Armor Class</span>{" "}
              <span className="info__value">{person.stats.ac}</span>
            </p>
            <p>
              <span className="info__label">HP</span>{" "}
              <span className="info__value">
                {person.stats.hp} ({person.stats.hitDice})
              </span>
            </p>
            <p>
              <span className="info__label">Speed</span>{" "}
              <span className="info__value">{person.stats.speed} ft.</span>
            </p>
          </div>
          <div className={`${styles.grouping} ${styles.stats}`}>
            <p>
              <span className="info__label">Senses</span> {senses()}{" "}
              <span className="info__value">
                passive Perception {person.stats.perception.passive}
              </span>
            </p>
            <p>
              <span className="info__label">Languages</span>{" "}
              {person.stats.languages.map((lang, i) => {
                return i === person.stats.languages.length - 1 ? (
                  <span className="info__value" key={lang.name}>
                    {lang.name}
                  </span>
                ) : (
                  <span className="info__value" key={lang.name}>
                    {lang.name},{" "}
                  </span>
                );
              })}
            </p>
            <p>
              <span className="info__label">Challenge</span>{" "}
              <span className="info__value">{person.stats.cr}</span>
            </p>
          </div>
          <div className={`${styles.grouping} ${styles.stats}`}>
            <p className={styles.block}>
              <strong>str</strong>{" "}
              <span className={styles.numerical}>
                {scores.str} <small>({mods.str})</small>
              </span>
            </p>
            <p className={styles.block}>
              <strong>dex</strong>{" "}
              <span className={styles.numerical}>
                {scores.dex} <small>({mods.dex})</small>
              </span>
            </p>
            <p className={styles.block}>
              <strong>con</strong>{" "}
              <span className={styles.numerical}>
                {scores.con} <small>({mods.con})</small>
              </span>
            </p>
            <p className={styles.block}>
              <strong>int</strong>{" "}
              <span className={styles.numerical}>
                {scores.int} <small>({mods.int})</small>
              </span>
            </p>
            <p className={styles.block}>
              <strong>wis</strong>{" "}
              <span className={styles.numerical}>
                {scores.wis} <small>({mods.wis})</small>
              </span>
            </p>
            <p className={styles.block}>
              <strong>cha</strong>{" "}
              <span className={styles.numerical}>
                {scores.cha} <small>({mods.cha})</small>
              </span>
            </p>
          </div>

          <div className={styles.grouping}>
            <h4 className={styles.subheading}>Actions</h4>
            {person.stats.atkDmg.attacks === 2 && (
              <p>
                <span className="info__key">Multiattack.</span>{" "}
                <span>{person.name.name} makes two melee or ranged attacks.</span>
              </p>
            )}
            {person.stats.atkDmg.attacks === 3 && (
              <p>
                <span className="info__key">Multiattack.</span>{" "}
                <span>{person.name.name} makes three melee or ranged attacks.</span>
              </p>
            )}
            <p>
              <span className="info__key">Melee Attack.</span>{" "}
              <span>
                {" "}
                Melee Weapon Attack: +{person.stats.attackBonus} to hit, reach 5 ft., one target.
                Hit: {person.stats.atkDmg.damage.tPerAtk} ({dmgDice}) damage.
              </span>
            </p>
            <p>
              <span className="info__key">Ranged Attack.</span>{" "}
              <span>
                {" "}
                Ranged Weapon Attack: +{person.stats.attackBonus} to hit, range 60/120 ft., one
                target. Hit: {person.stats.atkDmg.damage.tPerAtk} ({dmgDice}) damage.
              </span>
            </p>
          </div>
        </div>
      </section>
    );
  }
}
