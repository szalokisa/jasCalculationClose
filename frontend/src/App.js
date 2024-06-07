import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginData from './repository/LoginDataLocalSystem';
import UnderConstruction from './Pages/UnderConstruction/UnderConstruction';
import NoPage from './Pages/NoPage/NoPage';
import ListViewCalculations from './Pages/ListViewCalculations/ListviewCalculations';

function App() {
  const language = getLanguage();
  const loginData = new LoginData();

  function getLanguage() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('language') || 'en';
  }

  return (
    <div className="App">
      <header className="App-header">
      </header>

      <BrowserRouter>
        <Routes>
          <Route path="/listview/CALCULATIONS"
            element={<ListViewCalculations
              language={language}
              loginData={loginData}
            />}
          />
          <Route path="/underconstruction"
            element={<UnderConstruction
              language={language}
            />}
          />
          <Route path="*"
            element={<NoPage
              language={language} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
