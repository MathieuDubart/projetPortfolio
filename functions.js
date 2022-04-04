const isImg = (string) =>{
    let regex = /(https?:\/\/.*)/
    let test = regex.test(string)
    return test
}

module.exports = {
  isImg: isImg
}
