import './Form.css';

function Form() {
  return (
    <form className="question-container">
      <label className="form-label">
        Nome do serviço
        <input
          type="text"
          className="form-input"
          name="nome-do-servico"
        />
      </label>
      <br />
      <label className="form-label">
        Login
        <input
          type="text"
          className="form-input"
          name="login"
        />
      </label>
      <br />
      <label className="form-label">
        Senha
        <input
          type="password"
          className="form-input"
          name="senha"
        />
      </label>
      <br />
      <label className="form-label">
        URL
        <input
          type="text"
          className="form-input"
          name="url"
        />
      </label>
      <br />
      <br />
      <button className="button-cadastrar">Cadastrar</button>
      <button className="button-cancelar">Cancelar</button>
    </form>
  );
}

export default Form;
