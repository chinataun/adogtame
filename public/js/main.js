



/*
function onInput_BusquedaAnimal_Tipo() {
    var val = document.getElementById("input").value;
    var opts = document.getElementById('dlist').childNodes;
    for (var i = 0; i < opts.length; i++) 
    {
      if (opts[i].value === val) 
      {
            document.getElementById("Filtro_tipo_animal").value = opts[i].value;
        break;
      }
    }
  }
*/

function AccionBusquedaAvanzada()
{

  var x = document.getElementById("caja_busqueda_general");
  var y = document.getElementById("caja_busqueda_avanzada");
    x.style.display = "none";
    y.style.display = "initial";
}


function AccionBusquedaGeneral()
{

  var x = document.getElementById("caja_busqueda_general");
  var y = document.getElementById("caja_busqueda_avanzada");
    y.style.display = "none";
    x.style.display = "initial";
}

function onBusquedaProtectora_Ciudad() 
{
  var e = document.getElementById("filtrado_ciudad");
  var selectlista = e.options[e.selectedIndex].text;
  document.getElementById("filtro_tipo_ciudad").value = selectlista;
  
}

  function onBusquedaAnimal_Edad_Minima() 
  {
    var edad_minima = document.getElementById("filtrado_edad_minima").value;
    var edad_maxima = document.getElementById("filtrado_edad_maxima").value;

    if ( parseFloat(edad_minima)  < parseFloat(edad_maxima)  )
    {
      document.getElementById("filtro_edad_minima_animal").value = edad_minima;
    }
    else
    {
      document.getElementById("filtrado_edad_maxima").value = "50";
      document.getElementById("filtro_edad_maxima_animal").value = "50";
      document.getElementById("filtro_edad_minima_animal").value = edad_minima;
    }
    document.getElementById("edad_minima_animal").value = edad_minima;
  }

  function onBusquedaAnimal_Edad_Maxima() 
  {

    var edad_minima = document.getElementById("filtrado_edad_minima").value;
    var edad_maxima = document.getElementById("filtrado_edad_maxima").value;

    if ( parseFloat(edad_minima)  < parseFloat(edad_maxima)  )
    {
        document.getElementById("filtro_edad_maxima_animal").value = edad_maxima ;

    }
    else
    {
      document.getElementById("filtro_edad_minima_animal").value = "0";
      document.getElementById("filtrado_edad_minima").value = "0";
      document.getElementById("filtro_edad_maxima_animal").value = edad_maxima ;
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

