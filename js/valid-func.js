(function($) {
	$(document)
			.ready(function() {

				// Antes de enviar la informacion hara la validacion
					$('#formulario form')
							.bind(
									'submit',
									function(event) {
										var v_nombre = false;
										var v_apellido = false;
										var v_psw = false;
										var v_tel = false;
										var v_email = false;

										// Validacion de campos nulos
										v_nombre = $.fn.validarNulos('#nombre',
												'#m-nombre');
										v_apellido = $.fn.validarNulos(
												'#apellido', '#m-apellido');
										/*
										 * v_email = $.fn.validarNulos('#email',
										 * '#m-email');
										 */

										// Nombre
										if (!v_nombre) {
											v_nombre = $.fn
													.validarString('#nombre',
															'#m-nombre',
															'Deben contener solamente letras');
										}
										// Apellido
										if (!v_apellido) {
											v_apellido = $.fn
													.validarString('#apellido',
															'#m-apellido',
															'Deben contener solamente letras');
										}
										// Teléfono
										v_tel = $.fn
												.validarNumeros('#telefono',
														'#m-telefono',
														'Debe ser numérico y mayor a 8 dígitos');

										// Email
										v_email = $.fn.validarEmail('#email',
												'#m-email');

										// Password
										if ($('#password').attr('value').length < 6) {
											$.fn
													.mensajeError(
															'#m-password',
															'Debe tener al menos 6 caracteres');
											v_psw = false;
										} else {
											$.fn.ocultarMensaje('#m-password');
											v_psw = true;
										}

										// Return
										if (!(v_nombre && v_apellido && v_tel
												&& v_email && v_psw)) {
											return false;
										}
									});
				});

	// Funcion para mostrar mensaje de error
	$.fn.mensajeError = function(idElement, mensaje) {
		$(idElement).css('display', 'inline');
		$(idElement).css('margin-bottom', '15px');
		$(idElement).css('padding', '2px');
		$(idElement).text(mensaje);
	};

	$.fn.ocultarMensaje = function(idElement) {
		$(idElement).text('');
		$(idElement).css('background-color', '#66e275');
		$(idElement).css('border', 'medium solid #008110');
		$(idElement).css('padding', '0px');	
		//$(idElement).css('display', 'none');
	};

	// Validar campos nulos
	$.fn.validarNulos = function(idElement, idMensaje) {
		var todo_bien = false;
		var mensaje = 'Se encuentra vacio';
		if ($(idElement).attr('value').length == 0) {
			$.fn.mensajeError(idMensaje, mensaje);
		} else {
			$.fn.ocultarMensaje(idMensaje);
			todo_bien = true;
		}
		return todo_bien;
	};

	// Validar email
	$.fn.validarEmail = function(idElement, idMensaje) {
		var todo_bien = false;
		var mensaje = 'Correo no valido';
		var regExp = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$/;
		if ($(idElement).attr('value').match(regExp)) {
			todo_bien = true;
			$.fn.ocultarMensaje(idMensaje);
		} else {
			$.fn.mensajeError(idMensaje, mensaje);
		}
		return todo_bien;
	};

	// Validar numeros
	$.fn.validarNumeros = function(idElement, idMensaje, mensaje) {
		var todo_bien = false;
		var regExp = /\d{8,}/;
		if ($(idElement).attr('value').match(regExp)) {
			todo_bien = true;
			$.fn.ocultarMensaje(idMensaje);
		} else {
			$.fn.mensajeError(idMensaje, mensaje);
		}
		return todo_bien;
	};

	// Validar cadena
	$.fn.validarString = function(idElement, idMensaje, mensaje) {
		var todo_bien = false;
		var regExp = /\D{1,}/;
		if ($(idElement).attr('value').match(regExp)) {
			todo_bien = true;
			$.fn.ocultarMensaje(idMensaje);
		} else {
			$.fn.mensajeError(idMensaje, mensaje);
		}
		return todo_bien;
	};

})(jQuery);
