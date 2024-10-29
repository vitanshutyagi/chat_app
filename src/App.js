import './App.css';
  import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <div className="">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/chat/:userId' element={<ChatPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
