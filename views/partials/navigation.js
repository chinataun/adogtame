<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container">
    <a class="navbar-brand" href="/">Notes App</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/about">About</a>
          </li>
      </ul>
      <ul class="navbar-nav ml-auto">
        {/* {{#if user}} */}
          <li class="nav-item dropdown">
            {/* <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Notes 
            </a> */}
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="/animales/add">Agregar animal</a>
              {/* <a class="dropdown-item" href="/notes/add">Add A Note</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="/users/logout">Logout</a> */}
            </div>
          </li>
        {/* {{else}}
          <li class="nav-item">
            <a class="nav-link" href="/users/signin">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/users/signup">Register</a>
          </li>
        {{/if}} */}
      </ul>
    </div>
  </div>
</nav>
