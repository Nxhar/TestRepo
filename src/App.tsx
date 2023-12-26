import './App.css';
import SideMenu from './Components/NavPane/SideMenu';
import CommunityPane from './Components/CommunityForum/CommunityForum';
import { Routes, Route } from 'react-router-dom';
import { auth, provider } from './_Firebase/firebaseConfig';
import { signInWithPopup, onAuthStateChanged, User } from 'firebase/auth'; // Import User type
import { useState, useEffect } from 'react';
import Post from './Components/CommunityForum/Post/Post';


function App() {
  const [user, setUser] = useState<User | null>(null); // Explicitly define User | null type
  const [userPresent, setUserPresent] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if(authUser){
        setUser(authUser);
          setUserPresent(true);
      }
      else{
        setUser(null)
        setUserPresent(false)
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleGoogleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      {!userPresent ? (
        <div>
          <div onClick={handleGoogleAuth}>Sign In With Google</div>
        </div>
      ) : (
        <div className="flexMain">
          <SideMenu user={user} />
          <Routes>
            {/* If comm forum is active link, display mid and right panes */}
            <Route path="/experiences" element={<CommunityPane user={user} />} />
            <Route path='/experiences/:id' element={<Post user={user}/>} />

          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
