class Parser {



  constructor(userInfo) {

  }


  bioParserFunction(userInfo){
    // parser
    // string from bio dribbble
    let bio_str = userInfo;


    // first split on ";"
    // bio_array => []
    const bio_array = bio_str.split(';;');


    let array_splitted_on_equals = [];
    // split bio_array on "="
    // array_splitted_on_equals = [['text_bio', 'Hello | I'm Nils...'], [...]]
    bio_array.forEach(el => {
      array_splitted_on_equals.push(el.split("=="));
    })


    // array2d to object [[],[]] => {prop: str}
    const entries = new Map(array_splitted_on_equals);
    const user_param = Object.fromEntries(entries);


    // split les values pour obtenir des tableaux
    // en parcourant l'objet et split sur "|"
    // user_param => { prop1: ['value1','value2',...], prop2:['value1', 'value2',...], ...}
    for (let property in user_param) {
      let value = `${user_param[property]}`;
      let value_array = value.split("|");
      user_param[property] = value_array;
    }
    console.log(user_param);
  }
}

module.exports = Parser;


// current directory :
// __dirname
