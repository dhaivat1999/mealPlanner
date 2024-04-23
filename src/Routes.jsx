// Routes.js
import React from "react";
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Search from "./components/Search";
import CalCalculator from "./components/CalCalculator";

const AppRoutes = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/calculate" element={<CalCalculator />} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default AppRoutes;


// function App() {
//     return (
//         <Router>
//             <Switch>
//                 <Route path="/" exact component={Home} />
//                 <Route path="/about" component={About} />
//                 {/* Add more routes here */}
//             </Switch>
//         </Router>
//     );
// }

