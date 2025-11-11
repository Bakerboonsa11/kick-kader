import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddCommentToTaskData {
  comment_insert: Comment_Key;
}

export interface AddCommentToTaskVariables {
  taskId: UUIDString;
  userId: UUIDString;
  content: string;
}

export interface Comment_Key {
  id: UUIDString;
  __typename?: 'Comment_Key';
}

export interface CreateNewProjectData {
  project_insert: Project_Key;
}

export interface CreateNewProjectVariables {
  name: string;
  description: string;
  deadline: TimestampString;
}

export interface GetUserProfileData {
  user?: {
    id: UUIDString;
    displayName: string;
    email: string;
    photoUrl?: string | null;
    role?: string | null;
  } & User_Key;
}

export interface ListTasksForProjectData {
  tasks: ({
    id: UUIDString;
    title: string;
    description: string;
    status: string;
    dueDate?: TimestampString | null;
    assignedTo?: {
      id: UUIDString;
      displayName: string;
    } & User_Key;
  } & Task_Key)[];
}

export interface ListTasksForProjectVariables {
  projectId: UUIDString;
}

export interface Project_Key {
  id: UUIDString;
  __typename?: 'Project_Key';
}

export interface Task_Key {
  id: UUIDString;
  __typename?: 'Task_Key';
}

export interface TeamMembership_Key {
  userId: UUIDString;
  projectId: UUIDString;
  __typename?: 'TeamMembership_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface AddCommentToTaskRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddCommentToTaskVariables): MutationRef<AddCommentToTaskData, AddCommentToTaskVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddCommentToTaskVariables): MutationRef<AddCommentToTaskData, AddCommentToTaskVariables>;
  operationName: string;
}
export const addCommentToTaskRef: AddCommentToTaskRef;

export function addCommentToTask(vars: AddCommentToTaskVariables): MutationPromise<AddCommentToTaskData, AddCommentToTaskVariables>;
export function addCommentToTask(dc: DataConnect, vars: AddCommentToTaskVariables): MutationPromise<AddCommentToTaskData, AddCommentToTaskVariables>;

interface ListTasksForProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTasksForProjectVariables): QueryRef<ListTasksForProjectData, ListTasksForProjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListTasksForProjectVariables): QueryRef<ListTasksForProjectData, ListTasksForProjectVariables>;
  operationName: string;
}
export const listTasksForProjectRef: ListTasksForProjectRef;

export function listTasksForProject(vars: ListTasksForProjectVariables): QueryPromise<ListTasksForProjectData, ListTasksForProjectVariables>;
export function listTasksForProject(dc: DataConnect, vars: ListTasksForProjectVariables): QueryPromise<ListTasksForProjectData, ListTasksForProjectVariables>;

interface CreateNewProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNewProjectVariables): MutationRef<CreateNewProjectData, CreateNewProjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateNewProjectVariables): MutationRef<CreateNewProjectData, CreateNewProjectVariables>;
  operationName: string;
}
export const createNewProjectRef: CreateNewProjectRef;

export function createNewProject(vars: CreateNewProjectVariables): MutationPromise<CreateNewProjectData, CreateNewProjectVariables>;
export function createNewProject(dc: DataConnect, vars: CreateNewProjectVariables): MutationPromise<CreateNewProjectData, CreateNewProjectVariables>;

interface GetUserProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserProfileData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetUserProfileData, undefined>;
  operationName: string;
}
export const getUserProfileRef: GetUserProfileRef;

export function getUserProfile(): QueryPromise<GetUserProfileData, undefined>;
export function getUserProfile(dc: DataConnect): QueryPromise<GetUserProfileData, undefined>;

