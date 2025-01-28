<section class="container-fluid">
    <h2 class="">Login</h2>
    <div class="">
        <form action="#" method="POST" id="formlogin" name="login">
            <div class="form-group mb-2">
                <label for="loginusername">Username</label>
                <input type="text" class="form-control" id="loginusername" aria-describedby="emailHelp"
                    placeholder="Inserisci username">
            </div>
            <div class="form-group mb-2">
                <label for="loginpassword">Password</label>
                <div class="row">
                    <div class="col-9"><input type="password" class="form-control" id="loginpassword" placeholder="Password">
                    </div>
                    <div class="col-3"><button type="button" class="btn btn-secondary" id="loginshow">Show</button></div>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
            <p><?php if (isset($templateParams["message"])) {
                echo $templateParams["message"];
            } ?></p>
        </form>
    </div>
</section>
<section class="container-fluid">
    <h2 class=" mb-2">Registrati</h2>
    <div class="">
        <form action="#" method="POST" id="formregister" name="register">
            <div class="form-group mb-2">
                <div class="row">
                    <div class="col-6"><label for="registername">Nome</label>
                        <input type="text" class="form-control" id="registername" placeholder="Inserisci nome">
                    </div>
                    <div class="col-6"><label for="registersurname">Cognome</label><input type="text"
                            class="form-control" id="registersurname" placeholder="Inserisci cognome"></div>
                </div>
            </div>
            <div class="form-group mb-2">
                <label for="registerusername">Username</label>
                <input type="text" class="form-control" id="registerusername" placeholder="Inserisci username">
            </div>
            <div class="form-group mb-2">
                <label for="registerpassword">Password</label>
                <div class="row">
                    <div class="col-9"><input type="password" class="form-control" id="registerpassword"
                            placeholder="Password"></div>
                    <div class="col-3"><button type="button" class="btn btn-secondary" id="registershow">Show</button></div>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Registrati</button>
            <p></p>
        </form>
    </div>
</section>