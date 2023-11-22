import React, { useState } from "react"
import './styles.css'

function index() {
  const [msj, setMsj] = useState("");
  const [match, setMatch] = useState(false);
  const [data, setData] = useState({})


  function handleSubmit(event) {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.target))
    passValidation(data.pass, data.repPass, event.target)
    setData(data)
  }

  function passValidation(pass1, pass2, element) {
    if(pass1 !== pass2 ) {
      setMsj("Las contraseñas no coniciden")
      setMatch(false)
      element.querySelector(".continuar").setAttribute("disabled", true)
    } else {
      setMsj("Las contraseñas coinciden")
      setMatch(true)
      element.querySelector(".continuar").removeAttribute("disabled")
    }
  }

  function hadleResetForm() {
    const click_event = new CustomEvent('click')
    document.querySelector(".btn-close").dispatchEvent(click_event)
    const form = document.querySelector("form")
    form.reset()
    setMsj("")
    document.querySelector(".continuar").setAttribute("disabled", true)
  }

  return (
    <>
      <section className="d-flex justify-content-center align-items-center">

      <form onSubmit={handleSubmit} className="container d-flex flex-column align-items-center bg-body-tertiary my-5 gap-2 p-3 rounded border" action="submit">
        <label className="form-label">
          Nombre
          <input type="text" name="nombre" id="nombre" className="form-control" required />
        </label>
        <label className="form-label">
          Apellido
          <input type="text" name="apellido" id="apellido" className="form-control" required />
        </label>
        <label className="form-label">
          Email
          <input type="email" name="email" id="email" className="form-control" required />
        </label>
        <label className="form-label">
          Teléfono
          <input type="tel" name="tel" id="tel" className="form-control" required />
        </label>
        <label className="form-label">
          Password
          <input type="password" name="pass" id="pass" className="form-control" required />
        </label>
        <label className="form-label">
          Confirmar password
          <input type="password" name="repPass" id="repPass" className="form-control" required />
        </label>
        <small className={`msj mb-2 ${match ? "text-success" : "text-danger"}`}>{msj}</small>
        <span className="d-flex gap-4">
          <button className="btn btn-primary" type="submit">Validar</button>
          <button className="continuar btn btn-primary" disabled data-bs-toggle="modal" data-bs-target="#confirmModal">Continuar</button>
        </span>
      </form>

      </section>

      <div className="modal fade" id="confirmModal" tabIndex="-1" aria-labelledby="confirmModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="confirmModalLabel">Confirme sus datos</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Nombre: <span className="font-monospace text-primary">{data.nombre}</span></p>
              <p>Apellido: <span className="font-monospace text-primary">{data.apellido}</span></p>
              <p>Email: <span className="font-monospace text-primary">{data.email}</span></p>
              <p>Teléfono: <span className="font-monospace text-primary">{data.tel}</span></p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={hadleResetForm}>Enviar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default index
