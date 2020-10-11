const yargs = require("yargs");

const descripcion = {
  alias: "d",
  require: true,
  desc: "Descripción de la tarea por hacer",
};

const completado = {
  alias: "c",
  default: true,
  desc: "Marca como completado o pendiente la tarea",
};

const argv = yargs
  .command("crear", "Crea un elemento por hacer", {
    descripcion,
  })
  .command("actualizar", "Actualiza el estado completado de una tarea", {
    descripcion,
    completado,
  })
  .command("borrar", "Borra un elemento por hacer", {
    descripcion,
  })
  .help().argv;

module.exports = argv;
