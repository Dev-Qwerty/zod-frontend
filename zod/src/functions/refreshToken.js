import firebase from 'firebase';

let refreshToken = () => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            firebase.auth().currentUser.getIdToken(true) // here we force a refresh
            .then(function(token) {
                localStorage.setItem("token", token);
            }).catch(function(error) {
            if (error) throw error
        });
    } else {
      // No user is signed in.
      alert("User not signed in!");
    }
  });
}

export default refreshToken;