class Parser {

  constructor(userInfo) {

  }

// ####################################### PARSING PARTIALS RESPONSE FROM DRIBBBLE ##########################################

  parsingInfos(userInfo){
    // parser
    // string from dribbble
    let dribbbleInfoStr = userInfo;

    // first split on ";"
    // bio_array => []
    const dribbbleInfoArray = dribbbleInfoStr.split(';;');

    let arraySplittedOnEquals = [];
    // split bio_array on "="
    // array_splitted_on_equals = [['text_bio', 'Hello | I'm Nils...'], [...]]
    dribbbleInfoArray.forEach(el => {
      arraySplittedOnEquals.push(el.split("=="));
    })

    // array2d to object [[],[]] => {prop: str}
    const entries = new Map(arraySplittedOnEquals);
    const dribbbleParam = Object.fromEntries(entries);

    // split les values pour obtenir des tableaux
    // en parcourant l'objet et split sur "|"
    // user_param => { prop1: ['value1','value2',...], prop2:['value1', 'value2',...], ...}
    for (let property in dribbbleParam) {
      let value = `${dribbbleParam[property]}`;
      let value_array = value.split("|");
      dribbbleParam[property] = value_array;
    }
    return dribbbleParam;
  }

// ############################################# REMOVING ALL TAGS #####################################################

  removePTag(str){
    return str.replace(/<p>|<\/p>/g, '');
  }

  removeATag(str, separator){
    return str.replace(/<a href=".*?"/g, separator);
  }

  removeHref(str) {
    return str.replace(/rel=".*?">|<\/a>/g, '');
  }

  removeRel(str) {
    let url = str.replace(/rel=".*?">|<\/a>/g, '');
    //remove space after 'https://' (potential bug)
    return url.replace(/\s/g, '');
  }

  removeAllTags(str, separator){
    return this.removeRel(this.removeHref(this.removeATag(str, separator)));
  }

  removeAllTagsFromArray (array){
    let array_cleaned = [];
    array.forEach(el => {
      array_cleaned.push(this.removeAllTags(el));
    });
    return array_cleaned;
  }

}

module.exports = Parser;


// current directory :
// __dirname
