export default class FormatHelpers {

  getInitials(name: string) {

    let names = name.split(" ");

    let initials = "";

    let limit = names.length == 1 ? 0 : 1;

    for (let i = 0; i <= limit; i++) {

      let letter = names[i][0];

      initials += letter;

      if (i == limit) {

        return initials.toUpperCase();

      }
    }
  }

  calculateDays(from: Date) {

    const milisegundosPorDia = 24 * 60 * 60 * 1000;

    const today = new Date();

    const diferenciaMilisegundos = today.getTime() - from.getTime();

    const diasPasados = Math.floor(

      diferenciaMilisegundos / milisegundosPorDia

    );

    if (diasPasados >= 30) {

      const months = Math.floor(diasPasados / 30);

      if (months == 1) {

        return `hace ${months} mes`;

      } else if (months > 1) {

        return `hace ${months} meses`;

      } else if (months >= 12) {

        return `hace ${Math.floor(diasPasados / 365)} años`;
      }

    } else {

      return `hace ${diasPasados} días`;
    }
  }
}

