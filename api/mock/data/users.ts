import { hash } from '@/utils';

export declare type TCredentials = {
  username: string;
  password: string
};

export declare type TUser = {
  [key: string]: Record<string, string>;
}

export declare interface IError extends Error {
  status?: string | number;
};

class _User {
  private users: TUser = {};
  private error: IError | null = null;

  public validateUserForm({ username, password }: TCredentials) {
    if (!username) {
      this.error = new Error('The username is required');
      this.error.status = 400;
      throw this.error;
    }

    if (!password) {
      this.error = new Error('The password is required');
      this.error.status = 400;
      throw this.error
    }
  }

  public create({ username, password }: TCredentials) {
    this.validateUserForm({ username, password });

    const _id = hash(username);
    const _password = hash(password);

    if (this.users[_id]) {
      this.error = new Error(`Cannot create a new user with the username "${username}"`);
      this.error.status = 400;
      throw this.error;
    }

    this.users[_id] = { id: _id, username, passwordHash: _password };
    // Should persist here
    return this.read(_id);
  }

  public read(id: string) {
    this.validateUser(id);
    return this.sanitizeUser(this.users[id]);
  }

  public validateUser(id: string) {
    // should load data here
    if (this.users[id]) return;
    this.error = new Error(`No user with the id "${id}"`);
    this.error.status = 404;
    throw this.error;
  }

  public sanitizeUser(user: Record<string, string>) {
    const { passwordHash, ...rest } = user;
    return rest;
  }

  public authenticate({ username, password }: TCredentials) {
    this.validateUserForm({ username, password });

    const _id = hash(username);
    const _user = this.users[_id] || {};

    if (_user.passwordHash === hash(password))
      return { ...this.sanitizeUser(_user), token: btoa(_user.id) }

    this.error = new Error('Invalid username or password');
    this.error.status = 400;
    throw this.error;
  }
};

export const User = new _User();