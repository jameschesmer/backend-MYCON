process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const app = require('../app');
const request = require('supertest')(app);

describe('/api', () => {
  describe('/event', () => {
    it('GET /event', () => {
      return request
        .get('/api/event')
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys('events');
          expect(res.body.events.length).to.equal(1);
          expect(res.body.events[0]).to.be.an('object');
        });
    });
    it('POST /event', () => {
      const event = {
        "events_name": "birthday",
        "events_img": "img_url_here",
        "events_start": "1st Jan 2019",
        "events_end": "1st Feb 2019",
        "events_description": "a birthday party",
        "events_location": "party central"
      }
      return request
        .post('/api/event')
        .send(event)
        .expect(201)
        .then(res => {
          expect(res.body).to.have.all.keys('event');
          expect(res.body.event).to.be.an('object');
        });
    });
  });
    describe('/event/:event_id', () => {
      it('POST /event/:event_id', () => {
        const event_stalls = {
          "stall_id": "1",
          "stall_x": 0,
          "stall_y": 0,
          "stall_height": 40,
          "stall_width": 60,
          "stall_rotation": 0
        }
        return request
          .post('/api/event/1')
          .send(event_stalls)
          .expect(201)
          .then(res => {
            expect(res.body).to.have.all.keys('event_stalls');
            expect(res.body.event_stalls.length).to.equal(1);
            expect(res.body.event_stalls[0]).to.be.an('object');
          });
      });
    
      it('POST /event/:event_id returns with error 400 when sent an invalid or expired id', () => {
        const event_stalls = {
          "stall_id": "1",
          "stall_x": 0,
          "stall_y": 0,
          "stall_height": 40,
          "stall_width": 60,
          "stall_rotation": 0
        }
        return request
          .post('/api/event/5')
          .send(event_stalls)
          .expect(400)
          .then(res => {
            expect(res.body.msg).to.equal('No data returned from the query.');
          });
      });
    it('GET /event/:event_id', () => {
      return request
        .get('/api/event/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys('event');
          expect(res.body.event).to.be.an('object');
        });
    });
    it('GET /event/:event_id', () => {
      return request
        .get('/api/event/5')
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal('No data returned from the query.');
        });
    });

    it('PATCH /event/:event_id', () => {
      const event = {
        "events_img": "newimg_url_here"
      }
      return request
        .patch('/api/event/1')
        .send(event)
        .expect(201)
        .then(res => {
          expect(res.body).to.have.all.keys('event');
          expect(res.body.event.events_img).to.equal('newimg_url_here');
          expect(res.body.event).to.be.an('object');
        });
    });
    it('PATCH /event/:event_id', () => {
      const event = {
        "events_img": "newimg_url_here"
      }
      return request
        .patch('/api/event/5')
        .send(event)
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal('No data returned from the query.');
        });
    });
  });

  describe('/stall', () => {
    it('GET /stalls', () => {
      return request
        .get('/api/stalls')
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys('stalls');
          expect(res.body.stalls.length).to.equal(1);
          expect(res.body.stalls[0]).to.be.an('object');
        });
    });
    it('POST /stalls', () => {
      const event = {
        "stall_name": "birthday stall",
        "stall_logo": "img_url_here",
        "stall_description": "a stall for birthdays",
        "stall_email": "birthdaystall@birthday.com",
        "stall_web_address": "www.birthdaystallforyou.com",
        "stall_ctn": "0161100000"
      }
      return request
        .post('/api/stalls')
        .send(event)
        .expect(201)
        .then(res => {
          expect(res.body).to.have.all.keys('stall');
          expect(res.body.stall).to.be.an('object');
        });
    });
  });
  describe('/stalls/:stall_id', () => {
    it('PATCH /stalls/:stall_id', () => {
      const stall = {
        "stall_logo": "newimg_url_here"
      }
      return request
        .patch('/api/stalls/1')
        .send(stall)
        .expect(201)
        .then(res => {
          expect(res.body).to.have.all.keys('stall');
          expect(res.body.stall.stall_logo).to.equal('newimg_url_here');
          expect(res.body.stall).to.be.an('object');
        });
    });
    it('PATCH /stalls/:stall_id', () => {
      const stall = {
        "stall_logo": "newimg_url_here"
      }
      return request
        .patch('/api/stalls/5')
        .send(stall)
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal('No data returned from the query.');
        });
    });
    it('GET /stalls/:stall_id', () => {
      return request
        .get('/api/stalls/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys('stall');
          expect(res.body.stall).to.be.an('object');
        });
    });
    it('GET /stalls/:stall_id', () => {
      return request
        .get('/api/stalls/5')
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal('No data returned from the query.');
        });
    });
  });
});

describe('/event/:events_id/thisEvent', () => {
  it ('get /event/:events_id/thisEvent', () => {
    return request
    .get('/api/event/1/thisEvent')
      .expect(200)
      .then(res => {
        expect(res.body).to.have.all.keys('event_stalls')
        expect(res.body.event_stalls).to.be.an('object')
      })
    })
    it ('get /event/:events_id/thisEvent', () => {
      return request
      .get('/api/event/5/thisEvent')
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal('No data returned from the query.');
        })
      })
  })