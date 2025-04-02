import { useState } from 'react';
import './App.css'
import { ReloadCTX } from './contexts/reload';
import { Route, Routes } from 'react-router-dom';
import BaseLayout from './layouts/BaseLayout';
import Home from './pages/home/home';
import Login from './pages/login/login';
function App() {
  const [reload, setReload] = useState(true);

  return (
    <ReloadCTX.Provider value={[reload, setReload]}>
      <Routes>
        <Route path='/' element={<BaseLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path='/login' element={<Login />} />
      </Routes>
    </ReloadCTX.Provider>
  )
}

export default App