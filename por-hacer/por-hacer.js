const fs = require("fs");

let listadoPorHacer = [];

const guardarDB = () => {
  const data = JSON.stringify(listadoPorHacer);

  fs.writeFile("db/data.json", data, (err) => {
    if (err) {
      throw new Error("No se pudo grabar la tarea");
    }
  });
};

const cargarDB = () => {
  try {
    listadoPorHacer = require("../db/data.json");
  } catch (error) {
    listadoPorHacer = [];
  }
};

const crear = (descripcion) => {
  const porHacer = {
    descripcion,
    completado: false,
  };

  cargarDB();

  listadoPorHacer.push(porHacer);

  guardarDB();

  return porHacer;
};

const getListado = () => {
  cargarDB();

  return listadoPorHacer;
};

const actualizar = (descripcion, completado = true) => {
  cargarDB();

  const index = listadoPorHacer.findIndex(
    (tarea) => tarea.descripcion === descripcion
  );

  if (index !== -1) {
    listadoPorHacer[index].completado = completado;
    listadoPorHacer[index].descripcion = descripcion;

    guardarDB();

    return true;
  } else {
    return false;
  }
};

const borrar = (descripcion) => {
  cargarDB();

  const nuevoListado = listadoPorHacer.filter(
    (tarea) => tarea.descripcion !== descripcion
  );

  if (nuevoListado.length === listadoPorHacer.length) {
    return false;
  } else {
    listadoPorHacer = nuevoListado;
    guardarDB();
    return true;
  }
};

module.exports = {
  crear,
  getListado,
  actualizar,
  borrar,
};
