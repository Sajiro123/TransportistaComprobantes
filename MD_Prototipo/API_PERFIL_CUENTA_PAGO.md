# API Perfil y Cuenta de Pago del Transportista

## Base URL

```
/api_comprobante/perfil
```

---

## 1. Obtener Perfil Completo

Obtiene los datos de la empresa, representante legal y contacto del transportista.

### `GET /api_comprobante/perfil`

**Query Parameters:**

| Parámetro | Tipo   | Requerido | Descripción           | Ejemplo       |
| --------- | ------ | --------- | --------------------- | ------------- |
| `ruc`     | String | Sí        | RUC del transportista | `20512345678` |

**Response 200 OK:**

```json
{
  "data": {
    "lista": {
      "datosEmpresa": {
        "razonSocial": "Transportes Lima Sur S.A.C.",
        "ruc": "20512345678",
        "estadoCondicion": "ACTIVO · HABIDO",
        "tipoEntidad": "Persona jurídica",
        "autoridad": "ATU – Autoridad de Transporte Urbano",
        "autorizacionVigente": true
      },
      "representanteLegal": {
        "nombresApellidos": "Rosa María Vílchez Salazar",
        "tipoDocumento": "DNI",
        "numeroDocumento": "40218765"
      },
      "contacto": {
        "nombresApellidos": "Rosa María Vílchez Salazar",
        "tipoDocumento": "DNI",
        "numeroDocumento": "40218765",
        "correoElectronico": "contacto@translimasur.pe",
        "telefono": "+51 987 654 321"
      }
    },
    "respuesta": "OK",
    "mensaje": "Detalle de perfil del transportista obtenido correctamente"
  }
}
```

**Campos del Response:**

**`datosEmpresa`** (Fuente: SUNAT — no editable):

| Campo                 | Tipo    | Descripción                          | Ejemplo                                |
| --------------------- | ------- | ------------------------------------ | -------------------------------------- |
| `razonSocial`         | String  | Razón social de la empresa           | `Transportes Lima Sur S.A.C.`          |
| `ruc`                 | String  | RUC                                  | `20512345678`                          |
| `estadoCondicion`     | String  | Estado y condición en SUNAT          | `ACTIVO · HABIDO`                      |
| `tipoEntidad`         | String  | Tipo de entidad                      | `Persona jurídica`                     |
| `autoridad`           | String  | Autoridad que autorizó               | `ATU – Autoridad de Transporte Urbano` |
| `autorizacionVigente` | Boolean | Indica si tiene autorización vigente | `true`                                 |

**`representanteLegal`** (Fuente: SUNAT — no editable):

| Campo              | Tipo   | Descripción         | Ejemplo                      |
| ------------------ | ------ | ------------------- | ---------------------------- |
| `nombresApellidos` | String | Nombres y apellidos | `Rosa María Vílchez Salazar` |
| `tipoDocumento`    | String | Tipo de documento   | `DNI`                        |
| `numeroDocumento`  | String | Número de documento | `40218765`                   |

**`contacto`** (parcialmente editable):

| Campo               | Tipo   | Descripción                      | Ejemplo                      | Editable |
| ------------------- | ------ | -------------------------------- | ---------------------------- | -------- |
| `nombresApellidos`  | String | Nombres y apellidos del contacto | `Rosa María Vílchez Salazar` | Sí       |
| `tipoDocumento`     | String | Tipo de documento                | `DNI`                        | Sí       |
| `numeroDocumento`   | String | Número de documento              | `40218765`                   | Sí       |
| `correoElectronico` | String | Correo electrónico               | `contacto@translimasur.pe`   | No       |
| `telefono`          | String | Teléfono de contacto             | `+51 987 654 321`            | Sí       |

---

## 2. Actualizar Contacto

Actualiza los datos de contacto del transportista. El correo electrónico no es editable.

### `PUT /api_comprobante/perfil/contacto`

**Query Parameters:**

| Parámetro | Tipo   | Requerido | Descripción           | Ejemplo       |
| --------- | ------ | --------- | --------------------- | ------------- |
| `ruc`     | String | Sí        | RUC del transportista | `20512345678` |

**Request Body:**

```json
{
  "nombresApellidos": "Rosa María Vílchez Salazar",
  "tipoDocumento": "DNI",
  "numeroDocumento": "40218765",
  "telefono": "+51 987 654 321"
}
```

**Campos del Request:**

| Campo              | Tipo   | Requerido | Descripción                      | Ejemplo                      |
| ------------------ | ------ | --------- | -------------------------------- | ---------------------------- |
| `nombresApellidos` | String | Sí        | Nombres y apellidos del contacto | `Rosa María Vílchez Salazar` |
| `tipoDocumento`    | String | No        | Tipo de documento                | `DNI`                        |
| `numeroDocumento`  | String | No        | Número de documento              | `40218765`                   |
| `telefono`         | String | Sí        | Teléfono de contacto             | `+51 987 654 321`            |

