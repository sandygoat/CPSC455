import classes from "./NavBar.module.css";
import {Link} from "react-router-dom";
import {HomeOutlined, LikeOutlined, UserOutlined} from "@ant-design/icons";

function NavBar() {
    return (
        <div>
            <header className={classes.header}>
                <Link to="/" className={classes.navIconBox}>
                    <HomeOutlined className={classes.navIcon} />
                </Link>
                <Link to="/favorites" className={classes.navIconBox}>
                    <LikeOutlined className={classes.navIcon} />
                </Link>
                <Link to="/profile" className={classes.navIconBox}>
                    <UserOutlined className={classes.navIcon}/>
                </Link>
            </header>
        </div>
    )
}

export default NavBar;