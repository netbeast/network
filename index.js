function validateForm () {
  //We obtain form values.
  var x = document.forms['form']
  var pass_length = x['password'].value.length
  var pass = x['password'].value
  var pass_r = x['password_r'].value
  var channel = x['channel'].value

  if (pass !== '' || pass_r !== '') {
    if (pass_length <= 7) {
      alert('Password must be at least 8 characters long')
      return false
    }
    if (pass !== pass_r) {
      alert('Passwords missmatch')
      return false
    }
  }
  if (channel !== '') {
    if (channel>13 || channel<1) {
      alert('Channel must be between 1 and 13')
      return false
    }
  }
  return true
}
