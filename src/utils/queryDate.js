module.exports = function queryDate(month, year, mobile) {
  if (month != null && year != null) {
    if (month === 1) {
      if (new Date(year, 1, 29).getDate() === 29) {
        return {
          date: {
            $gte: new Date(year, month, 1),
            $lte: new Date(year, month, 29),
          },
        };
      }
      return {
        date: {
          $gte: new Date(year, month, 1),
          $lte: new Date(year, month, 28),
        },
      };
    }
    return {
      date: {
        $gte: new Date(year, month, 1),
        $lte: new Date(year, month, 31),
      },
    };
  } if (mobile === 'true') {
    const today = new Date();

    return {
      date: {
        $gte: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0),
      },
    };
  }
  return {};
};
