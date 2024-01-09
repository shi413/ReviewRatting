const bcrypt = require('bcrypt');

let hashPass = async(simplepassword)=>{
  const saltRounds = 10;
  let hasspassword = await bcrypt.hashSync(simplepassword, saltRounds);
  return hasspassword
}
let comparePassword = async(simplepassword,hasspassword)=>{
    let compared = await bcrypt.compare(simplepassword,hasspassword);
    return compared
}

module.exports = {hashPass,comparePassword};
