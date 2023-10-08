import { Injectable } from '@nestjs/common';

@Injectable()
export class SoqlBuilder {
  private _fields: string[] = [];
  private _from: string;
  private _where: string;
  private _limit: number | null = null;
  private _offset: number | null = null;
  private _groupBy: string[] = [];
  private _having: string;
  private _orderBy: string[] = [];

  select(...fields: string[]): SoqlBuilder {
    this._fields = fields;
    return this;
  }

  from(objectName: string): SoqlBuilder {
    this._from = objectName;
    return this;
  }

  where(condition: string): SoqlBuilder {
    this._where = condition;
    return this;
  }

  setLimit(limit: number): SoqlBuilder {
    this._limit = limit;
    return this;
  }

  setOffset(offset: number): SoqlBuilder {
    this._offset = offset;
    return this;
  }

  groupBy(...fields: string[]): SoqlBuilder {
    this._groupBy = fields;
    return this;
  }

  having(condition: string): SoqlBuilder {
    this._having = condition;
    return this;
  }

  orderBy(...fields: string[]): SoqlBuilder {
    this._orderBy = fields;
    return this;
  }

  build(): string {
    const fieldsClause = this._fields.join(', ');
    let query = `SELECT ${fieldsClause} FROM ${this._from}`;

    if (this._where) {
      query += ` WHERE ${this._where}`;
    }

    if (this._groupBy.length) {
      query += ` GROUP BY ${this._groupBy.join(', ')}`;
    }

    if (this._having) {
      query += ` HAVING ${this._having}`;
    }

    if (this._orderBy.length) {
      query += ` ORDER BY ${this._orderBy.join(', ')}`;
    }

    if (this._limit !== null) {
      query += ` LIMIT ${this._limit}`;
    }

    if (this._offset !== null) {
      query += ` OFFSET ${this._offset}`;
    }

    return query;
  }
}
