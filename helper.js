const isImg = (string) =>{
    let regex = /(https?:\/\/.*)/
    let test = regex.test(string)
    return test
}
const alternate = (array1, array2) =>{
  // on crée un tableau vide qui va contenir les valeurs alternées
  let newArray = [];
  let bool = true;
  // on parcours les deux tableaux
  for (let i = 0; i < array1.length; i++){
    if(bool){
      // on ajoute les valeurs alternées dans le tableau newArray
      newArray.push(array2[i]);
      newArray.push(array1[i]);
      bool = false;
    }else{
      newArray.push(array1[i]);
      newArray.push(array2[i]);
      bool = true;
    }
  }
  // on retourne le tableau newArray
  return newArray;
}

module.exports = {
  isImg: isImg,
  alternate: alternate
}
