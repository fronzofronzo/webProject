<section class="container-fluid">
    <h2 class="">Login</h2>
    <div>
        <form action="#" method="POST" id="formlogin" name="login">
            <div class="form-group mb-2">
                <label for="loginusername">Username</label>
                <input type="text" class="form-control" id="loginusername" aria-describedby="emailHelp"
                    placeholder="Inserisci username" required>
            </div>
            <div class="form-group mb-2">
                <label for="loginpassword">Password</label>
                <div class="d-flex">
                    <div class="flex-grow-1 me-2">
                        <input type="password" class="form-control" id="loginpassword" placeholder="Password" required>
                    </div>
                    <button type="button" class="btn btn-secondary fa-solid fa-eye" id="loginshow"></button>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
            <p id="login-error"><?php if (isset($templateParams["message"])) { echo $templateParams["message"]; } ?></p>
        </form>
    </div>
</section>
<section class="container-fluid">
    <h2 class=" mb-2">Registrati</h2>
    <div>
        <form action="#" method="POST" id="formregister" name="register">
            <div class="form-group mb-2">
                <div class="d-flex flex-wrap">
                    <div class="flex-grow-1 mb-2 me-2">
                        <label for="registername">Nome</label>
                        <input type="text" class="form-control" id="registername" placeholder="Inserisci nome" required>
                    </div>
                    <div class="flex-grow-1 mb-2 me-2">
                        <label for="registersurname">Cognome</label>
                        <input type="text" class="form-control" id="registersurname" placeholder="Inserisci cognome" required>
                    </div>
                </div>
            </div>
            <div class="form-group mb-2">
                <label for="registerusername">Username</label>
                <input type="text" class="form-control" id="registerusername" placeholder="Inserisci username" required>
            </div>
            <div class="form-group mb-2">
                <label for="registerpassword">Password</label>
                <div class="d-flex">
                    <div class="flex-grow-1 me-2">
                        <input type="password" class="form-control" id="registerpassword" placeholder="Password" required>
                    </div>
                    <button type="button" class="btn btn-secondary fa-solid fa-eye" id="registershow"></button>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Registrati</button>
            <p id="register-error"></p>
        </form>
    </div>
</section>
