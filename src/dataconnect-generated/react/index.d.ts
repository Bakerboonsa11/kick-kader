import { AddCommentToTaskData, AddCommentToTaskVariables, ListTasksForProjectData, ListTasksForProjectVariables, CreateNewProjectData, CreateNewProjectVariables, GetUserProfileData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useAddCommentToTask(options?: useDataConnectMutationOptions<AddCommentToTaskData, FirebaseError, AddCommentToTaskVariables>): UseDataConnectMutationResult<AddCommentToTaskData, AddCommentToTaskVariables>;
export function useAddCommentToTask(dc: DataConnect, options?: useDataConnectMutationOptions<AddCommentToTaskData, FirebaseError, AddCommentToTaskVariables>): UseDataConnectMutationResult<AddCommentToTaskData, AddCommentToTaskVariables>;

export function useListTasksForProject(vars: ListTasksForProjectVariables, options?: useDataConnectQueryOptions<ListTasksForProjectData>): UseDataConnectQueryResult<ListTasksForProjectData, ListTasksForProjectVariables>;
export function useListTasksForProject(dc: DataConnect, vars: ListTasksForProjectVariables, options?: useDataConnectQueryOptions<ListTasksForProjectData>): UseDataConnectQueryResult<ListTasksForProjectData, ListTasksForProjectVariables>;

export function useCreateNewProject(options?: useDataConnectMutationOptions<CreateNewProjectData, FirebaseError, CreateNewProjectVariables>): UseDataConnectMutationResult<CreateNewProjectData, CreateNewProjectVariables>;
export function useCreateNewProject(dc: DataConnect, options?: useDataConnectMutationOptions<CreateNewProjectData, FirebaseError, CreateNewProjectVariables>): UseDataConnectMutationResult<CreateNewProjectData, CreateNewProjectVariables>;

export function useGetUserProfile(options?: useDataConnectQueryOptions<GetUserProfileData>): UseDataConnectQueryResult<GetUserProfileData, undefined>;
export function useGetUserProfile(dc: DataConnect, options?: useDataConnectQueryOptions<GetUserProfileData>): UseDataConnectQueryResult<GetUserProfileData, undefined>;