**Response 200 OK:**

```json
{
  "data": {
    "lista": {
      "nombresApellidos": "Rosa María Vílchez Salazar",
      "tipoDocumento": "DNI",
      "numeroDocumento": "40218765",
      "correoElectronico": "contacto@translimasur.pe",
      "telefono": "+51 987 654 321"
    },
    "respuesta": "OK",
    "mensaje": "Contacto actualizado correctamente"
  }
}
```

---

## 3. Obtener Cuenta de Abono

Obtiene la cuenta bancaria donde se recibirán los subsidios.

### `GET /api_comprobante/perfil/cuenta-abono`

**Query Parameters:**

| Parámetro | Tipo   | Requerido | Descripción           | Ejemplo       |
| --------- | ------ | --------- | --------------------- | ------------- |
| `ruc`     | String | Sí        | RUC del transportista | `20512345678` |

**Response 200 OK (con cuenta registrada):**

```json
{
  "data": {
    "lista": {
      "banco": "Banco de Crédito del Perú",
      "codigoCuentaInterbancario": "00212345678901234567"
    },
    "respuesta": "OK",
    "mensaje": "Detalle de cuenta de abono obtenido correctamente"
  }
}
```

**Response 200 OK (sin cuenta registrada):**

```json
{
  "data": {
    "lista": null,
    "respuesta": "OK",
    "mensaje": "Detalle de cuenta de abono obtenido correctamente"
  }
}
```

**Campos del Response:**

| Campo                       | Tipo   | Descripción      | Ejemplo                     |
| --------------------------- | ------ | ---------------- | --------------------------- |
| `banco`                     | String | Nombre del banco | `Banco de Crédito del Perú` |
| `codigoCuentaInterbancario` | String | CCI (20 dígitos) | `00212345678901234567`      |

---

## 4. Registrar o Actualizar Cuenta de Abono

Registra o actualiza la cuenta bancaria donde se recibirán los subsidios.

### `PUT /api_comprobante/perfil/cuenta-abono`

**Query Parameters:**

| Parámetro | Tipo   | Requerido | Descripción           | Ejemplo       |
| --------- | ------ | --------- | --------------------- | ------------- |
| `ruc`     | String | Sí        | RUC del transportista | `20512345678` |

**Request Body:**

```json
{
  "banco": "Banco de Crédito del Perú",
  "codigoCuentaInterbancario": "00212345678901234567"
}
```

**Campos del Request:**

| Campo                       | Tipo   | Requerido | Validación         | Descripción      | Ejemplo                     |
| --------------------------- | ------ | --------- | ------------------ | ---------------- | --------------------------- |
| `banco`                     | String | Sí        | -                  | Nombre del banco | `Banco de Crédito del Perú` |
| `codigoCuentaInterbancario` | String | Sí        | 20 dígitos exactos | CCI              | `00212345678901234567`      |

**Response 200 OK:**

```json
{
  "data": {
    "lista": {
      "banco": "Banco de Crédito del Perú",
      "codigoCuentaInterbancario": "00212345678901234567"
    },
    "respuesta": "OK",
    "mensaje": "Cuenta de abono guardada correctamente"
  }
}
```

---

## Tabla Resumen de Endpoints

| Método | Ruta                             | Descripción                                                  |
| ------ | -------------------------------- | ------------------------------------------------------------ |
| `GET`  | `/perfil?ruc={ruc}`              | Obtener perfil completo (empresa + representante + contacto) |
| `PUT`  | `/perfil/contacto?ruc={ruc}`     | Actualizar datos de contacto                                 |
| `GET`  | `/perfil/cuenta-abono?ruc={ruc}` | Obtener cuenta de abono                                      |
| `PUT`  | `/perfil/cuenta-abono?ruc={ruc}` | Registrar o actualizar cuenta de abono                       |

---

## Notas para Frontend

1. **La respuesta siempre viene envuelta en `ApiResponse`**: acceder a los datos vía `data.lista`.

2. **Campos no editables**: `datosEmpresa` y `representanteLegal` son de solo lectura (fuente SUNAT). El correo electrónico tampoco es editable.

3. **El endpoint de perfil retorna los 3 bloques** en una sola llamada: empresa, representante legal y contacto.

4. **La cuenta de abono puede ser null** si el transportista aún no ha registrado una cuenta.

5. **Validación del CCI**: Debe tener exactamente 20 dígitos. El backend valida con regex `^\d{20}$`.

6. **Error handling**: Todos los errores siguen la misma estructura `ApiResponse` con `data.respuesta: "ERROR"`.
