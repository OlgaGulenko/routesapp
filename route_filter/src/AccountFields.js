// const React = require('react')
//
// const AccountFields = React.createClass({
//   render: function() {
//     return ( <div>
//       <label>Email</label>
//       <input type="email"
//              ref="email"
//              defaultValue={ this.props.fieldValues.email } />
//
//       <label>Password</label>
//       <input type="password"
//              ref="password"
//              defaultValue={ this.props.fieldValues.password } />
//
//       <button onClick={ this.saveAndContinue }>Save and Continue</button></div>
//     )
//   },
//
//   saveAndContinue: function(e) {
//     e.preventDefault()
//
//     // Get values via this.refs
//     const data = {
//       password : this.refs.password.getDOMNode().value,
//       email    : this.refs.email.getDOMNode().value,
//     }
//
//     this.props.saveValues(data)
//     this.props.nextStep()
//   }
// })
//
// module.exports = AccountFields
