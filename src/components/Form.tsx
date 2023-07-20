import React, { useState } from 'react';
import './Form.css';
import Swal from 'sweetalert2';

// estado inicial do formulário
const initialFormValues = {
  name: '',
  login: '',
  password: '',
  url: '',
};

// constantes para as classes de validação de senha
const invalidPasswordCheck = 'invalid-password-check';
const validPasswordCheck = 'valid-password-check';

function Form() {
  // Estado para controlar a exibição do formulário
  const [form, setForm] = useState(false);
  // Estado para armazenar os valores do formulário
  const [formValues, setFormValues] = useState(initialFormValues);
  // Estado para armazenar a lista de formulários cadastrados
  const [formList, setFormList] = useState<{
    name: string; login: string; password: string; url: string; }[]>([]);
  // Estado para armazenar as validações de senha
  const [validation, setValidation] = useState({
    minLength: invalidPasswordCheck,
    maxLength: invalidPasswordCheck,
    lettersAndNumbers: invalidPasswordCheck,
    hasSpecialChar: invalidPasswordCheck,
  });
  // Estado para controlar o checkbox "Esconder senhas"
  const [hidePasswords, setHidePasswords] = useState(false);

  // Função para limpar todos os campos do formulário
  const resetForm = () => {
    setFormValues(initialFormValues);
    resetValidation();
  };

  // Função para redefinir as validações de senha
  const resetValidation = () => {
    setValidation({
      minLength: invalidPasswordCheck,
      maxLength: invalidPasswordCheck,
      lettersAndNumbers: invalidPasswordCheck,
      hasSpecialChar: invalidPasswordCheck,
    });
  };

  // Função para remover um formulário da lista pelo ID
  const removeFormById = (id: string) => {
    setFormList((prevFormList) => prevFormList.filter((formData) => formData.url !== id));
  };

  // Função para salvar um formulário na lista
  const addFormToList = () => {
    setFormList((prevFormList) => [...prevFormList, formValues]);
    resetForm();
    setForm(false);

    // alerta usando SweetAlert2
    Swal.fire({
      icon: 'success',
      title: 'Serviço cadastrado com sucesso',
      showConfirmButton: false,
      timer: 1500, // 1.5 segundos
    });
  };

  // Função para atualizar o estado do formulário conforme os campos são preenchidos
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    const { value } = event.target;
    setFormValues({ ...formValues, [field]: value });
    if (field === 'password') {
      validatePassword({ password: value });
    }
  };

  // Função para validar a senha e atualizar o estado de validação
  const validatePassword = ({ password }: { password: string }) => {
    const validations = {
      minLength: password.length >= 8 ? validPasswordCheck : invalidPasswordCheck,
      maxLength: password.length <= 16 ? validPasswordCheck : invalidPasswordCheck,
      lettersAndNumbers: /\d/.test(password) && /[a-zA-Z]/.test(password) ? validPasswordCheck : invalidPasswordCheck,
      hasSpecialChar: /[^a-zA-Z0-9]/.test(password) ? validPasswordCheck : invalidPasswordCheck,
    };
    setValidation(validations);
  };

  // Função para verificar a validade do formulário
  const isFormValid = () => {
    const { name, login, password } = formValues;

    const validations = [
      name !== '',
      login !== '',
      password.length >= 8,
      password.length <= 16,
      /\d/.test(password),
      /[a-zA-Z]/.test(password),
      /[^a-zA-Z0-9]/.test(password),
    ];

    return validations.every((isValid) => isValid);
  };

  return (
    <div className="form-container">
      {form && (
        <div>
          <label htmlFor="name">Nome do Serviço</label>
          <input
            type="text"
            id="name"
            value={ formValues.name }
            onChange={ (event) => handleInputChange(event, 'name') }
          />
          <label htmlFor="login">Login</label>
          <input
            type="text"
            id="login"
            value={ formValues.login }
            onChange={ (event) => handleInputChange(event, 'login') }
          />
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={ formValues.password }
            onChange={ (event) => handleInputChange(event, 'password') }
          />
          <label htmlFor="url">URL</label>
          <input
            type="text"
            id="url"
            value={ formValues.url }
            onChange={ (event) => handleInputChange(event, 'url') }
          />
          <button disabled={ !isFormValid() } onClick={ addFormToList }>
            Cadastrar
          </button>
          <button onClick={ () => setForm(false) }>Cancelar</button>
          <div>
            <p className={ `form-validation ${validation.minLength}` }>
              Possuir 8 ou mais caracteres
            </p>
            <p className={ `form-validation ${validation.maxLength}` }>
              Possuir até 16 caracteres
            </p>
            <p className={ `form-validation ${validation.lettersAndNumbers}` }>
              Possuir letras e números
            </p>
            <p className={ `form-validation ${validation.hasSpecialChar}` }>
              Possuir algum caractere especial
            </p>
          </div>
        </div>
      )}

      {!form && (
        <>
          <button onClick={ () => setForm(true) }>Cadastrar nova senha</button>
          <div>
            <input
              type="checkbox"
              id="hidePasswordsCheckbox"
              checked={ hidePasswords }
              onChange={ () => setHidePasswords(!hidePasswords) }
            />
            <label htmlFor="hidePasswordsCheckbox">Esconder senhas</label>
          </div>
          {formList.length === 0 && <p>Nenhuma senha cadastrada</p>}
        </>
      )}

      {formList.length > 0 && (
        <div>
          {formList.map((formInfo) => (
            <div key={ formInfo.url }>
              <a href={ formInfo.url }>{ formInfo.name }</a>
              <p>{ formInfo.login }</p>
              <p>{ hidePasswords ? '******' : formInfo.password }</p>
              <button
                data-testid="remove-btn"
                onClick={ () => removeFormById(formInfo.url) }
              >
                Apagar cadastro
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Form;
