import { Component, OnInit, OnDestroy, inject, NgZone } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AuthService,
  REGIONALES,
  MUNICIPALES,
} from '../../core/services/auth.service';
import { ApiAuthService } from '../../core/services/api-auth.service';
import { SessionService } from '../../core/services/session.service';
import { ApiErrorResponse } from '../../core/models/api.models';
import { ThemeService } from '../../core/services/theme.service';
import Swal from 'sweetalert2';
import { isValidRuc, isValidEmail } from '../../core/utils/validators';

// Declarar el objeto grecaptcha global (inyectado por el script de Google)
declare const grecaptcha: any;

type FormView = 'login' | 'registro' | 'recuperacion';

@Component({
    selector: 'app-login',
    imports: [CommonModule, FormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  // ── Theme State ───────────────────────────────────────
  readonly themeService = inject(ThemeService);
  get isDark(): boolean {
    return this.themeService.isDark();
  }
  toggleTheme(): void {
    this.themeService.toggle();
  }
  get themeLabel(): string {
    return this.themeService.isDark() ? 'Modo claro' : 'Modo oscuro';
  }
  get themeIcon(): string {
    return this.themeService.isDark() ? '☀️' : '🌙';
  }

  // ── View state ────────────────────────────────────────
  activeForm: FormView = 'login';
  showPassword = false;
  showPassword2 = false;
  isLoading = false;

  // ── reCAPTCHA ─────────────────────────────────────────
  recaptchaSiteKey =
    (window as any).__env?.RECAPTCHA_SITE_KEY ||
    '6Ldu6FUrAAAAADnOURKYc9E_uUbGBRC35_ntvznt';

  // ── Slider state ──────────────────────────────────────
  sliderImages = ['images/CARGAPESADA1.jpeg', 'images/CARGAPESADA2.jpeg'];
  currentSlide = 0;
  private sliderInterval: any;

  // ── Alert ─────────────────────────────────────────────
  alert: { message: string; type: 'error' | 'success' | 'info' } | null = null;

  // ── Login form ────────────────────────────────────────
  loginEmail = '';
  loginPassword = '';

  // ── Register form ─────────────────────────────────────
  regEmail = '';
  regPassword = '';
  regPassword2 = '';
  regNombre = '';
  regTipoEntidad: 'regional' | 'municipal' = 'regional';
  regEntidad = '';
  regDocumentoCargo = '';
  regTipoUsuario: 'empresa' | 'municipalidad' = 'municipalidad';
  regEmpresaNombre = '';

  // ── Transportista Form Fields ─────────────────────────
  tpTipoPersona: 'Natural' | 'Jurídica' | '' = '';
  tpTipoDocumento: 'DNI' | 'RUC' | 'Pasaporte' | 'Carnet de Extranjería' | '' =
    '';
  tpNumDocumento = '';
  tpNombres = '';
  tpPrimerApellido = '';
  tpSegundoApellido = '';
  tpEmail = '';
  tpEmailVerificado = false;

  tpDepartamento = '';
  tpProvincia = '';
  tpDistrito = '';
  tpVia = '';
  tpDireccion = '';
  tpNumeroMzLt = '';
  tpReferencia = '';

  // ── Ubigeo Data ───────────────────────────────────────
  departamentosList = ['Lima', 'Arequipa', 'La Libertad'];

  onDepartamentoChange(): void {
    this.tpProvincia = '';
    this.tpDistrito = '';
  }

  onProvinciaChange(): void {
    this.tpDistrito = '';
  }

  validarEmail(): void {
    if (!this.tpEmail || this.errEmail) {
      Swal.fire({
        title: 'Formato Inválido',
        text: 'Por favor, ingrese un formato de correo electrónico válido.',
        icon: 'warning',
        confirmButtonColor: '#0059bb',
      });
      return;
    }
    this.tpEmailVerificado = true;
    Swal.fire({
      title: '¡Email Validado!',
      text: 'El correo electrónico ha sido verificado con éxito.',
      icon: 'success',
      timer: 1600,
      showConfirmButton: false,
    });
  }

  onEmailChange(): void {
    this.tpEmailVerificado = false;
  }

  // ── Validation Errors Getters ─────────────────────────
  get errTipoPersona(): string {
    if (this.regTipoUsuario !== 'empresa') return '';
    return !this.tpTipoPersona ? 'El tipo de persona es requerido.' : '';
  }

  get errTipoDocumento(): string {
    if (this.regTipoUsuario !== 'empresa') return '';
    return !this.tpTipoDocumento ? 'El tipo de documento es requerido.' : '';
  }

  get errNumDocumento(): string {
    if (this.regTipoUsuario !== 'empresa') return '';
    if (!this.tpNumDocumento) return 'El número de documento es requerido.';
    if (this.tpTipoDocumento === 'DNI') {
      return !/^\d{8}$/.test(this.tpNumDocumento)
        ? 'DNI inválido (debe tener 8 dígitos)'
        : '';
    }
    if (this.tpTipoDocumento === 'RUC') {
      return !isValidRuc(this.tpNumDocumento)
        ? 'RUC inválido (11 dígitos, debe iniciar con 10, 15, 17 o 20)'
        : '';
    }
    return '';
  }

  get errNombres(): string {
    if (this.regTipoUsuario !== 'empresa') return '';
    if (!this.tpNombres) return 'Nombres es requerido.';
    return !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(this.tpNombres)
      ? 'Solo debe aceptar letras y espacios.'
      : '';
  }

  get errPrimerApellido(): string {
    if (this.regTipoUsuario !== 'empresa') return '';
    if (!this.tpPrimerApellido) return 'El primer apellido es requerido.';
    return !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(this.tpPrimerApellido)
      ? 'Solo debe aceptar letras y espacios.'
      : '';
  }

  get errSegundoApellido(): string {
    if (this.regTipoUsuario !== 'empresa') return '';
    if (
      this.tpSegundoApellido &&
      !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(this.tpSegundoApellido)
    ) {
      return 'Solo debe aceptar letras y espacios.';
    }
    return '';
  }

  get errEmail(): string {
    if (this.regTipoUsuario !== 'empresa') return '';
    if (!this.tpEmail) return 'El email es requerido.';
    return !isValidEmail(this.tpEmail) ? 'Formato de email inválido.' : '';
  }

  get errDepartamento(): string {
    if (this.regTipoUsuario !== 'empresa') return '';
    return !this.tpDepartamento ? 'El departamento es requerido.' : '';
  }

  get errProvincia(): string {
    if (this.regTipoUsuario !== 'empresa') return '';
    return !this.tpProvincia ? 'La provincia es requerida.' : '';
  }

  get errDistrito(): string {
    if (this.regTipoUsuario !== 'empresa') return '';
    return !this.tpDistrito ? 'El distrito es requerido.' : '';
  }

  get errVia(): string {
    if (this.regTipoUsuario !== 'empresa') return '';
    return !this.tpVia ? 'La vía es requerida.' : '';
  }

  get errDireccion(): string {
    if (this.regTipoUsuario !== 'empresa') return '';
    return !this.tpDireccion ? 'La dirección es requerida.' : '';
  }

  get errNumeroMzLt(): string {
    if (this.regTipoUsuario !== 'empresa') return '';
    if (!this.tpNumeroMzLt) return 'El número/manzana/lote es requerido.';
    return !/^[a-zA-Z0-9\s.,-]+$/.test(this.tpNumeroMzLt)
      ? 'Debe ser alfanumérico.'
      : '';
  }

  get errReferencia(): string {
    if (this.regTipoUsuario !== 'empresa') return '';
    return !this.tpReferencia ? 'La referencia es requerida.' : '';
  }

  get isFormTransportistaValido(): boolean {
    return (
      !this.errTipoPersona &&
      !this.errTipoDocumento &&
      !this.errNumDocumento &&
      !this.errNombres &&
      !this.errPrimerApellido &&
      !this.errSegundoApellido &&
      !this.errEmail &&
      !this.errDepartamento &&
      !this.errProvincia &&
      !this.errDistrito &&
      !this.errVia &&
      !this.errDireccion &&
      !this.errNumeroMzLt &&
      !this.errReferencia &&
      this.tpEmailVerificado &&
      !!this.regPassword &&
      this.regPassword === this.regPassword2
    );
  }

  // ── Recovery form ─────────────────────────────────────
  recEmail = '';

  // ── Entity lists ──────────────────────────────────────
  entidadesFiltradas: string[] = [];

  private readonly authService = inject(AuthService);
  private readonly apiAuthService = inject(ApiAuthService);
  private readonly sessionService = inject(SessionService);
  private readonly router = inject(Router);
  private readonly ngZone = inject(NgZone);

  ngOnInit(): void {
    this.iniciarSlider();
    if (this.apiAuthService.isLoggedIn() || this.authService.isLoggedIn()) {
      this.router.navigate(['/perfil']);
      return;
    }
    this.actualizarEntidades();
    this._loadRecaptchaScript();
  }

  ngOnDestroy(): void {
    if (this.sliderInterval) {
      clearInterval(this.sliderInterval);
    }
  }

  iniciarSlider(): void {
    this.sliderInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.sliderImages.length;
    }, 5000);
  }

  setSlide(index: number): void {
    this.currentSlide = index;
    clearInterval(this.sliderInterval);
    this.iniciarSlider();
  }

  // ── reCAPTCHA v3 ──────────────────────────────────────

  /**
   * Inyecta el script de Google reCAPTCHA v3 en el <head> si aún no existe.
   */
  private _loadRecaptchaScript(): void {
    if (document.getElementById('recaptcha-script')) return;

    const script = document.createElement('script');
    script.id = 'recaptcha-script';
    script.src = `https://www.google.com/recaptcha/api.js?render=${this.recaptchaSiteKey}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }

  // ── Helpers ───────────────────────────────────────────
  showForm(form: FormView): void {
    this.activeForm = form;
    this.alert = null;
    if (form === 'registro') {
      this.actualizarEntidades();
    }
  }

  actualizarEntidades(): void {
    this.entidadesFiltradas =
      this.regTipoEntidad === 'regional' ? REGIONALES : MUNICIPALES;
    this.regEntidad = this.entidadesFiltradas[0] ?? '';
  }

  onFileCargoChange(event: any): void {
    const file = event.target?.files?.[0];
    if (file) {
      this.regDocumentoCargo = file.name;
    }
  }

  showAlert(message: string, type: 'error' | 'success' | 'info'): void {
    this.alert = { message, type };
  }

  clearAlert(): void {
    this.alert = null;
  }

  // ── Login ─────────────────────────────────────────────
  onLogin(): void {
    this.clearAlert();

    // Sanitizar inputs
    const usuario = this.loginEmail.trim();
    const password = this.loginPassword;

    if (!usuario || !password) {
      this.showAlert('Ingrese usuario y contraseña.', 'error');
      return;
    }

    this.isLoading = true;

    if (typeof grecaptcha !== 'undefined') {
      grecaptcha.ready(() => {
        grecaptcha
          .execute(this.recaptchaSiteKey, { action: 'login' })
          .then((token: string) => {
            this.ngZone.run(() => {
              this.proceedLogin(usuario, password, token);
            });
          })
          .catch((err: any) => {
            console.error('Error al ejecutar reCAPTCHA v3:', err);
            this.ngZone.run(() => {
              this.isLoading = false;
              this.showAlert('Error en la verificación de seguridad.', 'error');
            });
          });
      });
    } else {
      console.warn('reCAPTCHA no está disponible. Procediendo sin token.');
      this.proceedLogin(usuario, password);
    }
  }

  private proceedLogin(
    usuario: string,
    password: string,
    recaptchaToken?: string,
  ): void {
    this.apiAuthService.login(usuario, password, recaptchaToken).subscribe({
      next: (res) => {
        this.apiAuthService.saveSession(res);
        // Iniciar el timer de sesión de 15 minutos
        this.sessionService.startSession();
        // Redirigir al perfil
        this.router.navigate(['/perfil']);
      },
      error: (err: ApiErrorResponse) => {
        this.isLoading = false;
        // Usa el campo 'descripcion' del API si está disponible
        const msg =
          err?.descripcion || err?.message || 'Error al iniciar sesión.';
        this.showAlert(msg, 'error');
      },
    });
  }

  onLoginKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter') this.onLogin();
  }

  // ── Register ──────────────────────────────────────────
  onRegister(): void {
    const isEmpresa = this.regTipoUsuario === 'empresa';

    if (isEmpresa) {
      if (!this.isFormTransportistaValido) {
        this.showAlert(
          'Por favor, complete todos los campos obligatorios del transportista correctamente y verifique el email.',
          'error',
        );
        return;
      }
    }

    const emailVal = isEmpresa ? this.tpEmail.trim() : this.regEmail.trim();
    const nombreVal = isEmpresa
      ? `${this.tpNombres.trim()} ${this.tpPrimerApellido.trim()} ${this.tpSegundoApellido.trim()}`.trim()
      : this.regNombre.trim();
    const tipo = isEmpresa ? 'empresa' : this.regTipoEntidad;
    const entidadVal = isEmpresa
      ? `${this.tpNumDocumento.trim()} - ${this.tpNombres.trim()} ${this.tpPrimerApellido.trim()}`
      : this.regEntidad;
    const docVal = isEmpresa ? '' : this.regDocumentoCargo.trim();

    const res = this.authService.register({
      email: emailVal,
      password: this.regPassword,
      password2: this.regPassword2,
      nombre: nombreVal,
      tipoEntidad: tipo as any,
      entidad: entidadVal,
      documentoCargo: docVal,
      // Extended profile fields
      primerApellido: this.tpPrimerApellido.trim() || undefined,
      segundoApellido: this.tpSegundoApellido.trim() || undefined,
      tipoDocumento: this.tpTipoDocumento || undefined,
      numDocumento: this.tpNumDocumento.trim() || undefined,
      departamento: this.tpDepartamento || undefined,
      provincia: this.tpProvincia || undefined,
      distrito: this.tpDistrito || undefined,
      cargo: this.regDocumentoCargo.trim() || undefined,
    });
    if (res.success) {
      this.showAlert(
        'Registro exitoso. Ahora puedes iniciar sesión.',
        'success',
      );
      setTimeout(() => this.showForm('login'), 1600);
    } else {
      this.showAlert(res.error!, 'error');
    }
  }

  // ── Recovery ──────────────────────────────────────────
  onRecovery(): void {
    this.clearAlert();
    const res = this.authService.solicitarRecuperacion(this.recEmail.trim());
    if (res.success) {
      this.showAlert(res.message!, 'success');
    } else {
      this.showAlert(res.error!, 'error');
    }
  }

  // ── Alert icon ────────────────────────────────────────
  get alertIcon(): string {
    if (!this.alert) return '';
    return this.alert.type === 'error'
      ? 'error'
      : this.alert.type === 'success'
        ? 'check_circle'
        : 'info';
  }
}
