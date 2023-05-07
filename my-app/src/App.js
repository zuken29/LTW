
import './App.css';
import Books from './components/Books';
import Footer from './components/Footer';
import LoginHeader from './components/LoginHeader';
import { Route, Routes } from 'react-router-dom';
import Book from './components/Book';


function App() {
  const a = "lop ltw nhom rieng"
  return (
    <div className="App">  
      <LoginHeader/>

      <Routes>
        <Route path='books' element={<Books/>}/>
        <Route path='books/:bookcode' element={<Book/>}/>
      </Routes>

      <Footer/>
    </div>
  );
}

export default App;
