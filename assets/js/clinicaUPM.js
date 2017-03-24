/**
 * nuevoPaciente - obtiene los datos del formulario de nuevo paciente y los
 * envia a <fichero PHP> 
 */
function nuevoPaciente(){
    var paciente = {};
    paciente.nombre = $("#nuevoPaciente_nombre").val();
    paciente.apellido = $("#nuevoPaciente_apellido").val();
    paciente.companyia = $("#nuevoPaciente_companyia").val();
    paciente.dni = $("#nuevoPaciente_dni").val()

    console.log(paciente);

    enviarJSON('hola.php', paciente);
}

/**
 * nuevoPersonal - obtiene los datos del formulario nuevo personal y los envia a
 * <fichero PHP>
 */
function nuevoPersonal(){
    var personal = {};
    personal.nombre = $("#nuevoPersonal_nombre").val();
    personal.apellido = $("#nuevoPersonal_apellido").val();
    personal.numColegiado = $("#nuevoPersonal_numcoleg").val();
    personal.tMinConsulta = $("#nuevoPersonal_tminconsulta").val();
    personal.diasConsulta = $("#nuevoPersonal_diasconsulta").val();
    personal.especialidad = [];
    $("input[name='especialidades[]']").each(function() {
        personal.especialidad.push($(this).val());
    });

    console.log(personal);

    enviarJSON('hola.php', personal);
}

/**
 * peticionLogging - obtiene los datos del form de logging y los mana al
 * servidor.
 */
function peticionLoging(){

    var loging = {};
    var respuesta = {};

    loging.usr = $("#loging_user").val();
    loging.passwd = $("#loging_passwd").val();

    console.log(loging);
    
    respuesta = enviarJSON('./login.php', loging);

    respuesta.done(function( data, textStatus, jqXHR ) {

        console.log("Usuario registrado: " + data.usuario_registrado);

        if(data.usuario_registrado) {

            window.location.href = "prueba.html?num=7";

        } else {

            $('#usuario_no_registrado').show('slow');
        }
    });
}

/**
 * enviarJSON - envia un objeto JSON en forma de String a el fichero phpUrl
 * mediante una peticion POST
 * 
 * @param {String} phpUrl 
 * @param {JSON} jsonObject 
 */
function enviarJSON(phpUrl, jsonObject){

    return $.ajax({
        url: phpUrl,
        data: {json: JSON.stringify(jsonObject)},
        type: 'POST',
        dataType: 'json',
        success:function(data, textStatus, jqXHR){
            console.log("success");
        }
    })

    .done(function( data, textStatus, jqXHR ) {

        console.log( "La solicitud se ha completado correctamente." );
    })

    .fail(function( jqXHR, textStatus, errorThrown ) {

        console.log( "La solicitud ha fallado: " +  textStatus);
    });
}

/**
 * anyadirEspecialidad - añade un campo de especialidad en el html.
 */
function anyadirEspecialidad(){
    var div = '<div class="form-group" id="divEspecialidad"><input type="text" class="form-control" placeholder="Especialidad" name="especialidades[]"></div>'
    $("#spamEspecialidad").prepend(div);
}
