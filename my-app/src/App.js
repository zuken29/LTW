
import './App.css';
import Books from './components/Books';
import Footer from './components/Footer';
import LoginHeader from './components/LoginHeader';
import { Route, Routes } from 'react-router-dom';
import Book from './components/Book';
import Add from './components/Add';


function App() {
  //  const a = "lop ltw nhom rieng"
  return (
    <div className="App">  
      <LoginHeader/>

      <Routes>
        <Route path='/' element={<Books/>}/>
        <Route path='/books/:bookcode' element={<Book/>}/>
        <Route path='/add' element={<Add/>}/>
      </Routes>

      <Footer/>
    </div>
  );
}

export default App;
