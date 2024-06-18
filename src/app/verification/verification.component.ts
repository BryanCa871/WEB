import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class VerificationComponent implements OnInit {
  verificationForm!: FormGroup;
  email!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });

    this.verificationForm = this.fb.group({
      verificationCode: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.verificationForm.valid) {
      const codigo = this.verificationForm.value.verificationCode;
      this.authService.verifyCode(this.email, codigo).subscribe(
        (response: any) => {
          console.log('Verificación exitosa', response);
          this.router.navigate(['/dashboard']); // Redirigir al dashboard u otra ruta después de la verificación
        },
        (error: any) => {
          console.error('Error en la verificación', error);
          alert('Código de verificación incorrecto. Por favor, intenta de nuevo.');
        }
      );
    } else {
      alert('Por favor, ingresa un código de verificación válido.');
    }
  }
}
