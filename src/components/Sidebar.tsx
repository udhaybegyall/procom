import { Link, useLocation } from "react-router-dom";
import { ProductOutlined, SwitcherOutlined } from "@ant-design/icons";
import { useTheme } from "../theme";
import "./components.css";

export default function Sidebar() {
  const theme = useTheme();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="sidebar" style={{ backgroundColor: theme.background }}>
      <aside>
        <div className="container">
          <h2
            className="logo"
            style={{
              marginBlockStart: "0",
              marginBlockEnd: "1em",
              color: theme.text,
            }}
          >
            PC.
          </h2>

          <Link
            to="/"
            className={`sidebar-item ${isActive("/") ? "active" : ""}`}
          >
            <ProductOutlined style={{ fontSize: "1.5rem" }} />
          </Link>
          <Link
            to="/compare"
            className={`sidebar-item ${isActive("/compare") ? "active" : ""}`}
          >
            <SwitcherOutlined style={{ fontSize: "1.5rem" }} />
          </Link>
        </div>
      </aside>
    </div>
  );
}
