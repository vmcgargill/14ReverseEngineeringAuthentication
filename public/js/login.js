$(document).ready(function() {
  // Getting references to our form and inputs
  var loginForm = $("form.login");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();

    if (emailInput.val().trim() === "") {
      $("#alert .msg").text("Error: Email address cannot be null");
      $("#alert").fadeIn(500);
    }
  
    if (passwordInput.val().trim() === "") {
      $("#alert .msg").text("Error: Password cannot be null");
      $("#alert").fadeIn(500);
    }
    
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(function() {
        window.location.replace("/members");
        // If there's an error, log the error
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text("Error: Username or Password is incorrect. Please try again.");
    $("#alert").fadeIn(500);
  }
});
