import { config } from 'config';

export const userTimeView = time_ms => {
  const dtm = new Date(time_ms);
  let mm = `${config.month[dtm.getMonth()]}`;
  let dd = `${dtm.getDate()}`;
  let hh = dtm.getHours();
  let ii = dtm.getMinutes();
  const ampm = hh >= 12 ? 'PM' : 'AM';
  if (parseInt(mm) < 10) mm = `0${mm}`;
  if (parseInt(dd) < 10) dd = `0${dd}`;
  hh %= 12;
  hh = hh || 12;
  ii = ii < 10 ? `0${ii}` : ii;
  hh = hh < 10 ? `0${hh}` : hh;
  const strTime = `${hh}:${ii} ${ampm}`;
  const ddl_user = `${mm} ${dd} ` + ` ${strTime}`;
  return ddl_user;
};
