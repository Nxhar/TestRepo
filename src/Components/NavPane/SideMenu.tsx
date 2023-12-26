import './sidebar.css';
import HomeIcon from '@mui/icons-material/Home';
import MessageIcon from '@mui/icons-material/Message';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink } from 'react-router-dom';
import { auth } from '../../_Firebase/firebaseConfig';
import { signOut } from 'firebase/auth';


interface SideMenuProps {
  user: {
    photoURL: string;
    displayName: string;
    email: string;
  };
}

function SideMenu({ user }: SideMenuProps): JSX.Element {
  const userIcon = user.photoURL;

  const handleLogOut = () => {
    signOut(auth)
  }

  return (
    <div className="sidebar">
      <div className="title">Comms</div>

      {/* <a href='http://localhost:5173/' className='option' >
        <HomeIcon />
        Home
      </a> */}

      <NavLink
        to="/experiences"
        className={({ isActive, isPending }) =>
          isPending ? 'pending' : isActive ? 'activeLink option' : 'option'
        }
      >
        <MessageIcon />
        Experiences
      </NavLink>



      
      <div className="option" style={{cursor:'pointer'}} onClick={handleLogOut}>
        <LogoutIcon /> 
        Logout
      </div>

      <div className="profile">
        <img className="profile-iconHere" src={userIcon} alt="" />
        <div className="textIn">
          <div className="name">{user.displayName}</div>
          <div className="email">{user.email}</div>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
