export function getFormattedDateToPTBR(date) {
  if (date.length < 10) {
    return date;
  }
  var data = new Date(date),
    dia = data.getDate().toString(),
    diaF = dia.length === 1 ? '0' + dia : dia,
    mes = (data.getMonth() + 1).toString(),
    mesF = mes.length === 1 ? '0' + mes : mes,
    anoF = data.getFullYear();
  return diaF + '/' + mesF + '/' + anoF;
}
