// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export interface IFilterDto {
  columnName: Scalars['String'];
  operation: FilterOperationEnum;
  type: FilterFieldTypeEnum;
  value: Array<Scalars['String']>;
}

export enum FilterFieldTypeEnum {
  Null = 'NULL',
  Boolean = 'boolean',
  Date = 'date',
  DateRange = 'dateRange',
  Number = 'number',
  NumberRange = 'numberRange',
  Text = 'text'
}

export enum FilterOperationEnum {
  Contains = 'contains',
  Equal = 'equal',
  NotEqual = 'notEqual'
}

export enum GenreTypeEnum {
  Electronic = 'electronic',
  Hiphop = 'hiphop',
  Jazz = 'jazz',
  Metal = 'metal',
  Pop = 'pop',
  Punk = 'punk',
  Rock = 'rock'
}

export interface IMutation {
  __typename?: 'Mutation';
  /** @protected - create remix */
  createRemix: IRemixModel;
  /** @protected - delete remix */
  deleteRemix: Scalars['Boolean'];
  /** @protected - update remix */
  updateRemix: IRemixModel;
}

export type IMutationCreateRemixArgs = {
  payload: IRemixCreateDto;
};

export type IMutationDeleteRemixArgs = {
  payload: IRemixIdDto;
};

export type IMutationUpdateRemixArgs = {
  payload: IRemixUpdateDto;
};

export interface IPaginateDto {
  skip: Scalars['Int'];
  take: Scalars['Int'];
}

export interface IPaginateModel {
  __typename?: 'PaginateModel';
  isMy?: Maybe<Scalars['Boolean']>;
  maxDate?: Maybe<Scalars['DateTime']>;
  minDate?: Maybe<Scalars['DateTime']>;
  skip: Scalars['Int'];
  take: Scalars['Int'];
  total: Scalars['Int'];
}

export interface IQuery {
  __typename?: 'Query';
  /** @public - getting a remix by ID */
  remixById: IRemixModel;
  /** @public - getting a list of remixes */
  remixes: IRemixesModel;
}

export type IQueryRemixByIdArgs = {
  payload: IRemixIdDto;
};

export type IQueryRemixesArgs = {
  payload: IRemixGetDto;
};

export interface IRemixCreateDto {
  /** Author's email */
  authorEmail: Scalars['String'];
  /** Description remix */
  description: Scalars['String'];
  genre: GenreTypeEnum;
  isStore: Scalars['Boolean'];
  /** Remix name */
  name: Scalars['String'];
  /** Price */
  price: Scalars['Int'];
  /** Track length */
  trackLength: Scalars['Int'];
}

export interface IRemixGetDto {
  /** parameters for filtering */
  filters?: InputMaybe<Array<IFilterDto>>;
  /** parameters for pagination */
  paginate?: InputMaybe<IPaginateDto>;
  /** parameters for sort */
  sorts?: InputMaybe<Array<ISortDto>>;
}

export interface IRemixIdDto {
  id: Scalars['Int'];
}

export interface IRemixModel {
  __typename?: 'RemixModel';
  /** Author's email */
  authorEmail: Scalars['String'];
  createdDate: Scalars['DateTime'];
  /** Description remix */
  description: Scalars['String'];
  genre: GenreTypeEnum;
  id: Scalars['Int'];
  isStore: Scalars['Boolean'];
  /** Remix name */
  name: Scalars['String'];
  /** Price */
  price: Scalars['Int'];
  /** Track length */
  trackLength: Scalars['Int'];
  updatedDate: Scalars['DateTime'];
}

export interface IRemixUpdateDto {
  /** Author's email */
  authorEmail?: InputMaybe<Scalars['String']>;
  /** Description remix */
  description?: InputMaybe<Scalars['String']>;
  genre?: InputMaybe<GenreTypeEnum>;
  id: Scalars['Int'];
  isStore?: InputMaybe<Scalars['Boolean']>;
  /** Remix name */
  name?: InputMaybe<Scalars['String']>;
  /** Price */
  price?: InputMaybe<Scalars['Int']>;
  /** Track length */
  trackLength?: InputMaybe<Scalars['Int']>;
}

/** TYPE for a list of remixes with pagination */
export interface IRemixesModel {
  __typename?: 'RemixesModel';
  items: Array<IRemixModel>;
  meta: IPaginateModel;
}

export interface ISortDto {
  columnName: Scalars['String'];
  direction: SortDirectionEnum;
}

export enum SortDirectionEnum {
  Asc = 'asc',
  Desc = 'desc'
}
