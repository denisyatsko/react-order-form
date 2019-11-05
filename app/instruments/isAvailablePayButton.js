import { config } from 'config';

export function isAvailablePayButton(discipline, deadline, pagesNum) {
  function complicated_disciplines(discipline) {
    return config.complicatedDisciplines.some(item => item === discipline)
  }

  function correlation_pages_to_deadline_complicated(pages, deadline) {
    if (pages === 1 && deadline >= 28800) return true;
    if (pages === 2 && deadline >= 86400) return true;
    if ((pages === 3 || pages === 4) && deadline >= 172800) return true;
    if (pages >= 5 && deadline >= 432000) return true;
    return false;
  }

  function correlation_pages_to_deadline_any(pages, deadline) {
    if ((pages === 1 || pages === 2) && deadline >= 10800) return true;
    if ((pages === 3 || pages === 4) && deadline >= 28800) return true;
    if ((pages >= 5 && pages <= 8) && deadline >= 86400) return true;
    if ((pages > 8 && pages <= 15) && deadline >= 172800) return true;
    if (pages >= 16 && deadline >= 259200) return true;
    return false;
  }

  return complicated_disciplines(discipline) === true
    ? correlation_pages_to_deadline_complicated(+pagesNum, deadline)
    : correlation_pages_to_deadline_any(+pagesNum, deadline);
}
