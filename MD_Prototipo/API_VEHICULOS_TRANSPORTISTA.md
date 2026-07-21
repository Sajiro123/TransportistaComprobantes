# API Vehículos del Transportista

## Base URL

```
/api_comprobante/vehiculos
```

---

## 1. Listar Vehículos

Obtiene la lista de vehículos registrados del transportista con filtros opcionales de búsqueda.

### `GET /api_comprobante/vehiculos`

**Query Parameters:**

| Parámetro   | Tipo   | Requerido | Descripción                            | Ejemplo       |
| ----------- | ------ | --------- | -------------------------------------- | ------------- |
| `ruc`       | String | Sí        | RUC del transportista                  | `20512345678` |
| `busqueda`  | String | No        | Búsqueda por placa, TUC o autorización | `AXG`         |
| `categoria` | String | No        | Filtrar por categoría                  | `M3`          |
| `estado`    | String | No        | Filtrar por estado de validación       | `VALIDADO`    |

**Response 200 OK:**

```json
{
  "data": {
    "lista": [
      {
        "id": 1,
        "placa": "AXG-712",
        "categoria": "M3",
        "topeGalones": 1915.41,
        "numeroAutorizacion": "AUT-2024-01123",
        "entidadAutorizadora": "Municipalidad Metropolitana de Lima",
        "tuc": "T-084512",
        "tucVencida": false,
        "estadoValidacion": "VALIDADO",
        "propietario": {
          "tipoDocumento": "RUC",
          "numeroDocumento": "20512345678",
          "nombre": "Transportes Lima Sur S.A.C."
        },
        "validaciones": [
          {
            "campo": "PLACA",
            "estado": "VALIDADO",
            "entidadValidadora": "MTC"
          },
          {
            "campo": "CARROCERIA",
            "estado": "VALIDADO",
            "entidadValidadora": "MTC"
          },
          { "campo": "TUC", "estado": "VALIDADO", "entidadValidadora": "MTC" },
          {
            "campo": "AUTORIZACION",
            "estado": "VALIDADO",
            "entidadValidadora": "Municipalidad Metropolitana de Lima"
          },
          {
            "campo": "PROPIETARIO",
            "estado": "VALIDADO",
            "entidadValidadora": "SUNAT / RENIEC"
          }
        ]
      },
      {
        "id": 2,
        "placa": "B2W-458",
        "categoria": "N2",
        "topeGalones": 888.45,
        "numeroAutorizacion": "AUT-2024-01124",
        "entidadAutorizadora": "Gobierno Regional de Lima",
        "tuc": "T-084513",
        "tucVencida": false,
        "estadoValidacion": "EN_REVISION",
        "propietario": {
          "tipoDocumento": "RUC",
          "numeroDocumento": "20987654321",
          "nombre": "Transportes Callao Express S.A.C."
        },
        "validaciones": [
          {
            "campo": "PLACA",
            "estado": "EN_REVISION",
            "entidadValidadora": "MTC"
          },
          {
            "campo": "CARROCERIA",
            "estado": "EN_REVISION",
            "entidadValidadora": "MTC"
          },
          { "campo": "TUC", "estado": "VALIDADO", "entidadValidadora": "MTC" },
          {
            "campo": "AUTORIZACION",
            "estado": "EN_REVISION",
            "entidadValidadora": "Gobierno Regional de Lima"
          },
          {
            "campo": "PROPIETARIO",
            "estado": "EN_REVISION",
            "entidadValidadora": "SUNAT / RENIEC"
          }
        ]
      },
      {
        "id": 3,
        "placa": "C4T-119",
        "categoria": "M2",
        "topeGalones": 674.65,
        "numeroAutorizacion": "AUT-2023-00987",
        "entidadAutorizadora": "MTC",
        "tuc": "T-084514",
        "tucVencida": true,
        "estadoValidacion": "RECHAZADO",
        "propietario": {
          "tipoDocumento": "RUC",
          "numeroDocumento": "20512345678",
          "nombre": "Transportes Lima Sur S.A.C."
        },
        "validaciones": [
          {
            "campo": "PLACA",
            "estado": "RECHAZADO",
            "entidadValidadora": "MTC"
          },
          {
            "campo": "CARROCERIA",
            "estado": "VALIDADO",
            "entidadValidadora": "MTC"
          },
          { "campo": "TUC", "estado": "RECHAZADO", "entidadValidadora": "MTC" },
          {
            "campo": "AUTORIZACION",
            "estado": "VALIDADO",
            "entidadValidadora": "MTC"
          },
          {
            "campo": "PROPIETARIO",
            "estado": "VALIDADO",
            "entidadValidadora": "SUNAT / RENIEC"
          }
        ]
      }
    ],
    "respuesta": "OK",
    "mensaje": "Se encontraron 3 vehículos"
  }
}
```

