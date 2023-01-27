import http from '~/util/http';

export const getWidgets = (idDashboard) => {
  return http.get(`/dashboard/getone/${idDashboard}`);
};

export const addWidget = (body) => {
  return http.post('/dashboard/addwidget', body);
};
