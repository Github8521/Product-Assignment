import LoadingBar from 'react-top-loading-bar';
import NavBar from './components/NavBar';
import News from './components/Product';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useState } from 'react';

const App = () => {
  const [progress, setprogress] = useState(0)
  const setProgress = (progress) => {
    setprogress(progress)
  }
  return (
    <div>
      <Router>
        <NavBar />
        <LoadingBar
          height={3}
          color='#f11946'
          progress={progress}
        />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} />}> </Route>
        </Routes>
      </Router>
    </div>
  )
}


export default App
