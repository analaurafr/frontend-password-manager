import './App.css';
import Header from './components/Header';
import Form from './components/Form';
import FormResults from './components/FormResults';

function App() {
  return (
    <div className="app-container">
      <div className="form-container">
        <Header />
        <Form />
        <FormResults />
      </div>
    </div>
  );
}

export default App;
