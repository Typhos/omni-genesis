import React, { Component } from 'react';

import styles from "./statBlock.module.scss";

export default class dndStatBlock extends Component {

  render () {
    let person = this.props.person;
    let rndDmgArray = person.stats.atkDmg.damage.dice;
    let dmgDice = (rndDmgArray[2] > 0) ? `${rndDmgArray[0]}d${rndDmgArray[1]}+${rndDmgArray[2]}` : `${rndDmgArray[0]}d${rndDmgArray[1]}`;

    let scores = person.stats.coreStats.scores;
    let mods = person.stats.coreStats.mods;

    const senses = function() {
      for ( let [key, value] of Object.entries(person.stats.perception.senses) ) {
        return <span>{key} {value} ft.,</span>
      }
    }

    const displayRace = (person.subrace) ? person.subrace.concat(" ", person.race) : person.race;

    return (
      <section className={styles.statsShell}>
        <div className={styles.statBlock}>
          <div className={styles.grouping}>
            <h3 className={styles.name}>{person.name.displayName}</h3>
            <button 
              className={styles.copy} 
              data-balloon-pos="left" 
              aria-label="Copy Stat Block JSON to Clipboard" 
              onClick={() => {navigator.clipboard.writeText(person.JSON)}}>
                <span role="img" aria-label="copy to clipboard">📋</span>
              </button>
            <p className={styles.typeAlignment}>{person.stats.size} Humanoid ({displayRace}), {person.alignment}</p>
          </div>
          <div className={styles.grouping}>
            <p><strong>Armor Class</strong><span>{person.stats.ac}</span></p>
            <p><strong>HP</strong><span></span>{person.stats.hp} ({person.stats.hitDice})</p>
            <p><strong>Speed</strong><span>{person.stats.speed} ft.</span></p>
          </div>          
          <div className={`${styles.grouping} ${styles.stats}`}>
            <p><strong>Senses</strong>
              { senses() } <span>passive Perception {person.stats.perception.passive}</span>
            </p>
            <p>
              <strong>Languages</strong>
              {
                person.stats.languages.map( (lang, i) => {
                  return ( i === person.stats.languages.length-1 ) ? 
                    <span key={lang.name}>{lang.name}</span> : 
                    <span key={lang.name}>{lang.name}, </span>
                })
              }
            </p>
            <p><strong>Challenge</strong><span>{person.stats.cr}</span></p>
          </div>          
          <div className={`${styles.grouping} ${styles.stats}`}>
            <p className={styles.block}>
              <strong>str</strong> <span className={styles.numerical}>{scores.str} <small>({mods.str})</small></span>
            </p>
            <p className={styles.block}>
              <strong>dex</strong> <span className={styles.numerical}>{scores.dex} <small>({mods.dex})</small></span>
            </p>
            <p className={styles.block}>
              <strong>con</strong> <span className={styles.numerical}>{scores.con} <small>({mods.con})</small></span>
            </p>
            <p className={styles.block}>
              <strong>int</strong> <span className={styles.numerical}>{scores.int} <small>({mods.int})</small></span>
            </p>
            <p className={styles.block}>
              <strong>wis</strong> <span className={styles.numerical}>{scores.wis} <small>({mods.wis})</small></span>
            </p>
            <p className={styles.block}>
              <strong>cha</strong> <span className={styles.numerical}>{scores.cha} <small>({mods.cha})</small></span>
            </p>
          </div>
          
          <div className={styles.grouping}>
            <h4 className={styles.subheading}>Actions</h4>
            { person.stats.atkDmg.attacks === 2 &&
              <p><strong>Multiattack.</strong> <span>{person.name.name} makes two melee or ranged attacks.</span></p>
            }
            { person.stats.atkDmg.attacks === 3 &&
              <p><strong>Multiattack.</strong> <span>{person.name.name} makes three melee or ranged attacks.</span></p>
            }
            <p><strong>Melee Attack.</strong> <span> Melee Weapon Attack: +{person.stats.attackBonus} to hit, reach 5 ft., one target. Hit: {person.stats.atkDmg.damage.tPerAtk} ({dmgDice}) damage.</span></p>
            <p><strong>Ranged Attack.</strong> <span> Ranged Weapon Attack: +{person.stats.attackBonus} to hit, range 60/120 ft., one target. Hit: {person.stats.atkDmg.damage.tPerAtk} ({dmgDice}) damage.</span></p>
          </div>
        </div>
      </section>
    )
  }
}