const Utils = {

  setNewSeed: function (num) {
    if (!num) num = Math.abs ( Math.floor ( (Math.sin(Math.random() * 9301) * 1000) * ( Math.sin(Math.random() * 49297) * 10001) ) );
    Math.seed = num;
  },
  
  randomInt: function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    Math.seed = (Math.seed * 9301 + 49297) % 233280;
    const rnd = Math.seed / 233280;

    return Math.floor( Math.abs(min + Math.floor(rnd * (max - min + 1 ))));
  },
  
  randomArrayIndex: function (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);

      Math.seed = (Math.seed * 9301 + 49297) % 233280;
      const rnd = Math.seed / 233280;

      return Math.floor( Math.abs( min + rnd * (max - min)));
  }

}

export default Utils;