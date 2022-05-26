   function onBusquedaAnimal_Edad_Minima() 
  {
    var edad_minima = document.getElementById("filtrado_edad_minima").value;
    var edad_maxima = document.getElementById("filtrado_edad_maxima").value;
    console.log(edad_minima);
    console.log(edad_maxima);
    if ( parseFloat(edad_minima)  < parseFloat(edad_maxima)  )
    {
      document.getElementById("edad_minima_animal").value = edad_minima;
    }
    else
    {
      document.getElementById("edad_maxima_animal").value = "50";
      document.getElementById("filtrado_edad_maxima").value = "50";
      document.getElementById("filtrado_edad_minima").value = edad_minima;
    }
    document.getElementById("edad_minima_animal").value = edad_minima;
  }

  function onBusquedaAnimal_Edad_Maxima() 
  {

    var edad_minima = document.getElementById("filtrado_edad_minima").value;
    var edad_maxima = document.getElementById("filtrado_edad_maxima").value;
    console.log(edad_minima);
    console.log(edad_maxima);
    if ( parseFloat(edad_minima)  < parseFloat(edad_maxima)  )
    {
        document.getElementById("edad_maxima_animal").value = edad_maxima ;

    }
    else
    {
      document.getElementById("edad_minima_animal").value = "0";
      document.getElementById("filtrado_edad_minima").value = "0";
      document.getElementById("edad_maxima_animal").value = edad_maxima ;
    }

    document.getElementById("edad_maxima_animal").value = edad_maxima ;

  }

  jQuery(function($) {
    $('#solicitud').on('show.bs.modal', function (event) {
      var myVal = $(event.relatedTarget).data('id');
      $('input#idSolicitud').attr('value', myVal);
      console.log(myVal);
      console.log($('input#idSolicitud'));
    });

    $("#buttonFiltros").click(function(){
      $("#busqueda_avanzada").toggle();
    });

    $("#buttonOcultarFiltros").click(function(){
      $("#busqueda_avanzada").hide();
      $('#buttonMostrarFiltros').show()
      $('#buttonOcultarFiltros').hide()
      $('#buscadorBasico').prop( "disabled", false );
      $('#buscadorBasicoSubmit').prop( "disabled", false );
    });
    $("#buttonMostrarFiltros").click(function(){
      $("#busqueda_avanzada").show();
      $('#buttonOcultarFiltros').show()
      $('#buttonMostrarFiltros').hide()
      $('#buscadorBasico').prop( "disabled", true );
      $('#buscadorBasicoSubmit').prop( "disabled", true );
    });

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })


  
  });

