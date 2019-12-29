import { GraphQLResolveInfo } from 'graphql';
import { Context } from './startServer';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type CreateUserInput = {
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  username: Scalars['String'],
  password: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  _mutation?: Maybe<Scalars['String']>,
  createUser?: Maybe<User>,
  updateUser?: Maybe<User>,
  deleteUser?: Maybe<User>,
  updatePassword?: Maybe<Scalars['Boolean']>,
};


export type MutationCreateUserArgs = {
  input: CreateUserInput
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'],
  input: UpdateUserInput
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']
};


export type MutationUpdatePasswordArgs = {
  id: Scalars['ID'],
  input: UpdatePasswordInput
};

export enum OperatorEnum {
  Eq = 'eq',
  Ne = 'ne',
  Gt = 'gt',
  Gte = 'gte',
  Lt = 'lt',
  Lte = 'lte',
  Contains = 'contains'
}

export type PageInfo = {
   __typename?: 'PageInfo',
  hasNextPage?: Maybe<Scalars['Boolean']>,
  prevCursor?: Maybe<Scalars['String']>,
  nextCursor?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  _query?: Maybe<Scalars['String']>,
  listUsers: UserConnection,
  getUser?: Maybe<User>,
};


export type QueryListUsersArgs = {
  cursor?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  query?: Maybe<Array<Maybe<QueryInput>>>
};


export type QueryGetUserArgs = {
  id: Scalars['ID']
};

export type QueryInput = {
  field: Scalars['String'],
  value: Scalars['String'],
  operator?: Maybe<OperatorEnum>,
};

export type Subscription = {
   __typename?: 'Subscription',
  _subscription?: Maybe<Scalars['String']>,
};

export type UpdatePasswordInput = {
  currentPassword: Scalars['String'],
  newPassword: Scalars['String'],
};

export type UpdateUserInput = {
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  username?: Maybe<Scalars['String']>,
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
};

export type UserConnection = {
   __typename?: 'UserConnection',
  pageInfo: PageInfo,
  edges: Array<UserEdge>,
};

export type UserEdge = {
   __typename?: 'UserEdge',
  cursor?: Maybe<Scalars['String']>,
  node?: Maybe<User>,
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  QueryInput: QueryInput,
  OperatorEnum: OperatorEnum,
  UserConnection: ResolverTypeWrapper<UserConnection>,
  PageInfo: ResolverTypeWrapper<PageInfo>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  UserEdge: ResolverTypeWrapper<UserEdge>,
  User: ResolverTypeWrapper<User>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Mutation: ResolverTypeWrapper<{}>,
  CreateUserInput: CreateUserInput,
  UpdateUserInput: UpdateUserInput,
  UpdatePasswordInput: UpdatePasswordInput,
  Subscription: ResolverTypeWrapper<{}>,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  String: Scalars['String'],
  Int: Scalars['Int'],
  QueryInput: QueryInput,
  OperatorEnum: OperatorEnum,
  UserConnection: UserConnection,
  PageInfo: PageInfo,
  Boolean: Scalars['Boolean'],
  UserEdge: UserEdge,
  User: User,
  ID: Scalars['ID'],
  Mutation: {},
  CreateUserInput: CreateUserInput,
  UpdateUserInput: UpdateUserInput,
  UpdatePasswordInput: UpdatePasswordInput,
  Subscription: {},
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  _mutation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>,
  updateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id' | 'input'>>,
  deleteUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>,
  updatePassword?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationUpdatePasswordArgs, 'id' | 'input'>>,
}>;

export type PageInfoResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = ResolversObject<{
  hasNextPage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  prevCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  nextCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  _query?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  listUsers?: Resolver<ResolversTypes['UserConnection'], ParentType, ContextType, QueryListUsersArgs>,
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserArgs, 'id'>>,
}>;

export type SubscriptionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  _subscription?: SubscriptionResolver<Maybe<ResolversTypes['String']>, "_subscription", ParentType, ContextType>,
}>;

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
}>;

export type UserConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UserConnection'] = ResolversParentTypes['UserConnection']> = ResolversObject<{
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>,
  edges?: Resolver<Array<ResolversTypes['UserEdge']>, ParentType, ContextType>,
}>;

export type UserEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UserEdge'] = ResolversParentTypes['UserEdge']> = ResolversObject<{
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  node?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  Mutation?: MutationResolvers<ContextType>,
  PageInfo?: PageInfoResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Subscription?: SubscriptionResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
  UserConnection?: UserConnectionResolvers<ContextType>,
  UserEdge?: UserEdgeResolvers<ContextType>,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;