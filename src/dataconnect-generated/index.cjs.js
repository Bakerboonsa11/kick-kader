const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'kick-kader',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const addCommentToTaskRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddCommentToTask', inputVars);
}
addCommentToTaskRef.operationName = 'AddCommentToTask';
exports.addCommentToTaskRef = addCommentToTaskRef;

exports.addCommentToTask = function addCommentToTask(dcOrVars, vars) {
  return executeMutation(addCommentToTaskRef(dcOrVars, vars));
};

const listTasksForProjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTasksForProject', inputVars);
}
listTasksForProjectRef.operationName = 'ListTasksForProject';
exports.listTasksForProjectRef = listTasksForProjectRef;

exports.listTasksForProject = function listTasksForProject(dcOrVars, vars) {
  return executeQuery(listTasksForProjectRef(dcOrVars, vars));
};

const createNewProjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateNewProject', inputVars);
}
createNewProjectRef.operationName = 'CreateNewProject';
exports.createNewProjectRef = createNewProjectRef;

exports.createNewProject = function createNewProject(dcOrVars, vars) {
  return executeMutation(createNewProjectRef(dcOrVars, vars));
};

const getUserProfileRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserProfile');
}
getUserProfileRef.operationName = 'GetUserProfile';
exports.getUserProfileRef = getUserProfileRef;

exports.getUserProfile = function getUserProfile(dc) {
  return executeQuery(getUserProfileRef(dc));
};
