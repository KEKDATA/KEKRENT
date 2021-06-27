import cheerio from 'cheerio';

const convertTime12to24 = (time12h: string) => {
  const [time, modifier] = time12h.split(' ');

  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM') {
    hours = String(parseInt(hours, 10) + 12);
  }

  return `${hours}:${minutes}`;
};

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const parseNonAuthPostDate = (
  timeNode: cheerio.Cheerio,
  root: cheerio.Root,
) => {
  const date = new Date();

  let time = timeNode.text().slice(0, 1);

  try {
    timeNode.children().each((index, partOfTimeElement) => {
      const partOfTimeNode = root(partOfTimeElement);
      const isStyleExist = Boolean(partOfTimeNode.attr('style'));

      if (!isStyleExist) {
        const timeWord = partOfTimeNode.text();

        if (time === timeWord) {
          return;
        }

        const withoutSpaces = timeWord.replace(/\s/g, '');

        // Facebook generate some shit but not space actually
        if (withoutSpaces.length === 0) {
          return (time = `${time} `);
        }

        time += timeWord;
      }
    });

    // First symbol after parse can be some shit, sneaky facebook logic
    if (time.slice(0, 1) !== 'Y') {
      time = `${time.slice(0, 1).replace(/[A-Za-z]/g, '')}${time.slice(1)}`;
    }

    /**
     * formats
     * min's
     * hr's
     * Yesterday
     * 12 July at 08:59
     */
    const isMinutes = time.includes('min');
    const isHours = time.includes('hr');
    const isYesterday = time.includes('Yesterday');

    if (!time) {
      return date;
    }

    switch (true) {
      case isMinutes: {
        const minutes = +time.split(' ')[0];

        if (minutes) {
          date.setMinutes(date.getMinutes() - minutes);
        }

        break;
      }

      case isHours: {
        const hours = +time.split(' ')[0];

        if (hours) {
          date.setHours(date.getHours() - hours);
        }

        break;
      }

      case isYesterday: {
        const hoursAndMinutes = time.split(' ')[2];
        const [hours, minutes] = hoursAndMinutes.split(':');

        const normalizedHours = +hours;
        const normalizedMinutes = +minutes;

        date.setDate(date.getDate() - 1);

        if (normalizedMinutes) {
          date.setMinutes(normalizedMinutes);
        }

        if (normalizedHours) {
          date.setHours(normalizedHours);
        }

        break;
      }

      default: {
        const [day, month, at, hoursAndMinutes] = time.split(' ');

        const selectedMonth = months.findIndex(m => m === month);

        date.setMonth(selectedMonth);

        date.setDate(+day);

        if (hoursAndMinutes) {
          const [hours, minutes] = hoursAndMinutes.split(':');

          const normalizedHours = +hours;
          const normalizedMinutes = +minutes;

          if (normalizedMinutes) {
            date.setMinutes(normalizedMinutes);
          }

          if (normalizedHours) {
            date.setHours(normalizedHours);
          }
        }

        break;
      }
    }
  } catch (err) {
    console.log(err);
  }

  return date;
};

export const parsePostDate = (
  timeNode: cheerio.Cheerio,
  root: cheerio.Root,
  isAuth: boolean,
) => {
  if (!isAuth) {
    return parseNonAuthPostDate(timeNode, root);
  }

  const time = timeNode.text();
  const date = new Date();

  try {
    const timeWithoutNumbers = time.replace(/[0-9]/g, '');
    const isMinutes = timeWithoutNumbers === 'm';
    const isHours = timeWithoutNumbers === 'h';
    const isDays = timeWithoutNumbers === 'd';

    switch (true) {
      case isMinutes: {
        const minutes = +time.replace('m', '');

        if (minutes) {
          date.setMinutes(date.getMinutes() - minutes);
        }

        break;
      }

      case isHours: {
        const hours = +time.replace('h', '');

        if (hours) {
          date.setHours(date.getHours() - hours);
        }

        break;
      }

      case isDays: {
        const days = +time.replace('d', '');

        if (days) {
          date.setDate(date.getDate() - days);
        }

        break;
      }

      default: {
        const [month, day, at, hoursAndMinutes, hourFormat] = time.split(' ');

        const selectedMonth = months.findIndex(m => m === month);

        date.setMonth(selectedMonth);

        date.setDate(+day);

        if (hoursAndMinutes) {
          const normalizedHoursAndMinutes = convertTime12to24(
            `${hoursAndMinutes} ${hourFormat}`,
          );

          const [hours, minutes] = normalizedHoursAndMinutes.split(':');

          const normalizedHours = +hours;
          const normalizedMinutes = +minutes;

          if (normalizedMinutes) {
            date.setMinutes(normalizedMinutes);
          }

          if (normalizedHours) {
            date.setHours(normalizedHours);
          }
        }
      }
    }
  } catch (err) {
    console.log(err);
  }

  return date;
};
