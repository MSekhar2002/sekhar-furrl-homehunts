import React,{useCallback,useEffect} from 'react';
import { Link } from 'react-router-dom';
import './TopNav.css';
const TopNav = () => {
    const lastScrollPosition = React.useRef(0);

    const handleScroll = useCallback(() => {
        const navbarElement = document.getElementById("navbar");
        const currentScrollPosition = window.scrollY;

        if (currentScrollPosition > lastScrollPosition.current && currentScrollPosition > 100) {
            navbarElement.style.top = "-100px";
        } else {
            navbarElement.style.top = "0";
        }

        lastScrollPosition.current = currentScrollPosition;
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);
    
    return(
  <div id='navbar' className="top-nav">
    <div className="left">
      <div className="hamburger-menu"><img src='https://furrl.in/_next/static/media/Menu.b5bc5303.svg' alt='' ></img></div>
    </div>
    <div className="middle">
      <Link to="/"  style={{width:"20px"}}><img src="https://furrl.in/_next/static/media/Furrl.13550a62.svg" alt='' style={{width:"60px"}}></img></Link>
    </div>
    <div className="right">
      <Link to=""><img src='https://furrl.in/_next/static/media/Search.73a1749b.svg' alt='' ></img></Link>
      <Link to="https://furrl.in/wishlist"><img src="https://furrl.in/_next/static/media/Whislist.2ac94d87.svg" alt='' ></img></Link>
      <Link to="https://furrl.in/cart"><img src="https://furrl.in/_next/static/media/Bag.b94fa005.svg" alt='' ></img></Link>
    
    </div>
  </div>
);
}
export default TopNav;
