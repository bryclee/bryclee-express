var app = require('../server.js');
var request = require('supertest');

describe('routes', () => {
  it('should render the index route', () => {
    return request(app)
      .get('/')
      .expect(200)
      .expect(response => {
        console.log(response.text);
        expect(response.statusCode).toBe(200);
        expect(response.text).toMatchSnapshot();
      });
  });
});