**Campos del Response (cada elemento del array):**

| Campo                 | Tipo       | Descripción                        | Ejemplo                               |
| --------------------- | ---------- | ---------------------------------- | ------------------------------------- |
| `id`                  | Integer    | ID del vehículo                    | `1`                                   |
| `placa`               | String     | Placa del vehículo                 | `AXG-712`                             |
| `categoria`           | String     | Categoría del vehículo             | `M3`                                  |
| `topeGalones`         | BigDecimal | Tope de galones según categoría    | `1915.41`                             |
| `numeroAutorizacion`  | String     | Número de autorización             | `AUT-2024-01123`                      |
| `entidadAutorizadora` | String     | Entidad que autorizó               | `Municipalidad Metropolitana de Lima` |
| `tuc`                 | String     | Número de TUC                      | `T-084512`                            |
| `tucVencida`          | Boolean    | Indica si el TUC está vencido      | `false`                               |
| `estadoValidacion`    | String     | Estado de validación del vehículo  | `VALIDADO`                            |
| `propietario`         | Object     | Datos del propietario del vehículo | Ver abajo                             |
| `validaciones`        | Array      | Validaciones por cada campo        | Ver abajo                             |

**Objeto `propietario`:**

| Campo             | Tipo   | Descripción           | Ejemplo                       |
| ----------------- | ------ | --------------------- | ----------------------------- |
| `tipoDocumento`   | String | Tipo de documento     | `RUC`                         |
| `numeroDocumento` | String | Número de documento   | `20512345678`                 |
| `nombre`          | String | Nombre o razón social | `Transportes Lima Sur S.A.C.` |

**Array `validaciones` (cada elemento):**

| Campo               | Tipo   | Descripción                       | Ejemplo                                                     |
| ------------------- | ------ | --------------------------------- | ----------------------------------------------------------- |
| `campo`             | String | Campo validado                    | `PLACA`, `CARROCERIA`, `TUC`, `AUTORIZACION`, `PROPIETARIO` |
| `estado`            | String | Estado de la validación           | `VALIDADO`, `EN_REVISION`, `RECHAZADO`                      |
| `entidadValidadora` | String | Entidad que realiza la validación | `MTC`, `SUNAT / RENIEC`                                     |

---

## 2. Obtener Vehículo por ID

Obtiene el detalle de un vehículo específico con validaciones por campo y datos del propietario.

### `GET /api_comprobante/vehiculos/{id}`

**Path Parameters:**

| Parámetro | Tipo    | Descripción     | Ejemplo |
| --------- | ------- | --------------- | ------- |
| `id`      | Integer | ID del vehículo | `1`     |

**Response 200 OK:**

```json
{
  "data": {
    "lista": {
      "id": 1,
      "placa": "AXG-712",
      "categoria": "M3",
      "topeGalones": 1915.41,
      "numeroAutorizacion": "AUT-2024-01123",
      "entidadAutorizadora": "Municipalidad Metropolitana de Lima",
      "tuc": "T-084512",
      "tucVencida": false,
      "estadoValidacion": "VALIDADO",
      "propietario": {
        "tipoDocumento": "RUC",
        "numeroDocumento": "20512345678",
        "nombre": "Transportes Lima Sur S.A.C."
      },
      "validaciones": [
        { "campo": "PLACA", "estado": "VALIDADO", "entidadValidadora": "MTC" },
        {
          "campo": "CARROCERIA",
          "estado": "VALIDADO",
          "entidadValidadora": "MTC"
        },
        { "campo": "TUC", "estado": "VALIDADO", "entidadValidadora": "MTC" },
        {
          "campo": "AUTORIZACION",
          "estado": "VALIDADO",
          "entidadValidadora": "Municipalidad Metropolitana de Lima"
        },
        {
          "campo": "PROPIETARIO",
          "estado": "VALIDADO",
          "entidadValidadora": "SUNAT / RENIEC"
        }
      ]
    },
    "respuesta": "OK",
    "mensaje": "Detalle de vehículo obtenido correctamente"
  }
}
```

**Response 404 Not Found:**

```json
{
  "data": {
    "lista": {
      "code": "VEH_004",
      "message": "Vehículo no encontrado",
      "descripcion": "No existe vehículo con el ID: 99"
    },
    "respuesta": "ERROR",
    "mensaje": "Vehículo no encontrado"
  }
}
```

---

## 3. Registrar Vehículo

