export const rune_data = {
  'weaponRunes': {
    'Master Rune of the Summit': {
      'repeatable': false,
      'svg': [22],
      'baseCost': 35000,
      'effects': [
        'A weapon engraved with rune can be activated with the command word (Anriz). Upon activation, the wielder gains flying speed of 60ft for 1 hour. If the weapon leaves the wielder\'s hand during the effect, the user immediately loses the ability to fly. The rune cannot be used again for 1d12 hours.',
      ],
    },

    'Master Rune of Swiftness': {
      'repeatable': false,
      'svg': [76],
      'baseCost': 35000,
      'effects': [
        'A weapon engraved with this rune can make one attack with it as a bonus action on each of your turns.',
      ],
    },

    'Rune of Frost': {
      'repeatable': true,
      'svg': [6,49],
      'baseCost': 500,
      'maxTiers': 3,
      'effects': [
        'This rune has 2 charges. The power contained within the rune may be expended to add an additional 1d6 points of Cold damage to a damage roll. You may expend all charges at once, or each charge individually. The charges held in the rune are regained after a long rest.',
        'This rune has 3 charges. The power contained within the rune may be expended to add an additional 2d6 points of Cold damage to a damage roll. You may expend all charges at once, or each charge individually. The charges held in the rune are regained after a long rest.',
        'This rune has 4 charges. The power contained within the rune may be expended to add an additional 3d6 points of Cold damage to a damage roll. You may expend all charges at once, or each charge individually. The charges held in the rune are regained after a long rest.',
      ],
    },

    'Rune of Striking': {
      'repeatable': true,
      'svg': [7,43,29],
      'baseCost': 500,
      'maxTiers': 3,
      'effects': [
        'A weapon engraved with this rune has a +1 bonus to attack and damage rolls.',
        'A weapon engraved with this rune has a +2 bonus to attack and damage rolls.',
        'A weapon engraved with this rune has a +3 bonus to attack and damage rolls.',
        ],
    },

    'Rune of Warning': {
      'repeatable': false,
      'svg': [16,11,33],
      'baseCost': 500,
      'maxTiers': 1,
      'effects': [
        'While a weapon engraved with this rune is on your person, you have advantage on initiative rolls.',
      ],
    },

    'Rune of the Ancestors': {
      'repeatable': true,
      'svg': [50,22,10],
      'baseCost': 500,
      'maxTiers': 3,
      'effects': [
        'When a weapon engraved with this rune scores a critical hit, the bearer regains hit points as if the had spent a Hit Die during a short rest (roll Hit Dice + Con modifier). This effect does not consume the Hit Die.',
        'When a weapon engraved with this rune scores a critical hit, the bearer regains hit points as if the had spent 2 Hit Dice during a short rest (roll Hit Dice + Con modifier). This effect does not consume the Hit Dice.',
        'When a weapon engraved with this rune scores a critical hit, the bearer regains hit points as if the had spent 3 Hit Dice during a short rest (roll Hit Dice + Con modifier). This effect does not consume the Hit Dice.',
      ],
    },

    'Rune of the Wind': {
      'repeatable': true,
      'svg': [1,12,44],
      'baseCost': 3000,
      'maxTiers': 2,
      'effects': [
        'This rune has 1 charge that can be used to cast misty step. The range of the misty step spell is centered on the last projectile fired by this weapon. The weapon regains the lost charge on a long rest.',
        'This rune has 3 charge that can be used to cast misty step. The range of the misty step spell is centered on the last projectile fired by this weapon. The weapon regains the lost charge on a long rest.',
      ],
    },

    'Rune of Binding': {
      'repeatable': false,
      'svg': [4,61,40],
      'baseCost': 500,
      'maxTiers': 1,
      'effects': [
        'A weapon engraved with this rune is bound to the wielder. The owner may use a bonus action to summon the weapon to their hand from a distance of up to 500 feet.',
      ],
    },
  },

  // 'armorRunes': [

  // ],

  'talismanRunes': {
    'Rune of Dismay': {
      'repeatable': true,
      'svg': [68,15,38],
      'baseCost': 500,
      'maxTiers': 2,
      'effects': [
        'An instrument forged with this rune has 3 charges. You can use an action to play it and expend 1 charge to create a unnatural, eerie bellow. Each creature within 30 feet of you that hears it must succeed on a DC 13 Wisdom saving throw or become frightened of you for 1 minute. If you wish, all creatures in the area that aren\'t hostile toward you automatically succeed on the saving throw. A creature that fails the saving throw can repeat it at the end of each of its turns, ending the effect on itself on a success. A creature that succeeds on its saving throw is immune to the effect of these instrument for 24 hours. The rune regain 1d3 expended charges daily at dawn.',
        'An instrument forged with this rune has 3 charges. You can use an action to play it and expend 1 charge to create a unnatural, eerie bellow. Each creature within 60 feet of you that hears it must succeed on a DC 15 Wisdom saving throw or become frightened of you for 1 minute. If you wish, all creatures in the area that aren\'t hostile toward you automatically succeed on the saving throw. A creature that fails the saving throw can repeat it at the end of each of its turns, ending the effect on itself on a success. A creature that succeeds on its saving throw is immune to the effect of these instrument for 24 hours. The rune regain 1d3 expended charges daily at dawn.',
        'An instrument forged with this rune has 3 charges. You can use an action to play it and expend 1 charge to create a unnatural, eerie bellow. Each creature within 90 feet of you that hears it must succeed on a DC 18 Wisdom saving throw or become frightened of you for 1 minute. If you wish, all creatures in the area that aren\'t hostile toward you automatically succeed on the saving throw. A creature that fails the saving throw can repeat it at the end of each of its turns, ending the effect on itself on a success. A creature that succeeds on its saving throw is immune to the effect of these instrument for 24 hours. The rune regain 1d3 expended charges daily at dawn.',
      ],
    },
  },
};