import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProductDetails from "./pages/ProductDetails";
import CompareProducts from "./pages/CompareProducts";
import { ThemeContext, lightTheme, darkTheme } from "./theme";

import "./App.css";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={theme}>
      <Router>
        <div className={`app ${isDarkMode ? "dark" : "light"}`}>
          <Navbar toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
          <div
            className="main-container"
            style={{ backgroundColor: theme.background }}
          >
            <Sidebar />
            <main className="content">
              <Routes>
                <Route path="/" element={<ProductDetails />} />
                <Route path="/compare" element={<CompareProducts />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;
