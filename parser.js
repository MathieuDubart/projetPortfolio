class Parser {



  constructor(userInfo) {

  }


  bioParserFunction(userInfo){
    // parser
    // console.log(userInfo.bio);
    let bio_str = userInfo.bio;

    const bio_array = bio_str.split(';');
    // console.log(bio_array);
    let bio_array2 = [];
    let bio_array3 = [];

    bio_array.forEach(el => {
      bio_array2.push(el.split("=", 2));
    })

    // for (let i=0; i<bio_array2.length; i++ ) {
    //   bio_array2[i].forEach(elm => {
    //     bio_array3.push(elm.split("|"));
    //   })
    // }

    // console.log(bio_array2);
    console.log(bio_array3);

    return bio_array2;
  }

}

module.exports = Parser;



// object js :
// const nom = new Object();
// nom.propriété = 'valeur';

// split str to array :
// const array = str.split(' ');

// var str = 'one:two;three';
// str.split(':').pop().split(';')[0]; // returns 'two'

// current directory :
// __dirname
