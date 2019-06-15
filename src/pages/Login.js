import React, { useState, useEffect } from "react";

import AuthService from "../services/AuthService";

export default function Login(props) {
  const [credenciais, setCredenciais] = useState({
    login: "",
    senha: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    AuthService.logout();
  }, []);

  const handleLogin = async event => {
    event.preventDefault();

    setIsLoading(true);
    setMessage("Verificando...");

    let response = await AuthService.login({ credenciais });

    setIsLoading(false);

    if (!!response.token) {
      setMessage("Login verificado!");

      localStorage.setItem("passport", JSON.stringify(response));

      props.history.push("/");
    } else {
      setMessage("Login ou senha inválidos.");
    }
  };

  return (
    <section className="container">
      <div className="form-row">
        <div className="col-8 offset-2">
          <div className="card my-5 rounded-0">
            <div className="card-body text-center">
              <img
                src={`https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png`}
                alt=""
                className="img-fluid w-50"
              />

              <hr className="mb-4" />

              <form onSubmit={e => handleLogin(e)}>
                <input
                  type="text"
                  name="login"
                  value={credenciais.login}
                  onChange={e =>
                    setCredenciais({ ...credenciais, login: e.target.value })
                  }
                  autoFocus
                  required
                  disabled={isLoading}
                  placeholder="Login"
                  className="form-control form-control-sm"
                />

                <input
                  type="password"
                  name="senha"
                  value={credenciais.senha}
                  onChange={e =>
                    setCredenciais({ ...credenciais, senha: e.target.value })
                  }
                  required
                  disabled={isLoading}
                  placeholder="Senha"
                  className="form-control form-control-sm mt-2"
                />

                <div className="text-muted my-3">{message}</div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-sm btn-primary btn-block"
                >
                  Entrar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
