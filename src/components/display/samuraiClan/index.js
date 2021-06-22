import React, { Component } from "react";
import Display from "../display";
import Utils from "../../utils";

import "./samuraiClan.scss";

export default class SamuraiClanDisplay extends Component {
  render() {
    const honorText =
      "Honor is a measure of how truthful, loyal and trustworthy a group is and how well the group, as a whole, pressures its individual members into behaving in a manner that reflects well on the whole group. Groups with high honor hold themselves to a higher standard than groups with low honor. The Honor score modifies the DC for all Bluff, Diplomacy, or Intimidate checks made to compel a member of the group into doing something contrary to the group’s personal code. You should also consider the group’s Honor when determining how members of the group react to temptations or bribes.";

    const moraleText =
      "Morale is the measure of a group’s general cheer, optimism and determination. Groups with a high morale are, as a whole, harder to intimidate. Individuals in groups possessing a low morale are more easily cowed and dispersed. The Morale score modifies the DC for all Intimidate checks made against members of the group by those outside the group. You should also consider the group’s Morale when determining how they react to danger.";

    const loreText =
      "Lore is the measure of a group’s overall attitude toward knowledge and scholarly pursuits. Groups with a high Lore modifier are more likely to possess libraries and hold scholars in high regard. Groups with a low Lore modifier are more likely to be taciturn and distrustful of new ideas. The Lore score applies to Diplomacy checks made to gather information from members of the group and Knowledge checks made using the group’s personal resources. You should also consider the group’s Lore when determining how chatty and communicative the members of the group are.";

    const societyText =
      "Society is a measure of how open-minded and civilized a group is. A group with a low Society modifier is going to be distrustful of those from outside the group and will be more insular. A high society modifier indicates a more cosmopolitan attitude toward outsiders. A group’s Society score should be applied to all Disguise checks made against a member of that group, as well as to Diplomacy checks made against members of the group by outsiders.";

    const {
      clan: {
        clanName: { clanNameText, clanNameKanji },
        alignment,
        wealth: { level: wealthLevel, tier: wealthTier },
        size: { clanTier, memberCount },
        stats: { honor, morale, lore, society },
        qualitiesDescriptions,
        daimyo: {
          clanNameText: daimyoClanName,
          givenNameText: daimyoGivenName,
          clanNameKanji: daimyoclanNameKanji,
          givenNameKanji: daimyoGivenNameKanji,
          title: daimyoTitle,
          traits: daimyoTraits,
          traitsDescription: daimyoTraitsDescription,
          alignmentShorthand: daimyoAlignment,
          characterClasses: daimyoCharacterClasses,
        },
        clanHead: {
          clanNameText: clanHeadClanName,
          givenNameText: clanHeadGivenName,
          clanNameKanji: clanHeadClanNameKanji,
          givenNameKanji: clanHeadGivenNameKanji,
          title: clanHeadTitle,
          traits: clanHeadTraits,
          traitsDescription: clanHeadTraitsDescription,
          alignmentShorthand: clanHeadAlignment,
          characterClasses: clanHeadCharacterClasses,
        },
        qualities,
        members,
        importLimit,
        purchaseLimit,
        enterprises,
        province,
      },
    } = this.props;

    return (
      <Display>
        <h1>
          {clanNameText} (<span className="kanji">{clanNameKanji}</span>) Clan
        </h1>
        <h2 className={`displayLayout__subHeading`}>
          {alignment} {clanTier} {wealthLevel !== "Typical" && wealthLevel} Samurai Clan (
          {Utils.numberWithCommas(memberCount)} members)
        </h2>
        <ul className="lineItem statList">
          <li className="statList__item">
            <span
              className="statList__item--name"
              aria-label={honorText}
              data-balloon-length="large"
              data-balloon-pos="right"
            >
              Honor
            </span>{" "}
            {honor >= 0 ? `+${honor}` : honor}
          </li>
          <li className="statList__item">
            <span
              className="statList__item--name"
              aria-label={moraleText}
              data-balloon-length="large"
              data-balloon-pos="right"
            >
              Morale
            </span>{" "}
            {morale >= 0 ? `+${morale}` : morale}
          </li>
          <li className="statList__item">
            <span
              className="statList__item--name"
              aria-label={loreText}
              data-balloon-length="large"
              data-balloon-pos="right"
            >
              Lore
            </span>{" "}
            {lore >= 0 ? `+${lore}` : lore}
          </li>
          <li className="statList__item">
            <span
              className="statList__item--name"
              aria-label={societyText}
              data-balloon-length="large"
              data-balloon-pos="right"
            >
              Society
            </span>{" "}
            {society >= 0 ? `+${society}` : society}
          </li>
        </ul>

        {/* DAIMYO HEAD */}
        <div className="lineItem daimyo">
          <p>
            <span className="lineHeading">Lord</span>{" "}
            <span className="daimyo__name">
              {daimyoClanName} {daimyoGivenName}
            </span>{" "}
            <span className="kanji daimyo__kanji">
              {daimyoclanNameKanji} {daimyoGivenNameKanji}
            </span>
            ,{" "}
            <span>
              {daimyoTitle} of {province} Province
            </span>{" "}
            (
            <span className="daimyo__traits samurai__traits">
              {daimyoTraits.map((trait, i) => {
                if (i === daimyoTraits.length - 1) {
                  return (
                    <span
                      key={i + trait}
                      className="samurai__traits--trait"
                      aria-label={daimyoTraitsDescription[i]}
                      data-balloon-length="large"
                      data-balloon-pos="up"
                    >
                      {trait}
                    </span>
                  );
                }
                return (
                  <span
                    key={i + trait}
                    className="samurai__traits--trait"
                    aria-label={daimyoTraitsDescription[i]}
                    data-balloon-length="large"
                    data-balloon-pos="up"
                  >
                    {trait},{" "}
                  </span>
                );
              })}
            </span>
            )
          </p>
          <ul>
            <li>
              <span>{daimyoAlignment}</span>{" "}
              {daimyoCharacterClasses.map((cl, i) => {
                if (i === daimyoCharacterClasses.length - 1) {
                  return cl;
                }
                return `${cl} / `;
              })}
            </li>
          </ul>
        </div>

        {/* CLAN HEAD */}
        <div className="lineItem clanHead">
          <p>
            <span className="lineHeading">{clanHeadTitle}</span>{" "}
            <span className="clanHead__name">
              {clanHeadClanName} {clanHeadGivenName}
            </span>{" "}
            <span className="kanji clanHead__kanji">
              {clanHeadClanNameKanji} {clanHeadGivenNameKanji}
            </span>{" "}
            (
            <span className="clanHead__traits samurai__traits">
              {clanHeadTraits.map((trait, i) => {
                if (i === clanHeadTraits.length - 1) {
                  return (
                    <span
                      key={i + trait}
                      className="samurai__traits--trait"
                      aria-label={clanHeadTraitsDescription[i]}
                      data-balloon-length="large"
                      data-balloon-pos="up"
                    >
                      {trait}
                    </span>
                  );
                }
                return (
                  <span
                    key={i + trait}
                    className="samurai__traits--trait"
                    aria-label={clanHeadTraitsDescription[i]}
                    data-balloon-length="large"
                    data-balloon-pos="up"
                  >
                    {trait},{" "}
                  </span>
                );
              })}
            </span>
            )
          </p>
          <ul>
            <li>
              <span>{clanHeadAlignment}</span>{" "}
              <span>
                {clanHeadCharacterClasses.map((cl, i) => {
                  if (i === clanHeadCharacterClasses.length - 1) {
                    return cl;
                  }
                  return `${cl} / `;
                })}
              </span>
            </li>
          </ul>
        </div>

        <div className="lineItem clanQualities">
          <p>
            <span className="lineHeading">Clan Qualities</span>{" "}
            <span className="clanQualities__list samurai__traits">
              {qualities.map((trait, i) => {
                if (i === qualities.length - 1) {
                  return (
                    <span
                      key={i + trait}
                      className="samurai__traits--trait"
                      aria-label={qualitiesDescriptions[i]}
                      data-balloon-length="large"
                      data-balloon-pos="up"
                    >
                      {trait}
                    </span>
                  );
                }
                return (
                  <span
                    key={i + trait}
                    className="samurai__traits--trait"
                    aria-label={qualitiesDescriptions[i]}
                    data-balloon-length="large"
                    data-balloon-pos="up"
                  >
                    {trait},{" "}
                  </span>
                );
              })}
            </span>
          </p>
        </div>

        <div className="lineItem clanEnterprises">
          <p>
            <span className="lineHeading">Clan Enterprises</span>{" "}
            <span className="clanQualities__list">
              {enterprises.map((trait, i) => {
                const { name } = trait;
                if (i === enterprises.length - 1) {
                  return name;
                }
                return `${name}, `;
              })}
            </span>
          </p>
        </div>

        <div className="lineItem economics">
          <p>
            <span className="lineHeading">Purchase Limit</span>{" "}
            <span>{Utils.numberWithCommas(purchaseLimit)} gp</span>;{" "}
            <span className="lineHeading">Import Limit</span>{" "}
            <span>{Utils.numberWithCommas(importLimit)} gp</span>
          </p>
        </div>

        <div className="lineItem members">
          <p>
            <span className="lineHeading">Notable Members</span>
          </p>
          <ul>
            {members.map((member, i) => {
              return (
                <li className="lineItem" key={i + member.givenNameText}>
                  <span className="clanHead__name">
                    {member.clanNameText} {member.givenNameText}
                  </span>{" "}
                  <span className="kanji clanHead__kanji">
                    {member.clanNameKanji} {member.givenNameKanji}
                  </span>
                  , <span>{member.alignmentShorthand}</span>{" "}
                  <span className="samurai__classes">
                    {member.characterClasses.map((cl, i) => {
                      if (i === member.characterClasses.length - 1) {
                        return cl;
                      }
                      return `${cl} / `;
                    })}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </Display>
    );
  }
}
