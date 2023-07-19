import './App.css';
import { useState } from 'react';
import Header from './components/Header';
import Form from './components/Form';

function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <Header />
      {showForm && <Form onCancel={ () => setShowForm(false) } /> }
      { !showForm
      && <button onClick={ () => setShowForm(true) }>Cadastrar nova senha</button> }
    </div>
  );
}

export default App;
