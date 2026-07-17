/**
 * Valida si un texto es un RUC peruano válido.
 * Un RUC válido consta de exactamente 11 dígitos numéricos.
 * 
 * @param ruc El RUC a validar.
 * @returns true si el RUC tiene un formato correcto, false en caso contrario.
 */
export function isValidRuc(ruc: string): boolean {
  if (!ruc) return false;
  
  // Limpiar espacios en blanco extremos
  const cleanRuc = ruc.trim();
  
  // Validar que sean exactamente 11 dígitos numéricos
  const rucRegex = /^\d{11}$/;
  if (!rucRegex.test(cleanRuc)) {
    return false;
  }

  // Opcional: Validar que comience con los prefijos oficiales en Perú (10, 15, 17, 20)
  // Se permiten otros para dar flexibilidad con datos mockup/prueba
  const prefijo = cleanRuc.substring(0, 2);
  const prefijosValidos = ['10', '15', '17', '20'];
  
  // Para máxima flexibilidad en mockups pero manteniendo la lógica de negocio básica:
  return prefijosValidos.includes(prefijo);
}

/**
 * Valida si un carácter ingresado en un input es numérico.
 * Útil para eventos keypress/keydown.
 */
export function isNumberKey(event: KeyboardEvent): boolean {
  const charCode = event.key;
  // Permitir teclas de control (Backspace, Tab, flechas, etc.)
  if (
    ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Enter'].includes(charCode)
  ) {
    return true;
  }
  // Verificar si es un dígito
  return /^\d$/.test(charCode);
}

/**
 * Valida si un texto es un correo electrónico con formato válido.
 * 
 * @param email El correo electrónico a validar.
 * @returns true si el correo tiene un formato correcto, false en caso contrario.
 */
export function isValidEmail(email: string): boolean {
  if (!email) return false;
  
  // Limpiar espacios en blanco extremos
  const cleanEmail = email.trim();
  
  // Expresión regular estándar para validación de correos electrónicos
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(cleanEmail);
}

/**
 * Valida si un texto es un número de teléfono móvil peruano válido.
 * Debe tener exactamente 9 dígitos numéricos y comenzar con el número 9.
 * 
 * @param phone El teléfono a validar.
 * @returns true si tiene un formato correcto, false en caso contrario.
 */
export function isValidPhone(phone: string): boolean {
  if (!phone) return false;
  
  const cleanPhone = phone.trim();
  const phoneRegex = /^9\d{8}$/;
  return phoneRegex.test(cleanPhone);
}
