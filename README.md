Descripción del Proyecto:
El proyecto se centra en la creación de una aplicación de gestión financiera desarrollada con Nest.js. Aunque algunas funcionalidades están pendientes de implementar, actualmente cuenta con un sistema de autenticación basado en JWT, permite la creación de usuarios y la relación de estos con cuentas bancarias, las cuales también pueden ser creadas. Además, ofrece la capacidad de enviar y consultar transacciones de dinero entre cuentas.

Rutas y Controladores:

AuthController: Maneja la autenticación de usuarios, con una ruta para iniciar sesión (/auth/login), que valida las credenciales del usuario y genera un token JWT para la autenticación posterior.
UsersController: Encargado de la gestión de usuarios, proporciona funcionalidades como la creación de usuarios, búsqueda de usuarios por diferentes criterios, actualización y eliminación de usuarios.
AcountsController: Controla las operaciones relacionadas con las cuentas bancarias, incluyendo la creación de nuevas cuentas y la recuperación de información sobre las mismas.
TransactionsController: Gestiona las transacciones financieras, permitiendo la creación de nuevas transacciones de dinero entre cuentas y la consulta de transacciones por usuario.
Este proyecto ofrece una base sólida para el desarrollo de una aplicación de gestión financiera completa, con la posibilidad de expandir sus funcionalidades en el futuro.

Discriminación de transacciones a terceros (pendiente)
Posible solución:

Integración de API Externa para Consultar Tipos de Moneda y Realizar Conversiones Monetarias (QUEDO PENDIENTE)

async convertCurrency(amount: number, fromCurrency: string, toCurrency: string): Promise<number> {
try {

      const response = await axios.get(`API_URL/convert?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);


      const conversionRate = response.data.rate;


      const convertedAmount = amount * conversionRate;

      return convertedAmount;
    } catch (error) {
      // Manejo de errores
      console.error('Error al realizar la conversión de moneda:', error);
      throw new Error('Error al realizar la conversión de moneda');
    }

}

Esta seria una manera sencilla de implementar la comunicación a la api, y luego llamar en el service de transactions.

Por ultimo tambien quedó pendiente documentar la API con los decorators de Swagger para finalizar la documentación.
