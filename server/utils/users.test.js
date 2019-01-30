const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: '1',
        name: 'Peter',
        room: 'Super hero'
      },
      {
        id: '2',
        name: 'Bruce',
        room: 'Super hero'
      },
      {
        id: '3',
        name: 'Menghua',
        room: 'Programmer'
      }
    ];
  });

  it('should add new user', () => {
    var spiderman = {
      id: '123',
      name: 'Peter',
      room: 'super hero'
    };
    var res = users.addUser(spiderman.id, spiderman.name, spiderman.room);
    expect(res).toMatchObject(spiderman);
    expect(users.users).toContainEqual(spiderman);
  });

  it('should return user names in the same room', () => {
    var names = users.getUserList('Super hero');
    expect(names.length).toBe(2);
    expect(names).toContain(users.users[0].name);
    expect(names).toContain(users.users[1].name);
  });

  it('should find user', () => {
    expect(users.getUser('1')).toBe(users.users[0]);
  });

  it('should not find user', () => {
    expect(users.getUser('0')).toBeFalsy();
  });

  it('should remove the user', () => {
    expect(users.removeUser('1')).toMatchObject({
      id: '1',
      name: 'Peter',
      room: 'Super hero'
    });
    expect(users.users.length).toBe(2);
    expect(users.users[0].id).toBe('2');
    expect(users.users[1].id).toBe('3');
  });

  it('should not remove any user', () => {
    expect(users.removeUser('0')).toBeFalsy();
    expect(users.users.length).toBe(3);
    expect(users.users[0].id).toBe('1');
    expect(users.users[1].id).toBe('2');
    expect(users.users[2].id).toBe('3');
  });
});
