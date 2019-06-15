import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AppContext } from "../App";

export default function Header(props) {
  const context = useContext(AppContext);

  return (
    <header className="bg-white border-bottom">
      <div className="container-header">
        <div className="form-row py-3">
          <div className="col-2">
            <Link to="/">
              <img
                src={`https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png`}
                alt=""
                className="img-fluid"
              />
            </Link>
          </div>

          {!context.isLogged ? (
            <>
              <div className="col-1 offset-9 d-flex justify-content-end">
                <Link
                  to="/login"
                  className="nav-link text-dark d-flex align-self-center"
                >
                  <i className="material-icons">account_circle</i>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="col-4 offset-2 d-flex align-items-center">
                <input
                  type="search"
                  name="busca"
                  placeholder="Código ou nome"
                  className="form-control form-control-sm"
                />
              </div>

              <div className="col-1 offset-3 d-flex justify-content-between">
                <Link
                  to="/produtos"
                  className="nav-link text-dark d-flex align-self-center"
                >
                  <i className="material-icons">photo_camera</i>
                </Link>
                <Link
                  to="/login"
                  className="nav-link text-dark d-flex align-self-center"
                >
                  <i className="material-icons">exit_to_app</i>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
