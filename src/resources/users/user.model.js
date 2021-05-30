const uuid = require('uuid');

/**
 * Class representing a User
 */
class User {
  /**
   * Create a User
   * @param {{id: string, name: string, login: string, password: string}} param0 first term
   */
  constructor({
    id = uuid.v4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Update the user
   * @param {{name: string, login: string, password: string}} user  first term
   */
  update(user) {
    this.name = user.name;
    this.login = user.login;
    this.password = user.password;
  }
  
  /**
   * Parse user to response
   * @param {User} user first term
   */
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
