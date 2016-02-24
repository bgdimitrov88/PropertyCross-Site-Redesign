var getIssuesCount = function() {
    var buttons = document.getElementsByClassName('github-issue-count-button');
    for (var i = 0; button = buttons[i], i < buttons.length; i++) {
      var url = button.href
        .replace(/https:\/\/github\.com/, 'https://api.github.com/repos');
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.onload = function(e) {
          var count = JSON.parse(e.target.responseText).length;
          
          // 0 or undefined
          var label = "No known issues";
          
          if(count === 1) {
            label = "1 Known issue";
          } else if(count > 1 && count <= 30) {
            label = count + " Known issues";
          } else if(count > 30) {
            label = "30+ Known issues";
          }
          
          this.innerHTML = label;
      }.bind(button);
      xhr.send();
    }
};

var getRecentActivities = function() {
  
};

var getContributorsInfo = function() {
  var profiles = document.getElementsByClassName('profile');
  for (var i = 0; profile = profiles[i], i < profiles.length; i++) {
    var user = profile.getAttribute('data-user');
    var url = 'https://api.github.com/users/' + user;
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function(e) {      
      if(e.target.status === 200) {
        var result = JSON.parse(e.target.responseText);
        var login = result.login.toLowerCase();
        var companySpan = this.getElementsByClassName(login + '-company');
        var locationSpan = this.getElementsByClassName(login + '-location');
        var locationFullSpan = this.getElementsByClassName(login + '-location-full');
        var emailSpan = this.getElementsByClassName(login + '-email');
        var emailFullSpan = this.getElementsByClassName(login + '-email-full');
        
        if(companySpan[0] && result.company) {
          companySpan[0].innerHTML = result.company;
        }
        
        if(locationSpan[0] && result.location) {
          var locationShort = result.location;
          
          if(locationShort.length > 24) {
            locationShort = result.location.substring(0,23) + '...';
          }
          locationSpan[0].setAttribute('title', result.location);
          locationSpan[0].innerHTML = locationShort;
        }
        
        if(locationFullSpan[0] && result.location) {
          locationFullSpan[0].innerHTML = result.location;
        }
        
        if(emailSpan[0] && result.email) {
          var emailShort = result.email;
          
          if(emailShort.length > 24) {
            emailShort = result.email.substring(0,23) + '...';
          }
          
          emailSpan[0].setAttribute('title', result.email);
          emailSpan[0].innerHTML = '<a href="mailto:' + result.email +'">' + emailShort + '</a>';
        }
        
        if(emailFullSpan[0] && result.email) {
          emailFullSpan[0].innerHTML = '<a href="mailto:' + result.email +'">' + result.email + '</a>';
        }
      }    
    }.bind(profile);
    xhr.send();
  }
};

(function() {
  getIssuesCount();
  getRecentActivities();
  getContributorsInfo();
})();