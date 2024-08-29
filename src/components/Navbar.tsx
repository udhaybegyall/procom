import { UserOutlined } from "@ant-design/icons";
import { useTheme } from "../theme";
import "./components.css";

interface NavbarProps {
  toggleDarkMode: () => void;
}

export default function Navbar({ toggleDarkMode }: NavbarProps) {
  const theme = useTheme();

  return (
    <nav
      className="navbar"
      style={{ backgroundColor: theme.background, color: theme.text }}
    >
      <div className="logo"></div>
      <div className="nav-items">
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
          Toggle Dark Mode
        </button>
        <UserOutlined className="user-icon" />
      </div>
    </nav>
  );
}
