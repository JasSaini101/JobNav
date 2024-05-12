import './App.css';
import Navbar from "./components/Navbar";

import {
    HashRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import DetailedPage from './pages/DetailedPage';
import HomePage from './pages/homePage';
import BasicPage from './pages/BasicPage';
import ResultsPage from './pages/ResultsPage';


function App() {

  
  return (
    <><Router>
      <Navbar />
      <Routes>
        <Route path="/starter_helpi/" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/detailedPage" element={<DetailedPage />} />
        <Route path="/BasicPage" element={<BasicPage/>}/>
        <Route path="/ResultsPage" element={<ResultsPage/>}/>
      </Routes>

    </Router>
    <div className="App"></div>
      <div className='app-footer'>
        <p style={{paddingTop: "8px"}}>Jobnav.com©</p>
        <p>Developed by Saini, Le, Torres, and Walsh</p>
        <p style={{paddingBottom: "8px"}}>For more information, email jassaini@udel.edu</p>
      </div>
    </>
  );
}

export default App;
