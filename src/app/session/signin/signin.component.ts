import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioDto } from './../../models/usuario.dto';
import { UsuarioService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  public form: FormGroup;
  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private authService: AuthService,
    private usuarioServicio: UsuarioService
    ) {}

  ngOnInit() {
    this.form = this.fb.group({
      uname: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
  }

  onSubmit() {
  }

  googleSignIn() {
    this.authService.googleLogin().then(resp => {
      this.authService.setLocalData(
        resp.user.uid,
        resp.user.displayName,
        resp.user.email,
        resp.user.photoURL
      );
      let userDto = new UsuarioDto(
        resp.user.email,
        resp.user.displayName,
        resp.user.photoURL
      );
        
      this.usuarioServicio.createUsuario(resp.user.uid, userDto).then(resp =>  {
        this.router.navigate(['/stories']);
      });

    });
  }
}