Registra un nuevo vehículo para el transportista con datos del propietario.

### `POST /api_comprobante/vehiculos`

**Request Body:**

```json
{
  "placa": "D5R-330",
  "categoria": "M1",
  "topeGalones": 500.0,
  "numeroAutorizacion": "AUT-0000-00000",
  "tuc": "T-000000",
  "propietarioTipoDocumento": "RUC",
  "propietarioNumeroDocumento": "20512345678",
  "propietarioNombre": "Transportes Lima Sur S.A.C."
}
```

**Campos del Request:**

| Campo                        | Tipo       | Requerido | Descripción                           | Ejemplo                       |
| ---------------------------- | ---------- | --------- | ------------------------------------- | ----------------------------- |
| `placa`                      | String     | Sí        | Placa del vehículo                    | `D5R-330`                     |
| `categoria`                  | String     | Sí        | Categoría del vehículo                | `M1`                          |
| `topeGalones`                | BigDecimal | Sí        | Tope de galones según categoría       | `500.00`                      |
| `numeroAutorizacion`         | String     | Sí        | Número de autorización                | `AUT-0000-00000`              |
| `tuc`                        | String     | Sí        | Número de TUC                         | `T-000000`                    |
| `propietarioTipoDocumento`   | String     | No        | Tipo de documento del propietario     | `RUC`                         |
| `propietarioNumeroDocumento` | String     | Sí        | Número de documento del propietario   | `20512345678`                 |
| `propietarioNombre`          | String     | No        | Nombre o razón social del propietario | `Transportes Lima Sur S.A.C.` |

**Response 201 Created:**

```json
{
  "data": {
    "lista": {
      "id": 4,
      "placa": "D5R-330",
      "categoria": "M1",
      "topeGalones": 500.0,
      "numeroAutorizacion": "AUT-0000-00000",
      "entidadAutorizadora": null,
      "tuc": "T-000000",
      "tucVencida": false,
      "estadoValidacion": "EN_REVISION",
      "propietario": {
        "tipoDocumento": "RUC",
        "numeroDocumento": "20512345678",
        "nombre": "Transportes Lima Sur S.A.C."
      },
      "validaciones": [
        {
          "campo": "PLACA",
          "estado": "EN_REVISION",
          "entidadValidadora": "MTC"
        },
        {
          "campo": "CARROCERIA",
          "estado": "EN_REVISION",
          "entidadValidadora": "MTC"
        },
        { "campo": "TUC", "estado": "EN_REVISION", "entidadValidadora": "MTC" },
        {
          "campo": "AUTORIZACION",
          "estado": "EN_REVISION",
          "entidadValidadora": "Pendiente"
        },
        {
          "campo": "PROPIETARIO",
          "estado": "EN_REVISION",
          "entidadValidadora": "SUNAT / RENIEC"
        }
      ]
    },
    "respuesta": "OK",
    "mensaje": "Vehículo registrado correctamente"
  }
}
```

---

## 4. Actualizar Vehículo

Actualiza los datos de un vehículo existente.

### `PUT /api_comprobante/vehiculos/{id}`

**Path Parameters:**

| Parámetro | Tipo    | Descripción     | Ejemplo |
| --------- | ------- | --------------- | ------- |
| `id`      | Integer | ID del vehículo | `1`     |

**Request Body:** (misma estructura que Registrar)

```json
{
  "placa": "AXG-712",
  "categoria": "M3",
  "topeGalones": 1915.41,
  "numeroAutorizacion": "AUT-2024-01123",
  "tuc": "T-084512",
  "propietarioTipoDocumento": "RUC",
  "propietarioNumeroDocumento": "20512345678",
  "propietarioNombre": "Transportes Lima Sur S.A.C."
}
```

**Response 200 OK:** (misma estructura que Registrar con los datos actualizados)

---

## 5. Eliminar Vehículo

Elimina un vehículo registrado.

### `DELETE /api_comprobante/vehiculos/{id}`

**Path Parameters:**

| Parámetro | Tipo    | Descripción     | Ejemplo |
| --------- | ------- | --------------- | ------- |
| `id`      | Integer | ID del vehículo | `1`     |

**Response 200 OK:**

```json
{
  "data": {
    "lista": null,
    "respuesta": "OK",
    "mensaje": "Vehículo eliminado correctamente"
  }
}
```

---

## 6. Carga Masiva por Excel

Registra múltiples vehículos desde un archivo Excel.

### `POST /api_comprobante/vehiculos/excel`

**Content-Type:** `multipart/form-data`

**Form Data:**

