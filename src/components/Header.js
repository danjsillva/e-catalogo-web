import React from "react";
import { Link } from "react-router-dom";

import "./Header.scss";

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/">
          <img
            src={`https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png`}
            alt=""
            style={{ width: "120px" }}
          />
        </Link>
        <span>
          {/* <i class="material-icons">menu</i> */}
          <Link to="/produtos" className="text-dark mr-4">
            <i class="material-icons">photo_camera</i>
          </Link>
          <Link to="/categorias" className="text-dark mr-4">
            <i class="material-icons">local_offer</i>
          </Link>
          <Link to="/laboratorios" className="text-dark">
            <i class="material-icons">local_pharmacy</i>
          </Link>
        </span>
      </div>
    </header>
  );
}
