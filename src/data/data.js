// JS file because loading local json is not allowed.

var data = {

  'objects': {
    'types': {
      'weapon': {
        'type': {
          'axe':{
            'subtype':{
              'hand axe':{
                'count': 1,
                'single':'hand axe',
                'plural':'hand axes',
                'stats': {
                  'use_method':'melee',
                  'type': 'simple',
                  'value': 5,
                  'damage': ['1d6'],
                  'damage_type': ['slashing'],
                  'weight': 2,
                  'properties': ['light','thrown'],
                }
              },
              'battle axe':{
                'count': 1,
                'single':'battle axe',
                'plural':'battle axes',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 10,
                  'damage': ['1d8'],
                  'damage_type': ['slashing'],
                  'weight': 4,
                  'properties': ['versatile (1d10)'],
                }
              },
              'dwarven urgorosh':{
                'count': 1,
                'single':'dwarven urgorosh',
                'plural':'dwarven urgoroshes',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 22,
                  'damage': ['1d8','1d10'],
                  'damage_type': ['piercing','slashing'],
                  'weight': 4,
                  'properties': ['special','two-handed'],
                }
              },
              'war pick':{
                'count': 1,
                'single':'war pick',
                'plural':'war pick',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 5,
                  'damage': ['1d8'],
                  'damage_type': ['piercing'],
                  'weight': 2,
                  'properties': [],
                }
              },
              'cleaver':{
                'count': 1,
                'single':'cleaver',
                'plural':'cleavers',
                'stats': {
                  'use_method':'melee',
                  'type': 'simple',
                  'value': 5,
                  'damage': ['1d4'],
                  'damage_type': ['slashing'],
                  'weight': 2,
                  'properties': ['light'],
                }
              },
              'tabarzin':{
                'count': 1,
                'single':'tabarzin',
                'plural':'tabarzins',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 10,
                  'damage': ['1d8'],
                  'damage_type': ['slashing'],
                  'weight': 4,
                  'properties': ['versatile (1d10)'],
                }
              },
              'hatchet':{
                'count': 1,
                'single':'hatchet',
                'plural':'hatchets',
                'stats': {
                  'use_method':'melee',
                  'type': 'simple',
                  'value': 5,
                  'damage': ['1d6'],
                  'damage_type': ['slashing'],
                  'weight': 2,
                  'properties': ['light','thrown'],
                }
              },
              'crowbill':{
                'count': 1,
                'single':'crowbill',
                'plural':'crowbills',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 22,
                  'damage': ['1d8','1d8'],
                  'damage_type': ['piercing','slashing'],
                  'weight': 4,
                  'properties': [],
                }
              },
              'great axe':{
                'count': 1,
                'single':'great axe',
                'plural':'great axes',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 30,
                  'damage': ['1d12'],
                  'damage_type': ['slashing'],
                  'weight': 7,
                  'properties': ['heavy','two-handed'],
                }
              },
              'orchish double axe':{
                'count': 1,
                'single':'orchish double axe',
                'plural':'orchish double axes',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 30,
                  'damage': ['1d8'],
                  'damage_type': ['slashing'],
                  'weight': 7,
                  'properties': ['heavy','two-handed'],
                }
              },
            },
            'materials': {
              'primary': 'head',
              'required': {
                'head': ['metal'],
                'haft': ['metal', 'wood'],
              },
              'optional':{
                'strapping': ['cloth','leather'],
                'pommel': ['metal','wood','stone','gemstone','bone'],
              },
              'creation': 'crafted',
              'maker': {
                'metal': 'smith'
              },
              'default': 'metal',
              'restricted': {
                'metal': ['platinum', 'lead', 'gold', 'silver',],
              },
              'extra': ['emblem'],
              'emblem': {
                'chance': 33,
                'parts': ['head'],
                'method': 'engraved',
                'min': 1,
                'max': 1,
              },
            },
          },
          'sword':{
            'subtype':{
              'short sword':{
                'count': 1,
                'single':'short sword',
                'plural':'short swords',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 10,
                  'damage': ['1d6'],
                  'damage_type': ['piercing'],
                  'weight': 2,
                  'properties': ['finesse','light'],
                }
              },
              'rapier':{
                'count': 1,
                'single':'rapier',
                'plural':'rapiers',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 25,
                  'damage': ['1d8'],
                  'damage_type': ['piercing'],
                  'weight': 2,
                  'properties': ['finesse'],
                }
              },
              'long sword':{
                'count': 1,
                'single':'long sword',
                'plural':'long swords',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 15,
                  'damage': ['1d8'],
                  'damage_type': ['slashing'],
                  'weight': 3,
                  'properties': ['versatile (1d10)'],
                }
              },
              'scimitar':{
                'count': 1,
                'single':'scimitar',
                'plural':'scimitars',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 25,
                  'damage': ['1d6'],
                  'damage_type': ['slashing'],
                  'weight': 3,
                  'properties': ['finesse','light'],
                }
              },
              'falchion':{
                'count': 1,
                'single':'falchion',
                'plural':'falchions',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 25,
                  'damage': ['1d6'],
                  'damage_type': ['slashing'],
                  'weight': 3,
                  'properties': ['finesse','light'],
                }
              },
              'broad sword':{
                'count': 1,
                'single':'broad sword',
                'plural':'broad swords',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 15,
                  'damage': ['1d8'],
                  'damage_type': ['slashing'],
                  'weight': 3,
                  'properties': ['versatile (1d10)'],
                }
              },
              'gladius':{
                'count': 1,
                'single':'gladius',
                'plural':'gladi',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 10,
                  'damage': ['1d6'],
                  'damage_type': ['piercing'],
                  'weight': 2,
                  'properties': ['finesse','light'],
                }
              },
              'elven crescent blade':{
                'count': 1,
                'single':'elven crescent blade',
                'plural':'elven crescent blades',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 80,
                  'damage': ['2d6'],
                  'damage_type': ['slashing'],
                  'weight': 6,
                  'properties': ['heavy','two-handed','special'],
                }
              },
              'two-handed sword':{
                'count': 1,
                'single':'two-handed sword',
                'plural':'two-handed swords',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 50,
                  'damage': ['2d6'],
                  'damage_type': ['slashing'],
                  'weight': 6,
                  'properties': ['heavy','two-handed'],
                }
              },
              'claymore':{
                'count': 1,
                'single':'claymore',
                'plural':'claymores',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 50,
                  'damage': ['2d6'],
                  'damage_type': ['slashing'],
                  'weight': 6,
                  'properties': ['heavy','two-handed'],
                }
              },
              'bastard sword':{
                'count': 1,
                'single':'bastard sword',
                'plural':'bastard swords',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 15,
                  'damage': ['1d8'],
                  'damage_type': ['slashing'],
                  'weight': 3,
                  'properties': ['versatile (1d10)'],
                }
              },
              'flamberge':{
                'count': 1,
                'single':'flamberge',
                'plural':'flamberges',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 50,
                  'damage': ['2d6'],
                  'damage_type': ['slashing'],
                  'weight': 6,
                  'properties': ['heavy','two-handed'],
                }
              },
              'espandon':{
                'count': 1,
                'single':'espandon',
                'plural':'espandons',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 50,
                  'damage': ['2d6'],
                  'damage_type': ['slashing'],
                  'weight': 6,
                  'properties': ['heavy','two-handed'],
                }
              }
            },
            'materials': {
              'primary': 'blade',
              'required': {
                'blade': ['metal'],
                'hilt': ['metal', 'wood'],
                'cross-guard': ['metal'],
                'pommel': ['metal','wood','stone','gemstone','bone'],
              },
              'optional':{
                'hilt wrap': ['leather','cloth'],
                'tassel': ['leather', 'cloth'],
                'scabbard': ['leather'],
              },
              'creation': 'forged',
              'maker': {
                'metal': 'smith'
              },
              'default': 'metal',
              'restricted': {
                'metal': ['platinum', 'lead', 'copper'],
              },
              'extra': ['carving','emblem'],
              'carving': {
                'chance': 25,
                'parts': ['pommel'],
                'shape': ['',' head'],
                'path': ['words','engraving','things','person','single'],
                'count': 1,
              },
              'emblem': {
                'chance': 33,
                'parts': ['blade'],
                'method': 'engraved',
                'min': 1,
                'max': 1,
              },
            },
          },
          'mace': {
            'subtype':{
              'club':{
                'count': 1,
                'single':'club',
                'plural':'clubs',
                'stats': {
                  'use_method':'melee',
                  'type': 'simple',
                  'value': 0.1,
                  'damage': ['1d4'],
                  'damage_type': ['bludgeoning'],
                  'weight': 2,
                  'properties': ['light'],
                },
                'materials': {
                  'primary': 'body',
                  'required': {
                    'body': ['metal', 'stone', 'bone'],
                  },
                  'optional': {
                    'haft wrapping': ['leather','cloth'],
                    'strap': ['leather','cloth'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                    'stone': 'stonecrafter',
                    'bone': 'artisan'
                  },
                  'default': 'metal',
                  'restricted': {
                    'metal': ['platinum', 'lead', 'gold', 'silver'],
                  },
                },
              },
              'mace':{
                'count': 1,
                'single':'mace',
                'plural':'maces',
                'stats': {
                  'use_method':'melee',
                  'type': 'simple',
                  'value': 5,
                  'damage': ['1d6'],
                  'damage_type': ['bludgeoning'],
                  'weight': 4,
                  'properties': [],
                },
                'materials': {
                  'primary': 'head',
                  'required': {
                    'head': ['metal', 'stone', 'bone'],
                    'haft': ['metal', 'wood'],
                  },
                  'optional': {
                    'pommel': ['metal','wood','stone','gemstone','bone'],
                    'haft wrapping': ['leather','cloth'],
                    'strap': ['leather','cloth'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                    'stone': 'stonecrafter',
                  },
                  'default': 'metal',
                  'restricted': {
                    'metal': ['platinum', 'lead', 'gold', 'silver'],
                  },
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 33,
                    'parts': ['head'],
                    'method': 'engraved',
                    'min': 1,
                    'max': 1,
                  },
                },
              },
              'spiked mace':{
                'count': 1,
                'single':'spiked mace',
                'plural':'spiked maces',
                'stats': {
                  'use_method':'melee',
                  'type': 'simple',
                  'value': 5,
                  'damage': ['1d6'],
                  'damage_type': ['bludgeoning'],
                  'weight': 4,
                  'properties': [],
                },
                'materials': {
                  'primary': 'head',
                  'required': {
                    'head': ['metal','stone'],
                    'spikes': ['metal','stone','bone'],
                    'haft': ['metal','wood'],
                  },
                  'optional': {
                    'pommel': ['metal','wood','stone','gemstone','bone'],
                    'haft wrapping': ['leather','cloth'],
                    'strap': ['leather','cloth'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                    'stone': 'stonecrafter',
                  },
                  'default': 'metal',
                  'restricted': {
                    'metal': ['platinum', 'lead', 'gold', 'silver'],
                  },
                  'extra': ['carving'],
                  'carving': {
                    'chance': 33,
                    'parts': ['pomel'],
                    'shape': ['',' head'],
                    'path': ['words','engraving','things','person','single'],
                    'count': 1,
                  },
                },
              },
              'morning star':{
                'count': 1,
                'single':'morning star',
                'plural':'morning stars',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 15,
                  'damage': ['1d8'],
                  'damage_type': ['piercing'],
                  'weight': 4,
                  'properties': [],
                },
                'materials': {
                  'primary': 'head',
                  'required': {
                    'head': ['metal', 'stone'],
                    'spikes': ['metal','stone','bone'],
                    'haft': ['metal', 'wood'],
                  },
                  'optional': {
                    'pommel': ['metal','wood','stone','gemstone','bone'],
                    'haft wrapping': ['leather','cloth'],
                    'strap': ['leather','cloth'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                    'stone': 'stonecrafter',
                  },
                  'default': 'metal',
                  'restricted': {
                    'metal': ['platinum', 'lead', 'gold', 'silver'],
                  },
                  'extra': ['carving'],
                  'carving': {
                    'chance': 33,
                    'parts': ['pomel'],
                    'shape': ['',' head'],
                    'path': ['words','engraving','things','person','single'],
                    'count': 1,
                  },
                },
              },
              'flail':{
                'count': 1,
                'single':'flail',
                'plural':'flails',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 10,
                  'damage': ['1d8'],
                  'damage_type': ['bludgeoning'],
                  'weight': 2,
                  'properties': [],
                },
                'materials': {
                  'primary': 'head',
                  'required': {
                    'head': ['metal', 'stone'],
                    'spikes': ['metal','stone','bone'],
                    'chain': ['metal'],
                    'handle': ['metal','wood'],
                  },
                  'optional': {
                    'handle wrapping': ['leather','cloth'],
                    'strap': ['leather','cloth'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                    'stone': 'stonecrafter',
                  },
                  'default': 'metal',
                  'restricted': {
                    'metal': ['platinum', 'lead', 'gold', 'silver'],
                  },
                },
              },
              'warhammer':{
                'count': 1,
                'single':'warhammer',
                'plural':'warhammers',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 15,
                  'damage': ['1d8'],
                  'damage_type': ['bludgeoning'],
                  'weight': 2,
                  'properties': ['versatile (1d10)'],
                },
                'materials': {
                  'primary': 'head',
                  'required': {
                    'head': ['metal', 'stone',],
                    'haft': ['metal', 'wood'],
                  },
                  'optional': {
                    'pommel': ['metal','wood','stone','gemstone','bone'],
                    'haft wrapping': ['leather','cloth'],
                    'strap': ['leather','cloth'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                    'stone': 'stonecrafter',
                  },
                  'default': 'metal',
                  'restricted': {
                    'metal': ['platinum', 'lead', 'gold', 'silver'],
                  },
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 33,
                    'parts': ['head'],
                    'method': 'engraved',
                    'min': 1,
                    'max': 1,
                  },
                },
              },
              'flanged mace':{
                'count': 1,
                'single':'flanged mace',
                'plural':'flanged maces',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 5,
                  'damage': ['1d6'],
                  'damage_type': ['bludgeoning'],
                  'weight': 4,
                  'properties': [],
                },
                'materials': {
                  'primary': 'head',
                  'required': {
                    'head': ['metal', 'stone'],
                    'haft': ['metal', 'wood'],
                  },
                  'optional': {
                    'pommel': ['metal','wood','stone','gemstone','bone'],
                    'haft wrapping': ['leather','cloth'],
                    'strap': ['leather','cloth'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                    'stone': 'stonecrafter',
                  },
                  'default': 'metal',
                  'restricted': {
                    'metal': ['platinum', 'lead', 'gold', 'silver'],
                  },
                  'extra': ['carving'],
                  'carving': {
                    'chance': 33,
                    'parts': ['pomel'],
                    'shape': ['',' head'],
                    'path': ['words','engraving','things','person','single'],
                    'count': 1,
                  },
                },
              },
              'light hammer':{
                'count': 1,
                'single':'light hammer',
                'plural':'light hammers',
                'stats': {
                  'use_method':'melee',
                  'type': 'simple',
                  'value': 2,
                  'damage': ['1d4'],
                  'damage_type': ['bludgeoning'],
                  'weight': 2,
                  'properties': ['light','thrown'],
                  'range': ['20/60']
                },
                'materials': {
                  'primary': 'head',
                  'required': {
                    'head': ['metal', 'stone'],
                    'haft': ['metal', 'wood'],
                  },
                  'optional': {
                    'pommel': ['metal','wood','stone','gemstone','bone'],
                    'haft wrapping': ['leather','cloth'],
                    'strap': ['leather','cloth'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                    'stone': 'stonecrafter',
                  },
                  'default': 'metal',
                  'restricted': {
                    'metal': ['platinum', 'lead', 'gold', 'silver'],
                  },
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 33,
                    'parts': ['head'],
                    'method': 'engraved',
                    'min': 1,
                    'max': 1,
                  },
                },
              },
              'maul':{
                'count': 1,
                'single':'maul',
                'plural':'mauls',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 10,
                  'damage': ['2d6'],
                  'damage_type': ['bludgeoning'],
                  'weight': 10,
                  'properties': ['heavy','two-handed'],
                },
                'materials': {
                  'primary': 'head',
                  'required': {
                    'head': ['metal', 'stone'],
                    'haft': ['metal', 'wood'],
                  },
                  'optional': {
                    'pommel': ['metal','wood','stone','gemstone','bone'],
                    'haft wrapping': ['leather','cloth'],
                    'strap': ['leather','cloth'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                    'stone': 'stonecrafter',
                  },
                  'default': 'metal',
                  'restricted': {
                    'metal': ['platinum', 'lead', 'gold', 'silver'],
                  },
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 33,
                    'parts': ['head'],
                    'method': 'engraved',
                    'min': 1,
                    'max': 1,
                  },
                },
              },
              'great club':{
                'count': 1,
                'single':'great club',
                'plural':'great clubs',
                'stats': {
                  'use_method':'melee',
                  'type': 'simple',
                  'value': 0.2,
                  'damage': ['1d8'],
                  'damage_type': ['bludgeoning'],
                  'weight': 10,
                  'properties': ['two-handed'],
                },
                'materials': {
                  'primary': 'body',
                  'required': {
                    'body': ['wood', 'stone'],
                  },
                  'optional': {
                    'spikes': ['wood','stone','bone'],
                    'wrapping': ['leather','cloth'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                    'stone': 'stonecrafter',
                  },
                  'default': 'metal',
                  'restricted': {
                    'metal': ['platinum', 'lead', 'gold', 'silver'],
                  },
                },
              },              
              'gnomish double pick':{
                'count': 1,
                'single':'gnomish double pick',
                'plural':'gnomish double picks',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 20,
                  'damage': ['1d6'],
                  'damage_type': ['piercing'],
                  'weight': 10,
                },
                'materials': {
                  'primary': 'head',
                  'required': {
                    'head': ['metal', 'stone'],
                    'haft': ['metal', 'wood'],
                  },
                  'optional': {
                    'pommel': ['metal','wood','stone','gemstone','bone'],
                    'haft wrapping': ['leather','cloth'],
                    'strap': ['leather','cloth'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                    'stone': 'stonecrafter',
                  },
                  'default': 'metal',
                  'restricted': {
                    'metal': ['platinum', 'lead', 'gold', 'silver'],
                  },
                  'extra': ['carving'],
                  'carving': {
                    'chance': 33,
                    'parts': ['pomel'],
                    'shape': ['',' head'],
                    'path': ['words','engraving','things','person','single'],
                    'count': 1,
                  },
                },
              },         
              'dwarven mordenkrad':{
                'count': 1,
                'single':'dwarven mordenkrad',
                'plural':'dwarven mordenkrads',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 10,
                  'damage': ['3d4'],
                  'damage_type': ['bludgeoning'],
                  'weight': 10,
                  'properties': ['heavy','two-handed'],
                },
                'materials': {
                  'primary': 'head',
                  'required': {
                    'head': ['metal', 'stone'],
                    'haft': ['metal', 'wood'],
                  },
                  'optional': {
                    'pommel': ['metal','wood','stone','gemstone','bone'],
                    'haft wrapping': ['leather','cloth'],
                    'strap': ['leather','cloth'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                    'stone': 'stonecrafter',
                  },
                  'default': 'metal',
                  'restricted': {
                    'metal': ['platinum', 'lead', 'gold', 'silver'],
                  },
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 33,
                    'parts': ['head'],
                    'method': 'engraved',
                    'min': 1,
                    'max': 1,
                  },
                },
              },
            },
          },
          'spear': {
            'subtype':{
              'javelin':{
                'count': 'many',
                'single':'javelin',
                'plural':'javelins',
                'stats': {
                  'use_method':'thrown',
                  'type': 'simple',
                  'value': 0.5,
                  'damage': ['1d6'],
                  'damage_type': ['piercing'],
                  'weight': 2,
                  'properties': ['thrown'],
                  'range': '30/120',
                },
                'materials': {
                  'primary': 'point',
                  'required': {
                    'point': ['metal','stone','bone'],
                    'shaft': ['wood'],
                  },
                  'optional':{
                    'tassel':['leather','cloth'],
                    'strapping':['leather','cloth']
                  },
                  'creation': 'forged',
                  'maker': {
                    'metal': 'smith',
                    'stone': 'stonecraft',
                    'bone': 'boneworker',
                  },
                  'default': 'metal',
                  'restricted': {
                    'metal': ['platinum', 'lead', 'gold', 'silver'],
                  },
                },
              },
              'spear':{
                'count': 1,
                'single':'spear',
                'plural':'spears',
                'stats': {
                  'use_method':'melee',
                  'type': 'simple',
                  'value': 1,
                  'damage': ['1d6'],
                  'damage_type': ['piercing'],
                  'weight': 3,
                  'properties': ['thrown','versatile (1d8)'],
                  'range': '20/60',
                },
                'materials': {
                  'primary': 'point',
                  'required': {
                    'point': ['metal','stone','bone'],
                    'shaft': ['wood'],
                  },
                  'optional':{
                    'tassel':['leather','cloth'],
                    'strapping':['leather','cloth']
                  },
                  'creation': 'forged',
                  'maker': {
                    'metal': 'smith',
                    'stone': 'stonecraft',
                    'bone': 'boneworker',
                  },
                  'default': 'metal',
                  'restricted': {
                    'metal': ['platinum', 'lead', 'gold', 'silver'],
                  },
                },
              },
              'trident':{
                'count': 1,
                'single':'trident',
                'plural':'tridents',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 5,
                  'damage': ['1d6'],
                  'damage_type': ['piercing'],
                  'weight': 4,
                  'properties': ['thrown','versatile (1d8)'],
                  'range': '20/60',
                },
                'materials': {
                  'primary': 'points',
                  'required': {
                    'points': ['metal','stone','bone'],
                    'shaft': ['wood'],
                  },
                  'optional':{
                    'tassel':['leather','cloth'],
                    'strapping':['leather','cloth']
                  },
                  'creation': 'forged',
                  'maker': {
                    'metal': 'smith',
                    'stone': 'stonecraft',
                    'bone': 'boneworker',
                  },
                  'default': 'metal',
                  'restricted': {
                    'metal': ['platinum', 'lead', 'gold', 'silver'],
                  },
                },
              },
              'spetum':{
                'count': 1,
                'single':'spetum',
                'plural':'spetums',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 12,
                  'damage': ['1d10', '1d10'],
                  'damage_type': ['piercing','slashing'],
                  'weight': 18,
                  'properties': ['heavy','two-handed','reach'],
                },
                'materials': {
                  'primary': 'points',
                  'required': {
                    'points': ['metal','stone','bone'],
                    'shaft': ['wood'],
                  },
                  'optional':{
                    'tassel':['leather','cloth'],
                    'strapping':['leather','cloth']
                  },
                  'creation': 'forged',
                  'maker': {
                    'metal': 'smith',
                    'stone': 'stonecraft',
                    'bone': 'boneworker',
                  },
                  'default': 'metal',
                  'restricted': {
                    'metal': ['platinum', 'lead', 'gold', 'silver'],
                  },
                },
              },
              'lance':{
                'count': 1,
                'single':'lance',
                'plural':'lances',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 10,
                  'damage': ['1d12'],
                  'damage_type': ['piercing'],
                  'weight': 6,
                  'properties': ['reach','special'],
                },
                'materials': {
                  'primary': 'shaft',
                  'required': {
                    'shaft': ['metal','wood'],
                    'guard': ['metal','wood'],
                    'handle': ['wood'],
                  },
                  'optional':{
                    'handle wrapping':['leather','cloth']
                  },
                  'creation': 'forged',
                  'maker': {
                    'metal': 'weaponsmith',
                    'wood': 'weaponsmith',
                  },
                  'default': 'metal',
                  'restricted': {
                    'metal': ['platinum', 'lead', 'gold', 'silver'],
                    'cloth': ['lace','silk'],
                  },
                },
              },
              'pike':{
                'count': 1,
                'single':'pike',
                'plural':'pikes',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 5,
                  'damage': ['1d10'],
                  'damage_type': ['piercing'],
                  'weight': 18,
                  'properties': ['heavy','two-handed','reach'],
                },
                'materials': {
                  'primary': 'point',
                  'required': {
                    'point': ['metal','stone','bone'],
                    'shaft': ['wood'],
                  },
                  'optional':{
                    'strapping':['leather','cloth']
                  },
                  'creation': 'forged',
                  'maker': {
                    'metal': 'smith',
                    'stone': 'stonecraft',
                    'bone': 'boneworker',
                  },
                  'default': 'metal',
                  'restricted': {
                    'metal': ['platinum', 'lead', 'gold', 'silver'],
                  },
                },
              },
              'dragonborn greatspear':{
                'count': 1,
                'single':'dragonborn greatspear',
                'plural':'dragonborn greatspears',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 10,
                  'damage': ['1d10'],
                  'damage_type': ['piercing'],
                  'weight': 18,
                  'properties': ['heavy','two-handed','reach'],
                },
                'materials': {
                  'primary': 'point',
                  'required': {
                    'point': ['metal','bone'],
                    'shaft': ['wood'],
                  },
                  'optional':{
                    'tassel':['leather','cloth'],
                    'strapping':['leather','cloth']
                  },
                  'creation': 'forged',
                  'maker': {
                    'metal': 'smith',
                    'bone': 'boneworker',
                  },
                  'default': 'metal',
                  'restricted': {
                    'metal': ['platinum', 'lead', 'gold', 'silver'],
                  },
                },
              },
            },
          },
          'staff': {
            'subtype':{
              'walking stick':{
                'count': 1,
                'single':'walking stick',
                'plural':'walking sticks',
                'stats': {
                  'use_method':'melee',
                  'type': 'simple',
                  'value': 0.2,
                  'damage': ['1d6'],
                  'damage_type': ['bludgeoning'],
                  'weight': 4,
                  'properties': ['versatile (1d8)'],
                },
                'materials': {
                  'primary': 'shaft',
                  'required': {
                    'shaft': ['metal', 'wood', 'bone'],
                  },
                  'optional':{
                    'ornamental headpiece': ['metal','wood','bone'],
                    'wrapping': ['leather','cloth']
                  },
                  'restricted': {
                    'metal': ['platinum','lead','steel','copper'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                    'wood': 'woodworker',
                    'bone': 'bonecarver',
                  },
                  'default': 'wood',
                  'extra': ['carving'],
                  'carving': {
                    'chance': 100,
                    'parts': ['ornamental headpiece'],
                    'shape': [' head'],
                    'path': ['words','engraving','things','person','single'],
                    'count': 1,
                  },
                },
              },
              'quarterstaff':{
                'count': 1,
                'single':'quarterstaff',
                'plural':'quarterstaves',
                'stats': {
                  'use_method':'melee',
                  'type': 'simple',
                  'value': 0.2,
                  'damage': ['1d6'],
                  'damage_type': ['bludgeoning'],
                  'weight': 4,
                  'properties': ['versatile (1d8)'],
                },
                'materials': {
                  'primary': 'shaft',
                  'required': {
                    'shaft': ['metal', 'wood', 'bone'],
                  },
                  'optional':{
                    'wrapping': ['leather','cloth']
                  },
                  'restricted': {
                    'metal': ['platinum','lead','steel','copper'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                    'wood': 'woodworker',
                    'bone': 'bonecarver',
                  },
                  'default': 'wood',
                  'extra': ['carving'],
                  'carving': {
                    'chance': 100,
                    'parts': ['head'],
                    'shape': [' head'],
                    'path': ['words','engraving','things','person','single'],
                    'count': 1,
                  },
                },
              },
              'mage\'s staff':{
                'count': 1,
                'single':'mage\'s staff',
                'plural':'mage\'s staves',
                'stats': {
                  'use_method':'melee',
                  'type': 'simple',
                  'value': 0.2,
                  'damage': ['1d6'],
                  'damage_type': ['bludgeoning'],
                  'weight': 4,
                  'properties': ['versatile (1d8)'],
                },
                'materials': {
                  'primary': 'shaft',
                  'required': {
                    'shaft': ['metal', 'wood', 'bone'],
                  },
                  'optional':{
                    'ornamental headpiece': ['metal','wood','bone','gemstone'],
                    'wrapping': ['leather','cloth']
                  },
                  'restricted': {
                    'metal': ['platinum','lead','steel','copper'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                    'wood': 'woodworker',
                    'bone': 'bonecarver',
                  },
                  'default': 'wood',
                  'extra': ['carving'],
                  'carving': {
                    'chance': 100,
                    'parts': ['ornamental headpiece'],
                    'shape': [' head',''],
                    'path': ['words','engraving','things','person','single'],
                    'count': 1,
                  },
                },
              },
            },
          },
          'polearm': {
            'subtype':{
              'halberd':{
                'count': 1,
                'single':'halberd',
                'plural':'halberds',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 20,
                  'damage': ['1d10'],
                  'damage_type': ['slashing'],
                  'weight': 6,
                  'properties': ['heavy','reach','two-handed'],
                }
              },
              'glaive':{
                'count': 1,
                'single':'glaive',
                'plural':'glaives',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 20,
                  'damage': ['1d10'],
                  'damage_type': ['slashing'],
                  'weight': 6,
                  'properties': ['heavy','reach','two-handed'],
                }
              },
              'scythe':{
                'count': 1,
                'single':'scythe',
                'plural':'scythes',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 25,
                  'damage': ['1d10'],
                  'damage_type': ['slashing'],
                  'weight': 4,
                  'properties': ['special','two-handed'],
                }
              },
              'ranseur':{
                'count': 1,
                'single':'ranseur',
                'plural':'ranseurs',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 20,
                  'damage': ['1d10'],
                  'damage_type': ['slashing'],
                  'weight': 6,
                  'properties': ['heavy','reach','two-handed'],
                }
              },
              'bardiche':{
                'count': 1,
                'single':'bardiche',
                'plural':'bardiches',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 20,
                  'damage': ['1d10'],
                  'damage_type': ['slashing'],
                  'weight': 6,
                  'properties': ['heavy','reach','two-handed'],
                }
              },
              'bill':{
                'count': 1,
                'single':'bill',
                'plural':'bills',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 20,
                  'damage': ['1d10'],
                  'damage_type': ['slashing'],
                  'weight': 6,
                  'properties': ['heavy','reach','two-handed'],
                }
              },
              'bec-de-corbin':{
                'count': 1,
                'single':'bec-de-corbin',
                'plural':'bec-de-corbins',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 20,
                  'damage': ['1d10'],
                  'damage_type': ['slashing'],
                  'weight': 6,
                  'properties': ['heavy','reach','two-handed'],
                }
              },
              'partizan':{
                'count': 1,
                'single':'partizan',
                'plural':'partizans',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 20,
                  'damage': ['1d10'],
                  'damage_type': ['slashing'],
                  'weight': 6,
                  'properties': ['heavy','reach','two-handed'],
                }
              },
              'lochaber axe':{
                'count': 1,
                'single':'lochaber axe',
                'plural':'lochaber axes',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 20,
                  'damage': ['1d10'],
                  'damage_type': ['slashing'],
                  'weight': 6,
                  'properties': ['heavy','reach','two-handed'],
                }
              },
            },
            'materials': {
              'primary': 'head',
              'required': {
                'head': ['metal'],
                'haft': ['metal', 'wood'],
              },
              'optional': {
                'tassel': ['cloth'],
                'strapping': ['cloth','leather']
              },
              'restricted': {
                'metal': ['lead','platinum','gold','silver','copper','mithral'],
              },
              'creation': 'forged',
              'maker': {
                'metal': 'smith'
              },
              'default': 'metal',
              'extra': ['emblem'],
              'emblem': {
                'chance': 33,
                'parts': ['head'],
                'method': 'engraved',
                'min': 1,
                'max': 1,
              },
            }
          },
          'bow':{
            'subtype':{
              'short bow':{
                'count': 1,
                'single':'short bow',
                'plural':'short bows',
                'stats': {
                  'use_method':'ranged',
                  'type': 'simple',
                  'value': 25,
                  'damage': ['1d6'],
                  'damage_type': ['piercing'],
                  'weight': 2,
                  'properties': ['ammunition','two-handed'],
                  'range': '80/320',
                }
              },
              'long bow':{
                'count': 1,
                'single':'long bow',
                'plural':'long bows',
                'stats': {
                  'use_method':'ranged',
                  'type': 'martial',
                  'value': 50,
                  'damage': ['1d8'],
                  'damage_type': ['piercing'],
                  'weight': 2,
                  'properties': ['ammunition','two-handed','heavy'],
                  'range': '150/600',
                }
              },
              'elven long bow':{
                'count': 1,
                'single':'elven long bow',
                'plural':'elven long bows',
                'stats': {
                  'use_method':'ranged',
                  'type': 'martial',
                  'value': 50,
                  'damage': ['1d8'],
                  'damage_type': ['piercing'],
                  'weight': 2,
                  'properties': ['ammunition','two-handed','heavy'],
                  'range': '150/600',
                }
              },
              'hunter\'s bow':{
                'count': 1,
                'single':'hunter\'s bow',
                'plural':'hunter\'s bows',
                'stats': {
                  'use_method':'ranged',
                  'type': 'martial',
                  'value': 50,
                  'damage': ['1d8'],
                  'damage_type': ['piercing'],
                  'weight': 2,
                  'properties': ['ammunition','two-handed','heavy'],
                  'range': '150/600',
                }
              },
              'composite bow':{
                'count': 1,
                'single':'composite bow',
                'plural':'composite bows',
                'stats': {
                  'use_method':'ranged',
                  'type': 'martial',
                  'value': 50,
                  'damage': ['1d8'],
                  'damage_type': ['piercing'],
                  'weight': 2,
                  'properties': ['ammunition','two-handed','heavy'],
                  'range': '150/600',
                }
              },
              'great bow':{
                'count': 1,
                'single':'great bow',
                'plural':'great bows',
                'stats': {
                  'use_method':'ranged',
                  'type': 'martial',
                  'value': 100,
                  'damage': ['1d8'],
                  'damage_type': ['piercing'],
                  'weight': 2,
                  'properties': ['ammunition','two-handed','heavy','special'],
                  'range': '150/600',
                }
              },
            },
            'materials': {
              'primary': 'body',
              'required': {
                'body': ['wood'],
                'string': ['cloth'],
              },
              'creation': 'crafted',
              'maker': {
                'metal': 'smith',
                'wood': 'bowyer',
              },
              'default': 'wood',
              'restricted': {
                'cloth': ['silk', 'lace'],
              },
              'extra': ['emblem'],
              'emblem': {
                'chance': 33,
                'parts': ['body'],
                'method': 'carved',
                'min': 1,
                'max': 1,
              },
            }
          },
          'dagger':{
            'subtype':{
              'dagger':{
                'count': 1,
                'single':'dagger',
                'plural':'daggers',
                'stats': {
                  'use_method':'melee',
                  'type': 'simple',
                  'value': 2,
                  'damage': ['1d4'],
                  'damage_type': ['piercing'],
                  'weight': 1,
                  'properties': ['finesse','light','thrown'],
                  'range': '20/60',
                }
              },
              'throwing dagger':{
                'count': 1,
                'single':'throwing dagger',
                'plural':'throwing daggers',
                'stats': {
                  'use_method':'thrown',
                  'type': 'simple',
                  'value': 2,
                  'damage': ['1d4'],
                  'damage_type': ['piercing'],
                  'weight': 1,
                  'properties': ['finesse','light','thrown'],
                  'range': '20/60',
                }
              },
              'stiletto':{
                'count': 1,
                'single':'stiletto',
                'plural':'stilettos',
                'stats': {
                  'use_method':'melee',
                  'type': 'simple',
                  'value': 6,
                  'damage': ['1d6'],
                  'damage_type': ['piercing'],
                  'weight': 1,
                  'properties': ['finesse','light'],
                }
              },
              'dirk':{
                'count': 1,
                'single':'dirk',
                'plural':'dirks',
                'stats': {
                  'use_method':'melee',
                  'type': 'simple',
                  'value': 6,
                  'damage': ['1d6'],
                  'damage_type': ['piercing'],
                  'weight': 1,
                  'properties': ['finesse','light'],
                }
              },
              'kris':{
                'count': 1,
                'single':'kris',
                'plural':'kris',
                'stats': {
                  'use_method':'melee',
                  'type': 'simple',
                  'value': 10,
                  'damage': ['1d6'],
                  'damage_type': ['piercing'],
                  'weight': 1,
                  'properties': ['finesse','light','special'],
                }
              },
            },
            'materials': {
              'primary': 'blade',
              'required': {
                'blade': ['metal'],
                'hilt': ['metal', 'wood'],
              },
              'optional': {
                'pommel': ['metal','wood','stone','gemstone','bone']
              },
              'creation': 'forged',
              'maker': {
                'metal': 'smith'
              },
              'default': 'metal',
              'restricted': {
                'metal': ['gold', 'platinum', 'lead'],
              },
              'extra': ['carving'],
              'carving': {
                'chance': 33,
                'parts': ['pommel'],
                'shape': [' head'],
                'path': ['words','engraving','things','person','single'],
                'count': 1,
              },
            }
          },
          'crossbow':{
            'subtype':{
              'hand crossbow':{
                'count': 1,
                'single':'hand crossbow',
                'plural':'hand crossbows',
                'stats': {
                  'use_method':'ranged',
                  'type': 'martial',
                  'value': 75,
                  'damage': ['1d6'],
                  'damage_type': ['piercing'],
                  'weight': 3,
                  'properties': ['ammunition','light','loading'],
                  'range': '30/120',
                }
              },
              'light crossbow':{
                'count': 1,
                'single':'light crossbow',
                'plural':'light crossbows',
                'stats': {
                  'use_method':'ranged',
                  'type': 'simple',
                  'value': 25,
                  'damage': ['1d8'],
                  'damage_type': ['piercing'],
                  'weight': 5,
                  'properties': ['ammunition','two-handed','loading'],
                  'range': '80/320',
                }
              },
              'light crossbow':{
                'count': 1,
                'single':'light crossbow',
                'plural':'light crossbows',
                'stats': {
                  'use_method':'ranged',
                  'type': 'simple',
                  'value': 25,
                  'damage': ['1d8'],
                  'damage_type': ['piercing'],
                  'weight': 5,
                  'properties': ['ammunition','two-handed','loading'],
                  'range': '80/320',
                }
              },
              'gnomish crossbow':{
                'count': 1,
                'single':'gnomish crossbow',
                'plural':'gnomish crossbows',
                'stats': {
                  'use_method':'ranged',
                  'type': 'simple',
                  'value': 25,
                  'damage': ['1d8'],
                  'damage_type': ['piercing'],
                  'weight': 5,
                  'properties': ['ammunition','two-handed','loading'],
                  'range': '80/320',
                }
              },
              'heavy crossbow':{
                'count': 1,
                'single':'heavy crossbow',
                'plural':'heavy crossbows',
                'stats': {
                  'use_method':'ranged',
                  'type': 'martial',
                  'value': 50,
                  'damage': ['1d10'],
                  'damage_type': ['piercing'],
                  'weight': 18,
                  'properties': ['ammunition','two-handed','heavy','loading'],
                  'range': '100/400',
                }
              },
              'repeating crossbow':{
                'count': 1,
                'single':'repeating crossbow',
                'plural':'repeating crossbows',
                'stats': {
                  'use_method':'ranged',
                  'type': 'martial',
                  'value': 100,
                  'damage': ['1d8'],
                  'damage_type': ['piercing'],
                  'weight': 2,
                  'properties': ['ammunition','two-handed','loading','special'],
                  'range': '80/320',
                }
              },
            },
            'materials': {
              'primary': 'stock',
              'required': {
                'stock': ['metal', 'wood'],
                'lath': ['metal'],
                'stirrup': ['metal'],
                'string': ['cloth'],
                'trigger': ['metal'],
              },
              'optional': {
                'wrapping': ['cloth','leather'],
                'strap': ['cloth','leather'],
              },
              'creation': 'crafted',
              'maker': {
                'metal': 'atilliator',
                'wood': 'atilliator',
              },
              'default': 'metal',
              'restricted': {
                'metal': ['platinum','lead','gold','silver'],
                'cloth': ['silk'],
              },
              'extra': ['emblem'],
              'emblem': {
                'chance': 33,
                'parts': ['stock'],
                'min': 1,
                'max': 3,
              },
            }
          },
          'fist-weapon':{
            'subtype':{
              'katar':{
                'count': 2,
                'single':'katar',
                'plural':'katars',
                'stats': {
                  'use_method':'melee',
                  'type': 'simple',
                  'value': 10,
                  'damage': ['1d6'],
                  'damage_type': ['piercing'],
                  'weight': 4,
                  'properties': ['light','finesse'],
                }
              },
              'tiger claw':{
                'count': 2,
                'single':'tiger claw',
                'plural':'tiger claws',
                'stats': {
                  'use_method':'melee',
                  'type': 'martial',
                  'value': 6,
                  'damage': ['1d4'],
                  'damage_type': ['slashing'],
                  'weight': 4,
                  'properties': ['light','finesse'],
                }
              },
              'wrist blade':{
                'count': 2,
                'single':'wrist blade',
                'plural':'wrist blades',
                'stats': {
                  'use_method':'melee',
                  'type': 'simple',
                  'value': 3,
                  'damage': ['1d4'],
                  'damage_type': ['piercing'],
                  'weight': 1,
                  'properties': ['light','finesse','special'],
                }
              },
            },
            'materials': {
              'primary': 'blade',
              'required': {
                'blade': ['metal'],
                'handle': ['metal', 'wood'],
              },
              'optional': {
                'tassel': ['cloth','leather'],
                'settings': ['gemstone','bone'],
                'strapping': ['cloth','leather']
              },
              'restricted': {
                'metal': ['platinum','lead','gold','copper'],
              },
              'creation': 'forged',
              'maker': {
                'metal': 'smith'
              },
              'default': 'metal',
            }
          },
          'wand': {
            'subtype': {
              'wand': {
                'count': 1,
                'single':'wand',
                'plural':'wands',
                'stats': {
                  'use_method':'melee',
                  'type': 'arcane',
                  'value': 5,
                  'damage': ['1'],
                  'damage_type': ['bludgeoning'],
                  'weight': 1,
                  'properties': ['special'],
                }
              },
            },
            'materials': {
              'primary': 'shaft',
              'required': {
                'shaft': ['wood','bone'],
                'arcane core': ['magical','bone'],
              },
              'optional': {
                'headpiece': ['gemstone','bone','metal'],
                'ornate handle': ['wood','bone','metal'],
              },
              'creation': 'crafted',
              'maker': {
                'wood': 'wandmaker',
                'metal': 'wandmaker',
                'bone': 'wandmaker',
              },
              'default': 'wood',
              'extra': ['carving'],
              'carving': {
                'parts': ['headpiece','ornate handle'],
                'shape': [''],
                'path': ['words','engraving','things','person','single'],
                'count': 1,
              },
            },
          },
        },
      },
      'armor': {
        'type': {
          'light armor': {
            'subtype': {
              'padded armor': {
                'count': 1,
                'single':'padded armor',
                'plural':'padded armors',
                'stats': {
                  'type': 'light',
                  'value': 5,
                  'armor_class': '11 + Dex modifier',
                  'stealth': 'Disadvantage',
                  'weight': 8,
                },
                'materials': {
                  'primary': 'body',
                  'required': {
                    'body': ['cloth'],
                    'strapping': ['leather'],
                    'buckels': ['metal'],
                  },
                  'default': 'cloth',
                  'restricted': {
                    'cloth': ['lace', 'silk'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'cloth': 'tailor',
                  },
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 33,
                    'parts': ['body'],
                    'min': 1,
                    'max': 3,
                  },
                },
              },
              'leather armor':{
                'count': 1,
                'single':'leather armor',
                'plural':'leather armors',
                'stats': {
                  'type': 'leather',
                  'value': 10,
                  'armor_class': '11 + Dex modifier',
                  'weight': 10,
                },
                'materials': {
                  'primary': 'body',
                  'required': {
                    'body': ['leather'],
                    'strapping': ['cloth','leather'],
                    'buckels': ['metal'],
                  },
                  'optional': {
                    'pouches': ['leather'],
                  },
                  'default': 'leather',
                  'creation': 'crafted',
                  'maker': {
                    'leather': 'leatherworker',
                  },
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 50,
                    'parts': ['body'],
                    'min': 1,
                    'max': 3,
                  },
                },
              },
              'studded leather armor':{
                'count': 1,
                'single':'studded leather armor',
                'plural':'studded leather armors',
                'stats': {
                  'type': 'light',
                  'value': 45,
                  'armor_class': '12 + Dex modifier',
                  'weight': 13,
                },
                'materials': {
                  'primary': 'body',
                  'required': {
                    'body': ['leather'],
                    'strapping': ['cloth','leather'],
                    'buckels': ['metal'],
                    'studs': ['metal'],
                  },
                  'optional': {
                    'pouches': ['leather'],
                  },
                  'default': 'leather',
                  'creation': 'crafted',
                  'maker': {
                    'leather': 'leatherworker',
                  },
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 50,
                    'parts': ['body'],
                    'min': 1,
                    'max': 3,
                  },
                },
              }
            }
          },
          'medium armor':{
            'subtype': {
              'hide armor':{
                'count': 1,
                'single':'leather armor',
                'plural':'leather armors',
                'stats': {
                  'type': 'medium',
                  'value': 10,
                  'armor_class': '12 + Dex modifier (max 2)',
                  'weight': 12,
                },
                'materials': {
                  'primary': 'body',
                  'required': {
                    'body': ['leather'],
                    'pelts': ['leather'],
                  },
                  'default': 'leather',
                  'restricted': {
                    'cloth': ['lace', 'silk'],
                    'metal': ['platinum','gold','silver','lead'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'leather': 'leatherworker',
                  },
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 50,
                    'parts': ['body'],
                    'min': 1,
                    'max': 3,
                  },
                },
              },
              'chain shirt': {
                'count': 1,
                'single':'chain shirt',
                'plural':'chain shirts',
                'stats': {
                  'type': 'medium',
                  'value': 10,
                  'armor_class': '12 + Dex modifier (max 2)',
                  'weight': 12,
                },
                'materials': {
                  'primary': 'set of rings',
                  'required': {
                    'set of rings': ['metal'],
                    'lining': ['cloth', 'leather'],
                    'strapping': ['cloth','leather'],
                    'buckels': ['metal'],
                  },
                  'default': 'metal',
                  'restricted': {
                    'cloth': ['lace', 'silk'],
                    'metal': ['platinum','gold','silver','lead'],
                  },
                  'creation': 'forged',
                  'maker': {
                    'metal': 'armorsmith',
                  },
                },
              },
              'scale mail':{
                'count': 1,
                'single':'scale mail armor',
                'plural':'scale mail armors',
                'stats': {
                  'type': 'medium',
                  'value': 50,
                  'armor_class': '14 + Dex modifier (max 2)',
                  'stealth': 'Disadvantage',
                  'weight': 45,
                },
                'materials': {
                  'primary': 'layer of overlapping scales',
                  'required': {
                    'layer of overlapping scales': ['metal'],
                    'lining': ['leather'],
                    'strapping': ['cloth','leather'],
                    'buckels': ['metal'],
                  },
                  'default': 'metal',
                  'restricted': {
                    'cloth': ['lace', 'silk'],
                    'metal': ['platinum','gold','silver','lead'],
                  },
                  'creation': 'forged',
                  'maker': {
                    'metal': 'armorsmith',
                  },
                },
              },
              'breastplate':{
                'count': 1,
                'single':'breastplate',
                'plural':'breastplates',
                'stats': {
                  'type': 'medium',
                  'value': 400,
                  'armor_class': '14 + Dex modifier (max 2)',
                  'weight': 20,
                },
                'materials': {
                  'primary': 'chest piece',
                  'required': {
                    'chest piece': ['metal'],
                    'lining': ['leather'],
                    'strapping': ['cloth','leather'],
                    'buckels': ['metal'],
                  },
                  'default': 'metal',
                  'restricted': {
                    'cloth': ['lace', 'silk'],
                    'metal': ['platinum','gold','silver','lead'],
                  },
                  'creation': 'forged',
                  'maker': {
                    'metal': 'armorsmith',
                  },
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 66,
                    'parts': ['chest piece'],
                    'min': 1,
                    'max': 3,
                  },
                },
              },
              'half plate':{
                'count': 1,
                'single':'half plate armor',
                'plural':'half plate armors',
                'stats': {
                  'type': 'medium',
                  'value': 750,
                  'armor_class': '15 + Dex modifier (max 2)',
                  'stealth': 'Disadvantage',
                  'weight': 40,
                },
                'materials': {
                  'primary': 'breast plate',
                  'required': {
                    'helmet': ['metal'],
                    'breast plate': ['metal'],
                    'pauldrons': ['metal'],
                    'gauntlets': ['metal'],
                    'greaves': ['metal'],
                    'lining': ['leather'],
                    'strapping': ['leather','cloth'],
                    'buckels': ['metal'],
                  },
                  'optional': {
                    'tassels': ['cloth'],
                  },
                  'default': 'leather',
                  'restricted': {
                    'cloth': ['lace', 'silk'],
                    'metal': ['platinum','silver','lead'],
                  },
                  'creation': 'forged',
                  'maker': {
                    'metal': 'armorsmith',
                  },
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 66,
                    'parts': ['breast plate'],
                    'min': 1,
                    'max': 3,
                  },
                },
              }
            }
          },
          'heavy armor': {
            'subtype': {
              'ring mail':{
                'count': 1,
                'single':'ring mail armor',
                'plural':'ring mail armors',
                'stats': {
                  'type': 'heavy',
                  'value': 30,
                  'armor_class': '14',
                  'stealth': 'Disadvantage',
                  'weight': 40,
                },
                'materials': {
                  'primary': 'set of rings',
                  'required': {
                    'set of rings': ['metal'],
                    'lining': ['leather'],
                  },
                  'default': 'metal',
                  'restricted': {
                    'cloth': ['lace', 'silk'],
                    'metal': ['platinum','gold','silver','lead'],
                  },
                  'creation': 'forged',
                  'maker': {
                    'metal': 'armorsmith',
                  },
                },
              },
              'chain mail':{
                'count': 1,
                'single':'chain mail armor',
                'plural':'chain mail armors',
                'stats': {
                  'type': 'heavy',
                  'value': 75,
                  'armor_class': '16',
                  'requirement': 'Str 13',
                  'stealth': 'Disadvantage',
                  'weight': 55,
                },
                'materials': {
                  'primary': 'coat of interlocking rings',
                  'required': {
                    'coat of interlocking rings': ['metal'],
                    'lining': ['cloth'],
                  },
                  'default': 'metal',
                  'restricted': {
                    'cloth': ['lace', 'silk'],
                    'metal': ['platinum','gold','silver','lead'],
                  },
                  'creation': 'forged',
                  'maker': {
                    'metal': 'armorsmith',
                  },
                },
              },
              'splint':{
                'count': 1,
                'single':'splint mail armor',
                'plural':'splint mail armors',
                'stats': {
                  'type': 'heavy',
                  'value': 200,
                  'armor_class': '17',
                  'requirement': 'Str 15',
                  'stealth': 'Disadvantage',
                  'weight': 60,
                },
                'materials': {
                  'primary': 'set of narrow vertical strips',
                  'required': {
                    'set of narrow vertical strips': ['metal'],
                    'backing': ['leather'],
                    'lining': ['cloth'],
                    'chain mail on the joints': ['metal'],
                    'harness straps': ['leather','cloth'],
                    'buckels': ['metal'],
                  },
                  'default': 'metal',
                  'restricted': {
                    'cloth': ['lace', 'silk'],
                    'metal': ['platinum','gold','silver','lead'],
                  },
                  'creation': 'forged',
                  'maker': {
                    'metal': 'armorsmith',
                  },
                },
              },
              'plate':{
                'count': 1,
                'single':'full plate armor',
                'plural':'full plate armors',
                'stats': {
                  'type': 'heavy',
                  'value': 1500,
                  'armor_class': '18',
                  'requirement': 'Str 15',
                  'stealth': 'Disadvantage',
                  'weight': 65,
                },
                'materials': {
                  'primary': 'breast plate',
                  'required': {
                    'helm': ['metal'],
                    'breast plate': ['metal'],
                    'chainmail shirt': ['metal'],
                    'pauldrons': ['metal'],
                    'pair of vambraces': ['metal'],
                    'pair of gauntlets': ['metal'],
                    'tasset': ['metal'],
                    'cuisse': ['metal'],
                    'pair of greaves': ['metal'],
                    'pair of boots': ['metal','leather'],

                    'buckels': ['metal'],
                    'lining': ['cloth'],
                    'harness straps': ['leather','cloth'],
                  },
                  'default': 'metal',
                  'restricted': {
                    'cloth': ['lace', 'silk'],
                    'metal': ['platinum','gold','silver','lead','copper'],
                  },
                  'creation': 'forged',
                  'maker': {
                    'metal': 'armorsmith',
                  },
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 66,
                    'parts': ['breast plate'],
                    'min': 1,
                    'max': 3,
                  },
                },
              },
            },
          },
          'shield': {
            'subtype': {
              'makeshift shield': {
                'count': 1,
                'single':'makeshift shield',
                'plural':'makeshift shields',
                'stats': {
                  'type': 'shield',
                  'value': 10,
                  'armor_class': '+2',
                  'weight': 6,
                },
                'materials': {
                  'primary': 'body',
                  'required': {
                    'body': ['bone','wood','horn'],
                    'strap': ['leather'],
                  },
                  'default': 'wood',
                  'creation': 'crafted',
                  'maker': {
                    'bone': 'crafter',
                    'horn': 'crafter',
                    'wood': 'woodworker',
                  },
                },
              },
              'kite shield': {
                'count': 1,
                'single':'kite shield',
                'plural':'kite shields',
                'stats': {
                  'type': 'shield',
                  'value': 10,
                  'armor_class': '+2',
                  'weight': 6,
                },
                'materials': {
                  'primary': 'body',
                  'required': {
                    'body': ['metal','wood'],
                    'strap': ['leather'],
                  },
                  'optional': {
                    'shield boss': ['metal']
                  },
                  'default': 'wood',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'armorsmith',
                    'wood': 'woodworker',
                  },
                  'restricted': {
                    'metal': ['platinum','lead','silver','gold'],
                  },
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 66,
                    'parts': ['body'],
                    'method': 'painted',
                    'min': 1,
                    'max': 3,
                  },
                },
              },
              'heater shield': {
                'count': 1,
                'single':'heater shield',
                'plural':'heater shields',
                'stats': {
                  'type': 'shield',
                  'value': 10,
                  'armor_class': '+2',
                  'weight': 6,
                },
                'materials': {
                  'primary': 'body',
                  'required': {
                    'body': ['metal','wood'],
                    'strap': ['leather'],
                  },
                  'optional': {
                    'shield boss': ['metal']
                  },
                  'default': 'wood',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'armorsmith',
                    'wood': 'woodworker',
                  },
                  'restricted': {
                    'metal': ['platinum','lead','silver','gold'],
                  },
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 66,
                    'parts': ['body'],
                    'method': 'painted',
                    'min': 1,
                    'max': 3,
                  },
                },
              },
              'scutum': {
                'count': 1,
                'single':'scutum',
                'plural':'scutums',
                'stats': {
                  'type': 'shield',
                  'value': 10,
                  'armor_class': '+2',
                  'weight': 6,
                },
                'materials': {
                  'primary': 'body',
                  'required': {
                    'body': ['metal','wood'],
                    'strap': ['leather'],
                  },
                  'optional': {
                    'shield boss': ['metal']
                  },
                  'default': 'wood',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'armorsmith',
                    'wood': 'woodworker',
                  },
                  'restricted': {
                    'metal': ['platinum','lead','silver','gold'],
                  },
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 66,
                    'parts': ['body'],
                    'method': 'painted',
                    'min': 1,
                    'max': 3,
                  },
                },
              },
              'round shield': {
                'count': 1,
                'single':'round shield',
                'plural':'round shield',
                'stats': {
                  'type': 'shield',
                  'value': 10,
                  'armor_class': '+2',
                  'weight': 6,
                },
                'materials': {
                  'primary': 'body',
                  'required': {
                    'body': ['metal','wood'],
                    'strap': ['leather'],
                  },
                  'optional': {
                    'shield boss': ['metal']
                  },
                  'default': 'metal',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'armorsmith',
                    'wood': 'woodworker',
                  },
                  'restricted': {
                    'metal': ['platinum','lead','silver','gold'],
                  },
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 66,
                    'parts': ['body'],
                    'method': 'painted',
                    'min': 1,
                    'max': 3,
                  },
                },
              }
            },
          },
          "helmet": {
            'subtype': {
              'great helm': {
                'count': 1,
                'single':'great helm',
                'plural':'great helms',
                'stats': {
                  'type': 'helmet',
                  'value': 10,
                  'armor_class': '0',
                  'weight': 5,
                },
                'materials': {
                  'primary': 'barrel',
                  'required': {
                    'barrel': ['metal'],
                    'lining': ['fur','leather'],
                  },
                  'optional': {
                    'decorative markings': ['metal'],
                  },
                  'default': 'metal',
                  'restricted': {
                    'cloth': ['lace', 'silk'],
                    'metal': ['platinum','gold','silver','lead',],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'armorsmith',
                  },
                },
              },
              'barbute': {
                'count': 1,
                'single':'barbute',
                'plural':'barbutes',
                'stats': {
                  'type': 'helmet',
                  'value': 10,
                  'armor_class': '0',
                  'weight': 5,
                },
                'materials': {
                  'primary': 'bowl',
                  'required': {
                    'bowl': ['metal'],
                    'rivets': ['metal'],
                    'lining': ['fur','leather'],
                  },
                  'optional': {
                    'visor': ['metal'],
                  },
                  'default': 'metal',
                  'restricted': {
                    'cloth': ['lace', 'silk'],
                    'metal': ['platinum','gold','silver','lead',],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'armorsmith',
                  },
                },
              },
              'norman helmet': {
                'count': 1,
                'single':'norman helmet',
                'plural':'norman helmets',
                'stats': {
                  'type': 'helmet',
                  'value': 10,
                  'armor_class': '0',
                  'weight': 5,
                },
                'materials': {
                  'primary': 'bowl',
                  'required': {
                    'bowl': ['metal'],
                    'rivets': ['metal'],
                    'nose guard': ['metal'],
                    'lining': ['fur','leather'],
                  },
                  'optional': {
                    'decroative crest': ['metal'],
                  },
                  'default': 'metal',
                  'restricted': {
                    'cloth': ['lace', 'silk'],
                    'metal': ['platinum','gold','silver','lead',],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'armorsmith',
                  },
                },
              },
              'burgonet helmet': {
                'count': 1,
                'single':'burgonet helmet',
                'plural':'burgonet helmets',
                'stats': {
                  'type': 'helmet',
                  'value': 10,
                  'armor_class': '0',
                  'weight': 5,
                },
                'materials': {
                  'primary': 'bowl',
                  'required': {
                    'bowl': ['metal'],
                    'rivets': ['metal'],
                    'decroative crest': ['metal'],
                    'lining': ['fur','leather'],
                  },
                  'optional': {                    
                    'visor': ['metal'],
                    "accent detailing": ["metal"],
                    "plumes": ["feather"],
                  },
                  'default': 'metal',
                  'restricted': {
                    'cloth': ['lace', 'silk'],
                    'metal': ['platinum','gold','silver','lead',],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'armorsmith',
                  },
                },
              },
              'sallet helm': {
                'count': 1,
                'single':'sallet helm',
                'plural':'sallet helms',
                'stats': {
                  'type': 'helmet',
                  'value': 10,
                  'armor_class': '0',
                  'weight': 5,
                },
                'materials': {
                  'primary': 'bowl',
                  'required': {
                    'bowl': ['metal'],
                    'rivets': ['metal'],
                    'visor': ['metal'],
                    'lining': ['fur','leather'],
                  },
                  'optional': {
                    'decroative crest': ['metal'],
                    "accent detailing": ["metal"],
                  },
                  'default': 'metal',
                  'restricted': {
                    'cloth': ['lace', 'silk'],
                    'metal': ['platinum','gold','silver','lead',],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'armorsmith',
                  },
                },
              },
              'kettle helm': {
                'count': 1,
                'single':'kettle helm',
                'plural':'kettle helms',
                'stats': {
                  'type': 'helmet',
                  'value': 10,
                  'armor_class': '0',
                  'weight': 5,
                },
                'materials': {
                  'primary': 'bowl',
                  'required': {
                    'bowl': ['metal'],
                    'brim': ['metal'],
                    'rivets': ['metal'],
                    "chinstrap": ['leather'],
                  },
                  'default': 'metal',
                  'restricted': {
                    'cloth': ['lace', 'silk'],
                    'metal': ['platinum','gold','silver','lead',],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'armorsmith',
                  },
                },
              },
              'morion helmet': {
                'count': 1,
                'single':'morion helmet',
                'plural':'morion helmets',
                'stats': {
                  'type': 'helmet',
                  'value': 10,
                  'armor_class': '0',
                  'weight': 5,
                },
                'materials': {
                  'primary': 'bowl',
                  'required': {
                    'bowl': ['metal'],
                    'brim': ['metal'],
                    'decroative crest': ['metal'],
                    "chinstrap": ['leather'],
                  },
                  'optional': {
                    "plume": ["feather"],
                  },
                  'default': 'metal',
                  'restricted': {
                    'cloth': ['lace', 'silk'],
                    'metal': ['platinum','gold','silver','lead',],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'armorsmith',
                  },
                },
              },
              'galea helmet': {
                'count': 1,
                'single':'galea helmet',
                'plural':'galea helmets',
                'stats': {
                  'type': 'helmet',
                  'value': 10,
                  'armor_class': '0',
                  'weight': 5,
                },
                'materials': {
                  'primary': 'bowl',
                  'required': {
                    'bowl': ['metal'],
                    'cheek guards': ['metal'],
                    'neck guard': ['metal'],
                    'decroative crest': ['metal'],
                    'lining': ['fur','leather'],
                  },
                  'optional': {
                    "accent detailing": ["metal"],
                  },
                  'default': 'metal',
                  'restricted': {
                    'cloth': ['lace', 'silk'],
                    'metal': ['platinum','gold','silver','lead',],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'armorsmith',
                  },
                },
              },
              'dwarven helmet': {
                'count': 1,
                'single':'dwarven helmet',
                'plural':'dwarven helmets',
                'stats': {
                  'type': 'helmet',
                  'value': 10,
                  'armor_class': '0',
                  'weight': 5,
                },
                'materials': {
                  'primary': 'bowl',
                  'required': {
                    'bowl': ['metal'],
                    'decroative crest': ['metal'],
                    'face guard': ['metal'],
                    'lining': ['fur','leather'],
                  },
                  'optional': {
                    "accent detailing": ["metal"],
                    "chinstrap": ['leather'],
                  },
                  'default': 'metal',
                  'restricted': {
                    'cloth': ['lace', 'silk'],
                    'metal': ['platinum','gold','silver','lead',],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'armorsmith',
                  },
                },
              },
              'elven helmet': {
                'count': 1,
                'single':'elven helmet',
                'plural':'elven helmets',
                'stats': {
                  'type': 'helmet',
                  'value': 10,
                  'armor_class': '0',
                  'weight': 5,
                },
                'materials': {
                  'primary': 'bowl',
                  'required': {
                    'bowl': ['metal'],
                    "nose guard": ['metal'],
                  },
                  'optional': {
                    "wings": ["metal"],
                    "accent detailing": ["metal"],
                  },
                  'default': 'metal',
                  'restricted': {
                    'cloth': ['lace', 'silk'],
                    'metal': ['platinum','gold','silver','lead',],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'armorsmith',
                  },
                },
              },
            },
          }
        },
      },
      'good': {
        'type': {
          'clothing':{
            'subtype': {
              'robe': {
                'count': 1,
                'single':'robe',
                'plural':'robes',
                'stats': {
                  'type': 'cloth',
                  'value': 5,
                  'armor_class': 0,
                  'weight': 2,
                },
                'materials': {
                  'primary': 'robe',
                  'required': {
                    'robe': ['cloth'],
                  },
                  'optional':{
                    'cuffs': ['fur','cloth'],
                    'belt': ['cloth','leather']
                  },
                  'creation': 'crafted',
                  'maker': {
                    'cloth': 'tailor',
                  },
                  'default': 'cloth',
                  'common': ['cloth'],
                },
              },
              'coat': {
                'count': 1,
                'single':'coat',
                'plural':'coats',
                'stats': {
                  'type': 'cloth',
                  'value': 1,
                  'armor_class': 0,
                  'weight': 2,
                },
                'materials': {
                  'primary': 'coat',
                  'required': {
                    'coat': ['cloth'],
                    'buttons': ['metal','bone'],
                  },
                  'optional':{
                    'belt': ['cloth','leather'],
                    'collar': ['fur'],
                    'lining': ['fur'],
                  },
                  'creation': 'created',
                  'maker': {
                    'cloth': 'tailor',
                  },
                  'restricted': {
                    'cloth': ['silk','lace'],
                  },
                  'default': 'cloth',
                  'common': ['cloth'],
                },
              },
              'cloak': {
                'count': 1,
                'single':'cloak',
                'plural':'cloaks',
                'stats': {
                  'type': 'cloth',
                  'value': 3,
                  'armor_class': 0,
                  'weight': 1,
                },
                'materials': {
                  'primary': 'cloak',
                  'required': {
                    'cloak': ['cloth'],
                  },
                  'optional':{
                    'collar': ['fur'],
                    'clasp': ['metal','bone'],
                    'draw-string': ['cloth'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'cloth': 'tailor',
                  },
                  'default': 'cloth',
                  'common': ['cloth'],
                },
              },
              'tunic': {
                'count': 1,
                'single':'tunic',
                'plural':'tunics',
                'stats': {
                  'type': 'cloth',
                  'value': 0.5,
                  'armor_class': 0,
                  'weight': 1,
                },
                'materials': {
                  'primary': 'tunic',
                  'required': {
                    'tunic': ['cloth'],
                  },
                  'optional':{
                    'draw-string': ['cloth'],
                  },
                  'restricted': {
                    'cloth': ['silk','lace'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'cloth': 'tailor',
                  },
                  'default': 'cloth',
                  'common': ['cloth'],
                },
              },
              'shirt': {
                'count': 1,
                'single':'shirt',
                'plural':'shirts',
                'stats': {
                  'type': 'cloth',
                  'value': 0.5,
                  'armor_class': 0,
                  'weight': 1,
                },
                'materials': {
                  'primary': 'shirt',
                  'required': {
                    'shirt': ['cloth'],
                  },
                  'restricted': {
                    'cloth': ['silk','lace'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'cloth': 'tailor',
                  },
                  'default': 'cloth',
                  'common': ['cloth'],
                },
              },
              'trousers': {
                'count': 1,
                'single':'trousers',
                'plural':'trousers',
                'stats': {
                  'type': 'cloth',
                  'value': 0.5,
                  'armor_class': 0,
                  'weight': 1,
                },
                'materials': {
                  'primary': 'trousers',
                  'required': {
                    'trousers': ['cloth','leather'],
                  },
                  'optional':{
                    'draw-string': ['cloth'],
                    'buttons': ['metal','bone'],
                  },
                  'restricted': {
                    'cloth': ['silk','lace'],
                    'metal': ['platinum'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'cloth': 'tailor',
                    'leather': 'tailor',
                  },
                  'default': 'cloth',
                  'common': ['cloth'],
                },
              },
              'gloves': {
                'count': 2,
                'single':'glove',
                'plural':'gloves',
                'stats': {
                  'type': 'cloth',
                  'value': 0.5,
                  'armor_class': 0,
                  'weight': 1,
                },
                'materials': {
                  'primary': 'gloves',
                  'required': {
                    'gloves': ['cloth','leather'],
                  },
                  'optional':{
                    'lining': ['fur'],
                  },
                  'restricted': {
                    'cloth': ['silk'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'cloth': 'tailor',
                    'leather': 'tailor',
                  },
                  'default': 'cloth',
                  'common': ['cloth'],
                },
              },
              'poncho': {
                'count': 1,
                'single':'poncho',
                'plural':'ponchos',
                'stats': {
                  'type': 'cloth',
                  'value': 0.5,
                  'armor_class': 0,
                  'weight': 2,
                },
                'materials': {
                  'primary': 'poncho',
                  'required': {
                    'poncho': ['cloth','leather'],
                  },
                  'optional':{
                    'trim': ['cloth','fur',],
                    'tassels': ['cloth','leather'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'cloth': 'tailor',
                    'leather': 'tailor',
                  },
                  'restricted': {
                    'cloth': ['silk','lace'],
                  },
                  'default': 'cloth',
                  'common': ['cloth'],
                },
              },
              'belt': {
                'count': 1,
                'single':'belt',
                'plural':'belts',
                'stats': {
                  'type': 'cloth',
                  'value': 0.5,
                  'armor_class': 0,
                  'weight': 1,
                },
                'materials': {
                  'primary': 'strap',
                  'required': {
                    'strap': ['cloth','leather'],
                    'buckle': ['metal'],
                  },
                  'optional':{
                    'trim': ['fur',],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'cloth': 'tailor',
                    'leather': 'leatherworker',
                  },
                  'restricted': {
                    'cloth': ['silk','lace'],
                  },
                  'default': 'cloth',
                  'common': ['cloth'],
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 33,
                    'parts': ['buckle'],
                    'min': 1,
                    'max': 3,
                  },
                },
              },
            },
          },
          "footwear": {
            "subtype": {
              'boots': {
                'count': 2,
                'single':'boots',
                'plural':'boots',
                'stats': {
                  'type': 'cloth',
                  'value': 1,
                  'armor_class': 0,
                  'weight': 1,
                },
                'materials': {
                  'primary': 'boots',
                  'required': {
                    'boots': ['leather','cloth'],
                  },
                  'optional':{
                    'laces': ['cloth','leather'],
                    'lining': ['fur'],
                  },
                  'restricted': {
                    'cloth': ['silk','lace'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'cloth': 'cobbler',
                    'leather': 'cobbler',
                  },
                  'default': 'cloth',
                  'common': ['cloth'],
                },
              },
              'shoes': {
                'count': 2,
                'single':'shoes',
                'plural':'shoes',
                'stats': {
                  'type': 'cloth',
                  'value': 1,
                  'armor_class': 0,
                  'weight': 1,
                },
                'materials': {
                  'primary': 'body',
                  'required': {
                    'body': ['leather','cloth'],
                    'sole': ['leather','wood'],
                  },
                  'optional':{
                    'laces': ['cloth','leather'],
                    'buckle': ['metal'],
                    'lining': ['fur'],
                  },
                  'restricted': {
                    'cloth': ['silk','lace'],
                    "metal": ["mithral","lead","copper"],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'cloth': 'cobbler',
                    'leather': 'cobbler',
                  },
                  'default': 'cloth',
                  'common': ['cloth'],
                },
              },
              'sandals': {
                'count': 2,
                'single':'sandals',
                'plural':'sandals',
                'stats': {
                  'type': 'cloth',
                  'value': 1,
                  'armor_class': 0,
                  'weight': 1,
                },
                'materials': {
                  'primary': 'sole',
                  'required': {
                    'sole': ['leather','wood'],
                    'strap': ['leather','cloth'],
                  },
                  'optional':{
                    'lining': ['fur'],
                  },
                  'restricted': {
                    'cloth': ['silk','lace'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'cloth': 'cobbler',
                    'leather': 'cobbler',
                  },
                  'default': 'cloth',
                  'common': ['cloth'],
                },
              },

            },
          },
          'headgear':{
            'subtype': {
              'pointed hat': {
                'count': 1,
                'single':'pointed hat',
                'plural':'pointed hats',
                'stats': {
                  'type': 'headwear',
                  'value': 1,
                  'armor_class': 0,
                  'weight': 1,
                },
                'materials': {
                  'primary': 'cap',
                  'required': {
                    'cap': ['cloth', 'leather'],
                  },
                  'optional':{
                    'accent feather': ['feather'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'cloth': 'tailor',
                    'leather': 'tailor',
                  },
                  'restricted': {
                    'cloth': ['lace','silk'],
                  },
                  'default': 'cloth',
                },
              },'brimmed cap': {
                'count': 1,
                'single':'brimmed cap',
                'plural':'brimmed caps',
                'stats': {
                  'type': 'headwear',
                  'value': 1,
                  'armor_class': 0,
                  'weight': 1,
                },
                'materials': {
                  'primary': 'cap',
                  'required': {
                    'cap': ['cloth', 'leather'],
                  },
                  'optional':{
                    'band': ['cloth','leather'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'cloth': 'tailor',
                    'leather': 'tailor',
                  },
                  'default': 'cloth',
                },
              },
              'chaperon': {
                'count': 1,
                'single':'chaperon',
                'plural':'chaperons',
                'stats': {
                  'type': 'headwear',
                  'value': 1,
                  'armor_class': 0,
                  'weight': 1,
                },
                'materials': {
                  'primary': 'bourrelet',
                  'required': {
                    'bourrelet': ['cloth'],
                    'cornette': ['cloth'],
                    'patte': ['cloth'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'cloth': 'tailor',
                  },
                  'default': 'cloth',
                },
              },
              'hood': {
                'count': 1,
                'single':'hood',
                'plural':'hoods',
                'stats': {
                  'type': 'headwear',
                  'value': 1,
                  'armor_class': 0,
                  'weight': 1,
                },
                'materials': {
                  'primary': 'hood',
                  'required': {
                    'hood': ['cloth','leather'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'cloth': 'tailor',
                    'leather': 'tailor',
                  },
                  'default': 'cloth',
                },
              },
              'veil': {
                'count': 1,
                'single':'veil',
                'plural':'veils',
                'stats': {
                  'type': 'headwear',
                  'value': 1,
                  'armor_class': 0,
                  'weight': 1,
                },
                'materials': {
                  'primary': 'headpiece',
                  'required': {
                    'headpiece': ['cloth'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'cloth': 'tailor',
                  },
                  'default': 'cloth',
                },
              },
              'sock hat': {
                'count': 1,
                'single':'sock hat',
                'plural':'sock hats',
                'stats': {
                  'type': 'headwear',
                  'value': 1,
                  'armor_class': 0,
                  'weight': 1,
                },
                'materials': {
                  'primary': 'cap',
                  'required': {
                    'cap': ['cloth'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'cloth': 'tailor',
                  },
                  'default': 'cloth',
                },
              },
              'barbette': {
                'count': 1,
                'single':'barbette',
                'plural':'barbettes',
                'stats': {
                  'type': 'headwear',
                  'value': 1,
                  'armor_class': 0,
                  'weight': 1,
                },
                'materials': {
                  'primary': 'headpiece',
                  'required': {
                    'headpiece': ['cloth'],
                    'chin strap': ['cloth'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'cloth': 'tailor',
                  },
                  'default': 'cloth',
                },
              },
              'turban': {
                'count': 1,
                'single':'turban',
                'plural':'turbans',
                'stats': {
                  'type': 'headwear',
                  'value': 1,
                  'armor_class': 0,
                  'weight': 1,
                },
                'materials': {
                  'primary': 'cloth wrap',
                  'required': {
                    'cloth wrap': ['cloth'],
                  },
                  'optional': {
                    'jewel': ['gemstone','glass'],
                    'accent feather': ['feather'],
                  },
                  'creation': 'woven',
                  'maker': {
                    'cloth': 'tailor',
                  },
                  'restricted': {
                    'cloth': ['lace'],
                  },
                  'default': 'cloth',
                },
              },
              'headdress': {
                'count': 1,
                'single':'headdress',
                'plural':'headdress',
                'stats': {
                  'type': 'headwear',
                  'value': 1,
                  'armor_class': 0,
                  'weight': 1,
                },
                'materials': {
                  'primary': 'ceremonial feathers',
                  'required': {
                    'ceremonial feathers': ['feather'],
                    'band': ['cloth','leather'],
                    'accents': ['metal','bone','horn'],
                  },
                  'optional': {
                    'tassels': ['leather','cloth'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'feather': 'plumer',
                  },
                  'restricted': {
                    'cloth': ['lace','silk'],
                  },
                  'default': 'cloth',
                },
              },
              'fez': {
                'count': 1,
                'single':'fez',
                'plural':'fezes',
                'stats': {
                  'type': 'headwear',
                  'value': 1,
                  'armor_class': 0,
                  'weight': 1,
                },
                'materials': {
                  'primary': 'cap',
                  'required': {
                    'cap': ['cloth'],
                    'tassels': ['cloth','leather'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    "cloth": "hatter",
                    "leather": "hatter",
                  },
                  'restricted': {
                    'cloth': ['lace','silk'],
                  },
                  'default': 'cloth',
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 33,
                    'parts': ['cap'],
                    'min': 1,
                    'max': 3,
                  },
                },
              },
            },
          },
          'tool': {
            'subtype': {
              'shovel': {
                'count': 1,
                'single':'shovel',
                'plural':'shovels',
                'flavor': '',
                'stats': {
                  'type': 'tool',
                  'value': 2,
                  'weight': 8,
                },
                'materials': {
                  'primary': 'head',
                  'required': {
                    'head': ['metal'],
                    'handle': ['wood'],
                  },
                  'optional': {
                    'wrapping': ['leather','cloth']
                  },
                  'default': 'metal',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                    'wood': 'woodworker',
                  },
                  'restricted': {
                    'metal': ['platinum','lead','silver','gold'],
                    'cloth': ['silk','lace'],
                  },
                },
              },
              'hammer': {
                'count': 1,
                'single':'hammer',
                'plural':'hammers',
                'flavor': '',
                'stats': {
                  'type': 'tool',
                  'value': 0.5,
                  'weight': 2,
                },
                'materials': {
                  'primary': 'head',
                  'required': {
                    'head': ['metal'],
                    'handle': ['wood'],
                  },
                  'optional': {
                    'wrapping': ['leather','cloth']
                  },
                  'default': 'metal',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                    'wood': 'woodworker',
                  },
                  'restricted': {
                    'metal': ['platinum','lead','silver','gold'],
                    'cloth': ['silk','lace'],
                  },
                },
              },
              'saw': {
                'count': 1,
                'single':'saw',
                'plural':'saws',
                'flavor': '',
                'stats': {
                  'type': 'tool',
                  'value': 0.5,
                  'weight': 5,
                },
                'materials': {
                  'primary': 'sawblade',
                  'required': {
                    'sawblade': ['metal'],
                    'handle': ['wood'],
                  },
                  'optional': {
                    'wrapping': ['leather','cloth']
                  },
                  'default': 'metal',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                    'wood': 'woodworker',
                  },
                  'restricted': {
                    'metal': ['platinum','lead','silver','gold'],
                    'cloth': ['silk','lace'],
                  },
                },
              },
              'scale': {
                'count': 1,
                'single':'scale',
                'plural':'scales',
                'flavor': '',
                'stats': {
                  'type': 'tool',
                  'value': 0.5,
                  'weight': 10,
                },
                'materials': {
                  'primary': 'stand',
                  'required': {
                    'stand': ['metal','wood','bone'],
                    'arm': ['metal','wood','bone'],
                    'baskets': ['metal','wood','bone'],
                  },
                  'optional': {
                    'wrapping': ['leather','cloth']
                  },
                  'default': 'metal',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                    'wood': 'woodworker',
                    'bone': 'boneworker',
                  },
                  'restricted': {
                    'metal': ['platinum','lead','silver','gold'],
                    'cloth': ['silk','lace'],
                  },
                },
              },
              'tent': {
                'count': 1,
                'single':'tent',
                'plural':'tents',
                'flavor': '',
                'stats': {
                  'type': 'tool',
                  'value': 10,
                  'weight': 20,
                },
                'materials': {
                  'primary': 'roof',
                  'required': {
                    'roof': ['cloth','leather'],
                    'poles': ['wood','metal'],
                    'stakes': ['wood','metal'],
                    'guy lines': ['cloth'],
                  },
                  'default': 'metal',
                  'creation': 'crafted',
                  'maker': {
                    'cloth': 'crafter',
                    'leather': 'crafter',
                  },
                  'restricted': {
                    'metal': ['platinum','lead','silver','gold'],
                    'cloth': ['silk','lace'],
                  },
                },
              },
              'backpack': {
                'count': 1,
                'single':'backpack',
                'plural':'backpacks',
                'flavor': '',
                'stats': {
                  'type': 'tool',
                  'value': 2,
                  'weight': 2,
                },
                'materials': {
                  'primary': 'sack',
                  'required': {
                    'sack': ['cloth','leather'],
                    'straps': ['cloth','leather'],
                  },
                  'default': 'leather',
                  'creation': 'crafted',
                  'maker': {
                    'cloth': 'crafter',
                    'leather': 'crafter',
                  },
                  'restricted': {
                    'metal': ['platinum','lead','silver','gold'],
                    'cloth': ['silk','lace'],
                  },
                },
              },
              'mirror': {
                'count': 1,
                'single':'mirror',
                'plural':'mirrors',
                'flavor': '',
                'stats': {
                  'type': 'tool',
                  'value': 2,
                  'weight': 2,
                },
                'materials': {
                  'primary': 'face',
                  'required': {
                    'face': ['metal'],
                  },
                  'optional': {
                    'frame': ['metal','wood','bone'],
                    'handle': ['metal'],
                  },
                  'default': 'metal',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                  },
                  'restricted': {
                    'metal': ['platinum','lead','gold','iron','bronze','copper'],
                  },
                  'extra': ['carving'],
                  'carving': {
                    'chance': 33,
                    'parts': ['handle'],
                    'shape': ['',' head'],
                    'path': ['words','engraving','things','person','single'],
                    'count': 1,
                  },
                },
              },
              'caltrops': {
                'count': 10,
                'single':'caltrop',
                'plural':'caltropss',
                'flavor': '',
                'stats': {
                  'type': 'tool',
                  'value': 1,
                  'weight': 2,
                },
                'materials': {
                  'primary': 'body',
                  'required': {
                    'body': ['metal'],
                  },
                  'default': 'metal',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                  },
                  'restricted': {
                    'metal': ['platinum','lead','gold','silver'],
                  },
                },
              },
              'ink vial': {
                'count': 1,
                'single':'ink vial',
                'plural':'ink vials',
                'flavor': '',
                'stats': {
                  'type': 'tool',
                  'value': 5,
                  'weight': 2,
                },
                'materials': {
                  'primary': 'ink vial',
                  'required': {
                    'ink vial': ['glass','metal'],
                  },
                  'default': 'glass',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                    'glass': 'glassblower',
                  },
                  'restricted': {
                    'metal': ['platinum','lead','copper'],
                  },
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 33,
                    'parts': ['ink vial'],
                    'min': 1,
                    'max': 3,
                  },
                },
              },
              'quill': {
                'count': 1,
                'single':'quill',
                'plural':'quills',
                'flavor': '',
                'stats': {
                  'type': 'tool',
                  'value': 1,
                  'weight': 2,
                },
                'materials': {
                  'primary': 'quill',
                  'required': {
                    'quill': ['feather'],
                  },
                  'default': 'feather',
                  'creation': 'found',
                  'maker': {
                    'feather': 'plumer',
                  },
                  'restricted': {
                    'metal': ['platinum','lead','copper'],
                  },
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 33,
                    'parts': ['ink vial'],
                    'min': 1,
                    'max': 3,
                  },
                },
              },
              
              // 'tankard': {

              // },
              'rope': {
                'count': 1,
                'single':'rope',
                'plural':'ropes',
                'flavor': '',
                'stats': {
                  'type': 'tool',
                  'value': 1,
                  'weight': 10,
                },
                'materials': {
                  'primary': 'rope',
                  'required': {
                    'rope': ['cloth'],
                  },
                  'default': 'cloth',
                  'creation': 'woven',
                  'maker': {
                    'cloth': 'weaver',
                  },
                  'restricted': {
                    'cloth': ['lace'],
                  },
                  'dye': false,
                },
              },
              // 'ladder': {

              // },
              'crowbar': {
                'count': 1,
                'single':'crowbar',
                'plural':'crowbars',
                'flavor': '',
                'stats': {
                  'type': 'tool',
                  'value': 2,
                  'weight': 5,
                },
                'materials': {
                  'primary': 'body',
                  'required': {
                    'body': ['metal'],
                    'handle': ['metal','wood'],
                  },
                  'optional':{
                    'handle wrap': ['leather','cloth'],
                  },
                  'default': 'cloth',
                  'creation': 'forged',
                  'maker': {
                    'metal': 'smith',
                  },
                  'restricted': {
                    'metal': ['platinum','gold','silver','copper'],
                    'cloth': ['lace','silk'],
                  },
                  'dye': false,
                },
              },
              // 'grappling hook': {

              // },
              // 'blanket': {

              // },
              // 'manacles': {

              // },
              // 'miner\'s pick': {

              // },
              // 'sledge': {

              // }, 
              'lock': {
                'count': 1,
                'single':'lock',
                'plural':'locks',
                'flavor': '',
                'stats': {
                  'type': 'tool',
                  'value': 40,
                  'weight': 1,
                },
                'materials': {
                  'primary': 'body',
                  'required': {
                    'body': ['metal'],
                  },
                  'optional':{
                    'key': ['metal'],
                  },
                  'default': 'metal',
                  'creation': 'forged',
                  'maker': {
                    'metal': 'locksmith',
                  },
                  'restricted': {
                    'metal': ['platinum','gold','silver','copper'],
                  },
                },
              },
              // 'bucket': {

              // },
              // 'hourglass': {

              // },
            },
          },
          'cookware': {
            "subtype": {
              'cauldron': {
                'count': 1,
                'single':'cauldron',
                'plural':'cauldrons',
                'flavor': '',
                'stats': {
                  'type': 'tool',
                  'value': 0.5,
                  'weight': 10,
                },
                'materials': {
                  'primary': 'bowl',
                  'required': {
                    'bowl': ['metal'],
                    'handle': ['metal','wood'],
                    'feet': ["metal"],
                  },
                  'optional': {
                    'handle wrapping': ['leather','cloth']
                  },
                  'default': 'metal',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                    'wood': 'woodworker',
                  },
                  'restricted': {
                    'metal': ['platinum','lead','silver','gold','bronze',"mithral"],
                    'cloth': ['silk','lace'],
                  },
                },
              },
              'pot': {
                'count': 1,
                'single':'pot',
                'plural':'pots',
                'flavor': '',
                'stats': {
                  'type': 'tool',
                  'value': 0.5,
                  'weight': 10,
                },
                'materials': {
                  'primary': 'body',
                  'required': {
                    'body': ['metal'],
                    'handle': ['metal','wood'],
                  },
                  'optional': {
                    'wrapping': ['leather','cloth']
                  },
                  'default': 'metal',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                    'wood': 'woodworker',
                  },
                  'restricted': {
                    'metal': ['platinum','lead','silver','gold','bronze',"mithral"],
                    'cloth': ['silk','lace'],
                  },
                },
              },
              'pan': {
                'count': 1,
                'single':'pan',
                'plural':'pans',
                'flavor': '',
                'stats': {
                  'type': 'tool',
                  'value': 0.5,
                  'weight': 10,
                },
                'materials': {
                  'primary': 'body',
                  'required': {
                    'body': ['metal'],
                    'handle': ['metal','wood'],
                  },
                  'optional': {
                    'wrapping': ['leather','cloth']
                  },
                  'default': 'metal',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                    'wood': 'woodworker',
                  },
                  'restricted': {
                    'metal': ['platinum','lead','silver','gold','bronze',"mithral"],
                    'cloth': ['silk','lace'],
                  },
                },
              },
              'kettle': {
                'count': 1,
                'single':'kettle',
                'plural':'kettles',
                'flavor': '',
                'stats': {
                  'type': 'tool',
                  'value': 0.5,
                  'weight': 10,
                },
                'materials': {
                  'primary': 'bowl',
                  'required': {
                    'bowl': ['metal'],
                    'lid': ['metal'],
                    'spout': ['metal'],
                    'handle': ['metal','wood'],
                  },
                  'optional': {
                    'handle wrapping': ['leather','cloth']
                  },
                  'default': 'metal',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                    'wood': 'woodworker',
                  },
                  'restricted': {
                    'metal': ['platinum','lead','silver','gold',"mithral"],
                    'cloth': ['silk','lace'],
                  },
                },
              },
              'utensils': {
                'count': 1,
                'single':'utensils',
                'plural':'utensils',
                'flavor': '',
                'stats': {
                  'type': 'tool',
                  'value': 0.1,
                  'weight': 1,
                },
                'materials': {
                  'primary': 'fork',
                  'required': {
                    'fork': ['metal'],
                    'knife': ['metal'],
                    'spoon': ['metal'],
                  },
                  "optional": {
                    "pouch": ["cloth","leather"],
                  },
                  'default': 'metal',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                    'wood': 'woodworker',
                    'stone': 'artisan',
                    'bone': 'bonecarver',
                  },
                  'restricted': {
                    'metal': ['platinum','lead','gold',"mithral"],
                    'cloth': ['silk','lace'],
                  },
                },
              },
              // 'knife': {
              //   'count': 1,
              //   'single':'knife',
              //   'plural':'knives',
              //   'flavor': '',
              //   'stats': {
              //     'type': 'tool',
              //     'value': 0.1,
              //     'weight': ,
              //   },
              //   'materials': {
              //     'primary': 'blade',
              //     'required': {
              //       'blade': ['metal'],
              //       'handle': ['wood','metal','bone'],
              //     },
              //     'default': 'metal',
              //     'creation': 'crafted',
              //     'maker': {
              //       'metal': 'smith',
              //       'wood': 'woodworker',
              //       'stone': 'artisan',
              //       'bone': 'bonecarver',
              //     },
              //     'restricted': {
              //       'metal': ['platinum','lead','gold',"mithral"],
              //       'cloth': ['silk','lace'],
              //     },
              //   },
              // },
              // 'fork': {
              //   'count': 1,
              //   'single':'fork',
              //   'plural':'forks',
              //   'flavor': '',
              //   'stats': {
              //     'type': 'tool',
              //     'value': 0.1,
              //     'weight': 1,
              //   },
              //   'materials': {
              //     'primary': 'blade',
              //     'required': {
              //       'blade': ['metal'],
              //       'handle': ['wood','metal','bone'],
              //     },
              //     'default': 'metal',
              //     'creation': 'crafted',
              //     'maker': {
              //       'metal': 'smith',
              //       'wood': 'woodworker',
              //       'stone': 'artisan',
              //       'bone': 'bonecarver',
              //     },
              //     'restricted': {
              //       'metal': ['platinum','lead','gold',"mithral"],
              //       'cloth': ['silk','lace'],
              //     },
              //   },
              // },
              // 'spoon': {
              //   'count': 1,
              //   'single':'spoon',
              //   'plural':'spoons',
              //   'flavor': '',
              //   'stats': {
              //     'type': 'tool',
              //     'value': 0.1,
              //     'weight': 1,
              //   },
              //   'materials': {
              //     'primary': 'blade',
              //     'required': {
              //       'blade': ['metal'],
              //       'handle': ['wood','metal','bone'],
              //     },
              //     'default': 'metal',
              //     'creation': 'crafted',
              //     'maker': {
              //       'metal': 'smith',
              //       'wood': 'woodworker',
              //       'stone': 'artisan',
              //       'bone': 'bonecarver',
              //     },
              //     'restricted': {
              //       'metal': ['platinum','lead','gold',"mithral"],
              //       'cloth': ['silk','lace'],
              //     },
              //   },
              // },
            },
          },
          'vessel': {
            'subtype': {
              'waterskin': {
                'count': 1,
                'single':'waterskin',
                'plural':'waterskins',
                'flavor': '',
                'stats': {
                  'type': 'vessel',
                  'value': 1,
                  'weight': 4,
                },
                'materials': {
                  'primary': 'pouch',
                  'required': {
                    'pouch': ['leather'],
                    'stopper': ['metal','stone','wood'],
                  },
                  'optional':{
                    'strap': ['leather', 'cloth'],
                  },
                  'default': 'leather',
                  'creation': 'crafted',
                  'maker': {
                    'leather': 'leatherworker',
                  },
                  'restricted': {
                    'metal': ['platinum','gold','silver','copper'],
                  },
                },
              },
              'hip flask': {
                'count': 1,
                'single':'hip flask',
                'plural':'hip flasks',
                'flavor': '',
                'stats': {
                  'type': 'vessel',
                  'value': 1,
                  'weight': 4,
                },
                'materials': {
                  'primary': 'body',
                  'required': {
                    'body': ['metal','wood'],
                    'cap': ['metal','wood'],
                  },
                  'optional':{
                    'wrap cover': ['leather'],
                  },
                  'default': 'body',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                    'wood': 'woodcarver'
                  },
                  'restricted': {
                    'metal': ['steel','lead','copper'],
                  },
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 33,
                    'parts': ['body'],
                    'min': 1,
                    'max': 3,
                  },
                },
              },
              'mug': {
                'count': 1,
                'single':'mug',
                'plural':'mugs',
                'flavor': '',
                'stats': {
                  'type': 'vessel',
                  'value': 1,
                  'weight': 4,
                },
                'materials': {
                  'primary': 'body',
                  'required': {
                    'body': ['metal','wood', 'clay'],
                    'handle': ['metal','wood','clay'],
                  },
                  'optional':{
                    'handle strap': ['leather'],
                  },
                  'default': 'body',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                    'wood': 'woodcarver',
                    'clay': 'potter',
                  },
                  'restricted': {
                    'metal': ['steel','lead','copper'],
                  },
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 33,
                    'parts': ['body'],
                    'min': 1,
                    'max': 3,
                  },
                },
              },
              'drinking horn': {
                'count': 1,
                'single':'drinking horn',
                'plural':'drinking horns',
                'flavor': '',
                'stats': {
                  'type': 'vessel',
                  'value': 1,
                  'weight': 4,
                },
                'materials': {
                  'primary': 'horn',
                  'required': {
                    'horn': ['horn'],
                  },
                  'optional':{
                    'rim': ['metal'],
                    'stand': ['metal','bone','wood'],
                  },
                  'default': 'horn',
                  'creation': 'crafted',
                  'maker': {
                    'horn': 'artisan',
                  },
                  'restricted': {
                    'metal': ['steel','lead','copper'],
                  },
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 33,
                    'parts': ['horn'],
                    'min': 1,
                    'max': 3,
                  },
                },
              },
              'goblet': {
                'count': 1,
                'single':'goblet',
                'plural':'goblets',
                'flavor': '',
                'stats': {
                  'type': 'vessel',
                  'value': 1,
                  'weight': 4,
                },
                'materials': {
                  'primary': 'bowl',
                  'required': {
                    'bowl': ['glass'],
                    'stem': ['glass'],
                    'base': ['glass'],
                  },
                  'optional':{
                    'rim': ['metal'],
                  },
                  'default': 'glass',
                  'creation': 'blown',
                  'maker': {
                    'glass': 'glassblower',
                  },
                  'restricted': {
                    'metal': ['steel','lead','copper'],
                  },
                },
              },
              'chalice': {
                'count': 1,
                'single':'chalice',
                'plural':'chalices',
                'flavor': '',
                'stats': {
                  'type': 'vessel',
                  'value': 1,
                  'weight': 4,
                },
                'materials': {
                  'primary': 'bowl',
                  'required': {
                    'bowl': ['metal'],
                    'stem': ['metal'],
                    'base': ['metal'],
                  },
                  'optional':{
                    'rim': ['metal'],
                    'accents': ['gemstone'],
                  },
                  'default': 'metal',
                  'creation': 'created',
                  'maker': {
                    'metal': 'smith',
                    'glass': 'glassblower',
                  },
                  'restricted': {
                    'metal': ['steel','lead','copper'],
                  },
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 33,
                    'parts': ['bowl'],
                    'min': 1,
                    'max': 3,
                  },
                },
              },
              'dwarven stein': {
                'count': 1,
                'single':'dwarven stein',
                'plural':'dwarven steins',
                'flavor': '',
                'stats': {
                  'type': 'vessel',
                  'value': 1,
                  'weight': 4,
                },
                'materials': {
                  'primary': 'body',
                  'required': {
                    'body': ['metal','wood','clay'],
                    'handle': ['metal','wood','clay'],
                    'lid': ['metal','wood','clay'],
                  },
                  'optional':{
                    'footring': ['metal','bone','wood','clay'],
                    'tumbhook': ['metal','bone','wood'],
                  },
                  'default': 'metal',
                  'creation': 'created',
                  'maker': {
                    'metal': 'smith',
                    'wood': 'artisan',
                    'clay': 'artisan',
                  },
                  'restricted': {
                    'metal': ['steel','lead','copper'],
                  },
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 75,
                    'parts': ['bowl'],
                    'min': 1,
                    'max': 3,
                  },
                },
              },
            },
          },
          'instrument': {
            'subtype': {
              'ocarina':{
                'count': 1,
                'single':'ocarina',
                'plural':'ocarinas',
                'flavor': '',
                'stats': {
                  'type': 'instrument',
                  'value': 3,
                  'weight': 0.5,
                },
                'materials': {
                  'primary': 'body',
                  'required': {
                    'body': ['metal','stone','clay'],
                    'mouthpiece': ['metal','stone','clay'],
                  },
                  'optional': {
                    'strap': ['leather'],
                  },
                  'default': 'wood',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                    'stone': 'artisan',
                    'wood': 'artisan',
                    'clay': 'potter',
                  },
                  'restricted': {
                    'metal': ['platinum','lead',],
                  },
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 33,
                    'parts': ['body'],
                    'min': 1,
                    'max': 2,
                  },
                },
              },
              'flute':{
                'count': 1,
                'single':'flute',
                'plural':'flutes',
                'flavor': '',
                'stats': {
                  'type': 'instrument',
                  'value': 2,
                  'weight': 0.5,
                },
                'materials': {
                  'primary': 'body',
                  'required': {
                    'body': ['metal','clay','wood'],
                    'mouthpiece': ['metal','clay','wood'],
                  },
                  'optional': {
                    'strap': ['leather'],
                  },
                  'default': 'wood',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                    'stone': 'artisan',
                    'clay': 'artisan',
                    'wood': 'artisan',
                  },
                  'restricted': {
                    'metal': ['platinum','lead',],
                  },
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 33,
                    'parts': ['body'],
                    'min': 1,
                    'max': 2,
                  },
                },
              },
              'lute':{
                'count': 1,
                'single':'lute',
                'plural':'lutes',
                'flavor': '',
                'stats': {
                  'type': 'instrument',
                  'value': 35,
                  'weight': 0.5,
                },
                'materials': {
                  'primary': 'body',
                  'required': {
                    'body': ['wood'],
                    'head': ['wood'],
                    'tuning pegs': ['metal','bone'],
                    'strings': ['cloth'],
                  },
                  'optional': {
                    'strap': ['leather'],
                  },
                  'default': 'wood',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                    'stone': 'artisan',
                    'wood': 'artisan',
                    'bone': 'artisan',
                  },
                  'restricted': {
                    'metal': ['platinum','lead',],
                    'cloth': ['lace','silk',],
                  },
                  'extra': ['emblem','carving'],
                  'emblem': {
                    'chance': 33,
                    'parts': ['body'],
                    'min': 1,
                    'max': 2,
                  },
                  'carving': {
                    'chance': 25,
                    'parts': ['head'],
                    'shape': [' head'],
                    'path': ['words','engraving','things','person','single'],
                    'count': 1,
                  },
                },
              },
              'pan flute':{
                'count': 1,
                'single':'pan flute',
                'plural':'pan flutes',
                'flavor': '',
                'stats': {
                  'type': 'instrument',
                  'value': 12,
                  'weight': 0.5,
                },
                'materials': {
                  'primary': 'pipes',
                  'required': {
                    'pipes': ['wood','metal','bone'],
                    'brace': ['wood','metal','bone'],
                  },
                  'optional': {
                    'strap': ['leather'],
                  },
                  'default': 'wood',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                    'stone': 'artisan',
                    'wood': 'artisan',
                    'bone': 'artisan',
                  },
                  'restricted': {
                    'metal': ['platinum','lead',],
                    'cloth': ['lace','silk',],
                  },
                },
              },
              'carnyx':{
                'count': 1,
                'single':'carnyx',
                'plural':'carnyxes',
                'flavor': '',
                'stats': {
                  'type': 'instrument',
                  'value': 20,
                  'weight': 0.5,
                },
                'materials': {
                  'primary': 'long pipe',
                  'required': {
                    'long pipe': ['metal'],
                    'curved mouthpiece': ['metal'],
                    'bell': ['metal'],
                  },
                  'optional': {
                    'strap': ['leather'],
                  },
                  'default': 'metal',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                    'stone': 'artisan',
                    'wood': 'artisan',
                    'bone': 'artisan',
                  },
                  'restricted': {
                    'metal': ['platinum','lead','copper','steel'],
                    'cloth': ['lace','silk',],
                  },
                  'extra': ['carving'],
                  'carving': {
                    'chance': 100,
                    'parts': ['bell'],
                    'shape': [' head'],
                    'path': ['words','engraving','things','person','single'],
                    'count': 1,
                  },
                },
              },
              // 'bagpipes': {},
              'drum': {'count': 1,
                'single':'drum',
                'plural':'drums',
                'flavor': '',
                'stats': {
                  'type': 'instrument',
                  'value': 6,
                  'weight': 3,
                },
                'materials': {
                  'primary': 'shell',
                  'required': {
                    'shell': ['wood','metal'],
                    'batter head': ['leather'],
                    'tension rods': ['wood','metal'],
                  },
                  'optional': {
                    'strap': ['leather'],
                    'drumsticks': ['wood'],
                  },
                  'default': 'wood',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                    'stone': 'artisan',
                    'wood': 'artisan',
                    'bone': 'artisan',
                  },
                  'restricted': {
                    'metal': ['platinum','lead','copper','steel'],
                    'cloth': ['lace','silk',],
                  },
                },
              },
              // 'dulcimer': {},
              'lyre': {'count': 1,
                'single':'lyre',
                'plural':'lyres',
                'flavor': '',
                'stats': {
                  'type': 'instrument',
                  'value': 30,
                  'weight': 2,
                },
                'materials': {
                  'primary': 'soundbox',
                  'required': {
                    'soundbox': ['wood'],
                    'arms': ['wood'],
                    'crossbar': ['wood','metal','bone'],
                    'bridge': ['wood','metal','bone'],
                    'strings': ['cloth'],
                  },
                  'optional': {
                    'hand-strap': ['leather'],
                  },
                  'default': 'wood',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                    'stone': 'artisan',
                    'wood': 'artisan',
                    'bone': 'artisan',
                  },
                  'restricted': {
                    'metal': ['platinum','lead','copper','steel'],
                    'cloth': ['lace','silk',],
                  },
                  'extra': ['carving'],
                  'carving': {
                    'chance': 33,
                    'parts': ['arms'],
                    'shape': [' head'],
                    'path': ['words','engraving','things','person','single'],
                    'count': 2,
                  },
                },
              },
              'hunting horn': {'count': 1,
                'single':'hunting horn',
                'plural':'hunting horns',
                'flavor': '',
                'stats': {
                  'type': 'instrument',
                  'value': 3,
                  'weight': 2,
                },
                'materials': {
                  'primary': 'horn',
                  'required': {
                    'horn': ['metal','horn'],
                    'mouthpiece': ['metal'],
                  },
                  'optional': {
                    'hand-strap': ['leather'],
                  },
                  'default': 'horn',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                    'stone': 'artisan',
                    'wood': 'artisan',
                    'horn': 'artisan',
                  },
                  'restricted': {
                    'metal': ['platinum','lead','copper','steel'],
                    'cloth': ['lace','silk',],
                  },
                },
              },
              'trumpet': {'count': 1,
                'single':'trumpet',
                'plural':'trumpets',
                'flavor': '',
                'stats': {
                  'type': 'instrument',
                  'value': 3,
                  'weight': 2,
                },
                'materials': {
                  'primary': 'body',
                  'required': {
                    'body': ['metal','horn'],
                    'mouthpiece': ['metal'],
                  },
                  'optional': {
                    'hand-strap': ['leather'],
                  },
                  'default': 'horn',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                    'stone': 'artisan',
                    'wood': 'artisan',
                    'horn': 'artisan',
                  },
                  'restricted': {
                    'metal': ['platinum','lead','copper','steel'],
                    'cloth': ['lace','silk',],
                  },
                },
              },
              // 'shawm': {},
              'viol': {'count': 1,
                'single':'viol',
                'plural':'viols',
                'flavor': '',
                'stats': {
                  'type': 'instrument',
                  'value': 20,
                  'weight': 0.5,
                },
                'materials': {
                  'primary': 'body',
                  'required': {
                    'body': ['wood'],
                    'neck': ['wood'],
                    'scroll': ['wood'],
                    'bridge': ['wood','bone','metal'],
                    'tuning pegs': ['bone','metal'],
                    'strings': ['cloth'],
                  },
                  'optional': {
                    'bow': ['wood'],
                  },
                  'default': 'wood',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                    'stone': 'artisan',
                    'wood': 'artisan',
                    'bone': 'artisan',
                  },
                  'restricted': {
                    'metal': ['platinum','lead','copper','steel'],
                    'cloth': ['lace','silk',],
                  },
                  'extra': ['carving'],
                  'carving': {
                    'chance': 25,
                    'parts': ['scroll'],
                    'shape': [' head'],
                    'path': ['words','engraving','things','person','single'],
                    'count': 1,
                  },
                },
              },
            },
          },
          'light source':{
            'subtype': {
              'lantern':{
                'count': 1,
                'single':'lantern',
                'plural':'lanterns',
                'flavor': '',
                'stats': {
                  'type': 'light source',
                  'value': 7,
                  'weight': 1,
                },
                'materials': {
                  'primary': 'frame',
                  'required': {
                    'frame': ['metal'],
                    'handle': ['metal'],
                  },
                  'optional': {
                    'panes': ['glass'],
                  },
                  'default': 'metal',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                  },
                  'restricted': {
                    'metal': ['platinum','lead',],
                  },
                },
              },
              'bullseye lantern':{
                'count': 1,
                'single':'bullseye lantern',
                'plural':'bullseye lanterns',
                'flavor': '',
                'stats': {
                  'type': 'light source',
                  'value': 12,
                  'weight': 1,
                },
                'materials': {
                  'primary': 'frame',
                  'required': {
                    'frame': ['metal'],
                    'handle': ['metal'],
                    'focusing lens ': ['glass'], //space after 'lens ' treats it as singular instead of plural for printing in the UI
                  },
                  'optional': {
                  },
                  'default': 'metal',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                  },
                  'restricted': {
                    'metal': ['platinum','lead',],
                  },
                },
              },
              'clay oil lamp': { //clay lamps. to ensure parts make sense, metal lamps are a separate entry
                'count': 1,
                'single':'oil lamp',
                'plural':'oil lamps',
                'flavor': '',
                'stats': {
                  'type': 'light source',
                  'value': 0.1,
                  'weight': 1,
                },
                'materials': {
                  'primary': 'body',
                  'required': {
                    'body': ['clay'],
                    'spout': ['clay'],
                  },
                  'optional': {
                    'handle': ['clay'],
                    'glass ': ['glass'],
                  },
                  'default': 'metal',
                  'creation': 'crafted',
                  'maker': {
                    'clay': 'potter',
                  },
                  'restricted': {
                    'metal': ['platinum','lead','steel'],
                  },
                },
              },
              'metal oil lamp': {
                'count': 1,
                'single':'oil lamp',
                'plural':'oil lamps',
                'flavor': '',
                'stats': {
                  'type': 'light source',
                  'value': 0.1,
                  'weight': 1,
                },
                'materials': {
                  'primary': 'body',
                  'required': {
                    'body': ['metal'],
                    'stand': ['metal'],
                    'glass ': ['glass'],
                  },
                  'optional': {
                    'handle': ['metal'],
                  },
                  'default': 'metal',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                  },
                  'restricted': {
                    'metal': ['platinum','lead','steel'],
                  },
                },
              },
              'wooden torch': {
                'count': 1,
                'single':'torch',
                'plural':'torches',
                'flavor': '',
                'max_age': 12,
                'age_method': 'month',
                'stats': {
                  'type': 'light source',
                  'value': 0.1,
                  'weight': 1,
                },
                'materials': {
                  'primary': 'shaft',
                  'required': {
                    'shaft': ['wood'],
                    'flammable wrapping': ['cloth'],
                  },
                  'optional': {
                  },
                  'default': 'wood',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                    'wood': 'artisan',
                  },
                  'restricted': {
                    'cloth': ['linen','cotton','wool','lace','silk'],
                  },
                  'dye': false,
                },
              },
              'everburning torch': {
                'count': 1,
                'single':'everburning torch',
                'plural':'everburning torches',
                'flavor': '',
                'stats': {
                  'type': 'light source',
                  'value': 110,
                  'weight': 1,
                },
                'materials': {
                  'primary': 'shaft',
                  'required': {
                    'shaft': ['wood','metal'],
                    'continuous flame': ['magic'],
                  },
                  'optional': {
                  },
                  'default': 'wood',
                  'creation': 'enchanted',
                  'maker': {
                    'metal': 'mage',
                    'wood': 'mage',
                  },
                  'restricted': {
                    'cloth': ['linen','cotton','wool','lace','silk'],
                    'metal': ['platinum','gold','lead','copper','steel','silver'],
                  },
                  'dye': false,
                },
              },
              'metal torch': {
                'count': 1,
                'single':'torch',
                'plural':'torches',
                'flavor': '',
                'stats': {
                  'type': 'light source',
                  'value': 0.1,
                  'weight': 1,
                },
                'materials': {
                  'primary': 'shaft',
                  'required': {
                    'shaft': ['metal'],
                    'collar': ['metal'],
                    'flammable wrapping': ['cloth'],
                  },
                  'optional': {
                  },
                  'default': 'wood',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                    'wood': 'artisan',
                  },
                  'restricted': {
                    'cloth': ['linen','cotton','wool','lace','silk'],
                    'metal': ['platinum','gold','lead','copper','steel','silver'],
                  },
                  'dye': false,
                },
              },
          //     'alchemist\'s torch': {

          //     },
          //     'candleabra': {

          //     },
            },
          },
          'furniture': {
            'subtype': {
              'bed': {
                'count': 1,
                'single':'bed',
                'plural':'beds',
                'flavor': '',
                'lost_chance': 0,
                'stats': {
                  'type': 'furniture',
                  'value': 5,
                  'armor_class': '0',
                  'weight': 0.5,
                },
                'materials': {
                  'primary': 'body',
                  'required': {
                    'body': ['wood'],
                    'headboard': ['wood'],
                    'posts': ['wood'],
                  },
                  'default': 'wood',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                    'stone': 'stonecrafter',
                    'wood': 'carpenter',
                  },
                  'restricted': {
                  },
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 33,
                    'parts': ['headboard'],
                    'min': 1,
                    'max': 3,
                  },
                },
              },
              'chest': {
                'count': 1,
                'single':'chest',
                'plural':'chests',
                'flavor': '',
                'lost_chance': 0,
                'stats': {
                  'type': 'furniture',
                  'value': 10,
                  'armor_class': '0',
                  'weight': 0.5,
                },
                'materials': {
                  'primary': 'box',
                  'required': {
                    'box': ['wood','metal'],
                    'lid': ['wood','metal'],
                    'lock': ['metal'],
                  },
                  'optional': {
                    'false bottom': ['wood','metal'],
                    'handles': ['metal','leather'],
                  },
                  'default': 'wood',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                    'stone': 'stonecrafter',
                    'wood': 'carpenter',
                  },
                  'restricted': {
                    'metal': ['lead','platinum','gold','silver','copper'],
                  },
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 33,
                    'parts': ['lid'],
                    'min': 1,
                    'max': 3,
                  },
                },
              },
            },
          },
          'potion': {
            'subtype': {
              'potion of climbing': {
                'count': 1,
                'single':'potion of climbing',
                'plural':'potions of climbing',
                'flavor': 'The potion is separated into brown, silver, and gray layers resembling bands of stone. Shaking the bottle fails to mix the colors.',
                'max_age': 18,
                'age_method': 'month',
                'stats': {
                  'type': 'potion',
                  'value': 50,
                  'weight': 1,
                },
                'materials': {
                  'primary': 'bottle',
                  'required': {
                    'bottle': ['glass'],
                    'stopper': ['wood','metal'],
                  },
                  'optional': {
                    'wrapping': ['leather','cloth'],
                    'strap': ['leather','cloth'],
                  },
                  'default': 'glass',
                  'creation': 'brewed',
                  'maker': {
                    'glass': 'potion maker',
                  },
                  'restricted': {
                    'metal': ['platinum','lead','silver','gold','mithral'],
                    'cloth': ['silk','lace'],
                  },
                },
              },
              'potion of healing': {
                'count': 1,
                'single':'potion of healing',
                'plural':'potions of healing',
                'flavor': 'The potion’s red liquid glimmers when agitated.',
                'max_age': 18,
                'age_method': 'month',
                'stats': {
                  'type': 'potion',
                  'value': 50,
                  'weight': 1,
                },
                'materials': {
                  'primary': 'bottle',
                  'required': {
                    'bottle': ['glass'],
                    'stopper': ['wood','metal'],
                  },
                  'optional': {
                    'wrapping': ['leather','cloth'],
                    'strap': ['leather','cloth'],
                  },
                  'default': 'glass',
                  'creation': 'brewed',
                  'maker': {
                    'glass': 'potion maker',
                  },
                  'restricted': {
                    'metal': ['platinum','lead','silver','gold','mithral'],
                    'cloth': ['silk','lace'],
                  },
                },
              },
              'potion of poison': {
                'count': 1,
                'single':'potion of poison',
                'plural':'potions of poison',
                'flavor': 'This concoction looks, smells, and tastes like a Potion of Healing or other beneficial potion. However, it is actually poison masked by illusion magic.',
                'max_age': 18,
                'age_method': 'month',
                'stats': {
                  'type': 'potion',
                  'value': 250,
                  'weight': 1,
                },
                'materials': {
                  'primary': 'bottle',
                  'required': {
                    'bottle': ['glass'],
                    'stopper': ['wood','metal'],
                  },
                  'optional': {
                    'wrapping': ['leather','cloth'],
                    'strap': ['leather','cloth'],
                  },
                  'default': 'glass',
                  'creation': 'brewed',
                  'maker': {
                    'glass': 'potion maker',
                  },
                  'restricted': {
                    'metal': ['platinum','lead','silver','gold','mithral'],
                    'cloth': ['silk','lace'],
                  },
                },
              },
              'potion of animal friendship': {
                'count': 1,
                'single':'potion of animal friendship',
                'plural':'potions of animal friendship',
                'flavor': 'Agitating this muddy liquid brings little bits into view: a fish scale, a hummingbird tongue, a cat claw, or a squirrel hair.',
                'max_age': 18,
                'age_method': 'month',
                'stats': {
                  'type': 'potion',
                  'value': 250,
                  'weight': 1,
                },
                'materials': {
                  'primary': 'bottle',
                  'required': {
                    'bottle': ['glass'],
                    'stopper': ['wood','metal'],
                  },
                  'optional': {
                    'wrapping': ['leather','cloth'],
                    'strap': ['leather','cloth'],
                  },
                  'default': 'glass',
                  'creation': 'brewed',
                  'maker': {
                    'glass': 'potion maker',
                  },
                  'restricted': {
                    'metal': ['platinum','lead','silver','gold','mithral'],
                    'cloth': ['silk','lace'],
                  },
                },
              },
              'potion of growth': {
                'count': 1,
                'single':'potion of growth',
                'plural':'potions of growth',
                'flavor': 'The red in the potion’s liquid continuously expands from a tiny bead to color the clear liquid around it and then contracts. Shaking the bottle fails to interrupt this process.',
                'max_age': 18,
                'age_method': 'month',
                'stats': {
                  'type': 'potion',
                  'value': 250,
                  'weight': 1,
                },
                'materials': {
                  'primary': 'bottle',
                  'required': {
                    'bottle': ['glass'],
                    'stopper': ['wood','metal'],
                  },
                  'optional': {
                    'wrapping': ['leather','cloth'],
                    'strap': ['leather','cloth'],
                  },
                  'default': 'glass',
                  'creation': 'brewed',
                  'maker': {
                    'glass': 'potion maker',
                  },
                  'restricted': {
                    'metal': ['platinum','lead','silver','gold','mithral'],
                    'cloth': ['silk','lace'],
                  },
                },
              },
              'potion of water breathing': {
                'count': 1,
                'single':'potion of water breathing',
                'plural':'potions of water breathing',
                'flavor': "This potion's cloudy green fluid smells of the sea and has a jellyfish-like bubble floating in it.",
                'max_age': 18,
                'age_method': 'month',
                'stats': {
                  'type': 'potion',
                  'value': 250,
                  'weight': 1,
                },
                'materials': {
                  'primary': 'bottle',
                  'required': {
                    'bottle': ['glass'],
                    'stopper': ['wood','metal'],
                  },
                  'optional': {
                    'wrapping': ['leather','cloth'],
                    'strap': ['leather','cloth'],
                  },
                  'default': 'glass',
                  'creation': 'brewed',
                  'maker': {
                    'glass': 'potion maker',
                  },
                  'restricted': {
                    'metal': ['platinum','lead','silver','gold','mithral'],
                    'cloth': ['silk','lace'],
                  },
                },
              },
              'potion of resistance': {
                'count': 1,
                'single':'potion of resistance',
                'plural':'potions of resistance',
                'flavor': "The liquid inside this bottle shimmers with the color of the element is provides resistance to.",
                'max_age': 18,
                'age_method': 'month',
                'stats': {
                  'type': 'potion',
                  'value': 250,
                  'weight': 1,
                },
                'materials': {
                  'primary': 'bottle',
                  'required': {
                    'bottle': ['glass'],
                    'stopper': ['wood','metal'],
                  },
                  'optional': {
                    'wrapping': ['leather','cloth'],
                    'strap': ['leather','cloth'],
                  },
                  'default': 'glass',
                  'creation': 'brewed',
                  'maker': {
                    'glass': 'potion maker',
                  },
                  'restricted': {
                    'metal': ['platinum','lead','silver','gold','mithral'],
                    'cloth': ['silk','lace'],
                  },
                },
              },
              'philter of love': {
                'count': 1,
                'single':'philter of love',
                'plural':'philters of love',
                'flavor': 'This potion’s rose-hued, effervescent liquid contains one easy-to-miss bubble shaped like a heart.',
                'max_age': 18,
                'age_method': 'month',
                'stats': {
                  'type': 'potion',
                  'value': 250,
                  'weight': 1,
                },
                'materials': {
                  'primary': 'bottle',
                  'required': {
                    'bottle': ['glass'],
                    'stopper': ['wood','metal'],
                  },
                  'optional': {
                    'wrapping': ['leather','cloth'],
                    'strap': ['leather','cloth'],
                  },
                  'default': 'glass',
                  'creation': 'brewed',
                  'maker': {
                    'glass': 'potion maker',
                  },
                  'restricted': {
                    'metal': ['platinum','lead','silver','gold','mithral'],
                    'cloth': ['silk','lace'],
                  },
                },
              },
              'potion of greater healing': {
                'count': 1,
                'single':'potion of healing',
                'plural':'potions of healing',
                'flavor': 'The potion’s red liquid glimmers when agitated.',
                'max_age': 18,
                'age_method': 'month',
                'stats': {
                  'type': 'potion',
                  'value': 250,
                  'weight': 1,
                },
                'materials': {
                  'primary': 'bottle',
                  'required': {
                    'bottle': ['glass'],
                    'stopper': ['wood','metal'],
                  },
                  'optional': {
                    'wrapping': ['leather','cloth'],
                    'strap': ['leather','cloth'],
                  },
                  'default': 'glass',
                  'creation': 'brewed',
                  'maker': {
                    'glass': 'potion maker',
                  },
                  'restricted': {
                    'metal': ['platinum','lead','silver','gold','mithral'],
                    'cloth': ['silk','lace'],
                  },
                },
              },
              'elixir of health': {
                'count': 1,
                'single':'elixir of health',
                'plural':'elixirs of health',
                'flavor': "This potion's red liquid contains tiny bubbles of light.",
                'max_age': 18,
                'age_method': 'month',
                'stats': {
                  'type': 'potion',
                  'value': 2500,
                  'weight': 1,
                },
                'materials': {
                  'primary': 'bottle',
                  'required': {
                    'bottle': ['glass'],
                    'stopper': ['wood','metal'],
                  },
                  'optional': {
                    'wrapping': ['leather','cloth'],
                    'strap': ['leather','cloth'],
                  },
                  'default': 'glass',
                  'creation': 'brewed',
                  'maker': {
                    'glass': 'potion maker',
                  },
                  'restricted': {
                    'metal': ['platinum','lead','silver','gold','mithral'],
                    'cloth': ['silk','lace'],
                  },
                },
              },
              'oil of slipperiness': {
                'count': 1,
                'single':'oil of slipperiness',
                'plural':'oils of slipperiness',
                'flavor': "The liquid in the bottle is a thick, heavy, sticky, black unguent but flows quickly when poured",
                'max_age': 18,
                'age_method': 'month',
                'stats': {
                  'type': 'potion',
                  'value': 250,
                  'weight': 1,
                },
                'materials': {
                  'primary': 'bottle',
                  'required': {
                    'bottle': ['glass'],
                    'stopper': ['wood','metal'],
                  },
                  'optional': {
                    'wrapping': ['leather','cloth'],
                    'strap': ['leather','cloth'],
                  },
                  'default': 'glass',
                  'creation': 'brewed',
                  'maker': {
                    'glass': 'potion maker',
                  },
                  'restricted': {
                    'metal': ['platinum','lead','silver','gold','mithral'],
                    'cloth': ['silk','lace'],
                  },
                },
              },
              'oil of etherealness': {
                'count': 1,
                'single':'oil of etherealness',
                'plural':'oils of etherealness',
                'flavor': "The bottle contains cloudy gray oil. Beads form on the outside of its bottle and quickly evaporate.",
                'max_age': 18,
                'age_method': 'month',
                'stats': {
                  'type': 'potion',
                  'value': 2500,
                  'weight': 1,
                },
                'materials': {
                  'primary': 'bottle',
                  'required': {
                    'bottle': ['glass'],
                    'stopper': ['wood','metal'],
                  },
                  'optional': {
                    'wrapping': ['leather','cloth'],
                    'strap': ['leather','cloth'],
                  },
                  'default': 'glass',
                  'creation': 'brewed',
                  'maker': {
                    'glass': 'potion maker',
                  },
                  'restricted': {
                    'metal': ['platinum','lead','silver','gold','mithral'],
                    'cloth': ['silk','lace'],
                  },
                },
              },
              'potion of hill giant strength': {
                'count': 1,
                'single':'potion of hill giant strength',
                'plural':'potions of hill giant strength',
                'flavor': "This potion's transparent liquid has floating in it a sliver of fingernail from a hill giant.",
                'max_age': 18,
                'age_method': 'month',
                'stats': {
                  'type': 'potion',
                  'value': 250,
                  'weight': 1,
                },
                'materials': {
                  'primary': 'bottle',
                  'required': {
                    'bottle': ['glass'],
                    'stopper': ['wood','metal'],
                  },
                  'optional': {
                    'wrapping': ['leather','cloth'],
                    'strap': ['leather','cloth'],
                  },
                  'default': 'glass',
                  'creation': 'brewed',
                  'maker': {
                    'glass': 'potion maker',
                  },
                  'restricted': {
                    'metal': ['platinum','lead','silver','gold','mithral'],
                    'cloth': ['silk','lace'],
                  },
                },
              },
              // 'potion of frost giant strength': {
              //   'count': 1,
              //   'single':'potion of frost giant strength',
              //   'plural':'potions of frost giant strength',
              //   'flavor': "This potion's transparent liquid has floating in it a sliver of fingernail from a frost giant.",
              //   'max_age': 18,
              //   'age_method': 'month',
              //   'stats': {
              //     'type': 'potion',
              //     'value': 2500,
              //     'weight': 1,
              //   },
              //   'materials': {
              //     'primary': 'bottle',
              //     'required': {
              //       'bottle': ['glass'],
              //       'stopper': ['wood','metal'],
              //     },
              //     'optional': {
              //       'wrapping': ['leather','cloth'],
              //       'strap': ['leather','cloth'],
              //     },
              //     'default': 'glass',
              //     'creation': 'brewed',
              //     'maker': {
              //       'glass': 'potion maker',
              //     },
              //     'restricted': {
              //       'metal': ['platinum','lead','silver','gold','mithral'],
              //       'cloth': ['silk','lace'],
              //     },
              //   },
              // },
              // 'potion of stone giant strength': {
              //   'count': 1,
              //   'single':'potion of stone giant strength',
              //   'plural':'potions of stone giant strength',
              //   'flavor': "This potion's transparent liquid has floating in it a sliver of fingernail from a stone giant.",
              //   'max_age': 18,
              //   'age_method': 'month',
              //   'stats': {
              //     'type': 'potion',
              //     'value': 2500,
              //     'weight': 1,
              //   },
              //   'materials': {
              //     'primary': 'bottle',
              //     'required': {
              //       'bottle': ['glass'],
              //       'stopper': ['wood','metal'],
              //     },
              //     'optional': {
              //       'wrapping': ['leather','cloth'],
              //       'strap': ['leather','cloth'],
              //     },
              //     'default': 'glass',
              //     'creation': 'brewed',
              //     'maker': {
              //       'glass': 'potion maker',
              //     },
              //     'restricted': {
              //       'metal': ['platinum','lead','silver','gold','mithral'],
              //       'cloth': ['silk','lace'],
              //     },
              //   },
              // },
              // 'potion of fire giant strength': {
              //   'count': 1,
              //   'single':'potion of fire giant strength',
              //   'plural':'potions of fire giant strength',
              //   'flavor': "This potion's transparent liquid has floating in it a sliver of fingernail from a fire giant.",
              //   'max_age': 18,
              //   'age_method': 'month',
              //   'stats': {
              //     'type': 'potion',
              //     'value': 2500,
              //     'weight': 1,
              //   },
              //   'materials': {
              //     'primary': 'bottle',
              //     'required': {
              //       'bottle': ['glass'],
              //       'stopper': ['wood','metal'],
              //     },
              //     'optional': {
              //       'wrapping': ['leather','cloth'],
              //       'strap': ['leather','cloth'],
              //     },
              //     'default': 'glass',
              //     'creation': 'brewed',
              //     'maker': {
              //       'glass': 'potion maker',
              //     },
              //     'restricted': {
              //       'metal': ['platinum','lead','silver','gold','mithral'],
              //       'cloth': ['silk','lace'],
              //     },
              //   },
              // },
              // 'potion of cloud giant strength': {
              //   'count': 1,
              //   'single':'potion of cloud giant strength',
              //   'plural':'potions of cloud giant strength',
              //   'flavor': "This potion's transparent liquid has floating in it a sliver of fingernail from a cloud giant.",
              //   'max_age': 18,
              //   'age_method': 'month',
              //   'stats': {
              //     'type': 'potion',
              //     'value': 25000,
              //     'weight': 1,
              //   },
              //   'materials': {
              //     'primary': 'bottle',
              //     'required': {
              //       'bottle': ['glass'],
              //       'stopper': ['wood','metal'],
              //     },
              //     'optional': {
              //       'wrapping': ['leather','cloth'],
              //       'strap': ['leather','cloth'],
              //     },
              //     'default': 'glass',
              //     'creation': 'brewed',
              //     'maker': {
              //       'glass': 'potion maker',
              //     },
              //     'restricted': {
              //       'metal': ['platinum','lead','silver','gold','mithral'],
              //       'cloth': ['silk','lace'],
              //     },
              //   },
              // },
              // 'potion of storm giant strength': {
              //   'count': 1,
              //   'single':'potion of storm giant strength',
              //   'plural':'potions of storm giant strength',
              //   'flavor': "This potion's transparent liquid has floating in it a sliver of fingernail from a storm giant.",
              //   'max_age': 18,
              //   'age_method': 'month',
              //   'stats': {
              //     'type': 'potion',
              //     'value': 25000,
              //     'weight': 1,
              //   },
              //   'materials': {
              //     'primary': 'bottle',
              //     'required': {
              //       'bottle': ['glass'],
              //       'stopper': ['wood','metal'],
              //     },
              //     'optional': {
              //       'wrapping': ['leather','cloth'],
              //       'strap': ['leather','cloth'],
              //     },
              //     'default': 'glass',
              //     'creation': 'brewed',
              //     'maker': {
              //       'glass': 'potion maker',
              //     },
              //     'restricted': {
              //       'metal': ['platinum','lead','silver','gold','mithral'],
              //       'cloth': ['silk','lace'],
              //     },
              //   },
              // },
            },
          },
          'meal': {
            "subtype": {
              "soup": {
                'single':'soup',
                'plural':'soups',
                'flavor': '',
                'stats': {
                  'type': 'meal',
                  'value': 0.03,
                  'weight': 0.5,
                },
                "crafter": "chef",
                "ingredients": [
                  ["stock","meat","vegetable","vegetable","spice"],
                  ["stock","meat","grain","vegetable","vegetable",],
                  ["stock","meat","greens","vegetable","vegetable",],
                  ["stock","fish","vegetable","vegetable","spice"],
                  ["stock","fish","grain","vegetable","vegetable",],
                  ["stock","fish","greens","vegetable","vegetable",],
                  ["stock","vegetable","vegetable","vegetable","spice","spice"],
                  ["stock","vegetable","vegetable","vegetable","spice"],
                  ["stock","grain","vegetable","vegetable","spice"],
                  ["stock","grain","vegetable","vegetable","spice","spice"],
                  ["stock","greens","vegetable","vegetable","spice"],
                  ["stock","greens","vegetable","vegetable","spice","spice"],
                ],
              },
              "stew":{
                'single':'stew',
                'plural':'stews',
                'flavor': '',
                'stats': {
                  'type': 'meal',
                  'value': 0.05,
                  'weight': 0.5,
                },
                "crafter": "chef",
                "ingredients": [
                  ["stock","meat","vegetable","vegetable","spice"],
                  ["stock","meat","grain","vegetable","vegetable",],
                  ["stock","meat","greens","vegetable","vegetable",],
                  ["stock","meat","greens","vegetable","vegetable","bread",],
                  ["stock","fish","vegetable","vegetable","spice"],
                  ["stock","fish","grain","vegetable","vegetable",],
                  ["stock","fish","greens","vegetable","vegetable",],
                  ["stock","fish","greens","vegetable","vegetable","bread",],
                ],
              },
              "salad": {
                'single':'salad',
                'plural':'salads',
                'flavor': '',
                'stats': {
                  'type': 'meal',
                  'value': 0.03,
                  'weight': 0.5,
                },
                "crafter": "chef",
                "ingredients": [
                  ["greens","meat","vegetable","vegetable","spice","dressing",],
                  ["greens","meat","grain","vegetable","vegetable","dressing",],
                  ["greens","meat","vegetable","vegetable","vegetable","spice","dressing",],
                  ["greens","fish","vegetable","vegetable","spice","dressing",],
                  ["greens","fish","grain","vegetable","vegetable","dressing",],
                  ["greens","fish","vegetable","vegetable","vegetable","spice","dressing",],
                  ["greens","vegetable","vegetable","vegetable","spice","dressing",],
                  ["greens","vegetable","vegetable","vegetable","vegetable","spice","dressing",],
                  ["greens","fruit","vegetable","vegetable","spice","dressing",],
                  ["greens","fruit","vegetable","vegetable","vegetable","spice","dressing",],
                ],
              },
              "entree": {
                'single':'entree',
                'plural':'entrees',
                'flavor': '',
                'stats': {
                  'type': 'meal',
                  'value': 0.08,
                  'weight': 0.5,
                },
                "crafter": "chef",
                "ingredients": [
                  ["meat","vegetable","bread",],
                  ["meat","grain","vegetable",],
                  ["fish","grain","vegetable",],
                  ["fish","vegetable","bread",],
                  ["meat","fruit","vegetable",],
                  ["fish","fruit","vegetable",],
                  ["meat","vegetable","vegetable",],
                  ["fish","vegetable","vegetable",],
                  ["meat","grain","vegetable","spice",],
                  ["fish","grain","vegetable","spice",],
                  ["eggs","meat","bread",],
                  ["eggs","meat","vegetable","bread"],
                  ["eggs","meat","vegetable",],
                  ["eggs","vegetable","vegetable",],
                  ["eggs","meat","vegetable","spice",],
                  ["eggs","vegetable","vegetable","spice",],
                ],
              },
              "meat and cheese": {
                'single':'meat and cheese',
                'plural':'meats and cheeses',
                'flavor': '',
                'stats': {
                  'type': 'meal',
                  'value': 0.08,
                  'weight': 0.5,
                },
                "crafter": "chef",
                "ingredients": [
                  ["meat","cheese","bread",],
                ],
              },
            },
          },
          'drink': {
            "subtype": {
              "milk":{
                'single':'bottle of milk',
                'plural':'bottles of milk',
                'flavor': '',
                'max_age': 2,
                'age_method': 'weeks',
                'stats': {
                  'type': 'drink',
                  'value': 0.03,
                  'weight': 1,
                },
                "source":["cow","goat","ox","yak","moose","sheep","camel","water buffalo","horse","reindeer"],
                "crafter": "farmer",
                'materials': {
                  'primary': 'bottle',
                  'required': {
                    'bottle': ['glass'],
                    'stopper': ['wood','metal'],
                  },
                  'creation': 'milked',
                  'restricted': {
                    'metal': ['platinum','lead','gold',"mithral","iron","steel"],
                    'cloth': ['silk','lace'],
                  },
                },
              },
              "wine": {
                'single':'bottle of wine',
                'plural':'bottles of wine',
                'flavor': '',
                "onsite": "house wine",
                "crafter": "vintner",
                'max_age': 10,
                'age_method': 'years',
                "business": "vineyard",
                'stats': {
                  'type': 'drink',
                  'value': [0.25, 10],
                  'weight': 2,
                },
                "source":["white","red"],
                "flavor_profiles": ["sweet","spicy","floral","dry","citrusy","bitter","sour","earthy"],
                'materials': {
                  'primary': 'bottle',
                  'required': {
                    'bottle': ['glass'],
                    'stopper': ['wood','metal'],
                  },
                  'creation': 'crafted',
                  'restricted': {
                    'metal': ['platinum','lead','gold',"mithral","iron","steel"],
                    'cloth': ['silk','lace'],
                  },
                },
              },
              "cider": {
                'single':'bottle of cider',
                'plural':'bottles of cider',
                'flavor': '',
                "onsite": "house cider",
                "business": "distillery",
                "crafter": "vintner",
                'stats': {
                  'type': 'drink',
                  'value': [0.25, 6],
                  'weight': 2,
                },
                "source":["cherry","peach","plum","pear","strawberry","blueberry","apricot","raspberry"],
                "flavor_profiles": ["sweet","crisp","dry","bitter","sour"],
                'materials': {
                  'primary': 'bottle',
                  'required': {
                    'bottle': ['glass'],
                    'stopper': ['wood','metal'],
                  },
                  'creation': 'crafted',
                  'restricted': {
                    'metal': ['platinum','lead','gold',"mithral","iron","steel"],
                    'cloth': ['silk','lace'],
                  },
                },
              },
              // // "mead":{},
              "beer":{
                'single':'barrel of beer',
                'plural':'barrels of beers',
                'flavor': '',
                'max_age': 5,
                "onsite": "brewed onsite",
                "business": "brewery",
                'stats': {
                  'type': 'drink',
                  'value': 0.04,
                  'weight': 600,
                },
                "flavor_profiles": ["crisp","bitter","nutty","sweet","dark","malty","spicy","smokey","sour","tart","fruity","earthy","creamy"],
                "crafter": "brewer",
                'materials': {
                  'primary': 'barrel',
                  'required': {
                    'barrel': ['wood'],
                    'stopper': ['wood','metal'],
                  },
                  'creation': 'brewed',
                  'restricted': {
                    'metal': ['platinum','lead','gold',"mithral","iron","steel"],
                    'cloth': ['silk','lace'],
                  },
                },
              },
              "ale":{
                'single':'barrel of ale',
                'plural':'barrels of ale',
                'flavor': '',
                'max_age': 8,
                "onsite": "brewed onsite",
                "business": "brewery",
                'stats': {
                  'type': 'drink',
                  'value': 0.04,
                  'weight': 600,
                },
                "flavor_profiles": ["crisp","bitter","nutty","sweet","dark","malty","spicy","smokey","sour","tart","fruity","earthy","creamy"],
                "crafter": "brewer",
                'materials': {
                  'primary': 'barrel',
                  'required': {
                    'barrel': ['wood'],
                    'stopper': ['wood','metal'],
                  },
                  'creation': 'brewed',
                  'restricted': {
                    'metal': ['platinum','lead','gold',"mithral","iron","steel"],
                    'cloth': ['silk','lace'],
                  },
                },
              },
            },
          },
        },
      },

      'jewelry': {
        'type': {
          'ring': {
            'subtype': {
              'ring': {
                'count': 1,
                'single':'ring',
                'plural':'rings',
                'stats': {
                  'type': 'ring',
                  'value': 5,
                  'armor_class': 0,
                  'weight': 0.5,
                },
                'materials': {
                  'primary': 'band',
                  'required': {
                    'band': ['metal','bone'],
                  },
                  'optional':{
                    'filigree': ['metal','bone'],
                    'jewel': ['gemstone'],
                  },
                  'default': 'metal',
                  'creation': 'designed',
                  'maker': {
                    'metal': 'jeweler',
                    'bone': 'jeweler',
                  },
                },
              },
              'signet ring': {
                'count': 1,
                'single':'signet ring',
                'plural':'signet rings',
                'stats': {
                  'type': 'ring',
                  'value': 20,
                  'armor_class': 0,
                  'weight': 0.5,
                },
                'materials': {
                  'primary': 'band',
                  'required': {
                    'band': ['metal','bone'],
                    'signet bezel': ['metal','bone'],
                  },
                  'optional':{
                    'filigree': ['metal','bone'],
                    'accents': ['gemstone'],
                  },
                  'default': 'metal',
                  'creation': 'designed',
                  'maker': {
                    'metal': 'jeweler',
                    'bone': 'jeweler',
                  },
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 100,
                    'parts': ['signet bezel'],
                  },
                },
              },
              'puzzle ring': {
                'count': 1,
                'single':'puzzle ring',
                'plural':'puzzle rings',
                'stats': {
                  'type': 'ring',
                  'value': 5,
                  'armor_class': 0,
                  'weight': 0.5,
                },
                'materials': {
                  'primary': 'band',
                  'required': {
                    'band': ['metal','bone'],
                    'band': ['metal','bone'],
                  },
                  'optional':{
                    'interlocking ring': ['metal','bone'],
                    'accents': ['gemstone'],
                  },
                  'default': 'metal',
                  'creation': 'designed',
                  'maker': {
                    'metal': 'jeweler',
                    'bone': 'jeweler',
                  },
                },
              },
            }
          },
          'necklace': {
            'subtype': {
              'choker': {
                'count': 1,
                'single':'choker',
                'plural':'chokers',
                'stats': {
                  'type': 'necklace',
                  'value': 5,
                  'armor_class': 0,
                  'weight': 0.5,
                },
                'materials': {
                  'primary': 'cord',
                  'required': {
                    'cord': ['metal','cloth','leather'],
                  },
                  'optional':{
                    'studs': ['metal'],
                    'pendant': ['gemstone'],
                  },
                  'default': 'leather',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'jeweler',
                    'leather': 'artisan',
                    'cloth': 'artisan',
                  },
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 50,
                    'parts': ['pendant'],
                  },
                },
              },
              'collar': {
                'count': 1,
                'single':'collar',
                'plural':'collars',
                'stats': {
                  'type': 'necklace',
                  'value': 5,
                  'armor_class': 0,
                  'weight': 0.5,
                },
                'materials': {
                  'primary': 'chain',
                  'required': {
                    'chain': ['metal'],
                    'insignia pendant': ['metal','bone'],
                  },
                  'optional':{
                    'accents': ['gemstone'],
                  },
                  'extra': ['emblem'],
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'jeweler',
                    'leather': 'artisan',
                    'cloth': 'artisan',
                  },
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 100,
                    'parts': ['insignia pendant'],
                  },
                },
              },
              'princess necklace': {
                'count': 1,
                'single':'princess necklace',
                'plural':'princess necklaces',
                'stats': {
                  'type': 'necklace',
                  'value': 5,
                  'armor_class': 0,
                  'weight': 0.5,
                },
                'materials': {
                  'primary': 'cord',
                  'required': {
                    'cord': ['metal','cloth','leather'],
                    'pendant': ['gemstone', 'metal'],
                  },
                  'optional':{
                    'accents': ['gemstone'],
                  },
                  'default': 'cloth',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'jeweler',
                    'leather': 'artisan',
                    'cloth': 'artisan',
                  },
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 75,
                    'parts': ['pendant'],
                  },
                },
              },
              'matinee necklace': {
                'count': 1,
                'single':'matinee necklace',
                'plural':'matinee necklaces',
                'stats': {
                  'type': 'necklace',
                  'value': 5,
                  'armor_class': 0,
                  'weight': 0.5,
                },
                'materials': {
                  'primary': 'chain',
                  'required': {
                    'chain': ['metal'],
                    'pendant': ['gemstone', 'metal'],
                  },
                  'optional':{
                    'accents': ['gemstone'],
                  },
                  'default': 'metal',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'jeweler',
                    'leather': 'artisan',
                    'cloth': 'artisan',
                  },
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 75,
                    'parts': ['pendant'],
                  },
                },
              },
              'lariat necklace': {
                'count': 1,
                'single':'lariat necklace',
                'plural':'lariat necklaces',
                'stats': {
                  'type': 'necklace',
                  'value': 5,
                  'armor_class': 0,
                  'weight': 0.5,
                },
                'materials': {
                  'primary': 'cord',
                  'required': {
                    'cord': ['cloth','leather'],
                    'pendant': ['gemstone', 'metal'],
                  },
                  'optional':{
                    'accents': ['gemstone'],
                  },
                  'default': 'cloth',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'jeweler',
                    'leather': 'artisan',
                    'cloth': 'artisan',
                  },
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 75,
                    'parts': ['pendant'],
                  },
                },                
              },
            },
          },
          'earrings': {
            'subtype': {
              'hoop': {
                'count': 2,
                'single':'hoop',
                'plural':'hoops',
                'stats': {
                  'type': 'earrings',
                  'value': 5,
                  'armor_class': 0,
                  'weight': 0.5,
                },
                'materials': {
                  'primary': 'hoop',
                  'required': {
                    'hoop': ['metal'],
                  },
                  'default': 'metal',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'jeweler',
                    'leather': 'artisan',
                    'cloth': 'artisan',
                  },
                },
              },
              'stud': {
                'count': 2,
                'single':'stud',
                'plural':'studs',
                'stats': {
                  'type': 'earring',
                  'value': 5,
                  'armor_class': 0,
                  'weight': 0.5,
                },
                'materials': {
                  'primary': 'stud',
                  'required': {
                    'stud': ['metal','bone'],
                  },
                  'optional':{
                    'accents': ['gemstone'],
                  },
                  'default': 'metal',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'jeweler',
                    'leather': 'artisan',
                    'bone': 'artisan',
                    'cloth': 'artisan',
                  },
                },
              },
              'dangle earrings': {
                'count': 2,
                'single':'dangle earring',
                'plural':'dangle earrings',
                'stats': {
                  'type': 'earring',
                  'value': 5,
                  'armor_class': 0,
                  'weight': 0.5,
                },
                'materials': {
                  'primary': 'hook',
                  'required': {
                    'hook': ['metal'],
                    'pendant': ['gemstone','metal','bone'],
                  },
                  'optional':{
                    'accent pendant': ['gemstone','metal','bone'],
                  },
                  'default': 'metal',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'jeweler',
                    'leather': 'artisan',
                    'cloth': 'artisan',
                  },
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 75,
                    'parts': ['pendant'],
                  },
                },
              },
              'drop earrings': {
                'count': 2,
                'single':'drop earring',
                'plural':'drop earrings',
                'stats': {
                  'type': 'earring',
                  'value': 5,
                  'armor_class': 0,
                  'weight': 0.5,
                },
                'materials': {
                  'primary': 'hook',
                  'required': {
                    'hook': ['metal'],
                    'chain': ['metal'],
                    'pendant': ['gemstone','metal','bone'],
                  },
                  'optional':{
                    'accent pendant': ['gemstone','metal','bone'],
                  },
                  'default': 'metal',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'jeweler',
                    'leather': 'artisan',
                    'cloth': 'artisan',
                  },
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 75,
                    'parts': ['pendant'],
                  },
                },
              },
              'chandelier earrings': {
                'count': 2,
                'single':'chandelier earring',
                'plural':'chandelier earrings',
                'stats': {
                  'type': 'earring',
                  'value': 5,
                  'armor_class': 0,
                  'weight': 0.5,
                },
                'materials': {
                  'primary': 'hook',
                  'required': {
                    'hook': ['metal'],
                    'latice': ['metal'],
                    'pendant': ['gemstone','metal','bone'],
                  },
                  'optional':{
                    'accent pendant': ['gemstone','metal','bone'],
                    'accent pendant': ['gemstone','metal','bone'],
                    'accent pendant': ['gemstone','metal','bone'],
                  },
                  'default': 'metal',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'jeweler',
                    'leather': 'artisan',
                    'cloth': 'artisan',
                  },
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 50,
                    'parts': ['pendant'],
                  },
                },
              },
              'teardrop earrings': {
                'count': 2,
                'single':'teardrop earring',
                'plural':'teardrop earrings',
                'stats': {
                  'type': 'earring',
                  'value': 5,
                  'armor_class': 0,
                  'weight': 0.5,
                },
                'materials': {
                  'primary': 'hook',
                  'required': {
                    'hook': ['metal'],
                    'jewel': ['gemstone'],
                  },
                  'default': 'metal',
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'jeweler',
                    'leather': 'artisan',
                    'cloth': 'artisan',
                  },
                },
              },
            },
          },
          'crown': {
            'subtype': {
              'crown': {
                'count': 1,
                'single':'crown',
                'plural':'crowns',
                'stats': {
                  'type': 'crown',
                  'value': 0,
                  'armor_class': 0,
                  'weight': 0.5,
                },
                'materials': {
                  'primary': 'ring',
                  'required': {
                    'ring': ['metal'],
                    'ornaments': ['metal','bone'],
                    'arches': ['metal'],
                  },
                  'optional': {
                    'sigil': ['metal','bone'],
                    'jewel': ['gemstone'],
                    'accents': ['gemstone','bone'],
                  },
                  'default': 'metal',
                  'restricted': {
                    'metal': ['lead'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'jeweler',
                    'leather': 'artisan',
                    'cloth': 'artisan',
                  },
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 100,
                    'parts': ['sigil'],
                  },
                },
              },
              'coronet': {
                'count': 1,
                'single':'coronet',
                'plural':'coronets',
                'stats': {
                  'type': 'crown',
                  'value': 0,
                  'armor_class': 0,
                  'weight': 0.5,
                },
                'materials': {
                  'primary': 'ring',
                  'required': {
                    'ring': ['metal'],
                    'ornaments': ['metal','bone'],
                  },
                  'optional': {
                    'signil': ['metal','bone'],
                    'jewel': ['gemstone'],
                    'accents': ['gemstone','bone'],
                  },
                  'default': 'metal',
                  'restricted': {
                    'metal': ['lead'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'jeweler',
                    'leather': 'artisan',
                    'cloth': 'artisan',
                  },
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 100,
                    'parts': ['sigil'],
                  },
                },
              },
              'tiara': {
                'count': 1,
                'single':'tiara',
                'plural':'tiaras',
                'stats': {
                  'type': 'crown',
                  'value': 0,
                  'armor_class': 0,
                  'weight': 0.5,
                },
                'materials': {
                  'primary': 'ring',
                  'required': {
                    'ring': ['metal'],
                    'ornaments': ['metal','bone'],
                  },
                  'optional': {
                    'jewel': ['gemstone'],
                    'accents': ['gemstone','bone'],
                  },
                  'default': 'metal',
                  'restricted': {
                    'metal': ['lead'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'jeweler',
                    'leather': 'artisan',
                    'cloth': 'artisan',
                  },
                },
              },
              'diadem': {
                'count': 1,
                'single':'diadem',
                'plural':'diadems',
                'stats': {
                  'type': 'crown',
                  'value': 0,
                  'armor_class': 0,
                  'weight': 0.5,
                },
                'materials': {
                  'primary': 'ring',
                  'required': {
                    'ring': ['metal'],
                    'ornaments': ['metal','bone'],
                  },
                  'optional': {
                    'sigil': ['metal','bone'],
                    'jewel': ['gemstone'],
                    'accents': ['gemstone','bone'],
                  },
                  'default': 'metal',
                  'restricted': {
                    'metal': ['lead'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'jeweler',
                    'leather': 'artisan',
                    'cloth': 'artisan',
                  },
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 100,
                    'parts': ['sigil'],
                  },
                },
              },
            },
          },
          'braclet': {
            'subtype': {
              'bangle': {
                'count': 1,
                'single':'bangle',
                'plural':'bangles',
                'stats': {
                  'type': 'braclet',
                  'value': 2,
                  'armor_class': 0,
                  'weight': 0.5,
                },
                'materials': {
                  'primary': 'band',
                  'required': {
                    'band': ['metal','bone','glass'],
                  },
                  'optional': {
                    'studs': ['metal','bone'],
                    'accents': ['gemstone','bone'],
                  },
                  'default': 'metal',
                  'restricted': {
                    'metal': ['lead','copper','platinum','steel'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'jeweler',
                    'glass': 'jeweler',
                    'bone': 'jeweler',
                  },
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 33,
                    'parts': ['band'],
                    'method': 'engraved',
                    'min': 1,
                    'max': 1,
                  },
                },
              },
              'link braclet': {
                'count': 1,
                'single':'link braclet',
                'plural':'link braclets',
                'stats': {
                  'type': 'braclet',
                  'value': 2,
                  'armor_class': 0,
                  'weight': 0.5,
                },
                'materials': {
                  'primary': 'band',
                  'required': {
                    'band': ['metal'],
                    'jewels': ['gemstone','glass'],
                  },
                  'default': 'metal',
                  'restricted': {
                    'metal': ['lead','copper','platinum','steel'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'jeweler',
                    'glass': 'jeweler',
                  },
                },
              },
              'beaded braclet': {
                'count': 1,
                'single':'beaded braclet',
                'plural':'beaded braclets',
                'stats': {
                  'type': 'braclet',
                  'value': 2,
                  'armor_class': 0,
                  'weight': 0.5,
                },
                'materials': {
                  'primary': 'beads',
                  'required': {
                    'beads': ['metal','bone','glass','gemstone'],
                    'string': ['cloth'],
                  },
                  'default': 'metal',
                  'restricted': {
                    'metal': ['lead','copper','platinum','steel'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'jeweler',
                    'glass': 'jeweler',
                    'bone': 'jeweler',
                  },
                },
              },
            },
          },
          'torc': {
            'subtype': {
              'torc': {
                'count': 1,
                'single':'torc',
                'plural':'torcs',
                'stats': {
                  'type': 'torc',
                  'value': 10,
                  'armor_class': 0,
                  'weight': 0.5,
                },
                'materials': {
                  'primary': 'ring',
                  'required': {
                    'ring': ['metal'],
                    'terminals': ['metal'],
                  },
                  'optional': {
                    'accents': ['gemstone','bone'],
                  },
                  'default': 'metal',
                  'restricted': {
                    'metal': ['lead','platinum','steel','copper'],
                  },
                  'creation': 'crafted',
                  'maker': {
                    'metal': 'smith',
                  },
                  'extra': ['carving'],
                  'carving': {
                    'chance': 50,
                    'parts': ['terminals'],
                    'shape': [' head'],
                    'path': ['words','engraving','things','person','single'],
                    'count': 1,
                  },
                },
              },
            },
          },
          'scepter': {
            'subtype': {
              'marotte': {
                'count': 1,
                'single':'marotte',
                'plural':'marottes',
                'stats': {
                  'type': 'scepter',
                  'value': 5,
                  'armor_class': 0,
                  'weight': 0.5,
                },
                'materials': {
                  'primary': 'staff',
                  'required': {
                    'staff': ['metal','wood','bone'],
                    'headcap': ['metal','wood','bone'],
                  },
                  'optional': {
                    'wrapping': ['cloth','leather'],
                  },
                  'default': 'metal',
                  'restricted': {
                    'metal': ['lead'],
                  },
                  'extra': ['carving'],
                  'creation': 'created',
                  'maker': {
                    'metal': 'smith',
                    'wood': 'woodworker',
                    'bone': 'bonecarver',
                  },
                  'carving': {
                    'parts': ['headcap'],
                    'shape': ['',' head'],
                    'path': ['words','engraving','things','person','single'],
                    'count': 1,
                  },
                },
              },
              'royal scepter': {
                'count': 1,
                'single':'royal scepter',
                'plural':'royal scepters',
                'stats': {
                  'type': 'scepter',
                  'value': 5,
                  'armor_class': 0,
                  'weight': 0.5,
                },
                'materials': {
                  'primary': 'ornamental staff',
                  'required': {
                    'ornamental staff': ['metal','wood','bone'],
                    'jewel': ['gemstone'],
                  },
                  'optional': {
                    'crest': ['metal','bone'],
                    'accents': ['metal','wood','bone'],
                    'wrapping': ['cloth','leather'],
                    'pommel': ['metal','wood','bone','gemstone'],
                  },
                  'default': 'metal',
                  'restricted': {
                    'metal': ['lead'],
                  },
                  'creation': 'created',
                  'maker': {
                    'metal': 'smith',
                    'wood': 'woodworker',
                    'bone': 'bonecarver',
                  },
                  'extra': ['emblem', 'carving'],
                  'emblem': {
                    'chance': 100,
                    'parts': ['crest'],
                  },
                  'carving': {
                    'parts': ['pommel'],
                    'shape': ['',' head'],
                    'path': ['words','engraving','things','person','single'],
                    'count': 1,
                  },
                },
              },
              'staff of office': {
                'count': 1,
                'single':'staff of office',
                'plural':'staves of office',
                'stats': {
                  'type': 'scepter',
                  'value': 5,
                  'armor_class': 0,
                  'weight': 0.5,
                },
                'materials': {
                  'primary': 'staff',
                  'required': {
                    'staff': ['metal','wood','bone'],
                    'tip': ['metal'],
                  },
                  'optional': {
                    'wrapping': ['cloth','leather'],
                  },
                  'default': 'metal',
                  'restricted': {
                    'metal': ['lead'],
                  },
                  'creation': 'created',
                  'maker': {
                    'metal': 'smith',
                    'wood': 'woodworker',
                    'bone': 'bonecarver',
                  },
                  'extra': ['emblem'],
                  'emblem': {
                    'chance': 100,
                    'parts': ['tip'],
                  },
                },
              },
            }
          },
        },
      },
      'vehicle': {
        'type': {
          'land vehicle': {
            'subtype': {
              'chariot': {
                'count': 1,
                'single':'chariot',
                'plural':'chariots',
                'painted': 50,
                'stats': {
                  'type': 'vehicle',
                  'value': 250,
                  'weight': 100,
                  'description': 'A chariot is a type of carriage driven by a charioteer to provide rapid motive power. Chariots are used by armies as transport or mobile archery platforms, for hunting or for racing, and as a conveniently fast way to travel.'
                },
                'materials': {
                  'primary': 'carriage',
                  'required': {
                    'wheels': {
                      'count': 2,
                      'material': ['wood'],
                    },
                    'carriage': ['wood'],
                    'axle': ['metal', 'wood'],
                    'draught pole': ['wood'],
                    'yoke': ['wood','metal'],
                  },
                  'optional':{
                    'reins': {
                      'count': 2,
                      'material': ['leather'],
                    },
                    'wheel caps': {
                      'count': 2,
                      'material': ['metal'],
                    },
                  },
                  'restricted': {
                    'metal': ['platinum','gold','silver','lead'],
                  },
                  'default': 'wood',
                  'creation': 'built',
                  'maker': {
                    'metal': 'smith',
                    'leather': 'leathercrafter',
                    'cloth': 'artisan',
                    'wood': 'woodworker',
                  },
                },
              },
              'cart': {
                'count': 1,
                'single':'cart',
                'plural':'carts',
                'painted': 33,
                'stats': {
                  'type': 'vehicle',
                  'value': 15,
                  'weight': 200,
                  'description': 'A cart is a vehicle designed for transport, using two wheels and normally pulled by one or a pair of draught animals. A handcart is pulled or pushed by one or more people.'
                },
                'materials': {
                  'primary': 'bed',
                  'required': {
                    'handles': {
                      'count': 2,
                      'material': ['wood'],
                    },
                    'wheels': {
                      'count': 2,
                      'material': ['wood'],
                    },
                    'bed': ['wood'],
                    'axle': ['metal', 'wood'],
                  },
                  'optional':{
                    'bed walls': {
                      'count': 3,
                      'material': ['wood'],
                    },
                    'yoke': ['wood','metal'],
                  },
                  'restricted': {
                    'metal': ['platinum','gold','silver','lead'],
                  },
                  'default': 'wood',
                  'creation': 'built',
                  'maker': {
                    'metal': 'smith',
                    'leather': 'leathercrafter',
                    'cloth': 'artisan',
                    'wood': 'woodworker',
                  },
                },
              },
              'wagon': {
                'count': 1,
                'single':'wagon',
                'plural':'wagons',
                'painted': 33,
                'stats': {
                  'type': 'vehicle',
                  'value': 35,
                  'weight': 400,
                  'description': 'A wagon is a heavy four-wheeled vehicle pulled by draught animals, used for transporting goods, commodities, agricultural materials, supplies and sometimes people.'
                },
                'materials': {
                  'primary': 'bed',
                  'required': {
                    'handles': {
                      'count': 2,
                      'material': ['wood'],
                    },
                    'wheels': {
                      'count': 4,
                      'material': ['wood'],
                    },
                    'bed': ['wood'],
                    'seat': ['wood'],
                    'axles': {
                      'count': 2,
                      'material': ['metal', 'wood'],
                    },
                  },
                  'optional':{
                    'bed walls': {
                      'count': 3,
                      'material': ['wood'],
                    },
                    'yoke': ['wood','metal'],
                  },
                  'restricted': {
                    'metal': ['platinum','gold','silver','lead'],
                  },
                  'default': 'wood',
                  'creation': 'built',
                  'maker': {
                    'metal': 'smith',
                    'leather': 'leathercrafter',
                    'cloth': 'artisan',
                    'wood': 'woodworker',
                  },
                },
              },
              'carriage': {
                'count': 1,
                'single':'carriage',
                'plural':'carriages',
                'painted': 66,
                'stats': {
                  'type': 'vehicle',
                  'value': 100,
                  'weight': 600,
                  'description': 'A carriage is a wheeled vehicle for people, usually horse-drawn. The carriage is especially designed for private passenger use, though some are also used to transport goods.'
                },
                'materials': {
                  'primary': 'body',
                  'required': {
                    'body': ['wood','metal'],
                    'undercarriage': ['wood','metal'],
                    'wheels': {
                      'count': 4,
                      'material': ['wood'],
                    },
                    'draught pole': ['wood'],
                  },
                  'optional':{
                    'hood': ['wood','metal'],
                    'driver\'s seat': ['wood'],
                    'lanterns': {
                      'count': 2,
                      'material': ['metal'],
                    },
                    'reins': {
                      'count': 2,
                      'material': ['leather','cloth'],
                    },
                  },
                  'restricted': {
                    'metal': ['platinum','gold','silver','lead'],
                  },
                  'default': 'wood',
                  'creation': 'built',
                  'maker': {
                    'metal': 'smith',
                    'leather': 'leathercrafter',
                    'cloth': 'artisan',
                    'wood': 'woodworker',
                  },
                },
              },
            }
          },
          // 'sea': {

          // },
        },
      },
      // 'magical': {
      //   'type': {
      //     'Armor': {},
      //     'Potion': {},
      //     'Ring': {},
      //     'Rod': {},
      //     'Scroll': {},
      //     'Staff': {},
      //     'Wand': {},
      //     'Weapon': {},
      //     'Wondrous Item': {},
      //   },
      // }
    },
    'materials': {
      'metal': {
        'copper': {
          'noun': 'copper',
          'plural': 'copper',
          'adjective': 'copper',
          'value': 0.5,
          'weight_multiplier': {
            'iron': 1.14,
            'wood': 12.42,
          }
        },
        'bronze': {
          'noun': 'bronze',
          'plural': 'bronze',
          'adjective': 'bronze',
          'value': 0.8,
          'weight_multiplier': {
            'iron': 1.14,
            'wood': 12.42,
          }
        },
        'silver': {
          'noun': 'silver',
          'plural': 'silver',
          'adjective': 'silver',
          'value': 40,
          'weight_multiplier': {
            'iron': 1.33,
            'wood': 14.56,
          }
        },
        'gold': {
          'noun': 'gold',
          'plural': 'gold',
          'adjective': 'golden',
          'value': 300,
          'weight_multiplier': {
            'iron': 2.46,
            'wood': 26.8,
          }
        },
        'iron': {
          'noun': 'iron',
          'plural': 'iron',
          'adjective': 'iron',
          'value': 1,
          'weight_multiplier': {
            'iron': 1,
            'wood': 10.91,
          }
        },
        'steel': {
          'noun': 'steel',
          'plural': 'steel',
          'adjective': 'steel',
          'value': 10,
          'weight_multiplier': {
            'iron': 1, 
            'wood': 10.91,
          }
        },
        'lead': {
          'noun': 'lead',
          'plural': 'lead',
          'adjective': 'lead',
          'value': 0.2,
          'weight_multiplier': {
            'iron': 1.45,
            'wood': 15.76,
          }
        },
        'platinum': {
          'noun': 'platinum',
          'plural': 'platinum',
          'adjective': 'platinum',
          'value': 300,
          'weight_multiplier': {
            'iron': 2.73,
            'wood': 15.76,
          }
        },
        'mithral': {
          'noun': 'mithral',
          'plural': 'mithral',
          'adjective': 'mithral',
          'value': 1000,
          'weight_multiplier': {
            'iron': 0.25,
            'wood': 2.72,
          }
        },
      },
      'cloth': {
        'canvas': {
          'noun': 'canvas',
          'value': 0.1,
          'weight_multiplier': {
            'cloth': 1,
            'leather': 1.75,
          },
        },
        'burlap':{
          'noun': 'burlap',
          'value': 0.2,
          'weight_multiplier': {
            'cloth': 1,
            'leather': 1.75,
          },
        },
        'hemp':{
          'noun': 'hemp',
          'value': 0.2,
          'weight_multiplier': {
            'cloth': 1,
            'leather': 1.75,
          },
        },
        'linen':{
          'noun': 'linen',
          'weight_multiplier': {
            'cloth': 1,
            'leather': 1.75,
          },
          'value': 8,
        },
        'cotton': {
          'noun': 'cotton',
          'weight_multiplier': {
            'cloth': 1,
            'leather': 1.75,
          },
          'value': 4,
        },
        'wool':{
          'noun': 'wool',
          'weight_multiplier': {
            'cloth': 1,
            'leather': 1.75,
          },
          'value': 1,
        },
        'lace': {
          'noun': 'lace',
          'weight_multiplier': {
            'cloth': 1,
            'leather': 1.75,
          },
          'value': 5,
        },
        'silk':{
          'noun': 'silk',
          'weight_multiplier': {
            'cloth': 1,
            'leather': 1.75,
          },
          'value': 15,
        }
      },
      'leather':{
        'bear':{
          'noun': 'bear leather',
          'value': 4,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'wolf':{
          'noun': 'wolf leather',
          'value': 3,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'fox':{
          'noun': 'fox leather',
          'value': 6,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'panther':{
          'noun': 'panther leather',
          'value': 12,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'lion':{
          'noun': 'lion leather',
          'value': 18,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'cougar':{
          'noun': 'cougar leather',
          'value': 10,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'tiger':{
          'noun': 'tiger leather',
          'value': 18,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'elk':{
          'noun': 'elk leather',
          'value': 3,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'moose':{
          'noun': 'moose leather',
          'value': 3,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'deer':{
          'noun': 'deer leather',
          'value': 1,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'cow':{
          'noun': 'cow leather',
          'value': 0.5,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'ox':{
          'noun': 'ox leather',
          'value': 0.5,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'horse':{
          'noun': 'horse leather',
          'value': 1,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'sheep':{
          'noun': 'sheep leather',
          'value': 0.5,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'goat':{
          'noun': 'goat leather',
          'value': 0.5,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'pig':{
          'noun': 'pig leather',
          'value': 0.5,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'mule':{
          'noun': 'mule leather',
          'value': 1,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'donkey':{
          'noun': 'donkey leather',
          'value': 1,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'squirrel': {
          'noun': 'squirrel leather',
          'value': 0.5,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'elephant': {
          'noun': 'elephant leather',
          'value': 12,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'walrus': {
          'noun': 'walrus leather',
          'value': 10,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'seal': {
          'noun': 'seal leather',
          'value': 8,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'hippo': {
          'noun': 'hippo leather',
          'value': 15,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'cobra': {
          'noun': 'cobra skin',
          'value': 6,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'adder': {
          'noun': 'adder skin',
          'value': 3,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
      },
      'fur': {
        'bear':{
          'noun': 'bear fur',
          'value': 5,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'wolf':{
          'noun': 'wolf fur',
          'value': 3,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'panther':{
          'noun': 'panther fur',
          'value': 8,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'lion':{
          'noun': 'lion fur',
          'value': 10,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'cougar':{
          'noun': 'cougar fur',
          'value': 8,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'yeti':{
          'noun': 'yeti fur',
          'value': 15,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'tiger':{
          'noun': 'tiger fur',
          'value': 10,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'beaver':{
          'noun': 'beaver fur',
          'value': 2,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'badger':{
          'noun': 'badger fur',
          'value': 3,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'bobcat':{
          'noun': 'bobcat fur',
          'value': 3,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'coyote':{
          'noun': 'coyote fur',
          'value': 3,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'lynx':{
          'noun': 'lynx fur',
          'value': 5,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'opossum':{
          'noun': 'opossum fur',
          'value': 2,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'otter':{
          'noun': 'otter fur',
          'value': 5,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'rabbit':{
          'noun': 'rabbit fur',
          'value': 1,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'raccoon':{
          'noun': 'raccoon fur',
          'value': 1,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'skunk':{
          'noun': 'skunk fur',
          'value': 2,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'squirrel':{
          'noun': 'squirrel fur',
          'value': 1,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'weasel':{
          'noun': 'weasel fur',
          'value': 1,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
        'wolverine': {
          'noun': 'wolverine fur',
          'value': 3,
          'weight_multiplier': {
            'iron': 8.7,
            'cloth': 0.57,
            'leather': 1,
          },
        },
      },
      'wood': {
        'oak':{
          'noun': 'oak',
          'value': 0.15,
          'weight_multiplier': {
            'iron': 0.09,
            'wood': 1,
          },
        },
        'pine':{
          'noun': 'pine',
          'value': 0.15,
          'weight_multiplier': {
            'iron': 0.09,
            'wood': 1,
          },
        },
        'beech':{
          'noun': 'beech',
          'value': 0.15,
          'weight_multiplier': {
            'iron': 0.09,
            'wood': 1,
          },
        },
        'spruce':{
          'noun': 'spruce',
          'value': 0.15,
          'weight_multiplier': {
            'iron': 0.09,
            'wood': 1,
          },
        },
        'maple':{
          'noun': 'maple',
          'value': 0.15,
          'weight_multiplier': {
            'iron': 0.09,
            'wood': 1,
          },
        },
        'elm':{
          'noun': 'elm',
          'value': 0.15,
          'weight_multiplier': {
            'iron': 0.09,
            'wood': 1,
          },
        },
        'palm':{
          'noun': 'palm',
          'value': 0.15,
          'weight_multiplier': {
            'iron': 0.09,
            'wood': 1,
          },
        },
        'apple':{
          'noun': 'apple',
          'value': 0.15,
          'weight_multiplier': {
            'iron': 0.09,
            'wood': 1,
          },
        },
        'poplar':{
          'noun': 'poplar',
          'value': 0.15,
          'weight_multiplier': {
            'iron': 0.09,
            'wood': 1,
          },
        },
        'hornbeam':{
          'noun': 'hornbeam',
          'value': 0.15,
          'weight_multiplier': {
            'iron': 0.09,
            'wood': 1,
          },
        },
        'yew':{
          'noun': 'yew',
          'value': 0.15,
          'weight_multiplier': {
            'iron': 0.09,
            'wood': 1,
          },
        },
        'chestnut':{
          'noun': 'chestnut',
          'value': 0.15,
          'weight_multiplier': {
            'iron': 0.09,
            'wood': 1,
          },
        },
        'willow':{
          'noun': 'willow',
          'value': 0.15,
          'weight_multiplier': {
            'iron': 0.09,
            'wood': 1,
          },
        },
        'ash':{
          'noun': 'ash',
          'value': 0.15,
          'weight_multiplier': {
            'iron': 0.09,
            'wood': 1,
          },
        },
        'alder':{
          'noun': 'alder',
          'value': 0.15,
          'weight_multiplier': {
            'iron': 0.09,
            'wood': 1,
          },
        },
        'cypress':{
          'noun': 'cypress',
          'value': 0.15,
          'weight_multiplier': {
            'iron': 0.09,
            'wood': 1,
          },
        },
        'cherry':{
          'noun': 'cherry',
          'value': 0.15,
          'weight_multiplier': {
            'iron': 0.09,
            'wood': 1,
          },
        },
        'cedar':{
          'noun': 'cedar',
          'value': 0.15,
          'weight_multiplier': {
            'iron': 0.09,
            'wood': 1,
          },
        },
        'mahogany':{
          'noun': 'mahogany',
          'value': 0.15,
          'weight_multiplier': {
            'iron': 0.09,
            'wood': 1,
          },
        },
        'holly':{
          'noun': 'holly',
          'value': 0.15,
          'weight_multiplier': {
            'iron': 0.09,
            'wood': 1,
          },
        },
        'vine':{
          'noun': 'vine',
          'value': 0.15,
          'weight_multiplier': {
            'iron': 0.09,
            'wood': 1,
          },
        },
        'blackthorn':{
          'noun': 'blackthorn',
          'value': 0.15,
          'weight_multiplier': {
            'iron': 0.09,
            'wood': 1,
          },
        },
        'larch':{
          'noun': 'larch',
          'value': 0.15,
          'weight_multiplier': {
            'iron': 0.09,
            'wood': 1,
          },
        },
        'elder':{
          'noun': 'elder',
          'value': 0.15,
          'weight_multiplier': {
            'iron': 0.09,
            'wood': 1,
          },
        },
      },
      'flowers': {
        'rose':{
          'noun': 'rose',
          'value': 0.01,
        },
        'tulip':{
          'noun': 'tulip',
          'value': 0.01,
        },
        'daffodil':{
          'noun': 'daffodil',
          'value': 0.01,
        },
        'daisy':{
          'noun': 'daisy',
          'value': 0.01,
        },
        'buttercup':{
          'noun': 'buttercup',
          'value': 0.01,
        },
        'sunflower':{
          'noun': 'sunflower',
          'value': 0.01,
        },
        'hibiscus':{
          'noun': 'hibiscus flower',
          'value': 0.01,
        },
        'guzmania':{
          'noun': 'guzmania flower',
          'value': 0.01,
        },
        'iris':{
          'noun': 'iris flower',
          'value': 0.01,
        },
        'anthurium':{
          'noun': 'anthurium flower',
          'value': 0.01,
        },
        'lavender':{
          'noun': 'lavender',
          'value': 0.01,
        },
        'tiger lilly':{
          'noun': 'tiger lilly',
          'value': 0.01,
        }
      },
      'stone': {
        'marble':{
          'noun': 'marble',
          'value': 1,
          'weight_multiplier': {
            'iron': 0.35,
            'wood': 3.78,
          },
        },
        'chert':{
          'noun': 'chert',
          'value': 0.2,
          'weight_multiplier': {
            'iron': 0.35,
            'wood': 3.78,
          },
        },
        'gneiss':{
          'noun': 'gneiss',
          'value': 0.3,
          'weight_multiplier': {
            'iron': 0.35,
            'wood': 3.78,
          },
        },
        'granite':{
          'noun': 'granite',
          'value': 0.35,
          'weight_multiplier': {
            'iron': 0.35,
            'wood': 3.78,
          },
        },
        'sandstone':{
          'noun': 'sandstone',
          'value': 0.3,
          'weight_multiplier': {
            'iron': 0.35,
            'wood': 3.78,
          },
        },
        'gabbro':{
          'noun': 'gabbro',
          'value': 0.2,
          'weight_multiplier': {
            'iron': 0.35,
            'wood': 3.78,
          },
        },
        'dolomite':{
          'noun': 'dolomite',
          'value': 0.2,
          'weight_multiplier': {
            'iron': 0.35,
            'wood': 3.78,
          },
        },
        'basalt':{
          'noun': 'basalt',
          'value': 0.2,
          'weight_multiplier': {
            'iron': 0.35,
            'wood': 3.78,
          },
        },
        'diorite':{
          'noun': 'diorite',
          'value': 0.3,
          'weight_multiplier': {
            'iron': 0.35,
            'wood': 3.78,
          },
        },
        'limestone':{
          'noun': 'palm',
          'value': 0.5,
          'weight_multiplier': {
            'iron': 0.35,
            'wood': 3.78,
          },
        },
        'schist':{
          'noun': 'schist',
          'value': 0.2,
          'weight_multiplier': {
            'iron': 0.35,
            'wood': 3.78,
          },
        },
        'slate':{
          'noun': 'slate',
          'value': 0.3,
          'weight_multiplier': {
            'iron': 0.35,
            'wood': 3.78,
          },
        }
      },
      'gemstone': {
        'diamond':{
          'noun': 'diamond',
          'plural': 'diamonds',
          'value': 5000,
        },
        'star ruby':{
          'noun': 'star ruby',
          'plural': 'star rubies',
          'value': 1000,
        },
        'topaz':{
          'noun': 'topaz',
          'plural': 'topaz',
          'value': 500,
        },
        'emerald':{
          'noun': 'emerald',
          'plural': 'emeralds',
          'value': 1000,
        },
        'sapphire':{
          'noun': 'sapphire',
          'plural': 'sapphires',
          'value': 1000,
        },
        'amethyst':{
          'noun': 'amethyst',
          'plural': 'amethysts',
          'value': 100,
        },
        'onyx':{
          'noun': 'onyx',
          'plural': 'onyx',
          'value': 50,
        },
        'jade':{
          'noun': 'jade',
          'plural': 'jade',
          'value': 100,
        },
        'fire opal':{
          'noun': 'fire opal',
          'plural': 'fire opals',
          'value': 1000,
        },
        'citrine':{
          'noun': 'citrine',
          'plural': 'citrine',
          'value': 50,
        },
        'jasper':{
          'noun': 'jasper',
          'plural': 'jasper',
          'value': 50,
        },
        'moonstone':{
          'noun': 'moonstone',
          'plural': 'moonstones',
          'value': 50,
        },
        'zircon':{
          'noun': 'zircon',
          'plural': 'zircons',
          'value': 50,
        },
        'peridot':{
          'noun': 'peridot',
          'plural': 'peridot',
          'value': 50,
        },
        'garnet':{
          'noun': 'garnet',
          'plural': 'garnet',
          'value': 100,
        },
        'citrine':{
          'noun': 'citrine',
          'plural': 'citrines',
          'value': 50,
        },
        'bloodstone':{
          'noun': 'bloodstone',
          'plural': 'bloodstones',
          'value': 50,
        },
        'tiger eye turquoise':{
          'noun': 'tiger eye turquoise',
          'plural': 'tiger eye turquoise',
          'value': 10,
        },
        'azurite':{
          'noun': 'azurite',
          'plural': 'azurite',
          'value': 10,
        },
        'moss agate':{
          'noun': 'moss agate',
          'plural': 'moss agate',
          'value': 10,
        }
      },
      'glass': {
        'green':{
          'noun': 'green glass',
          'plural': 'green glass',
          'value': 1
        },
        'clear':{
          'noun': 'clear glass',
          'plural': 'clear glass',
          'value': 10
        },
        'crystal':{
          'noun': 'crystal glass',
          'plural': 'crystal glass',
          'value': 5
        }
      },
      'bone': {
        'dragon':{
          'noun': 'dragon bone',
          'plural': 'dragon bones',
          'magical': true,
          'value': 250
        },
        'unicorn':{
          'noun': 'unicorn bone',
          'plural': 'unicorn bones',
          'magical': true,
          'value': 250
        },
        'troll':{
          'noun': 'troll bone',
          'plural': 'troll bones',
          'magical': true,
          'value': 25
        },
        'chimera':{
          'noun': 'chimera bone',
          'plural': 'chimera bones',
          'magical': true,
          'value': 100
        },
        'pegasus':{
          'noun': 'pegasus bone',
          'plural': 'pegasus bones',
          'magical': true,
          'value': 100
        },
        'basilisk':{
          'noun': 'basilisk bone',
          'plural': 'basilisk bones',
          'magical': true,
          'value': 50
        },
        'cockatrice':{
          'noun': 'cockatrice bone',
          'plural': 'cockatrice bones',
          'magical': true,
          'value': 50
        },
        'hydra':{
          'noun': 'hydra bone',
          'plural': 'hydra bones',
          'magical': true,
          'value': 100
        },
        'griffon':{
          'noun': 'griffon bone',
          'plural': 'griffon bones',
          'magical': true,
          'value': 50
        },
        'manticore':{
          'noun': 'manticore bone',
          'plural': 'manticore bones',
          'magical': true,
          'value': 100
        },
        'owlbear':{
          'noun': 'owlbear bone',
          'plural': 'owlbear bones',
          'magical': true,
          'value': 50
        },
        'worg':{
          'noun': 'worg bone',
          'plural': 'worg bones',
          'magical': true,
          'value': 10,
        },
        'bear':{
          'noun': 'bear bone',
          'plural': 'bear bones',
          'magical': false,
          'value': 1
        },
        'boar':{
          'noun': 'boar bone',
          'plural': 'boar bones',
          'magical': false,
          'value': 1
        },
        'badger':{
          'noun': 'badger bone',
          'plural': 'badger bones',
          'magical': false,
          'value': 1
        },
        'camel':{
          'noun': 'camel bone',
          'plural': 'camel bones',
          'magical': false,
          'value': 1
        },
        'crocodile':{
          'noun': 'crocodile bone',
          'plural': 'crocodile bones',
          'magical': false,
          'value': 1
        },
        'donkey':{
          'noun': 'donkey bone',
          'plural': 'donkey bones',
          'magical': false,
          'value': 1
        },
        'dog':{
          'noun': 'boar bone',
          'plural': 'boar bones',
          'magical': false,
          'value': 1
        },
        'eagle':{
          'noun': 'eagle bone',
          'plural': 'eagle bones',
          'magical': false,
          'value': 1
        },
        'elephant':{
          'noun': 'elephant bone',
          'plural': 'elephant bones',
          'magical': false,
          'value': 1
        },
        'hawk':{
          'noun': 'hawk bone',
          'plural': 'hawk bones',
          'magical': false,
          'value': 1
        },
        'horse':{
          'noun': 'horse bone',
          'plural': 'horse bones',
          'magical': false,
          'value': 1
        },
        'hyena':{
          'noun': 'hyena bone',
          'plural': 'hyena bones',
          'magical': false,
          'value': 1
        },
        'leopard':{
          'noun': 'leopard bone',
          'plural': 'leopard bones',
          'magical': false,
          'value': 1
        },
        'lion':{
          'noun': 'lion bone',
          'plural': 'lion bones',
          'magical': false,
          'value': 1
        },
        'mule':{
          'noun': 'mule bone',
          'plural': 'mule bones',
          'magical': false,
          'value': 1
        },
        'monkey':{
          'noun': 'monkey bone',
          'plural': 'monkey bones',
          'magical': false,
          'value': 1
        },
        'mule':{
          'noun': 'mule bone',
          'plural': 'mule bones',
          'magical': false,
          'value': 1
        },
        'owl':{
          'noun': 'owl bone',
          'plural': 'owl bones',
          'magical': false,
          'value': 1
        },
        'raven':{
          'noun': 'raven bone',
          'plural': 'raven bones',
          'magical': false,
          'value': 1
        },
        'tiger':{
          'noun': 'tiger bone',
          'plural': 'tiger bones',
          'magical': false,
          'value': 1
        },
        'vulture':{
          'noun': 'vulture bone',
          'plural': 'vulture bones',
          'magical': false,
          'value': 1
        },
        'wolf':{
          'noun': 'wolf bone',
          'plural': 'wolf bones',
          'magical': false,
          'value': 1
        },
        'wolverine':{
          'noun': 'wolverine bone',
          'plural': 'wolverine bones',
          'magical': false,
          'value': 1
        },
        'weasel':{
          'noun': 'weasel bone',
          'plural': 'weasel bones',
          'magical': false,
          'value': 1
        },
        'snake':{
          'noun': 'snake bone',
          'plural': 'snake bones',
          'magical': false,
          'value': 1
        },
        'orc':{
          'noun': 'orc bone',
          'plural': 'orc bones',
          'magical': false,
          'value': 1
        },
        'human':{
          'noun': 'human bone',
          'plural': 'human bones',
          'magical': false,
          'value': 1
        },
        'elf':{
          'noun': 'elf bone',
          'plural': 'elf bones',
          'magical': false,
          'value': 1
        },
        'dwarf':{
          'noun': 'dwarf bone',
          'plural': 'dwarf bones',
          'magical': false,
          'value': 1
        },
        'halfling':{
          'noun': 'halfling bone',
          'plural': 'halfling bones',
          'magical': false,
          'value': 1
        },
        'gnome':{
          'noun': 'gnome bone',
          'plural': 'gnome bones',
          'magical': false,
          'value': 1
        },
        'tiefling':{
          'noun': 'tiefling bone',
          'plural': 'tiefling bones',
          'magical': false,
          'value': 1
        },
        'dragonborn':{
          'noun': 'dragonborn bone',
          'plural': 'dragonborn bones',
          'magical': false,
          'value': 1
        },
        'demon':{
          'noun': 'demon bone',
          'plural': 'demon bones',
          'magical': false,
          'value': 1
        },
        'goblin':{
          'noun': 'goblin bone',
          'plural': 'goblin bones',
          'magical': false,
          'value': 1
        },
        'giant':{
          'noun': 'giant bone',
          'plural': 'giant bones',
          'magical': false,
          'value': 1
        },
        'ogre':{
          'noun': 'ogre bone',
          'plural': 'ogre bones',
          'magical': false,
          'value': 1
        },
      },
      'magical': {
        'phoenix feather': {
          'noun': 'phoenix feather',
          'plural': 'phoenix feathers',
          'value': 1000,
        },
        'dragon heartstring': {
          'noun': 'dragon heartstring',
          'plural': 'dragon heartstrings',
          'value': 1000,
        },
        'dragon eye': {
          'noun': 'dragon eye',
          'plural': 'dragon eyes',
          'value': 800,
        },
        'dragon sinew': {
          'noun': 'dragon sinew',
          'plural': 'dragon sinews',
          'value': 300,
        },
        'dragon scale': {
          'noun': 'dragon scale',
          'plural': 'dragon scales',
          'value': 250,
        },
        'dragon tooth': {
          'noun': 'dragon tooth',
          'plural': 'dragon teeth',
          'value': 300,
        },
        'dragon claw': {
          'noun': 'dragon claw',
          'plural': 'dragon claws',
          'value': 300,
        },
        'unicorn horn': {
          'noun': 'unicorn horn',
          'plural': 'unicorn horns',
          'value': 2500,
        },        
        'unicorn hair': {
          'noun': 'unicorn hair',
          'plural': 'unicorn hairs',
          'value': 600,
        },
        'basilisk eye': {
          'noun': 'basilisk eye',
          'plural': 'basilisk eyes',
          'value': 150,
        },
        'basilisk horn': {
          'noun': 'basilisk horn',
          'plural': 'basilisk horns',
          'value': 150,
        },    
        'troll fang': {
          'noun': 'troll fang',
          'plural': 'troll fangs',
          'value': 50,
        },
        'cockatrice eye': {
          'noun': 'cockatrice eye',
          'plural': 'cockatrice eyes',
          'value': 75,
        },
        'cockatrice scale': {
          'noun': 'cockatrice scale',
          'plural': 'cockatrice scales',
          'value': 25,
        },
        'chimera fang': {
          'noun': 'chimera fang',
          'plural': 'chimera fang',
          'value': 250,
        },
        'chimera fang': {
          'noun': 'chimera scale',
          'plural': 'chimera scales',
          'value': 250,
        },
        'pegasus feather': {
          'noun': 'pegasus feather',
          'plural': 'pegasus feathers',
          'value': 250,
        },
        'griffon feather': {
          'noun': 'griffon feather',
          'plural': 'griffon feathers',
          'value': 150,
        },
        'hydra eye': {
          'noun': 'hydra eye',
          'plural': 'hydra eyes',
          'value': 250,
        },
        'hydra scale': {
          'noun': 'hydra scale',
          'plural': 'hydra scales',
          'value': 150,
        },
        'hydra tongue': {
          'noun': 'hydra tongue',
          'plural': 'hydra tongues',
          'value': 275,
        },
      },
      'horn': {
        'dragon horn': {
          'noun': 'dragon horn',
          'plural': 'dragon horns',
          'value': 1000,
        },
        'drake horn': {
          'noun': 'drake horn',
          'plural': 'drake horns',
          'value': 100,
        },
        'unicorn horn': {
          'noun': 'unicorn horn',
          'plural': 'unicorn horns',
          'value': 2500,
        }, 
        'oni horn': {
          'noun': 'oni horn',
          'plural': 'oni horns',
          'value': 400,
        }, 
        'satyr horn': {
          'noun': 'satyr horn',
          'plural': 'satyr horns',
          'value': 250,
        }, 
        'minotaur horn': {
          'noun': 'minotaur horn',
          'plural': 'minotaur horns',
          'value': 100,
        },
        'basilisk horn': {
          'noun': 'basilisk horn',
          'plural': 'basilisk horns',
          'value': 150,
        },
        'yeti horn': {
          'noun': 'yeti horn',
          'plural': 'yeti horns',
          'value': 80,
        },
        'devil horn': {
          'noun': 'devil horn',
          'plural': 'devil horns',
          'value': 200,
        },
        'kobold horn': {
          'noun': 'kobold horn',
          'plural': 'kobold horns',
          'value': 1,
        },
        'bull horn': {
          'noun': 'bull horn',
          'plural': 'bull horns',
          'value': 2,
        },
        'goat horn': {
          'noun': 'goat horn',
          'plural': 'goat horns',
          'value': 2,
        },
        'buffalo horn': {
          'noun': 'buffalo horn',
          'plural': 'buffalo horns',
          'value': 3,
        },
        'ox horn': {
          'noun': 'ox horn',
          'plural': 'ox horns',
          'value': 3,
        },
        'gazelle horn': {
          'noun': 'gazelle horn',
          'plural': 'gazelle horns',
          'value': 5,
        },
        'antelope horn': {
          'noun': 'antelope horn',
          'plural': 'antelope horns',
          'value': 3,
        },
        'ibex horn': {
          'noun': 'ibex horn',
          'plural': 'ibex horns',
          'value': 3,
        },
        'wildebeest horn': {
          'noun': 'wildebeest horn',
          'plural': 'wildebeest horns',
          'value': 7,
        },
        'kudu horn': {
          'noun': 'kudu horn',
          'plural': 'kudu horns',
          'value': 5,
        },
      },
      'feather': {
        'phoenix feather': {
          'noun': 'phoenix feather',
          'plural': 'phoenix feathers',
          'value': 1000,
        },
        'cockatrice feather': {
          'noun': 'cockatrice feather',
          'plural': 'cockatrice feathers',
          'value': 25,
        },
        'pegasus feather': {
          'noun': 'pegasus feather',
          'plural': 'pegasus feathers',
          'value': 250,
        },
        'griffon feather': {
          'noun': 'griffon feather',
          'plural': 'griffon feathers',
          'value': 150,
        },
        'crow': {
          'noun': 'crow feather',
          'plural': 'crow feathers',
          'value': 2,
        },
        'raven': {
          'noun': 'raven feather',
          'plural': 'raven feathers',
          'value': 2,
        },
        'hawk': {
          'noun': 'hawk feather',
          'plural': 'hawk feathers',
          'value': 2,
        },
        'eagle': {
          'noun': 'eagle feather',
          'plural': 'eagle feathers',
          'value': 2,
        },
        'vulture': {
          'noun': 'vulture feather',
          'plural': 'vulture feathers',
          'value': 2,
        },
        'goose': {
          'noun': 'goose feather',
          'plural': 'goose feathers',
          'value': 4,
        },
        'swan': {
          'noun': 'swan feather',
          'plural': 'swan feathers',
          'value': 6,
        },
        'turkey': {
          'noun': 'turkey feather',
          'plural': 'turkey feathers',
          'value': 2,
        },
        'owl': {
          'noun': 'owl feather',
          'plural': 'owl feathers',
          'value': 2,
        },
        'duck': {
          'noun': 'duck feather',
          'plural': 'duck feathers',
          'value': 2,
        },
        'albatross': {
          'noun': 'albatross feather',
          'plural': 'albatross feathers',
          'value': 4,
        },
        'gull': {
          'noun': 'gull feather',
          'plural': 'gull feathers',
          'value': 1,
        },
        'ostrich': {
          'noun': 'ostrich feather',
          'plural': 'ostrich feathers',
          'value': 1,
        },
      },
      'clay': {
        'earthenware': {
          'noun': 'earthenware',
          'plural': 'earthenwares',
          'value': 0.1,
        },
        'stoneware': {
          'noun': 'stoneware',
          'plural': 'stonewares',
          'value': 0.1,
        },
        'kaolin': {
          'noun': 'kaolin',
          'plural': 'kaolins',
          'value': 1,
        },
        'ball clay': {
          'noun': 'ball clay',
          'plural': 'ball clays',
          'value': 0.1,
        },
        'fire clay': {
          'noun': 'fire clay',
          'plural': 'fire clays',
          'value': 0.1,
        },
      },
      'magic': {
        'magic' :{
          'noun': 'magical enchantment',
          'plural': 'magical enchantments',
          'value': 0,
        }
      },
      "meat": {
        'beef' :{
          'noun': 'beef',
          'plural': 'beef',
          'value': 0.1,
        },
        'pork shoulder' :{
          'noun': 'pork shoulder',
          'plural': 'pork shoulders',
          'value': 0.05,
        },
        'pork loin' :{
          'noun': 'pork loin',
          'plural': 'pork loins',
          'value': 0.05,
        },
        'mutton' :{
          'noun': 'mutton',
          'plural': 'mutton',
          'value': 0.06,
        },
        'chicken breast' :{
          'noun': 'chicken breast',
          'plural': 'chicken breasts',
          'value': 0.03,
        },
        'chicken thigh' :{
          'noun': 'chicken thigh',
          'plural': 'chicken thighs',
          'value': 0.03,
        },
        'turkey breast' :{
          'noun': 'turkey breast',
          'plural': 'turkey breasts',
          'value': 0.03,
        },
        'turkey leg' :{
          'noun': 'turkey leg',
          'plural': 'turkey legs',
          'value': 0.03,
        },
        'duck breast' :{
          'noun': 'duck breast',
          'plural': 'duck breasts',
          'value': 0.04,
        },
        'quail' :{
          'noun': 'quail',
          'plural': 'quail',
          'value': 0.08,
        },
        'pheasant' :{
          'noun': 'pheasant',
          'plural': 'pheasant',
          'value': 0.08,
        },
        'venison' :{
          'noun': 'venison',
          'plural': 'venison',
          'value': 0.12,
        },
        'bacon' :{
          'noun': 'bacon',
          'plural': 'bacon',
          'value': 0.03,
        },
        'sausage' :{
          'noun': 'sausage',
          'plural': 'sausage',
          'value': 0.04,
        },
      },
      "fish": {
        'salmon' :{
          'noun': 'salmon',
          'plural': 'salmon',
          'value': 0.06,
        },
        'trout' :{
          'noun': 'trout',
          'plural': 'trout',
          'value': 0.05,
        },
        'bass' :{
          'noun': 'bass',
          'plural': 'bass',
          'value': 0.03,
        },
        'catfish' :{
          'noun': 'catfish',
          'plural': 'catfish',
          'value': 0.03,
        },
        'pike' :{
          'noun': 'pike',
          'plural': 'pike',
          'value': 0.04,
        },
        'carp' :{
          'noun': 'carp',
          'plural': 'carp',
          'value': 0.03,
        },
        'sturgeon' :{
          'noun': 'sturgeon',
          'plural': 'sturgeon',
          'value': 0.05,
        },
        'perch' :{
          'noun': 'perch',
          'plural': 'perch',
          'value': 0.03,
        },
        'eel' :{
          'noun': 'eel',
          'plural': 'eel',
          'value': 0.03,
        },
        'bream' :{
          'noun': 'bream',
          'plural': 'bream',
          'value': 0.04,
        },
        'rudd' :{
          'noun': 'rudd',
          'plural': 'rudd',
          'value': 0.03,
        },
        'walleye' :{
          'noun': 'walleye',
          'plural': 'walleye',
          'value': 0.03,
        },
      },
      "bread":{
        "manchet":{
          "noun": "manchet",
          "plural": "manchet",
          "value": 0.02,
        },
        "oatcake":{
          "noun": "oatcake",
          "plural": "oatcakes",
          "value": 0.02,
        },
        "rye bread":{
          "noun": "rye bread",
          "plural": "rye bread",
          "value": 0.02,
        },
        "wheat bread":{
          "noun": "wheat bread",
          "plural": "wheat bread",
          "value": 0.02,
        },
        "oat bread":{
          "noun": "oat bread",
          "plural": "oat bread",
          "value": 0.02,
        },        
        "barley bread":{
          "noun": "barley bread",
          "plural": "barley bread",
          "value": 0.02,
        },
        "oat biscuits":{
          "noun": "oat biscuit",
          "plural": "oat biscuits",
          "value": 0.02,
        },
        "rye biscuits":{
          "noun": "rye biscuit",
          "plural": "rye biscuits",
          "value": 0.02,
        },
        "wheat biscuits":{
          "noun": "wheat biscuit",
          "plural": "wheat biscuits",
          "value": 0.02,
        },
        "barley biscuits":{
          "noun": "barley biscuit",
          "plural": "barley biscuits",
          "value": 0.02,
        },
      },
      "eggs": {
        'chicken eggs' :{
          'noun': 'chicken egg',
          'plural': 'chicken eggs',
          'value': 0.01,
        },
        'turkey eggs' :{
          'noun': 'turkey egg',
          'plural': 'turkey eggs',
          'value': 0.01,
        },
        'duck eggs' :{
          'noun': 'duck egg',
          'plural': 'duck eggs',
          'value': 0.01,
        },
        'quail eggs' :{
          'noun': 'quail egg',
          'plural': 'quail eggs',
          'value': 0.02,
        },
        'pheasant eggs' :{
          'noun': 'pheasant egg',
          'plural': 'pheasant eggs',
          'value': 0.02,
        },
      },
      "cheese": {
        "soft cheese":{
          'noun': 'soft cheese',
          'plural': 'soft cheeses',
          'value': 0.03,
        },
        "sharp cheese":{
          'noun': 'sharp cheese',
          'plural': 'sharp cheeses',
          'value': 0.03,
        },
        "cheese curds":{
          'noun': 'cheese curd',
          'plural': 'cheese curds',
          'value': 0.03,
        },
        "hard cheese":{
          'noun': 'hard cheese',
          'plural': 'hard cheeses',
          'value': 0.03,
        },
        "blue cheese":{
          'noun': 'blue cheese',
          'plural': 'blue cheeses',
          'value': 0.03,
        },
        "goat cheese":{
          'noun': 'goat cheese',
          'plural': 'goat cheeses',
          'value': 0.03,
        },
        "buffalo cheese":{
          'noun': 'buffalo cheese',
          'plural': 'buffalo cheeses',
          'value': 0.03,
        },
      },
      "greens": {
        'kale' :{
          'noun': 'kale',
          'plural': 'kale',
          'value': 0.02,
        },
        'chard' :{
          'noun': 'chard',
          'plural': 'chard',
          'value': 0.02,
        },
        'spinach' :{
          'noun': 'spinach',
          'plural': 'spinach',
          'value': 0.02,
        },
        'mixed greens' :{
          'noun': 'mixed greens',
          'plural': 'mixed greens',
          'value': 0.02,
        },
        'fennel' :{
          'noun': 'fennel',
          'plural': 'fennel',
          'value': 0.02,
        },
        'cress' :{
          'noun': 'cress',
          'plural': 'cress',
          'value': 0.02,
        },
        'chicory' :{
          'noun': 'chicory',
          'plural': 'chicory',
          'value': 0.02,
        },
        'leeks' :{
          'noun': 'leeks',
          'plural': 'leeks',
          'value': 0.02,
        },
        'sorrel' :{
          'noun': 'sorrel',
          'plural': 'sorrel',
          'value': 0.02,
        },
        'celery' :{
          'noun': 'celery',
          'plural': 'celery',
          'value': 0.02,
        },
        'cabbage' :{
          'noun': 'cabbage',
          'plural': 'cabbage',
          'value': 0.02,
        },
        'lettuce' :{
          'noun': 'lettuce',
          'plural': 'lettuce',
          'value': 0.02,
        },
      },
      "fruit": {
        'apple' :{
          'noun': 'apple',
          'plural': 'apples',
          'value': 0.02,
        },
        'pear' :{
          'noun': 'pear',
          'plural': 'pears',
          'value': 0.02,
        },
        'orange' :{
          'noun': 'orange',
          'plural': 'oranges',
          'value': 0.02,
        },
        'cherry' :{
          'noun': 'cherry',
          'plural': 'cherries',
          'value': 0.02,
        },
        'grape' :{
          'noun': 'grape',
          'plural': 'grapes',
          'value': 0.02,
        },
        'banana' :{
          'noun': 'banana',
          'plural': 'bananas',
          'value': 0.02,
        },
        'banana' :{
          'noun': 'banana',
          'plural': 'bananas',
          'value': 0.02,
        },
        'blueberry' :{
          'noun': 'blueberry',
          'plural': 'blueberries',
          'value': 0.02,
        },
        'strawberry' :{
          'noun': 'strawberry',
          'plural': 'strawberries',
          'value': 0.02,
        },
        'raspberry' :{
          'noun': 'raspberry',
          'plural': 'raspberries',
          'value': 0.02,
        },
        'blackberry' :{
          'noun': 'blackberry',
          'plural': 'blackberries',
          'value': 0.02,
        },
        'fig' :{
          'noun': 'fig',
          'plural': 'figs',
          'value': 0.02,
        },
        'melon' :{
          'noun': 'melon',
          'plural': 'melons',
          'value': 0.02,
        },
        'guava' :{
          'noun': 'guava',
          'plural': 'guava',
          'value': 0.02,
        },
        'lemon' :{
          'noun': 'lemon',
          'plural': 'lemons',
          'value': 0.02,
        },
        'lime' :{
          'noun': 'lime',
          'plural': 'limes',
          'value': 0.02,
        },
        'pomegranate' :{
          'noun': 'pomegranate',
          'plural': 'pomegranates',
          'value': 0.02,
        },
        'cranberry' :{
          'noun': 'cranberry',
          'plural': 'cranberries',
          'value': 0.02,
        },
        'date' :{
          'noun': 'date',
          'plural': 'dates',
          'value': 0.02,
        },
      },
      "vegetable": {
        'tomatoes' :{
          'noun': 'tomato',
          'plural': 'tomatoes',
          'value': 0.02,
        },
        'carrots' :{
          'noun': 'carrot',
          'plural': 'carrots',
          'value': 0.02,
        },
        'parsnips' :{
          'noun': 'parsnip',
          'plural': 'parsnips',
          'value': 0.02,
        },
        'beets' :{
          'noun': 'beet',
          'plural': 'beets',
          'value': 0.02,
        },
        'radishes' :{
          'noun': 'radish',
          'plural': 'radishes',
          'value': 0.02,
        },
        'peas' :{
          'noun': 'pea',
          'plural': 'peas',
          'value': 0.02,
        },
        'green beans' :{
          'noun': 'green bean',
          'plural': 'green beans',
          'value': 0.02,
        },
        'cucumbers' :{
          'noun': 'cucumber',
          'plural': 'cucumbers',
          'value': 0.02,
        },
        'onions' :{
          'noun': 'onion',
          'plural': 'onions',
          'value': 0.02,
        },
        'sweet peppers' :{
          'noun': 'sweet pepper',
          'plural': 'sweet peppers',
          'value': 0.02,
        },
        'hot peppers' :{
          'noun': 'hot pepper',
          'plural': 'hot peppers',
          'value': 0.02,
        },
        'eggplant' :{
          'noun': 'eggplant',
          'plural': 'eggplant',
          'value': 0.02,
        },
        'cauliflower' :{
          'noun': 'cauliflower',
          'plural': 'cauliflower',
          'value': 0.02,
        },
        'broccoli' :{
          'noun': 'broccoli',
          'plural': 'broccoli',
          'value': 0.02,
        },
      },
      "grain": {
        'rice' :{
          'noun': 'rice',
          'plural': 'rice',
          'value': 0.02,
        },
        'quinoa' :{
          'noun': 'quinoa',
          'plural': 'quinoa',
          'value': 0.02,
        },
        'millet' :{
          'noun': 'millet',
          'plural': 'millet',
          'value': 0.02,
        },
        'quinoa' :{
          'noun': 'quinoa',
          'plural': 'quinoa',
          'value': 0.02,
        },
        'chickpea' :{
          'noun': 'chickpea',
          'plural': 'chickpeas',
          'value': 0.02,
        },
        'black beans' :{
          'noun': 'black bean',
          'plural': 'black beans',
          'value': 0.02,
        },
        'soybeans' :{
          'noun': 'soybean',
          'plural': 'soybeans',
          'value': 0.02,
        },
        'maize' :{
          'noun': 'maize',
          'plural': 'maize',
          'value': 0.02,
        },
      },
      "stock":{
        'chicken stock' :{
          'noun': 'chicken stock',
          'plural': 'chicken stock',
          'value': 0.02,
        },
        'fish stock' :{
          'noun': 'fish stock',
          'plural': 'fish stock',
          'value': 0.02,
        },
        'lamb stock' :{
          'noun': 'lamb stock',
          'plural': 'lamb stock',
          'value': 0.02,
        },
        'vegetable stock' :{
          'noun': 'vegetable stock',
          'plural': 'vegetable stock',
          'value': 0.02,
        },
      },
      "spice":{
        'black pepper' :{
          'noun': 'black pepper',
          'plural': 'black pepper',
          'value': 0.05,
        },
        'mustard' :{
          'noun': 'mustard',
          'plural': 'mustard',
          'value': 0.05,
        },
        'nutmeg' :{
          'noun': 'nutmeg',
          'plural': 'nutmeg',
          'value': 0.1,
        },
        'cayenne' :{
          'noun': 'cayenne',
          'plural': 'cayenne',
          'value': 0.1,
        },
        'cloves' :{
          'noun': 'clove',
          'plural': 'cloves',
          'value': 0.1,
        },
        'ginger' :{
          'noun': 'ginger',
          'plural': 'ginger',
          'value': 0.1,
        },
        'cinnamon' :{
          'noun': 'cinnamon',
          'plural': 'cinnamon',
          'value': 0.2,
        },
        'tumeric' :{
          'noun': 'tumeric',
          'plural': 'tumeric',
          'value': 0.2,
        },
        'garlic' :{
          'noun': 'garlic',
          'plural': 'garlic',
          'value': 0.02,
        },
        'cumin' :{
          'noun': 'cumin',
          'plural': 'cumin',
          'value': 0.05,
        },
        'oregano' :{
          'noun': 'oregano',
          'plural': 'oregano',
          'value': 0.05,
        },
        'thyme' :{
          'noun': 'thyme',
          'plural': 'thyme',
          'value': 0.05,
        },
        'rosemary' :{
          'noun': 'rosemary',
          'plural': 'rosemary',
          'value': 0.05,
        },
        'mint' :{
          'noun': 'mint',
          'plural': 'mint',
          'value': 0.05,
        },
        'sage' :{
          'noun': 'sage',
          'plural': 'sage',
          'value': 0.05,
        },
        'basil' :{
          'noun': 'basil',
          'plural': 'basil',
          'value': 0.05,
        },
        'chives' :{
          'noun': 'chives',
          'plural': 'chives',
          'value': 0.05,
        },
      },
      "dressing": {
        "olive oil dressing": {
          'noun': 'olive oil dressing',
          'plural': 'olive oil dressings',
          'value': 0.02,
        },
        "vinegar dressing": {
          'noun': 'vinegar dressing',
          'plural': 'vinegar dressings',
          'value': 0.02,
        },
        "honey mustard dressing": {
          'noun': 'honey mustard dressing',
          'plural': 'honey mustard dressings',
          'value': 0.02,
        },
        "citrus dressing": {
          'noun': 'citrus dressing',
          'plural': 'citrus dressings',
          'value': 0.02,
        },
        "red wine dressing": {
          'noun': 'red wine dressing',
          'plural': 'red wine dressings',
          'value': 0.02,
        },
      },
    },
  },
  'gemstone_cuts': ['marquise','round','trilliant','oval','pear','square','octagon','emerald','baguette','cushion','heart','briolette','princess','cabochon','star'],
  'gemstone_quality': ['chipped','flawed','normal','flawless','perfect'],
  'gemstone_size': ['tiny','small','average-sized','large','huge'],
  'gemstone_value': [0.15,0.33,0.66,1,1.5],
  'dyes': {
    'yellow': {
      'noun': 'yellow',
      'value': 2,
    },
    'orange': {
      'noun': 'orange',
      'value': 3,
    },
    'ochre': {
      'noun': 'ochre',
      'value': 2,
    },
    'brown': {
      'noun': 'brown',
      'value': 1,
    },
    'yellow-brown': {
      'noun': 'yellow-brown',
      'value': 1,
    },
    'blue-green': {
      'noun': 'blue-green',
      'value': 3,
    },
    'olive': {
      'noun': 'olive',
      'value': 1,
    },
    'green': {
      'noun': 'green',
      'value': 1,
    },
    'indigo': {
      'noun': 'indigo',
      'value': 3,
    },
    'sea blue': {
      'noun': 'sea-blue',
      'value': 2,
    },
    'sky blue': {
      'noun': 'sky-blue',
      'value': 1,
    },
    'crimson': {
      'noun': 'crimson',
      'value': 1,
    },
    'mauve': {
      'noun': 'mauve',
      'value': 3,
    },
    'purple': {
      'noun': 'purple',
      'value': 20,
    },
    'pink': {
      'noun': 'pink',
      'value': 2,
    },
    'red': {
      'noun': 'red',
      'value': 1,
    },
    'dark grey': {
      'noun': 'dark-grey',
      'value': 8,
    },
    'light grey': {
      'noun': 'light-grey',
      'value': 3,
    },
    'black': {
      'noun': 'black',
      'value': 30,
    }
  },
  'words': {
    'noun': {
      'singular': ['addition','pot','sugar','stamp','wound','berry','example','test','nation','deer','veil','crown','kettle','building','language','front','uncle','wheel','moon','swing','jewel','needle','vessel','curtain','pin','quince','cough','art','mass','roll','fear','cable','attack','cook','effect','toad','hall','song','book','vegetable','laugh','harbor','team','top','coach','chance','corn','expansion','carriage','sweater','person','quarter','dog','treatment','word','scent','stranger','beef','fang','arm','locket','board','imp','belief','scene','skin','home','battle','class','spot','rock','memory','lettuce','activity','grandfather','drop','side','smell','ball','bucket','drawer','dock','action','song','butter','thread','stomach','number','branch','stop','look','grip','hope','wall','record','friend','noise','achiever','range','beginner','plant','coast','station','whip','hobby','robin','pear','volcano','morning','rain','business','dust','plot','cemetery','army','star','ticket','blow','vase','snail','spoon','crook','protest','waste','development','terror','scale','jump','doctor','button','twig','nose','dwarf','farm','religion','existence','sort','drake','brake','boy','turn','spy','crow','hand','believe','orange','ice','servant','channel','control','toe','pump','value','fruit','tooth','reward','competition','sheet','girl','question','war','lip','design','monkey','cherry','cavern','toy','camp','store','pickle','history','judge','tent','debt','relation','invention','tub','gate','play','collar','story','cracker','grain','thunder','afternoon','cup','milk','coat','stick','wire','bit','ear','pen','bomb','money','discussion','interest','quill','spring','theory','pollution','rose','bear','snake','head','teaching','partner','alarm','bite','pet','title','day','twist','feeling','support','power','act','island','son','knife','meeting','dinner','powder','rhythm','wood','property','thing','jam','event','cattle','queen','rat','lace','eye','government','roof','amusement','frame','industry','tank','creature','form','chicken','road','door','stove','lumber','arithmetic','statement','sleep','square','recess','soup','use','yam','self','purpose','mask','thought','reaction','governor','rule','company','tree','rainstorm','cannon','port','mitten','hospital','throat','surprise','sail','fire','apparatus','taste','week','shelf','finger','voyage','yarn','wight','foot','breath','zephyr','tramp','porter','acoustic','clover','care','north','seashore','frog','plant','lunch','card','burst','jar','cent','table','scarecrow','prose','harmony','club','nut','loaf','slope','suit','chicken','wealth','whistle','pan','aftermath','produce','dime','mead','leather','caption','kitty','juice','match','hydra','kraken','dragon','wyrm','current','leg','crayon','dress','jail','sidewalk','bee','tendency','lock','rabbit','credit','wren','hammer','picture','sneeze','badge','iron','can','hour','tiger','group','engine','trail','note','curve','behavior','baby','quilt','yard','circle','jelly','parcel','stick','representative','land','chess','hulk','man','crate','passenger','flame','oatmeal','cabbage','orc','goblin','crack','line','giraffe','motion','hose','quiet','sack','approval','ring','horn','key','tomato','blood','spark','comparison','market','humor','suggestion','book','cloth','way','force','anger','rest','snake','weight','heat','kitten','pyre','flight','snail','rabbit','shake','rake','fortress','idea','ground','detail','fairy','trouser','time','regret','thumb','watch','decision','wax','touch','flock','pancake','knot','furniture','marble','cub','toe','duck','work','basin','dog','turkey','angel','devil','bone','back','rail','division','kiss','walk','quicksand','hook','tree','ladybug','blade','drain','canvas','golem','banshee','adventure','shop','steam','instrument','talk','afterthought','measure','grass','expert','friction','linen','honey','hat','face','holiday','smoke','mice','profit','place','rub','flavor','fact','jellyfish','shape','oil','payment','condition','window','snow','wing','sun','coil','screw','route','minister','shade','wilderness','creator','temper','argument','stocking','air','insect','wrist','nest','woman','scissor','floor','health','basket','trouble','level','country','hole','cow','zoo','worm','push','tongue','cap','shoe','icicle','crypt','grape','plate','cart','education','bat','pipe','basilisk','liquid','adjustment','cover','egg','earth','coal','steel','baby','ink','wyvern','witch','root','river','riddle','writer','offer','food','animal','seat','appliance','neck','end','thrill','women','spider','amount','trick','shame','bell','birth','authority','pie','tavern','fuel','minute','knee','sky','field','orange','punishment','slip','night','sink','bed','sponge','cactus','mind','weather','ocean','bird','apparel','vein','cause','brass','start','fireman','edge','wand','oven','wizard','horse','distribution','goose','teeth','bulb','structure','tray','growth','pie','respect','bird','page','mark','town','seed','party','pleasure','love','smile','glass','middle','cobweb','show','doll','sea','straw','guide','agreement','impulse','boot','bridge','flower','pig','bath','cheese','viking','join','price','bead','wave','part','silk','year','stew','library','ant','dirt','shirt','move','pest','pocket','chin','visitor','paper','unit','peace','drink','plough','desire','yoke','boat','tail','reason','stretch','salt','sand','blade','attraction','nerve','lake','voice','magic','quiver','potato','cast','transport','calendar','wish','leg','friend','base','church','cave','camera','cake','frog','account','shoe','egg','distance','horse','verse','children','room','wave','plastic','metal','finger','knowledge','gold','mist','earthquake','toothpaste','cream','flag','trip','bed','men','skirt','trade','territory','silver','soap','observation','giant','clam','throne','house','school','meat','connection','squirrel','mouth','sister','eye','angle','cherry','spade','aunt','space','bag','order','dinosaur','wrench','house','change','sister','flesh','crowd','wash','sock','run','stitch','fish','position','society','duck','income','view','donkey','laborer','crime','demon','size','chalk','toy','fork','summer','street','rifle','writing','elbow','brick','box','cake','machine','cow','need','sign','hair','string','substance','cat','wool','limit','sound','name','border','eggnog','zipper','pig','poison','brother','advice','rate','cushion','doll','mountain','yak','muscle','tax','bubble','zinc','rod','mine','cat','balance','loss','tin','wine','sheep','stone','sense','fowl','mother','celery','discovery','plantation','scarf','hand','stem','vest','fall','request','plane','boundary','winter','ship','desk','point','zebra','bottle','bait','month','ring','water','copper','bush','color','stage','selection','steppe','flower','hill','arch','degree','destruction','daughter','fold','crib','meal','slave','fog','increase','fly','system','glove','death','ray','direction','stream','pail','bell','ghost','wind','shock','texture','mint','pet','lamp','father','maid','office','umbrella','actor','experience','quartz'],
      'plural': ['pots','sugars','stamps','wounds','berries','examples','tests','nations','deer','veils','crowns','kettles','buildings','languages','fronts','uncles','wheels','moons','swings','jewels','needles','vessels','curtains','pins','quinces','coughs','arts','masses','rolls','fears','cables','attacks','cooks','effects','toads','halls','songs','books','vegetables','laughs','harbors','teams','tops','coaches','chances','expansions','carriages','sweaters','persons','quarters','dogs','treatments','words','scents','strangers','beef','fangs','arms','lockets','boards','imps','beliefs','scenes','skin','homes','battles','classes','spots','rocks','memories','lettuce','activities','grandfathers','drops','sides','smells','balls','buckets','drawers','docks','actions','songs','butters','threads','stomaches','numbers','branches','stops','looks','grips','hopes','walls','records','friends','noises','achievers','ranges','beginners','plants','coasts','stations','whips','hobbies','robins','pears','volcanoes','mornings','rains','businesses','dusts','plots','cemeteries','armies','stars','tickets','blows','vases','snails','spoons','crooks','protests','wastes','developments','terrors','scales','jumps','doctors','buttons','twigs','noses','dwarves','farms','religions','existences','sorts','drakes','brakes','boys','turns','spies','crows','hands','beliefs','oranges','ice','servants','channels','controls','toes','pumps','values','fruits','teeth','rewards','competitions','sheets','girls','questions','wars','lips','designs','monkeys','cherries','caverns','toys','camps','storse','pickles','histories','judges','tents','debts','relations','inventions','tubs','gates','plays','collars','stories','crackers','grains','thunder','afternoons','cups','coats','sticks','bits','ears','pens','bombs','money','discussions','interests','springs','theories','roses','bears','snakes','heads','teachings','partners','alarms','bites','pets','title','day','twist','feelings','supports','powers','acts','islands','sons','knives','meetings','dinners','powders','rhythms','wood','properties','jams','events','cattles','queens','rats','lace','eyes','governments','roofs','amusements','frames','industries','tanks','creatures','forms','chickens','roads','doors','stoves','lumber','arithmetic','statements','sleep','squares','recesses','soup','uses','yams','purposes','masks','thoughts','reactions','governors','rules','companies','trees','rainstorms','cannons','ports','mittens','hospitals','throat','surprise','sail','fire','apparatus','taste','week','shelf','finger','voyage','yarn','wight','foot','breath','zephyr','tramp','porter','acoustics','clover','care','north','seashore','frog','plants','lunch','card','burst','jar','cent','table','scarecrow','proses','harmonies','clubs','nuts','loafs','slopes','suits','chickens','wealth','whistles','pans','aftermaths','mead','leather','captions','kitties','juices','matches','hydras','krakens','dragons','wyrms','currents','legs','quills','dresses','jails','trails','bees','tendencies','locks','rabbits','gremlins','wrens','hammers','pictures','sneezes','badges','iron','cans','hours','tigers','groups','engines','trails','notes','curves','behaviors','babies','quilts','yards','circle','jellies','parcels','sticks','representatives','lands','chess','hulks','men','crates','passengers','flames','oatmeal','cabbages','orcs','goblins','cracks','lines','giraffes','motions','hoses','quiet','sacks','approval','rings','horn','key','tomatoes','blood','spark','comparison','market','humor','suggestion','books','cloth','way','force','anger','rest','snake','weight','heat','kittens','pyres','flight','snails','rabbits','shake','rake','fortresses','idea','ground','detail','fairies','trousers','time','regret','thumb','watch','decision','wax','touch','flock','pancake','knot','golems','banshees','adventures','furniture','marble','cub','toe','duck','work','basin','dogs','turkey','angel','devil','bone','back','rail','division','kiss','walk','quicksand','hook','trees','ladybug','blade','drain','canvas','shop','steam','instruments','talks','afterthoughts','measures','grasses','experts','frictions','linens','honey','hats','faces','holidays','smoke','mice','profits','places','rubs','flavors','facts','jellyfish','shapes','oils','payments','conditions','windows','snow','wings','suns','coils','screws','routes','ministers','shades','wildernesses','creators','tempers','arguments','stocking','airs','insects','wrists','nests','women','scissors','floors','healths','baskets','troubles','levels','countries','holes','cows','zoos','worms','pushes','tongues','caps','shoes','icicles','crypts','grapes','plates','carts','bats','pipes','basilisks','liquids','adjustments','covers','eggs','earth','coal','steel','babies','inks','wyverns','witches','roots','rivers','riddles','writers','offers','foods','animals','seats','necks','ends','thrills','women','spiders','amounts','tricks','shames','bells','births','authorities','pies','taverns','fuels','minutes','knees','skies','fields','oranges','punishments','slips','nights','sinks','beds','sponges','cactus','minds','weather','oceans','birds','apparel','veins','causes','brass','starts','skeletons','edges','wands','ovens','wizards','horses','distributions','teeth','bulbs','structures','trays','growths','pies','respects','birds','pages','marks','towns','seeds','parties','pleasures','love','smiles','glasses','mallets','cobwebs','shows','dolls','seas','straws','guides','agreements','impulses','boots','bridges','flowers','pigs','baths','cheeses','vikings','wisps','prices','beads','waves','parts','silks','years','stew','libraries','ants','dirts','shirts','moves','pests','pockets','chins','visitors','papers','units','peace','drinks','ploughs','desires','yokes','boats','tails','reasons','stretches','salt','sand','blades','attractions','nerves','lakes','voices','magic','quivers','potatoes','casts','transports','calendars','wishes','legs','friends','bases','churchs','caves','cameras','cakes','frogs','accounts','shoes','eggs','distances','horses','verses','children','rooms','waves','portents','metal','fingers','knowledge','gold','mists','earthquakes','pastes','creams','flags','trips','beds','men','skirts','trades','things','territories','silver','soap','observations','giants','clams','thrones','houses','schools','meats','connections','squirrels','mouths','sisters','eyes','angles','cherries','spades','aunts','spaces','bags','orders','beasts','wrenches','houses','changes','sisters','flesh','crowds','clocks','socks','gods','stitches','fish','positions','societies','ducks','incomes','views','donkeys','laborers','crimes','demons','sizes','chalks','toys','forks','summers','streets','mermaids','writings','elbows','bricks','boxes','cakes','machines','cows','needs','signs','hairs','strings','substances','cats','wool','limits','sounds','names','borders','elves','zippers','pigs','poisons','brothers','advices','rates','cushions','dolls','mountains','yaks','muscles','taxes','bubbles','zinc','rods','mines','cats','balances','gnomes','losses','etins','wines','sheep','stones','senses','fowl','mothers','discoveries','plantations','scarfs','hands','stems','vests','falls','requests','planes','boundaries','winters','ships','desks','points','zebras','bottles','bait','months','rings','water','coppers','bushes','colors','stages','selections','steppes','flowers','hills','archs','degrees','destruction','daughters','folds','cribs','meals','slaves','fog','flys','systems','gloves','deaths','rays','directions','streams','pails','bells','ghosts','winds','shocks','textures','mint','pets','lamps','maids','offices','umbrellas','actors','experiences','quartz'],
    },
    'verb': ['exercise','lighten','scrape','stop','train','owe','fill','cough','colour','manage','love','wander','knock','compete','snatch','float','unlock','hurry','identify','play','explode','fence','sign','lock','appreciate','watch','wish','rot','rush','lick','disapprove','end','comb','call','trace','measure','bow','wave','tire','divide','switch','decorate','admire','matter','pretend','scatter','arrive','store','harass','pull','whip','hop','glow','wrestle','grate','rescue','multiply','scare','start','perform','agree','reject','move','balance','occur','crash','mark','recognise','tow','boil','impress','wreck','carve','bounce','damage','search','learn','unpack','whine','sprout','interest','contain','shave','hug','pop','hover','disarm','dust','tie','pedal','terrify','smile','march','lie','practise','concern','guess','invent','preserve','supply','succeed','fool','reproduce','clean','kill','hammer','choke','laugh','curl','gaze','zip','ban','nod','shiver','brush','spell','precede','inform','disappear','delight','melt','escape','extend','refuse','settle','signal','rain','thaw','jog','warm','whirl','change','waste','wrap','unite','repeat','meddle','zoom','prepare','rejoice','battle','shop','expand','trade','found','peep','question','complete','strap','heap','calculate','fold','join','frighten','bang','blink','confess','harm','knit','deliver','afford','head','sip','wipe','buzz','stroke','describe','bare','bore','cover','grab','use','shade','instruct','pack','mix','pat','greet','pine','spot','replace','license','excite','walk','spill','remind','slow','stretch','pass','record','object','stain','heal','last','print','wail','prick','approve','visit','delay','jam','moan','frame','flash','strip','suspend','treat','saw','phone','mourn','tremble','bathe','coil','notice','enter','hope','sin','time','count','provide','snow','tug','encourage','dance','disagree','mine','punch','dress','box','charge','consist','muddle','command','tumble','fetch','possess','rhyme','touch','mend','marry','entertain','look','argue','avoid','strengthen','arrest','compare','regret','belong','vanish','expect','explain','unfasten','trouble','follow','undress','queue','smoke','travel','alert','beg','juggle','cross','rock','earn','pause','order','apologise','dry','wink','exist','twist','trust','plan','prefer','handle','spark','race','dream','burn','communicate','obey','turn','kiss','cure','like','listen','nail','paddle','test','subtract','fail','dam','plug','scrub','rinse','weigh','drag','permit','attempt','crack','release','wait','sneeze','murder','double','appear','raise','roll','tick','gather','ignore','drain','repair','open','curve','moor','doubt','yell','check','ruin','cry','taste','spoil','program','deserve','squeak','develop','blot','realise','mate','chew','protect','spray','consider','yawn','miss','label','stitch','polish','report','fire','please','step','attach','own','launch','part','interrupt','squash','cause','scorch','spare','request','judge','joke','produce','guarantee','tap','knot','plant','cheer','pump','excuse','amuse','cycle','match','rule','flower','land','cheat','face','desert','trick','carry','peel','promise','flood','paste','support','improve','jail','happen','embarrass','heat','form','squeeze','post','place','park','fit','flap','bury','steer','boast','mug','slap','reign','intend','surprise','clip','x-ray','reach','clear','close','guide','attend','haunt','challenge','back','hunt','coach','empty','whistle','dare','invite','collect','decide','interfere','seal','bolt','rob','crawl','shelter','grease','irritate','smash','retire','rely','punish','decay','book','reply','ask','wobble','jump','applaud','memorise','suit','preach','fear','bump','name','receive','arrange','point','sigh','share','hate','offer','tickle','attract','drum','man','depend','overflow','stir','employ','inject','blind','peck','stay','bake','serve','slip','educate','itch','claim','copy','press','bleach','wash','destroy','annoy','connect','shock','sound','injure','pour','fix','suffer','allow','discover','answer','increase','untidy','long','brake','influence','announce','reduce','remove','suck','deceive','tame','camp','beam','confuse','hum','sack','detect','help','suppose','pray','care','imagine','drip','relax','nest','attack','load','bruise','return','thank','push','shrug','risk','hang','kneel','trap','suspect','soothe','surround','wriggle','analyse','fasten','borrow','level','ski','concentrate','flow','wonder','worry','clap','crush','offend','live','bubble','smell','continue','behave','accept','hand','skip','obtain','scratch','tour','pinch','puncture','bat','stamp','tease','drown','reflect','radiate','paint','dislike','number','advise','drop','need','tempt','stuff','snore','rub','stare','work','chase','pick','remember','satisfy','warn','trot','welcome','complain','examine','scold','fry','admit','tip','film','grip','kick','scream','separate','present','file','type','sail','list','include','branch','chop','fade','trip','breathe','observe','correct','grin','sparkle','squeal','whisper','groan','add','enjoy','guard','note','force','introduce','talk','suggest','transport','save','poke','scribble','remain','blush','glue','prevent','hook'],
    // 'adjective': ['fiery','burning', 'hellish', 'glorious', 'wicked', 'festering', 'sickening', 'habitual','mountainous','measly','panicky','super','dirty','dazzling','keen','swanky','curious','gruesome','disgusted','difficult','homeless','lucky','agonizing','unable','doubtful','amused','direful','wiggly','absorbing','purple','expensive','unarmed','nappy','pumped','feeble','zealous','scandalous','chief','nasty','condemned','fluffy','brawny','woozy','arrogant','flowery','wary','awful','grotesque','toothsome','typical','lively','rhetorical','interesting','capricious','striped','incandescent','heavy','normal','salty','skillful','low','voiceless','alert','faded','thick','certain','accessible','worried','resonant','private','yellow','coordinated','dead','quarrelsome','ugliest','eight','vague','six','brave','prickly','equable','dapper','wandering','rustic','maniacal','evanescent','afraid','tiresome','charming','weak','general','solid','utter','wiry','glistening','bawdy','outgoing','calm','invincible','materialistic','special','determined','selfish','noisy','broken','alleged','sedate','chunky','burly','rude','entertaining','jolly','horrible','elfin','squeamish','poor','pastoral','responsible','sweltering','succinct','supreme','voracious','rambunctious','tall','happy','wise','inquisitive','mixed','nutritious','parched','deafening','grouchy','penitent','secretive','mammoth','huge','impolite','watery','hissing','clever','damaged','blushing','placid','elite','foolish','scattered','large','old-fashioned','second-hand','tasteless','changeable','oafish','helpful','illustrious','curly','sophisticated','absent','slimy','lethal','addicted','abhorrent','sassy','violent','guttural','harsh','square','high-pitched','piquant','ludicrous','chemical','glib','jumpy','plausible','questionable','quixotic','colorful','cynical','healthy','material','early','exuberant','ten','hot','smiling','heavenly','therapeutic','fabulous','alike','seemly','decisive','enchanted','swift','unsuitable','petite','natural','left','workable','drab','empty','quick','unnatural','crazy','famous','mundane','robust','enchanting','creepy','zonked','null','coherent','noiseless','teeny','icy','tart','itchy','dramatic','tawdry','witty','vulgar','faithful','husky','irritating','violet','recondite','silent','tame','somber','conscious','tacky','obscene','abundant','hushed','joyous','extra-large','flaky','important','elegant','boring','curved','capable','tough','snobbish','unkempt','petite','comfortable','rough','beneficial','angry','simple','giddy','likeable','imperfect','impending', 'holy', 'lame','parallel','motionless','selective','thoughtless','teeny-tiny','meaty','thundering','towering','ahead','snotty','terrible','efficient','massive','narrow','thirsty','wonderful','scientific','thoughtful','rare','redundant','truculent','obsolete','gray','used','obeisant','mindless','abject','imminent','possible','fearless','guiltless','lovely','unruly','ripe','inconclusive','sloppy','fast','smoggy','future','stingy','scintillating','nonstop','small','marvelous','energetic','quaint','learned','unusual','public','combative','hurried','ill','warm','warlike','loutish','strange','pale','tranquil','fixed','tearful','exotic','fat','dispensable','splendid','needy','friendly','slim','boundless','spiteful','medical','protective','chivalrous','three','daily','dizzy','savory','lamentable','possessive','detailed','obtainable','disgusting','abusive','damp','subsequent','alcoholic','quizzical','naive','average','tacit','absurd','bizarre','berserk','aback','kind','gabby','adamant','greasy','flawless','lean','omniscient','steep','odd','simplistic','industrious','well-to-do','undesirable','adventurous','domineering','cut','eminent','tightfisted','free','infamous','alluring','agreeable','ceaseless','bad','probable','ultra','languid','long','poised','cheerful','plant','knowledgeable','fantastic','deserted','superficial','defiant','fearful','miscreant','screeching','accurate','gaping','auspicious','wild','spiritual','blue','depressed','cold','loud','shrill','illegal','evasive','acoustic','futuristic','confused','separate','ambiguous','crooked','debonair','talented','understood','limping','ignorant','substantial','laughable','steady','puffy','easy','lewd','unbiased','unadvised','threatening','familiar','bitter','amazing','earsplitting','merciful','ubiquitous','safe','aboard','gorgeous','gainful','fallacious','macho','fascinated','true','brash','heartbreaking','victorious','synonymous','sick','aboriginal','complete','righteous','high','organic','long-term','helpless','abstracted','uneven','labored','insidious','secret','ill-fated','rampant','incompetent','neighborly','abnormal','lazy','rightful','flashy','temporary','magical','various','incredible','well-off','hapless','dusty','equal','embarrassed','slow','silly','jealous','strong','plastic','permissible','grateful','foregoing','flippant','wet','juvenile','well-made','lavish','goofy','spooky','sneaky','shut','excited','spicy','acidic','present','proud','guarded','rebel','wide-eyed','far-flung','fortunate','hateful','ordinary','quickest','cooing','sore','grandiose','well-groomed','elated','brainy','quirky','paltry','deadpan','melted','lumpy','wakeful','frightened','envious','extra-small','cultured','daffy','sharp','soggy','woebegone','sweet','yielding','stereotyped','kindly','valuable','aware','parsimonious','awesome','spiffy','symptomatic','ethereal','romantic','elderly','wide','hungry','repulsive','muddled','ugly','shiny','uninterested','womanly','melodic','mean','cooperative','optimal','abiding','cluttered','faulty','cagey','fair','puzzling','trite','waggish','trashy','wasteful','majestic','blue-eyed','offbeat','whimsical','great','second','inexpensive','roasted','anxious','squealing','gigantic','married','short','obedient','opposite','enormous','tender','uttermost','malicious','scarce','tan','nosy','amusing','wanting','gentle','complex','hesitant','standing','four','frightening','able','willing','ragged','frail','like','scared','nifty','pointless','actually','attractive','needless','adhesive','fragile','lacking','halting','ancient','adaptable','cloudy','nondescript','straight','abandoned','unequal','moaning','harmonious','puny','lively','efficacious','versed','tenuous','nice','vast','overrated','taboo','wrathful','black','endurable','aggressive','mute','handy','many','rainy','five','heady','sable','bumpy','panoramic','dreary','elastic','dull','fuzzy','hilarious','spiky','cautious','painful','shaky','troubled','discreet','sour','curvy','waiting','testy','unwritten','aberrant','hulking','half','peaceful','bustling','stupendous','new','flimsy','acid','remarkable','hard-to-find','stupid','wholesale','jobless','glamorous','quiet','phobic','internal','premium','sudden','erect','plucky','ratty','maddening','milky','craven','immense','vigorous','lonely','psychedelic','chubby','highfalutin','tricky','handsome','shaggy','rabid','overjoyed','dysfunctional','unwieldy','terrific','clammy','colossal','encouraging','divergent','brown','childlike','two','knowing','thinkable','successful','functional','ritzy','loving','scary','psychotic','noxious','broad','untidy','gamy','fertile','last','shocking','past','historical','spectacular','didactic','ashamed','devilish','youthful','sincere','ruthless','dark','skinny','tense','fluttering','axiomatic','tight','juicy','draconian','feigned','animated','furtive','greedy','torpid','busy','squalid','purring','smooth','awake','disillusioned','little','wretched','nostalgic','stimulating','impossible','loose','relieved','outstanding','crowded','verdant','resolute','wry','frequent','naughty','dear','jaded','wealthy','acceptable','lopsided','sleepy','clumsy','same','intelligent','thin','forgetful','homely','lush','jagged','kaput','cheap','pink','shy','neat','giant','hospitable','hard','sticky','earthy','callous','perpetual','nebulous','grumpy','tested','exciting','befitting','classy','fanatical','finicky','female','breezy','magnificent','zany','bloody','erratic','defective','delicate','numerous','first','nauseating','foamy','mushy','crabby','delightful','cute','observant','full','windy','kindhearted','steadfast','uncovered','satisfying','dry','best','holistic','nervous','brief','pushy','common','useful','cute','humdrum','green','powerful','furry','apathetic','faint','breakable','tense','light','messy','closed','wistful','abaft','third','good','obese','real','gusty','handsomely','tidy','dashing','few','shallow','misty','frantic','overt','black-and-white','male','lowly','regular','worthless','caring','chilly','flat','profuse','luxuriant','spotty','abrupt','sparkling','utopian','painstaking','stiff','adorable','glorious','literate','vagabond','godly','descriptive','slippery','moldy','barbarous','onerous','lying','boiling','hanging','unaccountable','stormy','rural','irate','level','rigid','even','judicious','freezing','disagreeable','tangible','obnoxious','spotless','pretty','racial','sad','nippy','tasteful','clear','pricey','bashful','polite','cowardly','big','accidental','serious','different','nine','quack','abortive','gleaming','abounding','nutty','red','yummy','delicious','raspy','aquatic','courageous','bite-sized','automatic','one','legal','aloof','spotted','ill-informed','rapid','momentous','magenta','zippy','boorish','oceanic','ready','silent','damaging','cruel','uptight','weary','humorous','known','truthful','bouncy','alive','graceful','cloistered','ablaze','whispering','lackadaisical','overwrought','hysterical','exultant','zesty','excellent','groovy','marked','oval','disastrous','puzzled','fine','cool','far','disturbed','idiotic','receptive','sulky','mighty','innate','ossified','macabre','decorous','filthy','staking','diligent','vivacious','productive','annoyed','modern','defeated','grieving','physical','wicked','distinct','jittery','concerned','unbecoming','makeshift','outrageous','ambitious','aromatic','spurious','roomy','bored','false','bright','cuddly','instinctive','annoying','hurt','gratis','festive','mysterious','tiny','whole','eager','unequaled','young','imaginary','silky','fresh','late','hallowed','pleasant','hollow','electric','perfect','dynamic','vengeful','jazzy','drunk','grey','reminiscent','lyrical','jumbled','precious','dependent','gaudy','adjoining','fumbling','wrong','political','right','orange','ad hoc','uppity','honorable','hellish','near','icky','necessary','royal','meek','belligerent','tedious','ruddy','reflective','overconfident','picayune','mere','mature','billowy','funny','educated','hideous','careful','gullible','madly','sore','flagrant','fancy','astonishing','sordid','hypnotic','stale','unhealthy','absorbed','impartial','bent','aspiring','venomous','upbeat','tremendous','numberless','subdued','upset','mellow','fierce','assorted','exclusive','clean','plain','tangy','living','thankful','unsightly','abrasive','dangerous','eatable','grubby','smelly','statuesque','military','murky','nimble','bewildered','knotty','unused','deranged','beautiful','glossy','old','nonchalant','delirious','longing','sturdy','innocent','pathetic','bright','volatile','economic','fretful','deep','telling','tasty','careless','demonic','superb','previous','wacky','soft','miniature','amuck','shivering','calculating','garrulous','periodic','unique','imported','smart','enthusiastic','rich','abashed','acrid','useless','cumbersome','minor','thirsty','round','rotten','better','deeply','ajar','available','dusty','vacuous','obsequious','white','next','scrawny','tired','unknown','open','wooden','gifted'],
    'adjective':{
      'necrotic':['hellish','wicked','festering','sickening', 'ghoulish','monsterous', 'desicated', 'corrupted', 'malicious', 'vile', 'nefarious', 'heinous', 'hideous', 'baneful', 'depraved', 'obscene', 'wrathful', 'rancorous', 'malignant', 'repugnant'],
      'radiant':['holy','divine','hallowed','pure','humble','revered','righteous','sublime','devoted','moral','angelic','blessed','consecrated','just','devout','glorious','immaculate','pious','saintly','venerable','virtuous','seraphic','magnificient'],
      'fire':['fiery','burning','blazing','boiling','scorching','scalding','volcanic'],
      'cold':['frozen','icy','frigid','frosty','polar','glacial','arctic','chilled','rimy','gelid','bleak','wintry'],
      'acid': ['toxic','noxious','septic','venomous','poisonous','pestilent','diseased','defiled','contagious','corrupted','foul','fetid','sickly','virulent','stinking','miasmic'],
      'lightning':['charged','voltaic','crackling','static'],
      'thunder':['booming','rumbling','crashing','rumbling','thunderous','howling','roaring','rattling'],
    },
    'engraving': {
      'odds': {
        'person': 4,
        'event': 1,
        'item': 3,
        'pattern': 2,
      },
      'things': {
        'person': {
          'single': ['god','human','dwarf','elf','half-orc','halfling','gnome',"dragonborn","tiefling","kobold","troll","",'orc','goblin','dragon','ogre','hydra','minotaur','giant','golem','drake','wyvern','yeti', 'bird', 'dog','cat','horse','lion','tiger','elephant','bear','wolf','stag','unicorn',"mountain goat","ram","alligator","crocodile","eagle","raven","hawk","tucan","crow","owl","stork","heron","falcon","goose","rooster","bull","pig","boar","musk-ox","camel","rat","parrot","weasel",",monkey","shark","fish","dolphin","bat","crab","sheep","otter","yak","lizard","fox","gorilla","turtle","beaver","seal"],
          'plural': ['gods','humans','dwarves','elves','half-orcs','halflings','gnomes','orcs','goblins','dragons','ogres','hydras','minotaurs','giants','golems','drakes','wyverns','yetis','birds','dogs','cats','horses','lions','tigers','elephants','bears','wolves','stags','unicorns',"mountain goats","rams","alligators","crocodiles","eagles","ravens","hawks","tucans","crows","owls","storks","herons","falcons","roosters","bulls","pigs","boars","musk-oxes","camels","rats","parrots","weasels","monkeys","sharks","fish","dolphins","bats","crabs","sheep","otters","yaks","lizards","foxes","gorillas","turtles","beavers","seals"],
        },
        'event': ['battle','wedding','coronation','duel','voyage','council meeting','funeral','feast','festival','ritual','occult ritual','summoning',],
        'item': ['*flowers*','*leather*','*wood*','arcane runes','river','ocean','hill','mountain','fortress','castle','city','town','cave','bog','marsh','forest','boulder','cottage','sun','moon','star','cloud','ship','tower'],
        'pattern': ['geometric','wave','spiral','block','flower','arcane','triangle','circular','square','interlocking triangle','overlapping circle','overlapping square'],
        'good': ['sun','sunrise','chalice','angel'],
        'evil': ['skull','pentagram','eight-pointed star','demon','esoteric runes'],
      },
      'descriptions': ['large','small','young','old','thin','fat','frail','stout','happy','sad','angry','celebrating','fighting','praying','sleeping','kneeling','eating','drinking','bellowing','prone','pointing','prostrated','dead'],
    },
  },
  'lost_places': ['in a forest','in a jungle','on a mountain','on an island','in a swamp','in a desert','in an oasis','in a river','in a graveyard','on a moor','in a barrow','in a dungeon','in a castle','in a crypt','in an ancient temple','in a church','in a cave','in an underground lake','in a tower','in a sewer'],
};

export {data};