| Campo     | Tipo | Requerido | Descripción                             | Ejemplo          |
| --------- | ---- | --------- | --------------------------------------- | ---------------- |
| `archivo` | File | Sí        | Archivo Excel (.xlsx, .xls, máximo 5MB) | `vehiculos.xlsx` |

**Formato del Excel (columnas esperadas):**

| Placa   | Categoría | TUC      | N.° Autorización | Prop. Documento | Prop. N.° Documento | Prop. Nombre                |
| ------- | --------- | -------- | ---------------- | --------------- | ------------------- | --------------------------- |
| D5R-330 | M1        | T-000000 | AUT-0000-00000   | RUC             | 20512345678         | Transportes Lima Sur S.A.C. |
| XYZ-789 | M3        | T-111111 | AUT-1111-11111   | DNI             | 12345678            | Juan Pérez                  |

**Response 201 Created:**

```json
{
  "data": {
    "lista": [
      {
        "id": 5,
        "placa": "D5R-330",
        "categoria": "M1",
        "topeGalones": 500.00,
        "numeroAutorizacion": "AUT-0000-00000",
        "entidadAutorizadora": null,
        "tuc": "T-000000",
        "tucVencida": false,
        "estadoValidacion": "EN_REVISION",
        "propietario": {
          "tipoDocumento": "RUC",
          "numeroDocumento": "20512345678",
          "nombre": "Transportes Lima Sur S.A.C."
        },
        "validaciones": [...]
      }
    ],
    "respuesta": "OK",
    "mensaje": "2 vehículos registrados correctamente"
  }
}
```

**Response 400 Error (archivo inválido):**

```json
{
  "data": {
    "lista": {
      "code": "VEH_008",
      "message": "Formato no válido",
      "descripcion": "Solo se admiten archivos .xlsx o .xls"
    },
    "respuesta": "ERROR",
    "mensaje": "Error al procesar la solicitud"
  }
}
```

---

## Tabla Resumen de Endpoints

| Método   | Ruta                   | Descripción                       |
| -------- | ---------------------- | --------------------------------- |
| `GET`    | `/vehiculos?ruc={ruc}` | Listar vehículos con filtros      |
| `GET`    | `/vehiculos/{id}`      | Obtener vehículo con validaciones |
| `POST`   | `/vehiculos`           | Registrar vehículo individual     |
| `PUT`    | `/vehiculos/{id}`      | Actualizar vehículo               |
| `DELETE` | `/vehiculos/{id}`      | Eliminar vehículo                 |
| `POST`   | `/vehiculos/excel`     | Carga masiva desde Excel          |

---

| Campo                        | Icono | Entidad que valida | Fuente                                            |
| ---------------------------- | ----- | ------------------ | ------------------------------------------------- |
| Placa y categoría/carrocería | P     | MTC                | Registro vehicular y clasificación de carrocería  |
| TUC                          | T     | MTC                | Tarjeta Única de Circulación vigente              |
| Autorización                 | A     | Entidad remitente  | Gobierno Regional, Municipalidad Provincial o MTC |
| Propietario y conductor      | D     | SUNAT / RENIEC     | Datos de identidad y licencia                     |

---

## Estados de Validación

| Estado        | Descripción                      | Color sugerido |
| ------------- | -------------------------------- | -------------- |
| `VALIDADO`    | Campo validado correctamente     | Verde          |
| `EN_REVISION` | Campo en proceso de validación   | Amarillo       |
| `RECHAZADO`   | Campo rechazado en la validación | Rojo           |

## Categorías de Vehículos

| Categoría | Tope Galones | Descripción     |
| --------- | ------------ | --------------- |
| `M1`      | ~500         | Auto/particular |
| `M2`      | 674.65       | Menor capacidad |
| `M3`      | 1,915.41     | Mayor capacidad |
| `N2`      | 888.45       | Normal          |

---

## Notas para Frontend

1. **La respuesta siempre viene envuelta en `ApiResponse`**: acceder a los datos vía `data.lista`.

2. **El endpoint de registro retorna `EN_REVISION`** por defecto para cada campo del nuevo vehículo.

3. **El campo `tucVencida`** indica si el TUC está vencido (true/false). Se puede renderizar con un badge o ícono.

4. **El array `validaciones`** contiene el estado de cada campo individual.

5. **El objeto `propietario`** contiene los datos del dueño del vehículo (documento, número, nombre).

6. **Carga masiva**: El endpoint `/excel` recibe un `multipart/form-data` con el archivo. La descarga de plantilla es estática y se puede servir desde el frontend.

7. **Error handling**: Todos los errores siguen la misma estructura `ApiResponse` con `data.respuesta: "ERROR"`.
