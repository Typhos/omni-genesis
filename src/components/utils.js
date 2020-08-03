export default class Utils {

  static setNewSeed (num) {
    if (!num) num = Math.abs ( Math.floor ( (Math.sin(Math.random() * 9301) * 10000) * ( Math.sin(Math.random() * 49297) * 100001) ) );
    Math.seed = num;
  };
  
  static randomInt (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    Math.seed = (Math.seed * 9301 + 49297) % 233280;
    const rnd = Math.seed / 233280;

    return Math.floor( Math.abs(min + Math.floor(rnd * (max - min + 1 ))));
  };
  
  static randomArrayIndex (max) {
      const min = 0;
      max = Math.floor(max);

      Math.seed = (Math.seed * 9301 + 49297) % 233280;
      const rnd = Math.seed / 233280;

      return Math.floor( Math.abs( min + rnd * (max - min)));
  }

  static shuffleArray (array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  static numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

}