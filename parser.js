class Parser {

  constructor(userInfo) {

  }

// ####################################### PARSING PARTIALS RESPONSE FROM DRIBBBLE ##########################################

  parsingInfos(userInfo){
    // parser
    // string from dribbble
    let dribbbleInfoStr = userInfo;

    // first split on ";"
    // dribbbleInfoArray => []
    const dribbbleInfoArray = dribbbleInfoStr.split(';;');

    let arraySplittedOnEquals = [];
    // split dribbbleInfoArray on "="
    // arraySplittedOnEquals = [['text_bio', 'Hello | I'm Nils...'], [...]]
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

  removeBrackets(str){
      return str.replace(/\[\[.*?\]\]/g, '');
  }

  removeStrongTag(str){
    return str.replace(/<strong>|<\/strong>/g, '');
  }
  
  removeRel(str) {
    let url = str.replace(/rel=".*?">|<\/a>/g, '');
    //remove space after 'https://' (potential bug)
    return url.replace(/\s/g, '');
  }

  removeAllTags(str, separator){
    return this.removeRel(this.removeStrongTag(this.removeHref(this.removeATag(this.removeBrackets(str), separator))));
  }


  removeAllTagsFromArray (array, separator){
    let array_cleaned = [];
    array.forEach(el => {
      array_cleaned.push(this.removeAllTags(el, separator));
    });
    return array_cleaned;
  }

  removeAllFromShotsDesc(dribbbleResponse){
    let array = [];
    for (let i=0; i < dribbbleResponse.length - 2; i++) {
      array.push(dribbbleResponse[i].description.removeLineBreak().decodeHTML());
    }
    console.log(array);

    let projectsDesc = [];
    array.forEach(project => {
      let parsingPosts = this.parsingInfos(this.removePTag(this.removeBrackets(project)));
      parsingPosts.images = this.removeAllTagsFromArray(parsingPosts.images, '');
      projectsDesc.push(parsingPosts);
      console.log("PROJET : ")
      console.log(parsingPosts);
    })
    // console.log(projectsDesc);

    return projectsDesc;
  }

}

module.exports = Parser;


// current directory :
// __dirname
