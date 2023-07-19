import { useState } from 'react';
import './Form.css';

interface Service {
  id: string;
  nameService: string;
  login: string;
  password: string;
  url: string;
}

interface FormVisibility {
  onCancel: () => void;
}

function Form({ onCancel }: FormVisibility) {
  const [formData, setFormData] = useState<Service>({
    id: '',
    nameService: '',
    login: '',
    password: '',
    url: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [hidePasswords, setHidePasswords] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validateForm();
  };

  const isNomeServicoValid = formData.nameService.length > 0;
  const isLoginValid = formData.login.length > 0;
  const isSenhaValid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/.test(
    formData.password,
  );

  const validateForm = () => {
    setIsFormValid(isNomeServicoValid && isLoginValid && isSenhaValid);
  };

  const getPasswordValidationMessage = (isValid: boolean, message: string) => {
    const className = isValid ? 'valid-password-check' : 'invalid-password-check';
    return <div className={ className }>{message}</div>;
  };

  const handleCadastro = (event: React.FormEvent) => {
    event.preventDefault();

    const newService: Service = {
      id: Date.now().toString(),
      nameService: formData.nameService,
      login: formData.login,
      password: formData.password,
      url: formData.url,
    };

    setServices((prevServices) => [...prevServices, newService]);
    setFormData({
      id: '',
      nameService: '',
      login: '',
      password: '',
      url: '',
    });
  };

  const handleRemove = (id: string) => {
    setServices((prevServices) => prevServices.filter((service) => service.id !== id));
  };

  const toggleHidePasswords = () => {
    setHidePasswords((prevState) => !prevState);
  };

  return (
    <div>
      <form onSubmit={ handleCadastro }>
        <div>
          <label htmlFor="nameService">Nome do serviço</label>
          <input
            type="text"
            id="nameService"
            name="nameService"
            value={ formData.nameService }
            onChange={ handleChange }
          />

          <label htmlFor="login">Login</label>
          <input
            type="text"
            id="login"
            name="login"
            value={ formData.login }
            onChange={ handleChange }
          />

          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            value={ formData.password }
            onChange={ handleChange }
          />

          <label htmlFor="url">URL</label>
          <input type="text" id="url" name="url" onChange={ handleChange } />
        </div>

        {getPasswordValidationMessage(
          formData.password.length >= 8,
          'Possuir 8 ou mais caracteres',
        )}
        {getPasswordValidationMessage(
          formData.password.length <= 16,
          'Possuir até 16 caracteres',
        )}
        {getPasswordValidationMessage(
          /(?=.*[A-Za-z])(?=.*\d)/.test(formData.password),
          'Possuir letras e números',
        )}
        {getPasswordValidationMessage(
          /(?=.*[@$!%*#?&])/.test(formData.password),
          'Possuir algum caractere especial',
        )}

        <br />
        <br />
        {services.length === 0 ? (
          <button type="submit" disabled={ !isFormValid }>
            Cadastrar
          </button>
        ) : (
          <>
            <button type="button" onClick={ onCancel }>
              Cadastrar nova senha
            </button>
            <ul>
              {services.map((service) => (
                <li key={ service.id }>
                  <a href={ service.url }>{service.nameService}</a>
                  <p>
                    Login:
                    {' '}
                    {service.login}
                  </p>
                  <p>
                    Senha:
                    {' '}
                    {hidePasswords ? '******' : service.password}
                  </p>
                  <button
                    type="button"
                    onClick={ () => handleRemove(service.id) }
                    data-testid="remove-btn"
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
        <button type="button" onClick={ onCancel }>
          Cancelar
        </button>
      </form>
      {services.length === 0 && <p data-testid="no-password">Nenhuma senha cadastrada</p>}
      <label>
        <input
          type="checkbox"
          checked={ hidePasswords }
          onChange={ toggleHidePasswords }
        />
        Esconder senhas
      </label>
    </div>
  );
}

export default Form;
