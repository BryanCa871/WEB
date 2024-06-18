import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule]
})
export class RegistroComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/), Validators.minLength(2), Validators.maxLength(60)]],
      apellido_paterno: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/), Validators.minLength(2), Validators.maxLength(60)]],
      apellido_materno: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/), Validators.minLength(2), Validators.maxLength(60)]],
      username: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(60)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      direccion: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      ciudad: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/), Validators.minLength(2), Validators.maxLength(30)]],
      codigo_postal: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      estado_id: [1, Validators.required], // Este campo siempre tendrá el valor 1
      email: ['', [Validators.required, Validators.email, Validators.maxLength(70)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }

      const userData = {
        nombre: this.registerForm.value.nombre,
        apellido_paterno: this.registerForm.value.apellido_paterno,
        apellido_materno: this.registerForm.value.apellido_materno,
        username: this.registerForm.value.username,
        telefono: this.registerForm.value.telefono,
        direccion: this.registerForm.value.direccion,
        ciudad: this.registerForm.value.ciudad,
        codigo_postal: this.registerForm.value.codigo_postal,
        estado_id: 1,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      };

      this.authService.register(userData).subscribe(
        response => {
          this.router.navigate(['/verification'], { queryParams: { email: this.registerForm.value.email } });
          console.log('Registro exitoso', response);
          // Redirigir al componente de verificación
        },
        error => {
          this.router.navigate(['/verification'], { queryParams: { email: this.registerForm.value.email } });
          console.error('Error en el registro', error);
        }
      );
    } else {

      this.router.navigate(['/verification'], { queryParams: { email: this.registerForm.value.email } });
     // alert('Por favor, completa todos los campos correctamente.');
    }
  }
}
