(function($) {
	// Lleva la situación de la siguiente figura para escribirla en pantalla
	var PUNTERO = 'X';

	// Establece si ya existe un ganador del juego
	var GANADOR = false;

	// Contabiliza las casillas que faltan para llenar el cuadro
	var CUADRO = 0;

	// Figura de la última casilla jugada
	var ULTIMO_PUNTERO = '';

	$(document).ready(function() {
		// iniciar juego

			$.fn.iniciar();

			$('#start').click(function() {
				$.fn.iniciar();
			});

			$('#clear').click(function() {
				$.fn.iniciar();
				$('#val-x').text('0');
				$('#val-o').text('0');
				$('#val-empate').text('0');
			});

			$('#juego div div').click(function() {
				var bloqueo = false;
				if (!GANADOR) {
					$.fn.escribir($(this));
					if (CUADRO == 9) {
						bloqueo = true;
					}
				} else {
					bloqueo = true;
				}

				if (bloqueo) {
					$.fn.resultados();
					alert('La partida ya terminó');
					return false;
				}
			});

		});

	// Funcion que inicia una nueva partida inicializando las variables
	$.fn.iniciar = function() {

		$('#juego div div').each(function(i) {
			$(this).text('.');
		});

		// PUNTERO = 'X';
		GANADOR = false;
		CUADRO = 0;
		ULTIMO_PUNTERO = '';

		$.fn.sortear();
		$.fn.turno();
	};

	// Funcion que determina el nombre del jugador
	$.fn.nombreJugador = function() {
		if (PUNTERO == 'X') {
			return 'EQUIS';
		} else if (PUNTERO == '0') {
			return 'CERO';
		}
	};

	// Funcion que inicializa el juego eliminando las puntuaciones
	// almacenadas
	$.fn.paso = function() {
		if (PUNTERO == 'X') {
			PUNTERO = '0';
		} else if (PUNTERO == '0') {
			PUNTERO = 'X';
		}
		++CUADRO;
		$.fn.turno();

	};

	// Realiza un sorteo para verificar que jugador iniciará
	// el torneo
	$.fn.sortear = function() {
		var random_number = Math.floor(Math.random() * 100);
		var nom;
		if (random_number % 2 == 0) {
			PUNTERO = 'X';
			nom = 'EQUIS';
		} else {
			PUNTERO = '0';
			nom = 'CERO';
		}
		alert('Iniciará la partida: ' + $.fn.nombreJugador());
	};

	// Función que permite determinar que jugador realizará
	// el próximo movimiento
	$.fn.turno = function() {
		if (!GANADOR) {
			var futuro = CUADRO + 1;
			if (CUADRO < 9) {
				$('#jugador').text(
						'Turno ' + futuro + ' para: ' + $.fn.nombreJugador());
			} else {
				$('#jugador').text('Espera nueva partida');
			}
		} else {
			$('#jugador').text('Espera nueva partida');
		}
	};

	// Función que realiza la impresión en pantalla de la figura
	$.fn.escribir = function(div) {
		if (div.text() == '.') {
			div.text(PUNTERO);
			$.fn.hayGanador(div);
			$.fn.paso();
		}
	};

	// Determina si hay un ganador en el juego
	$.fn.hayGanador = function(div) {
		var id = div.attr('id');
		var x = id.substring(1, 2);
		var y = id.substring(2, 3);

		// misma fila
		var id1 = $('#i' + x + '1').text();
		var id2 = $('#i' + x + '2').text();
		var id3 = $('#i' + x + '3').text();

		if (PUNTERO == id1 && PUNTERO == id2 && PUNTERO == id3) {
			GANADOR = true;
		}

		// misma columna
		id1 = $('#i1' + y).text();
		id2 = $('#i2' + y).text();
		id3 = $('#i3' + y).text();
		
		if (PUNTERO == id1 && PUNTERO == id2 && PUNTERO == id3) {
			GANADOR = true;
		}

		// misma diagonal
		id1 = $('#i11').text();
		id2 = $('#i22').text();
		id3 = $('#i33').text();
		
		if (PUNTERO == id1 && PUNTERO == id2 && PUNTERO == id3) {
			GANADOR = true;
		}

		// misma diagonal 2
		id1 = $('#i13').text();
		id2 = $('#i22').text();
		id3 = $('#i31').text();
		
		if (PUNTERO == id1 && PUNTERO == id2 && PUNTERO == id3) {
			GANADOR = true;
		}

		if (GANADOR) {
			alert('Gana partida jugador: ' + $.fn.nombreJugador());
			$.fn.resultados();
		}
	};

	// Genera la tabla de resultados
	$.fn.resultados = function() {
		if (ULTIMO_PUNTERO == '') {
			var val_empate = $('#val-empate').text();
			var val_x = $('#val-x').text();
			var val_o = $('#val-o').text();
			var mensaje;

			if (GANADOR) {
				if (PUNTERO == 'X') {
					val_x++;
					$('#val-x').text((val_x));
				} else if (PUNTERO == '0') {
					val_o++;
					$('#val-o').text((val_o));
				}
				mensaje = 'Gana jugador: ' + $.fn.nombreJugador();
			} else {
				if (CUADRO == 9) {
					val_empate++;
					$('#val-empate').text((val_empate));
					mensaje = 'Esto es un empate';
				}
			}

			ULTIMO_PUNTERO = PUNTERO;
		}
	};

})(jQuery);