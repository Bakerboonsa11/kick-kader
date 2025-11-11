import { ConnectorConfig, DataConnect, OperationOptions, ExecuteOperationResponse } from 'firebase-admin/data-connect';

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

/** Generated Node Admin SDK operation action function for the 'AddCommentToTask' Mutation. Allow users to execute without passing in DataConnect. */
export function addCommentToTask(dc: DataConnect, vars: AddCommentToTaskVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AddCommentToTaskData>>;
/** Generated Node Admin SDK operation action function for the 'AddCommentToTask' Mutation. Allow users to pass in custom DataConnect instances. */
export function addCommentToTask(vars: AddCommentToTaskVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AddCommentToTaskData>>;

/** Generated Node Admin SDK operation action function for the 'ListTasksForProject' Query. Allow users to execute without passing in DataConnect. */
export function listTasksForProject(dc: DataConnect, vars: ListTasksForProjectVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListTasksForProjectData>>;
/** Generated Node Admin SDK operation action function for the 'ListTasksForProject' Query. Allow users to pass in custom DataConnect instances. */
export function listTasksForProject(vars: ListTasksForProjectVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListTasksForProjectData>>;

/** Generated Node Admin SDK operation action function for the 'CreateNewProject' Mutation. Allow users to execute without passing in DataConnect. */
export function createNewProject(dc: DataConnect, vars: CreateNewProjectVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateNewProjectData>>;
/** Generated Node Admin SDK operation action function for the 'CreateNewProject' Mutation. Allow users to pass in custom DataConnect instances. */
export function createNewProject(vars: CreateNewProjectVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateNewProjectData>>;

/** Generated Node Admin SDK operation action function for the 'GetUserProfile' Query. Allow users to execute without passing in DataConnect. */
export function getUserProfile(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<GetUserProfileData>>;
/** Generated Node Admin SDK operation action function for the 'GetUserProfile' Query. Allow users to pass in custom DataConnect instances. */
export function getUserProfile(options?: OperationOptions): Promise<ExecuteOperationResponse<GetUserProfileData>>;

