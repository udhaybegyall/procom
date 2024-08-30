import { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { ThemeContext, lightTheme, darkTheme } from "./theme";

// Lazy loading the pages
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const CompareProducts = lazy(() => import("./pages/CompareProducts"));

import "./App.css";
import { ProductComparisonProvider } from "./contexts/ProductComparisonContext";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={theme}>
      <ProductComparisonProvider>
        <Router>
          <div className={`app ${isDarkMode ? "dark" : "light"}`}>
            <Navbar toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
            <div
              className="main-container"
              style={{ backgroundColor: theme.background }}
            >
              <Sidebar />
              <main className="content">
                <Suspense fallback={<div>Loading...</div>}>
                  <Routes>
                    <Route path="/" element={<ProductDetails />} />
                    <Route path="/compare" element={<CompareProducts />} />
                  </Routes>
                </Suspense>
              </main>
            </div>
          </div>
        </Router>
      </ProductComparisonProvider>
    </ThemeContext.Provider>
  );
}

export default App;
