import { Injectable } from '@angular/core';
import { Usuario } from '../models/models';

// ── Demo users pre-loaded ─────────────────────────────────
const DEMO_USERS: Usuario[] = [];

// ── Entity lists ──────────────────────────────────────────
export const REGIONALES: string[] = [];

export const MUNICIPALES: string[] = [];

// ── Storage keys ──────────────────────────────────────────
const KEY_USERS = 'sigt_usuarios_DU004';
const KEY_SESSION = 'sigt_sesion_DU004';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // ── Helpers ───────────────────────────────────────────
  private getUsuarios(): Usuario[] {
    try {
      const raw = localStorage.getItem(KEY_USERS);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private saveUsuarios(users: Usuario[]): void {
    localStorage.setItem(KEY_USERS, JSON.stringify(users));
  }

  // ── Init: ensure demo users exist ─────────────────────
  constructor() {
    this.inicializarUsuarios();
  }

  private inicializarUsuarios(): void {
    let usuarios = this.getUsuarios();
    const demoEmails = [
      'demo@region.gob.pe',
      'maria.quispe@munihuancayo.gob.pe',
      'jorge.valdivia@regionarequipa.gob.pe',
    ];
    const initialCount = usuarios.length;
    usuarios = usuarios.filter(
      (u) => !demoEmails.includes(u.email.toLowerCase()),
    );
    if (usuarios.length !== initialCount) {
      this.saveUsuarios(usuarios);
    }
  }

  // ── Session ───────────────────────────────────────────
  getSession(): Usuario | null {
    try {
      const raw = localStorage.getItem(KEY_SESSION);
      if (!raw) return null;
      const sesion: Usuario = JSON.parse(raw);
      const usuarios = this.getUsuarios();
      return (
        usuarios.find(
          (u) =>
            u.email.toLowerCase() === sesion.email.toLowerCase() &&
            u.password === sesion.password,
        ) ?? null
      );
    } catch {
      return null;
    }
  }

  isLoggedIn(): boolean {
    return this.getSession() !== null;
  }

  // ── Login ─────────────────────────────────────────────
  login(
    email: string,
    password: string,
  ): { success: boolean; user?: Usuario; error?: string } {
    if (!email || !password) {
      return { success: false, error: 'Ingresa correo y contraseña.' };
    }
    const usuarios = this.getUsuarios();
    const user = usuarios.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password,
    );
    if (!user) {
      return { success: false, error: 'Correo o contraseña incorrectos.' };
    }
    localStorage.setItem(KEY_SESSION, JSON.stringify(user));
    return { success: true, user };
  }

  // ── Register ──────────────────────────────────────────
  register(data: {
    email: string;
    password: string;
    password2: string;
    nombre: string;
    tipoEntidad: 'regional' | 'municipal' | 'empresa';
    entidad: string;
    documentoCargo?: string;
    // Extended profile fields
    primerApellido?: string;
    segundoApellido?: string;
    tipoDocumento?: string;
    numDocumento?: string;
    departamento?: string;
    provincia?: string;
    distrito?: string;
    telefono?: string;
    cargo?: string;
  }): { success: boolean; error?: string } {
    const {
      email,
      password,
      password2,
      nombre,
      tipoEntidad,
      entidad,
      documentoCargo,
      primerApellido,
      segundoApellido,
      tipoDocumento,
      numDocumento,
      departamento,
      provincia,
      distrito,
      telefono,
      cargo,
    } = data;

    if (
      !email ||
      !password ||
      !nombre ||
      !entidad ||
      (tipoEntidad !== 'empresa' && !documentoCargo)
    ) {
      return { success: false, error: 'Todos los campos son obligatorios.' };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { success: false, error: 'Formato de correo inválido.' };
    }
    if (password.length < 6) {
      return {
        success: false,
        error: 'La contraseña debe tener al menos 6 caracteres.',
      };
    }
    if (password !== password2) {
      return { success: false, error: 'Las contraseñas no coinciden.' };
    }

    const usuarios = this.getUsuarios();
    if (usuarios.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'Este correo ya está registrado.' };
    }

    const newUser: Usuario = {
      email,
      password,
      nombre,
      tipoEntidad,
      entidad,
      documentoCargo,
      primerApellido,
      segundoApellido,
      tipoDocumento,
      numDocumento,
      departamento,
      provincia,
      distrito,
      telefono,
      cargo,
      registradoEn: new Date().toISOString(),
    };
    usuarios.push(newUser);
    this.saveUsuarios(usuarios);
    return { success: true };
  }

  // ── Password recovery (simulated) ─────────────────────
  solicitarRecuperacion(email: string): {
    success: boolean;
    error?: string;
    message?: string;
  } {
    if (!email)
      return { success: false, error: 'Ingresa tu correo electrónico.' };
    const usuarios = this.getUsuarios();
    const user = usuarios.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
    if (!user)
      return { success: false, error: 'No existe una cuenta con ese correo.' };
    return {
      success: true,
      message: `Se ha enviado un enlace de recuperación a ${email} (simulado). Revisa tu bandeja.`,
    };
  }

  // ── Logout ────────────────────────────────────────────
  logout(): void {
    localStorage.removeItem(KEY_SESSION);
  }

  // ── Update Profile ────────────────────────────────────
  updateProfile(
    currentEmail: string,
    changes: { email?: string; telefono?: string },
  ): { success: boolean; error?: string } {
    const usuarios = this.getUsuarios();
    const idx = usuarios.findIndex(
      (u) => u.email.toLowerCase() === currentEmail.toLowerCase(),
    );
    if (idx === -1) return { success: false, error: 'Usuario no encontrado.' };

    const newEmail = changes.email?.trim() ?? '';
    if (newEmail && newEmail !== currentEmail) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
        return { success: false, error: 'Formato de correo inválido.' };
      }
      const existe = usuarios.find(
        (u) => u.email.toLowerCase() === newEmail.toLowerCase(),
      );
      if (existe)
        return {
          success: false,
          error: 'Ese correo ya está registrado por otro usuario.',
        };
      usuarios[idx].email = newEmail;
    }
    if (changes.telefono !== undefined) {
      usuarios[idx].telefono = changes.telefono.trim();
    }
    this.saveUsuarios(usuarios);

    // Refresh active session
    const session = this.getSession();
    if (session && session.email.toLowerCase() === currentEmail.toLowerCase()) {
      const updated = { ...session, ...usuarios[idx] };
      localStorage.setItem(KEY_SESSION, JSON.stringify(updated));
    }
    return { success: true };
  }

  // ── Change Password ────────────────────────────────────
  changePassword(
    email: string,
    oldPass: string,
    newPass: string,
  ): { success: boolean; error?: string } {
    const usuarios = this.getUsuarios();
    const idx = usuarios.findIndex(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
    if (idx === -1) {
      return { success: false, error: 'Usuario no encontrado.' };
    }
    if (usuarios[idx].password !== oldPass) {
      return { success: false, error: 'La contraseña actual es incorrecta.' };
    }
    if (newPass.length < 6) {
      return {
        success: false,
        error: 'La nueva contraseña debe tener al menos 6 caracteres.',
      };
    }

    usuarios[idx].password = newPass;
    this.saveUsuarios(usuarios);

    // Refresh active session
    const active = this.getSession();
    if (active && active.email.toLowerCase() === email.toLowerCase()) {
      active.password = newPass;
      localStorage.setItem(KEY_SESSION, JSON.stringify(active));
    }
    return { success: true };
  }

  // ── Entities ──────────────────────────────────────────
  getEntidades(tipo: 'regional' | 'municipal'): string[] {
    return tipo === 'regional' ? REGIONALES : MUNICIPALES;
  }
}
