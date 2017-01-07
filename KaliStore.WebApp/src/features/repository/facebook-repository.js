
import {DOM} from 'aurelia-pal';

export class FacebookRepository {
  constructor(usersRepository, session, router) {
    this.usersRepository = usersRepository;
    this.session = session;
    this.router = router;
  }


  init(){
    if (window.FB) {
      this._init()
    } else {
      window.fbAsyncInit = () => {
        this._init();
      };
    }

    this._initSDKScript();
  }

  _init() {
    FB.init({
      appId: '1310711985659548',
      xfbml: true,
      version: 'v2.8'
    });

    this.checkIfLoggedIn();
  }
  
  _initSDKScript(){
    // check if script alread attached
    let id = 'facebook-jssdk';
    if (DOM.getElementById(id)) return;

    // attach fb connect script
    let js = DOM.createElement('script');
    js.id = id;
    js.src = '//connect.facebook.net/bg_BG/sdk.js';
    DOM.appendNode(js, DOM.body);
  }

  login(){
    FB.login((response) => {
      console.log(response);
      this.statusChangeCallback(response);
    });
  }

  logout(){
    FB.logout((response) => {
      // Person is now logged out
      console.log(response);
    });
  }

  checkIfLoggedIn(){
    FB.getLoginStatus((response) => {
      this.statusChangeCallback(response);
    });
  }

  statusChangeCallback(response) {
    console.log(response);
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      this.loginUser(response.authResponse);
      this.message = "Logged in";
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      this.message = 'Please log into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      this.message = 'Please log into Facebook.';
    }
  }

  loginUser(authResponse) {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', {fields: 'email, name'}, (response) => {
      console.log(response);
      console.log('Successful login for: ' + response.name);
      var user = {
        fbId: response.id,
        fbToken: authResponse.accessToken,
        fullName: response.name,
        username: response.email
      };

      this.usersRepository.facebookLogin(user).then(userId => {
        this.session.loginUser(userId);
        this.router.navigate('');
      })
    });
  }
}
