import Backendless from 'backendless';

// Inicialización de Backendless
Backendless.initApp('BACDAFF0-9B05-4CDB-9E77-B8E78E248B5B', 'FF9258BC-61F2-468C-8E92-6381C6452922');

// Función para el login
export async function loginUser(email, password) {
  return Backendless.UserService.login(email, password, true);
}

// Obtener usuario autenticado actual
export async function getCurrentUser() {
  return Backendless.UserService.getCurrentUser();
}

// Función para el logout
export async function logoutUser() {
  return Backendless.UserService.logout();
}

// Función para registrar un usuario
export async function registerUser(email, password, username) {
  const user = new Backendless.User();
  user.email = email;
  user.password = password;
  user.username = username;

  return Backendless.UserService.register(user);
}

// Obtener torneos a los que el usuario está inscrito
export async function getEnrolledTournaments() {
  // Lógica para obtener los torneos desde Backendless
  return Backendless.Data.of('Tournaments').find(); // Filtrar según el usuario actual
}

// Obtener torneos destacados
export async function getFeaturedTournaments() {
  // Lógica para obtener torneos destacados
  return Backendless.Data.of('Tournaments').find({ where: "highlighted = true" });
}

// Crear torneo
export async function createTournament(tournamentData) {
  return Backendless.Data.of('Tournaments').save(tournamentData);
}

// Obtener notificaciones
export async function getNotifications() {
  return Backendless.Data.of('Notifications').find();
}
