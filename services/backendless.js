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

  const usuario = Backendless.UserService.register(user);

  return usuario;
}

// Obtener detalles del torneo, incluyendo equipos y cupos disponibles
export async function getTournamentDetails(tournamentId) {
  try {
    const tournament = await Backendless.Data.of('Tournaments').findById(tournamentId);
    const teams = await Backendless.Data.of('Teams').find({ where: `tournament = '${tournamentId}'` });
    const maxTeams = tournament.maxTeams || 0; // Asegúrate de que `maxTeams` esté en el torneo
    const availableSlots = maxTeams - teams.length;

    return { tournament, teams, availableSlots };
  } catch (error) {
    console.error('Error al obtener los detalles del torneo:', error);
    throw error;
  }
}

export async function fetchTournamentDetailsWithSportAndTeams(tournamentId) {
  try {
    // Crear el DataQueryBuilder para cargar las relaciones 'sport' y 'teams'
    const dataQuery = Backendless.DataQueryBuilder.create().setRelated(['sport', 'teams']);

    // Buscar el torneo con el DataQueryBuilder, cargando las relaciones 'sport' y 'teams'
    const tournament = await Backendless.Data.of('Tournaments').findById(tournamentId, dataQuery);

    // Verificar si la relación 'sport' fue cargada
    if (tournament.sport) {
      console.log('Deporte asociado al torneo:', tournament.sport.name); // Suponiendo que el campo 'name' existe en la tabla de deportes
    } else {
      console.log('No se encontró el deporte asociado al torneo.');
    }

    // Verificar si la relación 'teams' fue cargada
    if (tournament.teams && tournament.teams.length > 0) {
      console.log('Equipos en el torneo:', tournament.teams);
    } else {
      console.log('No se encontraron equipos en el torneo.');
    }

    return tournament;

  } catch (error) {
    console.error('Error al cargar el torneo o sus relaciones:', error.message);
    throw error;
  }
}


// Crear un equipo
export async function createTeamAndAddToTournament(tournamentId, teamName, currentUserId, sportName) {
  try {
    // Obtener el deporte asociado con el nombre proporcionado
    const sport = await Backendless.Data.of('Sports').findFirst({ where: `name = '${sportName}'` });
    if (!sport) {
      throw new Error(`El deporte '${sportName}' no existe.`);
    }

    // Crear el nuevo equipo
    const newTeam = {
      name: teamName,
      sport: { __meta: '1:1', objectId: sport.objectId }, // Relación uno a uno con el deporte
      players: [currentUserId], // Lista de jugadores inicial con el creador
      createdAt: new Date(),
    };

    // Guardar el equipo
    const savedTeam = await Backendless.Data.of('Teams').save(newTeam);

    // Establecer la relación entre el equipo y el torneo
    await Backendless.Data.of('Tournaments').addRelation(tournamentId, 'teams', [savedTeam.objectId]);

    // Establecer la relación entre el equipo y el usuario líder
    await Backendless.Data.of('Teams').addRelation(savedTeam.objectId, 'leader', [currentUserId]);

    // Establecer la relación entre el torneo y el equipo
    await Backendless.Data.of('Teams').addRelation(savedTeam.objectId, 'tournament', [tournamentId]);

    return { team: savedTeam };
  } catch (error) {
    console.error('Error al crear el equipo o asociarlo al torneo:', error);
    throw error;
  }
}



// Crear solicitud para unirse a un equipo
export async function requestToJoinTeam(teamId, userId) {
  try {
    // Obtener el equipo con las relaciones 'sport' y 'players'
    const team = await Backendless.Data.of('Teams').findById(teamId, {
      loadRelations: ['sport', 'players'], // Cargar las relaciones sport y players
    });

    // Verificar si el equipo tiene una relación con el deporte
    if (!team.sport) {
      throw new Error('No se pudo determinar el deporte del equipo.');
    }

    // Obtener el límite de jugadores del deporte asociado
    const maxPlayers = team.sport.maxPlayersPerTeam;

    // Verificar el número actual de jugadores en el equipo
    const currentPlayers = team.players ? team.players.length : 0;

    if (currentPlayers >= maxPlayers) {
      throw new Error(`El equipo ya alcanzó el límite de ${maxPlayers} jugadores.`);
    }

    // Agregar el nuevo jugador a la relación "players" del equipo
    await Backendless.Data.of('Teams').addRelation(teamId, 'players', [userId]);

    // Crear un registro en la tabla TeamRequests para gestionar la solicitud
    const request = {
      team: { objectId: teamId },
      user: { objectId: userId },
      status: 'Pending', // La solicitud está pendiente de aprobación por el líder del equipo
    };

    return await Backendless.Data.of('TeamRequests').save(request);
  } catch (error) {
    console.error('Error al crear la solicitud:', error);
    throw error;
  }
}




// Enviar notificación al líder del equipo
export async function sendNotificationToLeader(teamId, userId) {
  try {
    const team = await Backendless.Data.of('Teams').findById(teamId);
    const leader = team.members[0]; // Suponemos que el líder está en la primera posición

    const notification = {
      toUser: { objectId: leader.objectId },
      message: `El usuario con ID ${userId} ha solicitado unirse a tu equipo en el torneo.`,
    };

    return await Backendless.Data.of('Notifications').save(notification);
  } catch (error) {
    console.error('Error al enviar la notificación:', error);
    throw error;
  }
}




export async function getOrganizedTournaments() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new Error('No se pudo obtener el usuario actual');
    }

    const query = { where: `ownerId = '${currentUser.objectId}'` };
    return Backendless.Data.of('Tournaments').find(query);
  } catch (error) {
    console.error('Error al obtener los torneos organizados:', error);
    throw error;
  }
}

export async function getEnrolledTournaments() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new Error('No se pudo obtener el usuario actual');
    }

    // Construir la consulta para encontrar torneos en los que el usuario esté en alguno de los equipos
    const query = {
      where: `teams.players LIKE '%${currentUser.objectId}%'`
    };

    // Ejecutar la consulta y devolver los torneos encontrados
    return Backendless.Data.of('Tournaments').find(query);
  } catch (error) {
    console.error('Error al obtener los torneos inscritos:', error);
    throw error;
  }
}


// Obtener torneos destacados
export async function getFeaturedTournaments() {
  // Lógica para obtener torneos destacados
  return Backendless.Data.of('Tournaments').find({ where: "highlighted = true" });
}

//
export async function getSport(sportId) {
  return Backendless.Data.of('Sports').findById(sportId);
}

// Crear torneo
export async function createTournament(tournamentData) {
  return Backendless.Data.of('Tournaments').save(tournamentData);
}

// Obtener notificaciones
export async function getNotifications() {
  return Backendless.Data.of('Notifications').find();
}