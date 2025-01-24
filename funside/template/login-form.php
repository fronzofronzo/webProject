<section class="container-fluid">
    <h2 class="text-white">Login</h2>
    <div class="">
        <form action="#" method="POST" id="login" name="login">
            <div class="form-group mb-2">
                <label for="username">Username</label>
                <input type="text" class="form-control" id="username" aria-describedby="emailHelp"
                    placeholder="Inserisci username">
            </div>
            <div class="form-group mb-2">
                <label for="password">Password</label>
                <div class="row">
                    <div class="col-9"><input type="password" class="form-control" id="password" placeholder="Password">
                    </div>
                    <div class="col-3"><button type="button" class="btn btn-secondary ">Show</button></div>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
            <p></p>
        </form>
    </div>
</section>
<section class="container-fluid">
    <h2 class="text-white mb-2">Registrati</h2>
    <div class="">
        <form action="#" method="POST" id="register" name="register">
            <div class="form-group mb-2">
                <div class="row">
                    <div class="col-6"><label for="name-register">Nome</label>
                        <input type="text" class="form-control" id="name-register" placeholder="Inserisci nome">
                    </div>
                    <div class="col-6"><label for="surname-register">Cognome</label><input type="text"
                            class="form-control" id="surname-register" placeholder="Inserisci cognome"></div>
                </div>
            </div>
            <div class="form-group mb-2">
                <p></p>
                <label for="username-register">Username</label>
                <input type="text" class="form-control" id="username-register" placeholder="Inserisci username">
            </div>
            <div class="form-group mb-2">
                <label for="password-register">Password</label>
                <div class="row">
                    <div class="col-8"><input type="password" class="form-control" id="password-register"
                            placeholder="Password"></div>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Registrati</button>
        </form>
    </div>
</section>