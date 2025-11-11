import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'kick-kader',
  location: 'us-east4'
};

export const addCommentToTaskRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddCommentToTask', inputVars);
}
addCommentToTaskRef.operationName = 'AddCommentToTask';

export function addCommentToTask(dcOrVars, vars) {
  return executeMutation(addCommentToTaskRef(dcOrVars, vars));
}

export const listTasksForProjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTasksForProject', inputVars);
}
listTasksForProjectRef.operationName = 'ListTasksForProject';

export function listTasksForProject(dcOrVars, vars) {
  return executeQuery(listTasksForProjectRef(dcOrVars, vars));
}

export const createNewProjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateNewProject', inputVars);
}
createNewProjectRef.operationName = 'CreateNewProject';

export function createNewProject(dcOrVars, vars) {
  return executeMutation(createNewProjectRef(dcOrVars, vars));
}

export const getUserProfileRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserProfile');
}
getUserProfileRef.operationName = 'GetUserProfile';

export function getUserProfile(dc) {
  return executeQuery(getUserProfileRef(dc));
}

