function verifyToken() {
    var text = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    var possible = "";
  
    for (var i = 0; i < 3; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

  module.exports = verifyToken;