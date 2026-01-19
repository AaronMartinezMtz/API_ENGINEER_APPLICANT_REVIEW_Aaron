# Backend - Clean Architecture con TypeScript
## Sistema de Monitoreo de Sensores (Temperatura y Humedad)

## 📋 Estructura del Proyecto

```
src/
├── domain/                     # Capa de Dominio - Reglas de negocio
│   ├── entities/
│   │   ├── Temperature.ts      # Entidad de temperatura
│   │   └── Humidity.ts         # Entidad de humedad
│   └── interfaces/
│       ├── ITemperatureRepository.ts
│       ├── ITemperatureUseCase.ts
│       ├── IHumidityRepository.ts
│       └── IHumidityUseCase.ts
│
├── application/                # Capa de Aplicación
│   ├── usecases/
│   │   ├── TemperatureUseCases.ts
│   │   └── HumidityUseCases.ts
│   └── dto/
│       ├── TemperatureDTO.ts
│       └── HumidityDTO.ts
│
├── infrastructure/             # Capa de Infraestructura
│   └── repositories/
│       ├── TemperatureRepository.ts
│       └── HumidityRepository.ts
│
├── presentation/               # Capa de Presentación
│   ├── controllers/
│   │   ├── TemperatureController.ts
│   │   └── HumidityController.ts
│   └── routes/
│       ├── temperatureRoutes.ts
│       └── humidityRoutes.ts
│
└── index.ts                    # Punto de entrada
```

## 🏗️ Capas de Clean Architecture

### 1. **Domain (Dominio)**
- Entidades de sensores: `Temperature` y `Humidity`
- Interfaces independientes de cualquier tecnología

### 2. **Application (Aplicación)**
- Use Cases con validaciones de negocio
- DTOs para transferencia de datos

### 3. **Infrastructure (Infraestructura)**
- Repositorios con almacenamiento en memoria (escalable a BD)

### 4. **Presentation (Presentación)**
- Controllers REST y rutas
- WebSocket para eventos en tiempo real

## 🚀 Instalación y Uso

### Instalar dependencias
```bash
cd backend
npm install
```

### Compilar TypeScript
```bash
npm run build
```

### Ejecutar en desarrollo
```bash
npm run dev
```

### Ejecutar en producción
```bash
npm run start
```

## 📡 Endpoints API

### Temperatura
- `GET /api/temperature` - Obtener todos los registros
- `GET /api/temperature/:id` - Obtener por ID
- `GET /api/temperature/sensor/:sensorId` - Obtener por sensor
- `GET /api/temperature/location/:location` - Obtener por ubicación
- `GET /api/temperature/latest` - Último registro
- `POST /api/temperature` - Registrar temperatura
- `PUT /api/temperature/:id` - Actualizar valor
- `DELETE /api/temperature/:id` - Eliminar registro

### Humedad
- `GET /api/humidity` - Obtener todos los registros
- `GET /api/humidity/:id` - Obtener por ID
- `GET /api/humidity/sensor/:sensorId` - Obtener por sensor
- `GET /api/humidity/location/:location` - Obtener por ubicación
- `GET /api/humidity/latest` - Último registro
- `POST /api/humidity` - Registrar humedad
- `PUT /api/humidity/:id` - Actualizar valor
- `DELETE /api/humidity/:id` - Eliminar registro

## 📝 Ejemplos de Peticiones

### Registrar Temperatura
```json
POST /api/temperature
{
  "sensorId": "sensor-001",
  "value": 25.5,
  "location": "Sala"
}
```

### Registrar Humedad
```json
POST /api/humidity
{
  "sensorId": "sensor-002",
  "value": 65,
  "location": "Sala"
}
```

### Actualizar Temperatura
```json
PUT /api/temperature/:id
{
  "value": 26.3
}
```

## 🔄 Flujo de una Petición

```
HTTP Request
    ↓
Presentation Layer (Controller)
    ↓
Application Layer (UseCase)
    ↓
Domain Layer (Business Logic & Validation)
    ↓
Infrastructure Layer (Repository)
    ↓
Data Source (In-Memory Storage)
    ↓
HTTP Response
```

## ⚡ WebSocket Events

- `temperature` - Evento de temperatura recibido
- `temperature-update` - Broadcast de actualización
- `humidity` - Evento de humedad recibido
- `humidity-update` - Broadcast de actualización

## ✨ Validaciones Implementadas

### Temperatura
- Rango: -50°C a 150°C
- Unidad: Celsius
- Sensor ID y ubicación requeridos

### Humedad
- Rango: 0% a 100%
- Unidad: %
- Sensor ID y ubicación requeridos

## 🛠️ Próximas Mejoras

- [ ] Integración con base de datos (MongoDB/PostgreSQL)
- [ ] Autenticación y autorización
- [ ] Rate limiting
- [ ] Histórico de datos
- [ ] Alertas por umbrales
- [ ] Dashboard de monitoreo
- [ ] Tests unitarios e integración
- [ ] Documentación Swagger/OpenAPI
- [ ] Exportar datos (CSV/JSON)

## 📊 Características de Clean Architecture

✅ Testeable - Capas independientes
✅ Mantenible - Código organizado
✅ Escalable - Fácil agregar sensores
✅ Independencia de framework
✅ Separación de responsabilidades
