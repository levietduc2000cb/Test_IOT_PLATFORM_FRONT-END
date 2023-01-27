import http from '~/util/http';

export const addTopic = (body) => {
  return http.post('/topic/addtopic', body);
};
